import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFormGroup!: FormGroup;
  loginRequestPayload!: LoginRequestPayload;


  constructor(private authService: AuthService) {
    this.loginRequestPayload = {
      username:'',
      password:''
    };
  }

  ngOnInit(): void{
    this.loginFormGroup = new FormGroup ({
    username: new FormControl( '', Validators.required),
    password:new FormControl('',Validators.required)
  });

  }

  submitLogin() { 
    this.loginRequestPayload.username = this.loginFormGroup.get('username')?.value;
    this.loginRequestPayload.password = this.loginFormGroup.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      console.log('login successfully :)');
    });
  }

}
