import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../Authentification/auth.service';
import { Provider } from '../model/provider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  provider!: Provider;
  providerId!: number;

  constructor(private authService: AuthService){

  }

ngOnInit(): void {
  this.providerById();
    
}






  providerById(){
    const provider_id = localStorage.getItem('id');
    var st = provider_id ? JSON.parse(provider_id) : 0;
    this.authService.getprovider(st).subscribe(
      (data)=>{
        this.provider = data;
        console.log("provider est : ", this.provider)
        this.providerId= this.provider.id;
        console.log("id de provider est: ", this.providerId);
   }, 
      
      (error)=>{
        console.error(error)
      }
)

}
getImageUrl(filename: string): string {
  return this.authService.getImageUrl1(filename);
}

onLogout(): void {
  this.authService.logout(); // Appel de la méthode logout pour déconnecter l'utilisateur
}

}
