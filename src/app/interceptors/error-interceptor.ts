import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('Passou no error interceptor')
    return next.handle(request)
      .pipe(         
        catchError(err => {         
          let errorObj = err;
          
          if (err instanceof HttpErrorResponse) {
            //console.log('Processing http error', err.status);           
            
            // if(errorObj.error) {
            //   //errorObj = err.error
            //   console.log('inteceptor resumo', err.error)
            // }
            // if(!errorObj.status) {
            //   errorObj = JSON.parse(err.error)
            //   console.log('inteceptor sem status code', err.error)
            // } 
            switch(err.status) {
              case 0:
                this.handle0(errorObj)
                break

              case 500:
                this.handle500(errorObj)
                break

              // case 422:
              //   this.handle422(errorObj)
              //   break

              // default:
              //   this.handleDefaultError(errorObj);
            }               
          }        

          return throwError(errorObj) 
        })
      )       
    
  }

  handle0(errorObj: any) {
    this.toastService.error('0', errorObj.statusText)
  }

  handle500(errorObj: any) {
    this.toastService.error(errorObj.status, errorObj.statusText)
  }
  
  // handle422(errorObj: any) {
  //   //errorObj =  errorObj.status
  //   console.log(errorObj)
  //   this.toastService.error('422', errorObj.errors.email)
  // }

  // handleDefaultError(errorObj: any) {
  //   this.toastService.error(errorObj.status, errorObj.statusText)
  // }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};