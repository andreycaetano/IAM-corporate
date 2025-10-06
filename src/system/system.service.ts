import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSystemDto } from '@/system/dto/create-system.dto';
import { System } from '@/system/entities/system.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
  ) {}

  async create(createSystemDto: CreateSystemDto): Promise<System> {
    const system = this.systemRepository.create(createSystemDto);
    return await this.systemRepository.save(system);
  }

  async findAll(): Promise<System[]> {
    return await this.systemRepository.find();
  }

  async findOne(id: string): Promise<System> {
    const system = await this.systemRepository.findOneBy({ id });

    if (!system)
      throw new NotFoundException(`Sistema com o ID ${id} não encontrado`);

    return system;
  }

  async update(id: string, updateSystemDto: CreateSystemDto): Promise<System> {
    const system = await this.systemRepository.findOneBy({ id });

    if (!system)
      throw new NotFoundException('Sistema com o ID ${id} não encontrado');

    Object.assign(system, updateSystemDto);

    return await this.systemRepository.save(system);
  }

  async delete(id: string): Promise<void> {
    const system = await this.systemRepository.findOneBy({ id });

    if (!system)
      throw new NotFoundException('Sistema com o ID ${id} não encontrado');

    await this.systemRepository.softDelete(id);
  }
}
