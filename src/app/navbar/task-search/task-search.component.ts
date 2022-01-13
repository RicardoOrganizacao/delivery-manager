import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { of, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { Task } from "src/app/tasks/shared/task.model";
import { TaskService } from "src/app/tasks/shared/task.service";

@Component({
  selector: 'task-search',
  templateUrl: 'task-search.component.html',
  styles: [`
    .search { position: absolute; width: 100%; left: 0; top: 35px; z-index: 1000; }
    .cursor { cursor: pointer; }`
  ]
})
export class TaskSearchComponent implements OnInit {
  searchTerms: Subject<string> = new Subject()
  tasks: Array<Task> = []

  constructor(
    private taskService: TaskService,
    private router: Router) {}

  ngOnInit() {
    this.searchTerms
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => term ? this.taskService.searchByTitle(term) : of<Task[]>([]) )
      )
      .subscribe((tasks) => { this.tasks = tasks })
  }

  search(term: string) {
    this.searchTerms.next(term)
  }

  goToTask(task: Task) {
    this.tasks = []
    this.router.navigate(['/tasks', task.id])
  }

}