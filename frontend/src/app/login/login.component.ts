import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatagoryService } from '../service/catagory.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  	loginuser: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service:CatagoryService ) { }

  ngOnInit() {

    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userName');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {


    if (this.loginForm.invalid) {
      return;
    }

    
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.service.login(loginPayload).subscribe(data => {
      debugger;
      if(data.message === "success") {
		  this.loginuser = true; 
        window.localStorage.setItem('userName',this.loginForm.controls.username.value);
        window.localStorage.setItem('token', data.result.token);
 		window.localStorage.setItem('user_state',data.state);

        this.router.navigate(['']);
			window.location.href='';

		
      }else {
        this.invalidLogin = true;
        alert(data.message);
      }
    });
  }

}
