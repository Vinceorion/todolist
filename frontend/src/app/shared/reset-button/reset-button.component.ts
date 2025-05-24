import { Component, Input, input, InputSignal, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Reset } from './reset-button.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reset-button',
  standalone: true,
  imports: [Reset,MatButtonModule],
  templateUrl: './reset-button.component.html',
  styleUrl: './reset-button.component.css'
})
export class ResetButtonComponent  {
  @Input() formB! : FormGroup|NgForm ;
  //formB : InputSignal<FormGroup|NgForm> = input.required<FormGroup|NgForm>();

}
