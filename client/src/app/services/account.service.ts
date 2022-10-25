import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 baseUrl= environment.apiUrl;
  private currentUserSource = new ReplaySubject<user>(1);
 currentsource = this.currentUserSource.asObservable();


  constructor(private http : HttpClient) { }

  login(model:any)
  {
     return this.http.post(this.baseUrl + "account/login",model).pipe(
      map((response:any)=>{
        const user = response;
        if(user)
        {
          localStorage.setItem("user",JSON.stringify(user));
          this.currentUserSource.next(user);

        }
      })
     )
  }
 register(model:any)
 {
  return this.http.post(this.baseUrl+"account/register",model).pipe(
      map((user:user)=>{
        if(user)
        {
          localStorage.setItem("user",JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
  );
 }
  setCurrentUser(user :user)
  {
    this.currentUserSource.next(user);
  }
  logout()
  {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}
