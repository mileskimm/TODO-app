import { Injectable } from '@angular/core';
import { TaskItem, TaskStatus } from '../task/task.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    KEY = 'TASK';
    tasks: TaskItem[] = [];
    constructor() {
        // console.log("TaskService")
        // this.getAllTasks();
    }

    getAllTasks(spaceId: string): TaskItem[] {
        try {
            this.tasks = JSON.parse(localStorage.getItem(this.KEY + '_' + spaceId)) as TaskItem[];
        } catch (ex) {
            this.tasks = [];
            localStorage.setItem(this.KEY + '_' + spaceId, JSON.stringify(this.tasks))
        }
        if (!Array.isArray(this.tasks)) {
            this.tasks = [];
            localStorage.setItem(this.KEY + '_' + spaceId, JSON.stringify(this.tasks))
        }
        return [...this.tasks];
    }

    addTask(task: TaskItem, spaceId: string): TaskItem {
        delete task.id;
        task.id = this.generateRandomId();
        this.tasks.push(task);
        localStorage.setItem(this.KEY + '_' + spaceId, JSON.stringify(this.tasks))
        return task;
    }

    deleteTask(taskId: string, spaceId: string): TaskItem[] {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        localStorage.setItem(this.KEY + '_' + spaceId, JSON.stringify(this.tasks))
        return [...this.tasks]
    }


    changeTaskStatus(id: string, taskStatus: TaskStatus, spaceId: string) {
        let task = this.tasks.find(t => t.id === id)
        task.status = taskStatus
        localStorage.setItem(this.KEY + '_' + spaceId, JSON.stringify(this.tasks))
        return task;
    }

    generateRandomId(length: number = 10): string {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    saveTimer(id: string, timer: number, spaceId: string) {
        let task = this.tasks.find(t => t.id === id)
        task.timer = timer
        localStorage.setItem(this.KEY + '_' + spaceId, JSON.stringify(this.tasks))
    }
}