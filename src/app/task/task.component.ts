import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import { TaskService } from '../services/task.service';
import { Space } from '../sidebar/space.model';
import { TaskItem, TaskStatus } from './task.model';

@Component({
  selector: 'app-todos',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnChanges {
  @Input() spaceId: string;
  // @ViewChild('timer') timer: CdTimerComponent;

  timeHelperHash: any = {}

  input = "";
  countToDo = 0;
  countInProgress = 0;
  countDone = 0;

  tasks: TaskItem[];
  taskToAdd: TaskItem = {
    title: "",
    status: TaskStatus.TODO,
    description: "",
    createdDate: new Date().toLocaleString(),
    finishedDate: new Date().toLocaleString(),
    timer: 0,
    isTimerStarted: false
  }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAndPrepareAllTasks();
  }

  getAndPrepareAllTasks() {
    this.countToDo = 0;
    this.countInProgress = 0;
    this.countDone = 0;
    this.tasks = this.taskService.getAllTasks(this.spaceId);
    if (this.tasks.length > 0) {
      for (let task of this.tasks) {
        if (task.status === "TODO") {
          this.countToDo++;
        }
        if (task.status === "IN_PROGRESS") {
          this.countInProgress++;
        }
        if (task.status === "DONE") {
          this.countDone++;
        }
      }
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    // @ts-ignore
    let spaceId = changes.spaceId.currentValue as string;
    this.getAndPrepareAllTasks();
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }


  onAddTask() {
    //Add to db
    if (this.taskToAdd.title === "") {
      alert("Please enter task")
    }
    else {
      let task = this.taskService.addTask(this.taskToAdd, this.spaceId)
      this.tasks.push(task);
      this.taskToAdd = {
        title: "",
        status: TaskStatus.TODO,
        description: "",
        createdDate: new Date().toLocaleString(),
        finishedDate: new Date().toLocaleString(),
        timer: 0,
        isTimerStarted: false
      }
      this.countToDo++;
    }
  }

  onDelete(taskId: string) {
    this.tasks = this.taskService.deleteTask(taskId, this.spaceId);
    this.getAndPrepareAllTasks()
  }

  oNchangeStatusInProgressRight(id: string) {
    let changedTask = this.taskService.changeTaskStatus(id, TaskStatus.IN_PROGRESS, this.spaceId);
    for (let task of this.tasks) {
      if (changedTask.id === task.id) {
        task.status = changedTask.status;
        this.countInProgress++;
        this.countToDo--;
        break;
      }
    }
  }
  oNchangeStatusInProgressLeft(id: string) {
    let changedTask = this.taskService.changeTaskStatus(id, TaskStatus.IN_PROGRESS, this.spaceId);
    for (let task of this.tasks) {
      if (changedTask.id === task.id) {
        task.status = changedTask.status;
        this.countInProgress++;
        this.countDone--;
        break;
      }
    }
  }

  onChangeStatusDone(id: string) {
    let changedTask = this.taskService.changeTaskStatus(id, TaskStatus.DONE, this.spaceId);
    for (let task of this.tasks) {
      if (changedTask.id === task.id) {
        task.status = changedTask.status;
        this.taskToAdd.finishedDate = new Date().toLocaleString();
        this.countDone++;
        this.countInProgress--;
        break;
      }
    }
  }

  onChangeStatusTODO(id: string) {
    let changedTask =
      this.taskService.changeTaskStatus(id, TaskStatus.TODO, this.spaceId);
    for (let task of this.tasks) {
      if (changedTask.id === task.id) {
        task.status = changedTask.status;
        this.countToDo++;
        this.countInProgress--;
        break;
      }
    }
  }
}
