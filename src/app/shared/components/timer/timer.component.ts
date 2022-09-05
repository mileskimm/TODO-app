import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import { TaskService } from 'src/app/services/task.service';
import { TaskItem } from 'src/app/task/task.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Input() task: TaskItem;
  @Input() spaceId: string;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    console.log(this.task)
  }

  startTimer() {
    // taskTimer.timer = 0;
    if (this.task.isTimerStarted === true) {
      return
    } else {
      this.task.intervalId = setInterval(() => {
        this.task.timer += 1;
      }, 1000)
      this.task.isTimerStarted = true;
    }
  }

  stopTimer() {
    // task.timer = 0;
    this.taskService.saveTimer(this.task.id, this.task.timer, this.spaceId)
    clearInterval(this.task.intervalId);
    this.task.isTimerStarted = false;
  }

  secondsToHms(timer: number) {
    let h = Math.floor(timer / 36000);
    let m = Math.floor(timer % 3600 / 60);
    let s = Math.floor(timer % 3600 % 60);

    let hDisplay = h > 0 ? + (h == 1 ? "hour," : "hours,") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

}
