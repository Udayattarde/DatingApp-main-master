import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accservice:AccountService,private  toast:ToastrService)
  {

  }
  canActivate(): Observable<boolean> {
     return this.accservice.currentsource.pipe(
      map(user =>{
            if(user) return true;
            this.toast.error("Please logged in")
      })
     )
  }
  
}
