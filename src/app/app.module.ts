// ANGULAR IMPORTS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// IMPORT MODULES
import { AppRoutingModule } from './app-routing.module';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'

// IMPORT COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DasboardComponent } from './dashboard/dashboard.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskSearchComponent } from './navbar/task-search/task-search.component';

import { HomeComponent } from './home/home.component';
import { TopPageComponent } from './home/top-page/top-page.component';

// IMPORTS SERVICES
import { AuthService } from './shared/auth.service';
import { TaskService } from './tasks/shared/task.service';
import { StorageService } from './shared/storage/storage.service';
//import { InMemoryTaskDataService } from './in-memory-task.dara.service';

// IMPORTS GUARDS
import { AuthGuard } from './guards/auth.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

// IMPORTS INTERCEPTORS
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';

// IMPORT NGX-TOAST
import { ToastNoAnimationModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DasboardComponent,
    HomeComponent,
    NavbarComponent,
    SignInFormComponent,
    SignUpFormComponent,
    TasksComponent,
    TaskDetailComponent,
    TaskSearchComponent,
    TopPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryTaskDataService),
    ReactiveFormsModule,
    RouterModule,
    ToastNoAnimationModule.forRoot(( { 
      timeOut : 1000, 
      positionClass : 'toast-bottom-center', 
      preventDuplicates : true,
      //maxOpened: 1
    } ) ),
  ],
  providers: [
    AuthGuard,
    AuthInterceptorProvider,
    AuthService,
    { provide: TaskService, useClass: TaskService },
    ErrorInterceptorProvider,
    NotAuthenticatedGuard,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
