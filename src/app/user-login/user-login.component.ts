import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private ds: DataService, private fb: FormBuilder) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  login(em, ps) {
    this.ds.loginUser(em, ps).subscribe(
      res => { console.log(res); }
    );
  }

  ngOnInit() {
  }

}
