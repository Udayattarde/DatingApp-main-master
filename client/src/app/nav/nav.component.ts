import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public accService:AccountService,private route:Router,private tostr:ToastrService) { }
  model : any ={};


  ngOnInit(): void {
    //this.getCurrentUser();
  }

  onSubmit()
  {
    this.accService.login(this.model).subscribe(res =>{
      console.log(res);
      this.route.navigateByUrl("/members");
    });
  } 
  logout()
  {
    this.accService.logout();
    this.route.navigateByUrl("/");
  }
  // getCurrentUser()
  // {
  //   this.accService.currentsource.subscribe(user =>{
  //     this.loggedIn = !!user;
  //   },error =>{
  //     console.log(error);
  //   })
  // }
}
