import { Component, OnInit } from "@angular/core";

import { TaskService } from "../tasks/shared/task.service";

import { Task } from "../tasks/shared/task.model";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DasboardComponent implements OnInit {
  tasks: Array<Task>

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getImportant()
      .subscribe({
        next: (tasks) => { this.tasks = tasks },
        error: (_error) => { alert("Ocorreu um erro no servidor, tente mais tarde") }
      })
  }

}