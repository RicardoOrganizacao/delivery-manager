import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {

  constructor(public authService: AuthService, private router: Router) {}

  signOutUser() {
    this.authService.signOut()
      .subscribe({
        next: () => this.router.navigate(['/sign-in'])
      })
  }

}