import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor (private authService: AuthService) {
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
        .subscribe(data => {
          console.log(data);
      });
  }


}
