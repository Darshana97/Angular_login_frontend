import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  jwt = new JwtHelperService();

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });



  ngOnInit(): void {
    this.protectedAuth();
  }

  protectedAuth = () => {
    if (localStorage.getItem("token")) {

      this.router.navigate(['/']);
      return

    }
  }

  loginUser = () => {
    console.log(this.loginForm.value);

    const body = {

      email: this.loginForm.value.email,
      password: this.loginForm.value.password

    };

    this.http.post('http://localhost:5000/api/auth/login', body).subscribe((res: any) => {
      // console.log(res);
      // localStorage.setItem("token", res);
      this.JwtValidate(res);
    }, err => {
      alert("Invalid Credentials");
    });

  }

  JwtValidate = (token: string) => {

    const decode = this.jwt.decodeToken(token);
    console.log(decode);
    const isExpired = this.jwt.isTokenExpired(token);

    if (!isExpired) {

      localStorage.setItem('token', token);
      this.router.navigate(['/']);

    } else {
      localStorage.removeItem('token');
    }

  }



}
