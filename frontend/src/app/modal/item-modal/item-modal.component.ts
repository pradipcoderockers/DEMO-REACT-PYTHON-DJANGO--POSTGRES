import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/model/item.model';
import { AddCartItemRequest } from 'src/app/model/add-cart-item-request.model';
import { CatagoryService } from 'src/app/service/catagory.service';
//import { NgFlashMessageService } from 'ng-flash-messages';


@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit {

  @Input() item: Item;
  userName = window.localStorage.getItem('userName');
   successmsg : string;
  alertClass : string;  
  constructor(public activeModal: NgbActiveModal, private service:CatagoryService ) {}
   //, private ngFlashMessageService: NgFlashMessageService

  ngOnInit() {
  }
  transform(value) {
        var p =  value.split('_');
		 return  p[1]?p[1]:p[0];
    }
  addToCart(item: Item,qty:number,pro){
    let cartReq = new AddCartItemRequest();
    let userName = window.localStorage.getItem('userName');
    cartReq.itemId = item.id;
    cartReq.qty = qty;
	cartReq.pro = pro;
	var quntityp =  (qty);
   if (quntityp>0) 
   {
	   
		if(userName != null && userName != undefined){
		  this.service.getUserByUserName(userName).subscribe(data => {
			cartReq.userId = data.result.id;
					cartReq.page_type ='cart';

			this.service.addToCart(cartReq).subscribe(data => {
 			  
			 this.alertClass = "success"; 
				this.successmsg = "Added to cart";
				setTimeout(()=>{   this.successmsg = ''; }, 6000);
			  /*
			   this.ngFlashMessageService.showFlashMessage({
				  // Array of messages each will be displayed in new line
				  messages: ["Added to cart"], 
				  // Whether the flash can be dismissed by the user defaults to false
				  dismissible: true, 
				  // Time after which the flash disappears defaults to 2000ms
				  timeout: false,
				  // Type of flash message, it defaults to info and success, warning, danger types can also be used
				  type: 'success'
				});
				*/
				
			  this.activeModal.dismiss();
			});
		  });

		}else{
			/*
 		  this.ngFlashMessageService.showFlashMessage({
				  // Array of messages each will be displayed in new line
				  messages: ["User not logged in. Please login to continue."], 
				  // Whether the flash can be dismissed by the user defaults to false
				  dismissible: true, 
				  // Time after which the flash disappears defaults to 2000ms
				  timeout: false,
				  // Type of flash message, it defaults to info and success, warning, danger types can also be used
				  type: 'warning'
				});
				*/
				this.alertClass = "info"; 
				this.successmsg = "User not logged in. Please login to continue.";
				setTimeout(()=>{   this.successmsg = ''; }, 6000);
		}
   }
   else
	{
		this.alertClass = "danger"; 
				this.successmsg = "Please enter quantity .";
				setTimeout(()=>{   this.successmsg = ''; }, 6000);
 		/* 
		this.ngFlashMessageService.showFlashMessage({
				  // Array of messages each will be displayed in new line
				  messages: ["Please enter quantity ."], 
				  // Whether the flash can be dismissed by the user defaults to false
				  dismissible: true, 
				  // Time after which the flash disappears defaults to 2000ms
				  timeout: false,
				  // Type of flash message, it defaults to info and success, warning, danger types can also be used
				  type: 'danger'
				});
				*/
	}	
  }

}
