import { Injectable } from '@angular/core';
import { Space } from '../sidebar/space.model';
import { TaskItem, TaskStatus } from '../task/task.model';

@Injectable({
    providedIn: 'root',
})
export class SpaceService {
    KEY = 'SPACE';
    spaces: Space[] = [];
    selectedSpace: Space;
    constructor() {
        // this.getAllSpaces();
    }

    getAllSpaces(): Space[] {
        try {
            this.spaces = JSON.parse(localStorage.getItem(this.KEY)) as Space[];
        } catch (ex) {
            this.spaces = [];
            localStorage.setItem(this.KEY, JSON.stringify(this.spaces))
        }
        if (!Array.isArray(this.spaces)) {
            this.spaces = [];
            localStorage.setItem(this.KEY, JSON.stringify(this.spaces))
        }
        return [...this.spaces];
    }

    addSpace(space: Space): Space {
        delete space.id;
        space.id = this.generateRandomId();
        this.spaces.push(space);
        localStorage.setItem(this.KEY, JSON.stringify(this.spaces))
        return space;
    }

    deleteSpace(spaceId: string): Space[] {
        this.spaces = this.spaces.filter(space => space.id !== spaceId);
        localStorage.setItem(this.KEY, JSON.stringify(this.spaces))
        return [...this.spaces]
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
}