import { Routes } from '@angular/router';
import { TaskCreateFormComponent } from './task/task-create-form/task-create-form.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskDeleteComponent } from './task/task-delete/task-delete.component';
import { TaskUpdateComponent } from './task/task-update/task-update.component';
import { LoginComponent } from './users/user-login/login.component';
import { RegisterComponent } from './users/user-register/register.component';
import { ProfileComponent } from './users/user-profile/profile.component';
import { ResetPasswordComponent } from './users/user-reset-password/reset-password.component';
import { UserManagementComponent } from './users/admin-users/user-management.component';
import { AuthGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
    { path: 'list',component:TaskListComponent,canActivate: [AuthGuard], data: { role: 'USER' }},
    { path: 'create',component:TaskCreateFormComponent, canActivate: [AuthGuard], data: { role: 'USER' }},
    { path: 'delete',component:TaskDeleteComponent},
    { path: 'update',component:TaskUpdateComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'admin/users', component: UserManagementComponent, /*canActivate: [RoleGuard], data: { role: 'ADMIN' } */},
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'admin/roles', component: UserManagementComponent, /*canActivate: [RoleGuard], data: { role: 'ADMIN' } */},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**',redirectTo:''}
];
