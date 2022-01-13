import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { AuthService } from "../shared/auth.service";
import { StorageService } from "../shared/storage/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  jwtPayload: any;

  constructor(
    private storage: StorageService,
    private auth: AuthService) {}  

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let localUser = this.storage.getLocalUser();

    //console.log('TOKEN', localUser);

    if(localUser) {
      //console.log('adicionou cabecalho -->')
      const authRequest = request.clone({headers: request.headers.set('Authorization', '' + localUser.token)});
        return next.handle(authRequest);
    } else {
      // console.log('não adicionou cabecalho -->')
      return next.handle(request)
    }
  }    
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};