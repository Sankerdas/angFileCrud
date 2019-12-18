import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add user
  addUser(name: string, profileImage: File): Observable<any> {
    var formData: any = new FormData; // the incomming data added in FromData and send to backend (node route)
    formData.append('name', name); 
    formData.append('avatar', profileImage);
    console.log(formData);
    return this.http.post<User>(`${this.baseURL}/create-user`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // Get Users
  getUsers() {
    return this.http.get(`${this.baseURL}`);
  }

  // Edit User
  editUser(id) {
    return this.http.get(`${this.baseURL}/edit-user/${id}`);
  }

  // Update User
  updateUser(id, data){
    const updateFormData: any = new FormData;
    updateFormData.append('name', data.name);
    updateFormData.append('avatar', data.avatar);
    return this.http.post<User>(`${this.baseURL}/update-user/${id}`, updateFormData);
  }
  
  // Delete User
  deleteUser(id){
    return this.http.get(`${this.baseURL}/delete-user/${id}`)
  }
}
