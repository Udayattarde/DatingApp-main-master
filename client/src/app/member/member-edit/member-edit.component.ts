import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { user } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
    member:Member;
    user :user;
    @ViewChild('editForm') editForm:NgForm;
    @HostListener('window:beforeunload',['$event']) unloadNotification($event:any)
    {
      if(this.editForm.dirty)
      {
        $event.returnValue = true;
      }
    }
 
  constructor(private accservice:AccountService,private memservice:MembersService,
    private toastr:ToastrService) {
    this.accservice.currentsource.pipe((take(1))).subscribe(user => this.user=user);
   }

  ngOnInit(): void {
    this.loadMember();
  }
  loadMember()
  {
    this.memservice.getmember(this.user.username).subscribe(res=>{
        this.member = res;
    })
  }

  updateChange()
  {
    this.memservice.updateMember(this.member).subscribe(res=>{
      console.log(this.member);
      this.toastr.success("Profile updated successfully");
      this.editForm.reset(this.member);
    })
  
  }

}
