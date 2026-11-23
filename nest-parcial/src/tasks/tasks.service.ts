import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    private readonly usersService: UsersService,
  ) { }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return task;
  }

  async create(taskData: any): Promise<Task> {
    const user = await this.usersService.findById(taskData.userId);
    if (!user) {
      throw new NotFoundException(
        `Usuario con ID ${taskData.userId} no encontrado`,
      );
    }

    return this.taskModel.create(taskData);
  }
}
