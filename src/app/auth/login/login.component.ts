import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  registerSuccessMessage!: string ;
  // isError!: boolean;
  isError = false;


  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) {
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

    this.activatedRoute.queryParams.subscribe( params => {
      if(params['registered'] !== undefined && params['registered'] === 'true') {
        // this.toastr.success('Please Check your Inbox for account activation email. Activate account before logging in :)','Signup Successful')
        this.toastr.success('Signup Successful')
        this.registerSuccessMessage = 'Please Check your Inbox for account activation email. Activate account before logging in :)' 
      } else {
        this.registerSuccessMessage = '';
      }
    })

  }

  submitLogin() { 
    this.loginRequestPayload.username = this.loginFormGroup.get('username')?.value;
    this.loginRequestPayload.password = this.loginFormGroup.get('password')?.value;


    this.authService.login(this.loginRequestPayload).subscribe(
      data => {
        console.log('login successfully :)');
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successful');
        }, 
      error => {
        // this.isError = true;
        this.toastr.error('Incorrect username or password','Login Failed');
        console.log('login Failed :(');
      });

    // this.authService.login(this.loginRequestPayload).subscribe(data => {
    //   if(data) {
    //     console.log('login successfully :)');
    //     this.isError = false;
    //     this.router.navigateByUrl('/');
    //     this.toastr.success('Login Successful');
    //   } else {
    //     this.isError = true;
    //     console.log('login Failed :(');
    //   }
    // });
  }

}
