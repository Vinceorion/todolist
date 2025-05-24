import { DestroyRef, inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { UsersService } from "./users.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private state : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public state$ :Observable<boolean> = this.state.asObservable();
    private readonly router = inject(Router);
    private readonly userService = inject(UsersService);
    private readonly destroyRef = inject(DestroyRef);
    
    checkAuthStatus(): void {
      this.userService.checkAuthStatus().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (user) => {
          this.state.next(true);  // L'utilisateur est authentifié
          this.router.navigate(['/create'])
        },
        error: (err) => {
          this.state.next(false); // L'utilisateur n'est pas authentifié
          this.router.navigate(['/login'])
        }
      });
    }
    
  
    logout(): void {
      this.userService.logout().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.state.next(false);// L'utilisateur est déconnecté
          this.router.navigate(['/login'])  
        }
      });
    }

    
  }