import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signupFormGroup!: FormGroup;
  signupRequestPayload!: SignupRequestPayload;

  constructor (private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupRequestPayload = {
      username:'',
      email:'',
      password:''
    };
  }

  ngOnInit(): void {
    this.signupFormGroup = new FormGroup ({
        username: new FormControl('',Validators.required),
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',Validators.required),
      });     
  }

  submitSignup() {
    this.signupRequestPayload.email = this.signupFormGroup.get('email')?.value;
    this.signupRequestPayload.username = this.signupFormGroup.get('username')?.value;
    this.signupRequestPayload.password = this.signupFormGroup.get('password')?.value;

    this.authService.signup(this.signupRequestPayload)
        .subscribe(
          () => {
            // this.toastr.success('Please check your email for account activation link','Signup successful :)')
            this.router.navigate(['/login'], {queryParams: {registered:'true'}})
          }, 
          ()=> {
            this.toastr.error('Failed to signup user! Please try again.');
        });
  }


}
