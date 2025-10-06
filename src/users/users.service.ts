import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) throw new ConflictException('Email já cadastrado');

    const user = this.userRepository.create(createUserDto);
    return instanceToPlain(await this.userRepository.save(user)) as User;
  }

  async findAll(): Promise<User[]> {
    return instanceToPlain(await this.userRepository.find()) as User[];
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`user com ID ${id} não encontrado`);

    return instanceToPlain(user) as User;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`user com ID ${id} não encontrado`);

    Object.assign(user, updateUserDto);

    return instanceToPlain(await this.userRepository.save(user)) as User;
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new NotFoundException(`user com o ID ${id} não encontrado`);

    await this.userRepository.softDelete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
