import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly formBuilder : FormBuilder = inject(FormBuilder);
  private readonly usersService : UsersService = inject(UsersService);
  private readonly destroyRef :DestroyRef = inject(DestroyRef);
  private readonly router : Router = inject(Router);
  private readonly authService : AuthService = inject(AuthService);

  registerForm: FormGroup = this.formBuilder.group({
    lastName: new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(8)],)
  })
  
    onRegister(){
      const user : User = User.assign(this.registerForm.value);
      this.usersService.register(user).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: ()=> {
          this.resetForm();
          this.authService.checkAuthStatus();
          this.router.navigate(['/login']);
        },
        error: (err)=> console.log(err)
      })
    }

    resetForm(){
      this.registerForm.reset();
      this.registerForm.setErrors(null); 
      this.registerForm.get('email')?.setErrors(null); 
      this.registerForm.get('password')?.setErrors(null); 
      this.registerForm.markAsPristine();
      this.registerForm.markAsUntouched();
    }

}
