import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  imagePreview: any;
  percentDone: any = 0;

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router) { }

  // Reactive form
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    avatar: [null, Validators.required]
  });

  fileUpload(e) {
    // file adding to form
   const uploadedFile = (e.target as HTMLInputElement).files[0]; // getting file
   this.form.patchValue({ avatar:uploadedFile }); // patching form data and adding the file
   this.form.get('avatar').updateValueAndValidity(); // check validity 

   // Imager preview
   const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result;
   }
   reader.readAsDataURL(uploadedFile);
  }

  submitForm(){
    this.ds.addUser(this.form.value.name, this.form.value.avatar).subscribe((event: HttpEvent<any>) => {
      console.log(event);
    })
  }

  ngOnInit() {
  }

}
