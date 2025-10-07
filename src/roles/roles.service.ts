import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { System } from '@/system/entities/system.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description, systemId } = createRoleDto;

    const system = await this.systemRepository.findOne({
      where: { id: systemId },
    });
    if (!system)
      throw new NotFoundException(
        `Sistema com o ID ${systemId} não encontrado`,
      );

    const existing = await this.roleRepository.findOne({
      where: { name, system: { id: systemId } },
      relations: ['system'],
      withDeleted: false,
    });
    if (existing)
      throw new ConflictException(
        'Já existe uma Role com esse nome para este sistema',
      );

    const role = this.roleRepository.create({ name, description, system });
    return this.roleRepository.save(role);
  }

  async findAllBySystemId(systemId: string): Promise<Role[]> {
    const system = await this.systemRepository.findOne({
      where: { id: systemId },
    });
    if (!system)
      throw new NotFoundException(
        `Sistema com o ID ${systemId} não encontrado`,
      );

    return this.roleRepository.find({
      where: { system: { id: systemId } },
    });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });
    if (!role)
      throw new NotFoundException(`Role com o ID ${id} não encontrado`);

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const conflict = await this.roleRepository.findOne({
        where: { name: updateRoleDto.name, system: { id: role.system.id } },
        relations: ['system'],
      });
      if (conflict && conflict.id !== role.id)
        throw new ConflictException(
          'Já existe uma Role com esse nome para este sistema',
        );
    }

    Object.assign(role, updateRoleDto);
    return this.roleRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    if (!role)
      throw new NotFoundException(`Role com o ID ${id} não encontrado`);

    await this.roleRepository.softRemove(role);
  }
}
