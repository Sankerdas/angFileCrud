import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private ds: DataService, private fb: FormBuilder, private actRoute: ActivatedRoute, private router: Router) { }

  editForm : FormGroup = this.fb.group({
    name: ['', Validators.required ],
    avatar: [null, Validators.required]
  });

  user: any = {};
  paramId: any;
  imagePreview: any;

  fileUpload(e) {
    const uploadedFile = (e.target as HTMLInputElement).files[0];
    this.editForm.patchValue({avatar: uploadedFile});
    this.editForm.get('avatar').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(uploadedFile);
  }


  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.ds.editUser(params['id']).subscribe(res => {
        this.user = res;
        this.paramId = params['id']; 
      })
    })
  }

}
