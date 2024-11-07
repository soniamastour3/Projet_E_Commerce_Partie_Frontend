import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../../component/model/login-request';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  LoginForm!: FormGroup; 

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router){

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
        var x = localStorage.getItem('id');
        console.log('x:', x);
        this.router.navigate(['/home']).then(() => {
        console.log('Redirection réussie vers /home');
      });
      },
      (error) => {
        console.error("Provider not found", error)
      }
    )
  }
}
