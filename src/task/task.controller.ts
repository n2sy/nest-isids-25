import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AddTaskDTO } from './DTO/addTaskDTO';
import { Task } from './models/task';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskSer: TaskService) {}

  //@Inject(TaskService) taskSer;

  allTasks: Task[] = [];

  @Get('all') //GET nomdudomaine/task/all
  getAllTasks(@Req() request: Request, @Res() response: Response) {
    console.log(this.taskSer.sayHello());
    return response.json(this.allTasks);
  }

  @Get('stats')
  nbreTask(
    @Query('startYear', ParseIntPipe) y1,
    @Query('endYear', ParseIntPipe) y2,
  ) {
    return this.taskSer.getNbTasks(y1, y2);
  }

  @Get(':id')
  getTaskById(@Param('id') taskId) {
    let searchedTask = this.allTasks.find((element) => element.id == taskId);
    if (!searchedTask)
      throw new NotFoundException("Le task demandé n'existe pas !!!!!");
    return {
      searchedTask,
    };
  }

  @Post('add')
  addNewTask(@Body() body: AddTaskDTO) {
    console.log(body instanceof AddTaskDTO);

    let generatedId = uuidv4();

    let newTask = new Task(
      generatedId,
      body.title,
      body.description,
      body.year,
      body.statut,
    );
    this.allTasks.push(newTask);
    return {
      message: 'Task added successfully',
      generatedId,
    };
  }

  @Put('edit/:id')
  updateTask(@Body() uTask, @Param('id') id) {
    let i = this.allTasks.findIndex((element) => element.id == id);
    if (i == -1) throw new NotFoundException("Y'a aucun task avec cet id");

    this.allTasks[i] = {
      id,
      ...uTask,
    };

    return {
      message: 'Task updated successfully',
      tab: this.allTasks,
    };
  }

  @Delete('delete/:deleteId')
  deleteTask(@Param('deleteId') id) {
    let i = this.allTasks.findIndex((element) => element.id == id);
    this.allTasks.splice(i, 1);
    return {
      message: 'Task deleted',
      tab: this.allTasks,
    };
  }
}
