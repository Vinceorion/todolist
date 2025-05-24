import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Task } from '../interfaces/task.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent  implements OnInit{
  private readonly taskService : TaskService = inject(TaskService);
  private readonly destroyRef : DestroyRef = inject(DestroyRef);

  displayedColumns: string[] = ['title', 'description', 'dueDate', 'completed'];
  dataSource!:MatTableDataSource<Task>;
  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.taskService.getAllTask().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:data=>{
        const list = data.map(task=>Task.assign(task));
        this.dataSource=new MatTableDataSource(list);
        this.dataSource.paginator=this.paginator;
      }
    })
  }
}
