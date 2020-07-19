import { Component, OnInit } from '@angular/core';
import { CatagoryService } from '../service/catagory.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  constructor(private service:CatagoryService) { }

  ngOnInit() {

    this.service.getUserByUserName(window.localStorage.getItem('userName')).subscribe(data => {
      this.user = data.result;
      console.log(JSON.stringify(this.user));
    });
  }

}
  