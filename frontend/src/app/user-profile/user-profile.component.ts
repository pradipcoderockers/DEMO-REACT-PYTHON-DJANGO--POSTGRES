import { Component, OnInit } from '@angular/core';
import { Role } from '../model/role.model';
import { CatagoryService } from '../service/catagory.service';
import { NgForm } from '@angular/forms';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  roles: Array<Role>;
  constructor(private service:CatagoryService ) { }

  ngOnInit() {

    this.service.getAllRoles().subscribe(data => {

      this.roles = data.result;
      console.log(this.roles);
     
    });
  }

  register(form:NgForm) {
    

    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const emailId = form.value.emailId;
    const password1 = form.value.password1;
    const password2 = form.value.password2;
    const role = form.value.role;
    const username = form.value.username;
    

    if(password1 !== password2){
      alert("Password dont match");
      return;
    }

    var userLoad = new User();

    userLoad.firstName = firstName;
    userLoad.lastName = lastName;
    userLoad.emailId = emailId;
    userLoad.password = password1;
    userLoad.roles = [{"id":1}];
    userLoad.username=username;

    var postLoad = {
      "firstName":firstName,
      "lastName": lastName,
      "username": username,
      "emailId":emailId,
      "password":password1,
      "roles":[{"id":1}]
    }

    this.service.createUser(userLoad).subscribe(data =>{

      alert(data.message);

    });
   // console.log(postLoad);
}
}
