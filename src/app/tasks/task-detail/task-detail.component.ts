import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { switchMap } from 'rxjs/operators';

import { Task } from "../shared/task.model";
import { TaskService } from "../shared/task.service";
import { FormUtils } from "src/app/shared/form.utils";

import { ToastrService } from "ngx-toastr";

declare var $: any;

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  providers: [ Location ],
  styles: [`
    .form-control-feedback { margin-right: 20px; } 
    .btn-update { margin-right: 5px; }`
  ]
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
  reactiveTaskForm: FormGroup
  task: Task
  taskDoneOptions: Array<any>
  formUtils: FormUtils

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private toastService: ToastrService
  ) {
    this.taskDoneOptions = [
      { value: false, text: "Pendente" },
      { value: true, text: "Feita" }
    ]

    this.setupForm()
    this.formUtils = new FormUtils(this.reactiveTaskForm)
  }

  ngOnInit(): void {
    this.task = new Task(NaN, '')
    this.route.params
      .pipe(
        switchMap((params: Params) => this.taskService.getById(+params['id']))    
      )
      .subscribe({
        next: (task) => { this.setTask(task)},
        error: (_erro) => { alert("Ocorreu um erro no servidor, tente mais tarde") }
      })    
  }

  public ngAfterViewInit() {
    $("#deadline").datetimepicker({
      'sideBySide': true,
      'locale': 'pt-BR'
    }).on('dp.change', () => this.reactiveTaskForm.patchValue( { deadline: $("#deadline").val() } )) 
  }

  setTask(task: Task): void {
    this.task = task       
    this.reactiveTaskForm.patchValue(task)
  }

  goBack() {
    this.location.back()
  }

  updateTask() {
    this.task.title = this.reactiveTaskForm.get('title')?.value
    this.task.deadline = this.reactiveTaskForm.get('deadline')?.value
    this.task.done = this.reactiveTaskForm.get('done')?.value
    this.task.description = this.reactiveTaskForm.get('description')?.value

    this.taskService.update(this.task)      
      .subscribe({       
        next: () => { this.toastService.success('204', 'Tarefa atualizada com sucesso!') },
        error: () => { alert("Ocorreu um erro no servidor, tente mais tarde") }
      })
  }

  setupForm() {
    this.reactiveTaskForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      deadline: [null, Validators.required],
      done: [null, Validators.required],
      description: [null],
    })
  }

}
