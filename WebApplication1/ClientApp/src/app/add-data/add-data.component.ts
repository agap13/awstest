import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as filestack from 'filestack-js';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router, Route } from '@angular/router'
import { apisettings } from '../common';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})

export class AddDataComponent {

  constructor(private fb: FormBuilder, private http: Http, private router: Router) { }

  formGroup = new FormGroup({
    description: new FormControl(null, Validators.required),
    file: new FormControl(null, Validators.required)
  });

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
      };
    }
  }

  async submit() {
    var response = null;
    const client = filestack.init('Ai4gusavSv6zfmsAvzl8wz');
    const formModel = this.formGroup.value;
    await client.upload(formModel.file).then(v => { response = v });
    const uuidv1 = require('uuid/v1');
    var annoucement: AddUserAnnouncementModel =
    {
      UserId: uuidv1(),
      Url: response['url'],
      Description: formModel.description
    };

    this.addAnnoucement(annoucement);
    this.router.navigateByUrl('fetch-data');;
  }

  private addAnnoucement(annoucement: AddUserAnnouncementModel) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: false });

    this.http.post(apisettings.baseUrl +'/api/annoucemnents/', annoucement, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }	
}

export class AddUserAnnouncementModel {
  UserId: string
  Url: string;
  Description: string;
  constructor() {
  }
}


