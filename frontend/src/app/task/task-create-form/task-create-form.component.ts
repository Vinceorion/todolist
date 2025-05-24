import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ResetButtonComponent } from '../../shared/reset-button/reset-button.component';
import { Reset } from '../../shared/reset-button/reset-button.directive';

@Component({
  selector: 'app-task-create-form',
  standalone: true,
  imports: [ReactiveFormsModule,
            FormsModule,
            MatButtonModule,
            MatInputModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatCardModule,
            ResetButtonComponent,Reset
          ],
  templateUrl: './task-create-form.component.html',
  styleUrl: './task-create-form.component.css'
})
export class TaskCreateFormComponent {
  
  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);

  titleCtrl = this.fb.control('',{validators:[Validators.required],nonNullable:true});
  descriptionCtrl = this.fb.control('', {validators:[Validators.required],nonNullable:true});
  dueDateCtrl : FormControl<Date | null>=this.fb.control(null, Validators.required);

  form = this.fb.group({
      title:this.titleCtrl,
      description:this.descriptionCtrl,
      dueDate:this.dueDateCtrl
  })

  @ViewChild('resetButton', { read: Reset, static: false })
  resetDirective!: Reset;

  onSubmit(){
    this.form.markAllAsTouched()
    if(this.form.invalid){
      return
    }else{
      this.createTask(this.form);
    }
  }

  createTask(form : NgForm | FormGroup ){
    const data : Task = Task.assign(form.value);
    this.taskService.create(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:data=>{
        console.log(data);
        this.resetDirective.resetForm(form);
      },
      error:err=>console.log(err)
    });
  }

  onTplSubmit(tplForm:NgForm){
    this.createTask(tplForm);
  }

}
