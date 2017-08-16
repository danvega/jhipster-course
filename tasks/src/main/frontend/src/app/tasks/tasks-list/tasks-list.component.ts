import { Component, OnInit } from '@angular/core';
import {Task} from "app/tasks/task.model";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

    tasks: Task[] = [];

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.taskService.getTasks()
            .subscribe(
                (tasks: any[]) => {
                    this.tasks = tasks
                },
                (error) => console.log(error)
        );

        this.taskService.onTaskAdded.subscribe(
            (task: Task) => this.tasks.push(task)
        );
    }

    getDueDateLabel(task: Task){
        return task.completed ? 'label-success' : 'label-primary';
    }

    onTaskChange(event, task) {
        this.taskService.saveTask(task,event.target.checked).subscribe();
    }
}
