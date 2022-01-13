import { FormGroup } from "@angular/forms";

export class FormUtils {

  constructor(private form: FormGroup) {}
  
  fieldClassErrorOrSuccess(fieldName: string) {
    return {
      "has-error": this.showFieldError(this.getField(fieldName)),
      "has-success": this.getField(fieldName)?.valid
    }
  }

  iconClassErrorOrSuccess(fieldName: string) {
    return {
      "glyphicon-remove": this.showFieldError(this.getField(fieldName)),
      "glyphicon-ok": this.getField(fieldName)?.valid
    }
  }

  showFieldError(field: any): boolean {
    //let field = this.getField(fieldName)    
    return field.invalid && ( field.touched || field.dirty )
  }
  
  getField(fieldName: string) {
    return this.form.get(fieldName)
  }

  get msg() { return this.form.controls }

}