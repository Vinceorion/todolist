import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpClient);

  public login(email: string,password:string):Observable<HttpResponse<string>>{
    const loginRequest: LoginRequest = { email, password };
    return this.http.post<HttpResponse<string>>("api/user/login", loginRequest,{withCredentials:true});
  }

  public register( user : User):Observable<string>{
    return this.http.post<string>('api/user/register',user);
  }

  public logout(): Observable<any> {
    return this.http.post("api/user/logout", {}, {
      withCredentials: true // ✅ pour que le cookie soit modifié côté serveur
    });
  }

  public checkAuthStatus(): Observable<any> {
    return this.http.get("api/user/me", { withCredentials: true });
  }
}
