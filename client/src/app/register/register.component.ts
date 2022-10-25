import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   @Output() cancelRegister = new  EventEmitter();
   model:any= {};
  constructor(private accService:AccountService,private toast:ToastrService) { }

  ngOnInit(): void {
  }

 register()
 {
   this.accService.register(this.model).subscribe(res =>{
      console.log(res);
      this.cancel();
   },error=>{
    console.log(error);
    this.toast.error(error.error)
   });
 }

 cancel()
 {
 this.cancelRegister.emit(false);  
}
}
