import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../Authentification/auth.service";
export const AuthGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if(!auth.isAuthenticated()) {
        router.navigateByUrl('/')
        return false
    }
    return true
}