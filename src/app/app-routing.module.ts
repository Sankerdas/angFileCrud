import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserCreateComponent} from './user-create/user-create.component';
import {UsersListComponent} from './users-list/users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: 'create-user', component: UserCreateComponent },
  { path: 'list-users', component: UsersListComponent },
  { path: 'edit-user/:id', component: UserEditComponent },
  { path: '', pathMatch: 'full', redirectTo: 'create-user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
