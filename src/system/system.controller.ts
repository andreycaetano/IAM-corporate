import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SystemService } from '@/system/system.service';
import { CreateSystemDto } from '@/system/dto/create-system.dto';
import { System } from '@/system/entities/system.entity';
import {
  SwaggerSystemCreate,
  SwaggerSystemDelete,
  SwaggerSystemFindAll,
  SwaggerSystemFindOne,
  SwaggerSystemUpdate,
} from '@/system/swagger/decorator.swagger';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post()
  @SwaggerSystemCreate()
  async create(@Body() createSystemDto: CreateSystemDto): Promise<System> {
    return await this.systemService.create(createSystemDto);
  }

  @Get(':id')
  @SwaggerSystemFindOne()
  async getOne(@Param('id') id: string): Promise<System> {
    return await this.systemService.findOne(id);
  }

  @Get()
  @SwaggerSystemFindAll()
  async getAll(): Promise<System[]> {
    return await this.systemService.findAll();
  }

  @Patch(':id')
  @SwaggerSystemUpdate()
  async update(
    @Param('id') id: string,
    @Body() updateSystemDto: CreateSystemDto,
  ): Promise<System> {
    return await this.systemService.update(id, updateSystemDto);
  }

  @Delete(':id')
  @SwaggerSystemDelete()
  async delete(@Param('id') id: string): Promise<void> {
    return await this.systemService.delete(id);
  }
}
