export enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export class TaskItem {
    id?: string;
    title?: string;
    description?: string;
    createdDate?: string;
    finishedDate?: string;
    status?: TaskStatus = TaskStatus.TODO;
    timer?= 0;
    intervalId?: any;
    isTimerStarted = false;

    // constructor(title: string,description: string,createdDate: Date,status:TaskStatus) {
    //     this.title = title;
    //     this.description = description;
    //     this.createdDate = createdDate;
    //     this.status = status;
    // }
}