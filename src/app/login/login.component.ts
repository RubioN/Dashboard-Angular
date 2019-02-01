import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'page-login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.scss', 'login.component.css']
      })

export class LoginComponent {
	loginForm: FormGroup
	errorMessage: any
	successMessage: any
	uid: string

	constructor(public authService: AuthService, private router: Router, private fb: FormBuilder)	{
		this.createForm()
		this.uid = ""
	}

	/*
  Param: None
  Return: None
  Func: Init the login form
  */
	createForm() {
		this.loginForm = this.fb.group({
		  email: ['', Validators.required ],
		  password: ['',Validators.required]
		});
	}

  /*
  Param: Login value
  Return: None
  Func: Login to the web app
  */	
	tryLogin(value){
		this.authService.doLogin(value)
		this.router.navigate(['/summary'])
	}
}