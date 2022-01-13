import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { StorageService } from "./storage/storage.service";

import { LocalUser } from "./storage/local_user";
import { User } from "./user.model";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

// AMBIENTES
import { environment } from "src/environments/environment.prod";
// import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {
  //sessionsURL = "http://localhost:3000/sessions"
  //usersURL = "http://localhost:3000/users"
  sessionsURL: string
  usersURL: string

  //sessionsURL = "https://ruby-manager.herokuapp.com/sessions"
  //usersURL = "https://ruby-manager.herokuapp.com/users"
  headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/rbk.taskmanager.v1')

  constructor(private http: HttpClient, private storage: StorageService) {
    this.sessionsURL = `${environment.apiUrl}/sessions`
    this.usersURL = `${environment.apiUrl}/users`
  }

  signIn(loginForm: any): Promise<void> {
    let body = {
      email: loginForm.email,
      password: loginForm.password
    }

    return this.http.post<User>(this.sessionsURL, body, { headers: this.headers } )
      .toPromise()
      .then(response => {
        this.successfulLogin(response.auth_token)       
      })
      .catch(response => {
        if (response.status === 401 ) {
          if (response.error.errors === 'Invalid password or email') {
          return Promise.reject('Usuario ou senha inválidos')
        }
      }
      return Promise.reject(response)
    })    
  } 

  successfulLogin(token: string) {
    let user:  LocalUser = {
      token: token
    }
    this.storage.setLocalUser(user)
  }

  signUp(userForm: any): Observable<any> {
    const params = {
      "email": userForm.email,
      "password": userForm.password,
      "password_confirmation": userForm.password_confirmation 
    }    

    return this.http.post<any>(this.usersURL, { user: params }, { headers: this.headers } )
      .pipe(
        map((response) => response),
        catchError(this.handleErrors)
      )
  } 

  signOut(): Observable<any> {
    let tokenObj = this.storage.getLocalUser()
    this.storage.setLocalUser(null)
    return this.http.delete<any>(`${this.sessionsURL}/${tokenObj.token}`, { headers: this.headers } )
      .pipe(
        map((response) => response),
        catchError(this.handleErrors)
      )
  }

  userSignedIn(): boolean { 
    return this.storage.getLocalUser()
  }

  private handleErrors(error: HttpErrorResponse){
    //console.log("SALVANDO O ERRO NO ARQUIVO DE LOG - DETALHES DO ERRO => ", error)
    return throwError(error);
  }

}
