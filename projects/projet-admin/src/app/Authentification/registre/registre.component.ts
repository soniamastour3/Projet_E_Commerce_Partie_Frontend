import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent implements OnInit{
 RegistreForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.RegistreForm= this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
      
  }

  onSubmit() {
    
      // Appel du service pour enregistrer le produit
      this.authService.Registre(this.RegistreForm.value).subscribe(
        (res:any) =>{ 
          console.log(res);
          this.router.navigate([''])},  // Redirection après le succès
        (error) => console.error('Erreur lors de l\'enregistrement du provider', error)
      );
    }

}
