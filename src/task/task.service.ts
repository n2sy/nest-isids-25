import { Injectable } from '@nestjs/common';
import { Task } from './models/task';

@Injectable()
export class TaskService {
  allTasks: Task[] = [];

  sayHello() {
    return 'Hello ISIDS';
  }

  getNbTasks(y1, y2) {
    let t = this.allTasks.filter((task) => task.year >= y1 && task.year <= y2);
    return {
      selectedTasks: t,
    };
  }
}
