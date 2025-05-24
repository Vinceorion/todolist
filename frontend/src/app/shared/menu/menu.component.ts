import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../users/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent  implements OnInit {
  private readonly authService : AuthService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  isLoggedIn : WritableSignal<boolean> = signal(false)

  ngOnInit(): void {
    this.authService.state$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (isLoggedIn) => {
        console.log(isLoggedIn);
        
        this.isLoggedIn.set(isLoggedIn);
      }
    });
  }
  logout(){
    this.authService.logout();
  }

}
