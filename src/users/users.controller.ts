import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  SwaggerUserCreate,
  SwaggerUserDelete,
  SwaggerUserFindAll,
  SwaggerUserFindOne,
  SwaggerUserUpdate,
} from './swagger/decorator.swagger';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @SwaggerUserCreate()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @SwaggerUserFindAll()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @SwaggerUserFindOne()
  async findOne(@Param() id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @SwaggerUserUpdate()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @SwaggerUserDelete()
  async remove(@Param() id: string) {
    return await this.usersService.remove(id);
  }
}
