import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.protectedAuth();
  }

  protectedAuth = () => {
    if (localStorage.getItem("token")) {
      this.router.navigate(['/']);

    }
  }

  registerUser = () => {

    console.log(this.registerForm.value);

  }

}
