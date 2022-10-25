import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route:Router,private toats:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
          if(error)
          {
           switch(error.status)
           {
            case 400:
              if(error.error.errors)
              {
                const  arr = [];
                for(const key in error.error.errors)
                {
                  if(error.error.errors[key])
                  arr.push(error.error.errors[key]);
                }
                throw arr.flat();
              }
              else{
                this.toats.error(error.statusText,error.status);
              }
            break;
            case 500:
               const extra : NavigationExtras = {state:{error:error.error}}
               this.route.navigateByUrl('/server-error',extra);
              break;
              case 401:
                this.toats.error(error.statusText,error.status);
              break;
              case 404:
               this.route.navigateByUrl('/not-found');
              break;
              default:
                this.toats.error("Somenthing Internal error");
                break;
           }
          }
          return throwError(error);

      })
    );
  }
}
