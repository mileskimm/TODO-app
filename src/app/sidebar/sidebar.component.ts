import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpaceService } from '../services/space.service';
import { TaskService } from '../services/task.service';
import { Space } from './space.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() spaceClicked: EventEmitter<string> = new EventEmitter();
  spaces: Space[] = [];
  spaceToAdd: Space = {
    name: ""
  }
  constructor(private spaceService: SpaceService) { }

  ngOnInit(): void {
    this.spaces = this.spaceService.getAllSpaces();
  }


  openSpace(spaceId: string) {
    this.spaceClicked.emit(spaceId);

  }

  addNewSpace() {
    if (this.spaceToAdd.name === "") {
      alert("Please enter Space name")
    } else {
      let space = this.spaceService.addSpace(this.spaceToAdd)
      this.spaces.push(space);
      this.spaceToAdd = {
        name: ""
      }
    }
  }

  onDeleteSpace(spaceId: string) {
    this.spaces = this.spaceService.deleteSpace(spaceId)
  }

  openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}
