import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  Users: any = [];

  constructor(private ds: DataService) { 
    this.getUsers();
  }

  ngOnInit() {
  }
  getUsers() {
    this.ds.getUsers().subscribe(res => {
      this.Users = res['users'];
    })
  }

}
