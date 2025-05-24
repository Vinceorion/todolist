import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UsersService } from '../services/users.service';
import { NgClass } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,RouterLink,ReactiveFormsModule,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  private readonly formBuilder : FormBuilder = inject(FormBuilder);
  private readonly usersService : UsersService = inject(UsersService);
  private readonly authService : AuthService = inject(AuthService);
  loginForm : FormGroup = this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required],),
  })

  onLogin(){
    this.usersService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
      next: ()=> {
        this.resetForm();
        this.authService.checkAuthStatus();
      },
      error: (err)=> console.log(err)
    });
  }

  resetForm(){
    this.loginForm.reset();
    this.loginForm.setErrors(null); 
    this.loginForm.get('email')?.setErrors(null); 
    this.loginForm.get('password')?.setErrors(null); 
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
  }
  

}
