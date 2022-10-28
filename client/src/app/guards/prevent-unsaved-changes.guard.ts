import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberDetailComponent } from '../member/member-detail/member-detail.component';
import { MemberEditComponent } from '../member/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent):  boolean  {
    if(component.editForm.dirty)
    {
     return confirm("Are you sure do want to leave the page")
    }
    return true;
  }
  
}
