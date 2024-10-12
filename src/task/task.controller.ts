import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task';

@Controller('task')
export class TaskController {
  allTasks: Task[] = [];

  @Get('all')
  getAllTasks(@Req() request: Request, @Res() response: Response) {
    console.log(request);
    return response.json(this.allTasks);
  }

  @Post('add')
  addNewTask(@Body() body: Task) {
    let generatedId = uuidv4();
    body.id = generatedId;
    this.allTasks.push(body);
    return {
      message: 'Task added successfully',
      generatedId,
    };
  }

  @Get('search/:id')
  getTaskById(@Param('id') taskId) {
    let searchedTask = this.allTasks.find((element) => element.id == taskId);
    if (!searchedTask)
      throw new NotFoundException("Le task demandé n'existe pas");
    return {
      searchedTask,
    };
  }
}
