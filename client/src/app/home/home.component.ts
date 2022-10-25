import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode=false;
  user:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  registerToggle()
  {
    this.registerMode = !this.registerMode;
  }
  getUser()
  {
    this.http.get("https://localhost:5001/api/users").subscribe(res => this.user = res);
  
  }
  cancelRegMode(event:boolean)
  {
    this.registerMode=event;
  }
}
