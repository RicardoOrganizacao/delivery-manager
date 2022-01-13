import { Component, OnInit } from "@angular/core";

import { Task } from "./shared/task.model";
import { TaskService } from "./shared/task.service";

import { ToastrService } from "ngx-toastr";
import { take } from "rxjs/operators";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styles: [ `.btn-info { margin-right: 5px; }` ]
})

export class TasksComponent implements OnInit {
  tasks: Array<Task>
  newTask: Task

  constructor(private taskService: TaskService, private toastService: ToastrService) {
    this.newTask = new Task(NaN, '')
  }

  ngOnInit() {
    this.taskService.getAll()
      .subscribe({
        next: (tasks) => { 
          this.tasks = tasks.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id) 
        },
        error: (_erro) => { alert("Ocorreu um erro no servidor, tente mais tarde") }
    })
  }

  createTask() {
    this.newTask.title = this.newTask.title.trim()

    if(!this.newTask.title) {
      this.toastService.warning('Preencha corretamente', 'Atarefa deve ter um título', {
        timeOut: 3000,
        positionClass : 'toast-top-center'
      })
    } else {
      this.taskService.create(this.newTask)
        .subscribe({
          next: (task) => { this.tasks.unshift(task),
            this.newTask = new Task(NaN, '')
        },
          error: () => { alert("Ocorreu um erro no servidor, tente mais tarde") }
        })
    }
  }

  deleteTask(task: Task) {
    this.toastService.warning('Clique aqui para confirmar', 'Deseja mesmo excluir?!',  {
      timeOut: 6000,
      positionClass : 'toast-top-center'
    })
    .onTap
    .pipe(take(1))
    .subscribe(() => this.toasterClickedHandler(task));
    // if( confirm(`Deseja realmente excluir a tarefa "${task.title}`) ) {
    //   this.taskService.delete(task.id)
    //     .subscribe({
    //       next: () => { this.tasks = this.tasks.filter(t => t != task) },
    //       error: () => { alert("Ocorreu um erro no servidor, tente mais tarde") }
    //     })
    // }
  }

  toasterClickedHandler(task: Task) {
    console.log('Toastr clicked');
    this.taskService.delete(task.id)
      .subscribe({
        next: () => { this.tasks = this.tasks.filter(t => t != task),
          this.toastService.success('204', 'Excluído com sucesso', {
            timeOut: 1000,
            positionClass : 'toast-top-center'
          }) },
        error: () => { alert("Ocorreu um erro no servidor, tente mais tarde") }
      })
  }

}