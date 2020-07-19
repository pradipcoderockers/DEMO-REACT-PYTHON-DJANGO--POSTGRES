import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }
	loginuser: boolean = false;

  ngOnInit() {
	  this.loginuser = false;
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('token');
	window.location.href='';
    this.router.navigate(['']);
	 
   
  }

}
