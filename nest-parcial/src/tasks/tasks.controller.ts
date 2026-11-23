import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './createTaskDTO';
import { AuthGuard } from '../guards/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() payload: CreateTaskDto) {
    return this.tasksService.create(payload);
  }

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }
}
