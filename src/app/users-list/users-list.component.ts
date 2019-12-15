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
  }

  ngOnInit() {
    this.get_users();
  }

  get_users() {
    this.ds.getUsers().subscribe(res => {
      this.Users = res['users'];
    })
  }

  delete_user(id) {
    if(confirm('Do you want to delte this user..?'))
      this.ds.deleteUser(id).subscribe(res => {
        console.log(res)
        this.get_users();
      })
    else console.log('Delete canceled,..!');        
  }

}
