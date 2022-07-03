import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'agd-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    // SIGN IN FORMGROUP
    public fg: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.fg = this.fb.group({
            identifier: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    ngOnInit() {
    }

    ///////////////////////// SIGN IN THE USER WITH FILLED CREDENTIALS
    signin() {
        if (!this.fg?.valid) {
            this.fg.markAllAsTouched();
			this.scrollToError();
            return;
        }
        this.router.navigate(['/home']);
    }

	///////////////////////// SCROLL TO FIRST MAT-ERROR
	scrollToError(): void {
		const firstElementWithError = document.querySelector('.ng-invalid');
		if (firstElementWithError) {
			firstElementWithError.scrollIntoView({ behavior: 'smooth' });
		}
	}    

}
