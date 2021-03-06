import { RestService } from '../core/services/feathers.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    public _formBuilder: FormBuilder, 
    private _restService: RestService,
    private _router: Router,
    private _flash: FlashMessagesService
  ) { 
    // Build the form group
    this.form = this._formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }
  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.form.value['username'],
      password: this.form.value['password']
    }

    this._restService.authenticate(user.username, user.password).then(data => {
      if(data) {
        this._flash.show('You\'re now logged in', { cssClass: 'notification is-success', time: 3000 });
        this._router.navigate(['chat']);

      } else {
        console.log(data);
        this._flash.show('Login failed', { cssClass: 'notification is-danger', time: 3000 });
      }
    }).catch(err => console.log(err));
  }
}


