import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { DataService } from './shared/data.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInsterceptorService } from './shared/token-insterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UsersListComponent,
    UserEditComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInsterceptorService,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
