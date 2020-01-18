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
  addUser(UserData: any, profileImage: File): Observable<any> {
    const formData: any = new FormData; // the incomming data added in FromData and send to backend (node route)
    formData.append('name', UserData.name);
    formData.append('phone', UserData.phone);
    formData.append('email', UserData.email);
    formData.append('password', UserData.password);
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
  updateUser(id, UserData) {
    const updateFormData: any = new FormData;

    updateFormData.append('name', UserData.name);
    updateFormData.append('phone', UserData.phone);
    updateFormData.append('email', UserData.email);
    updateFormData.append('password', UserData.password);
    updateFormData.append('avatar', UserData.avatar);

    return this.http.post<User>(`${this.baseURL}/update-user/${id}`, updateFormData);
  }

  // Delete User
  deleteUser(id) {
    return this.http.get(`${this.baseURL}/delete-user/${id}`);
  }

  // Login User
  loginUser(em, psd) {
    const logObj = {
      email: em,
      password: psd,
    };
    return this.http.post(`${this.baseURL}/user-login`, logObj);
  }
}
