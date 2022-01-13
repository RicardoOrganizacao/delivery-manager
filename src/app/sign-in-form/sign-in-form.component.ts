import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "../shared/auth.service";

import { FormUtils } from "../shared/form.utils";

@Component({
  selector: 'sign-in-form',
  templateUrl: 'sign-in-form.component.html'
})
export class SignInFormComponent {
  loginForm: FormGroup
  formUtils: FormUtils
  submitted: boolean

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService) {
      
      this.setupForm()
      this.formUtils = new FormUtils(this.loginForm)
      this.submitted = false
  }

  signInUser() {
    this.submitted = true
    this.authService.signIn(this.loginForm.value)
      .then(() => {
        this.router.navigate(['/tasks'])
      })
      .catch(erro => {
        this.submitted = false
        if(erro == 'Usuario ou senha inválidos')
        this.toastService.error('401', erro)
      })
  }

  setupForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

}