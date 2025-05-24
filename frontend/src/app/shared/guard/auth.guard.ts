import { Router } from "@angular/router";
import { AuthService } from "../../users/services/auth.service";
import { DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export const AuthGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);
    

    return authService.state$.pipe(takeUntilDestroyed(destroyRef)).subscribe({
        next: (isLoggedIn)=>{
            if(!isLoggedIn) {
                router.navigateByUrl('/login')
                return false
            }
            return true
        }
    })
    
}