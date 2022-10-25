import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { user } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating APP';
  user:any;

  constructor(private accService:AccountService)
  {

  }
  ngOnInit()
  {
    this.setCurrentUser();
  }
  setCurrentUser()
  {
    const user : user = JSON.parse(localStorage.getItem("user"));
      this.accService.setCurrentUser(user);
  }


}
