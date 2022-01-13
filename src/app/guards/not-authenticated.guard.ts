import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if(this.authService.userSignedIn()) {
      this.router.navigate(['/dashboard'])
      return false
    } else {
      return true
    }
  }

}