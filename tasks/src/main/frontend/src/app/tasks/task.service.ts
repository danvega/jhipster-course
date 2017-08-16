import {Http} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Task} from "app/tasks/task.model";

@Injectable()
export class TaskService {

    onTaskAdded = new EventEmitter<Task>();

    constructor(private http: Http) {

    }

    getTasks() {
        return this.http.get('/api/tasks').map(response => response.json());
    }

    saveTask(task: Task, checked: boolean) {
        task.completed = checked;
        return this.http.post('/api/tasks/save', task).map(response => response.json());
    }

    addTask(task: Task) {
        return this.http.post('/api/tasks/save', task).map(response => response.json());
    }

}
