import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

const httpoptions = {
  headers:new HttpHeaders({
    Authoriaztion:'Bearer'+JSON.parse(localStorage.getItem('user'))?.token
  })
}
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members : Member[] = [];
  constructor(private http:HttpClient) { }

  getmembers()
  {
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users',httpoptions).pipe(
      map(member =>{
           this.members = member;
           return this.members;
      })
    )
  }

  getmember(username:string)
  {
    const member = this.members.find(x => x.username ===username);
    if(member != undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/'+username, httpoptions);
  }
  updateMember(member:Member)
  {
   return this.http.put(this.baseUrl + 'users',member).pipe(
    map(() =>{
      const index = this.members.indexOf(member);
      this.members[index] = member;
    }

    )
   )
  }
}
