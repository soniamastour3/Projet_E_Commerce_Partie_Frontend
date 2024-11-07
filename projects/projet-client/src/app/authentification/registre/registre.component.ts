import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { patternEmail } from '../../component/model/pattern';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent implements OnInit{

  RegistreForm!: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.RegistreForm = this.fb.group({ username: ['', Validators.required], 
                                        email: ['', [Validators.required, Validators.email, Validators.pattern(patternEmail)]],
                                        localization: ['', Validators.required],
                                        password: ['', Validators.required] });
      
  }

  Registre(){
    if (!this.RegistreForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'formulaire incorrect',
        text: 'Veuillez remplir tous les champs du formulaire. succès.'
      });
      return;
  }else{
     this.authService.Registre(this.RegistreForm.value).subscribe(
      (res)=>{
        console.log(res)
      },
      (err)=>{
        console.error("erreur lors de création de compte", err)
    }
     )
    }}
 //[disabled]="!RegistreForm.valid" [ngClass]="{'disabled-button': !RegistreForm.valid}"
}
