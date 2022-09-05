import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CdTimerModule } from 'angular-cd-timer';
import { TimerComponent } from './shared/components/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    SidebarComponent,
    TimerComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    CdTimerModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
