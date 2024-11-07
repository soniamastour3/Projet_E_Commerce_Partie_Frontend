import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../../component/model/login-request';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  LoginForm!: FormGroup; 
  constructor(private authService: AuthService, private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.LoginForm= this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
      
  }
  Login() {

    const loginRequest: LoginRequest = {
      username: this.LoginForm.value.username,
      password: this.LoginForm.value.password
    }

    this.authService.login(loginRequest).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('id', JSON.stringify(response.id)); 
        
      },
      (error) => {
        console.error("Client not found", error)
      }
    )
  }

}
