import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "../shared/auth.service";

import { FormUtils } from "../shared/form.utils";

@Component({
  selector: 'sign-up-form',
  templateUrl: 'sign-up-form.component.html'
})
export class SignUpFormComponent {
  userForm: FormGroup
  formUtils: FormUtils
  submitted: boolean

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService) {

      this.setupForm()
      this.formUtils = new FormUtils(this.userForm)
      this.submitted = false
  }

  signUpUser() {
    this.submitted = true
    this.authService.signUp(this.userForm.value)
      .subscribe({
        next: (response) => { 
          this.authService.successfulLogin(response.auth_token),
          this.toastService.success('Sua conta foi criada com sucesso', 'Parabéns!!!', {
            timeOut: 3000,
            positionClass : 'toast-top-center'
          })
          this.router.navigate(['/dashboard']) 
        },
        error: (error) => {
          this.submitted = false
          
          if(error.status === 422) {
            this.toastService.error(error.error.errors.email, error.status)
          }
        }
      })
  }

  setupForm() {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, Validators.required ]
    }, { validator: this.passwordConfirmationValidator }) 
  }

  passwordConfirmationValidator(userForm: FormGroup) {
    if(userForm.get('password')?.dirty && userForm.get('password')?.value === userForm.get('password_confirmation')?.value)
      userForm.get('password_confirmation')?.setErrors(null)
    else
      userForm.get('password_confirmation')?.setErrors({'mismatch': true})
  }

}
