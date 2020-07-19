import { Component, OnInit } from '@angular/core';
import { CatagoryService } from '../service/catagory.service';
import { CartItem } from '../model/cart-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems : CartItem[];
  cartTotal: number;
  total: number = 0;

  constructor(private service:CatagoryService,private router: Router) { }

  ngOnInit() {
	window.localStorage.setItem('breadcrum','');
	this.service.topcat= (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
    let userName = window.localStorage.getItem('userName');
    let userId = "";
    if(userName != null && userName != undefined){
      this.service.getUserByUserName(userName).subscribe(data => {
        userId = data.result.id;
        this.service.getCartItem(data.result.id,'cart','').subscribe(data => {
          //console.log(data.result.cartItems);
          this.cartItems = data.result.cartItems;
          for (let cart of data.result.cartItems) {
            this.total = this.total + cart.qty * cart.dbp;
          }

        });
      }).add(
        console.log("teardown")
      );

    }
  }

  updateQty(item,ele){
    //this.cartItems[item.id].qty = ele;
    let index = this.cartItems.indexOf(item);
    this.cartItems[index].qty = ele;
    this.total = this.total + item.dbp;

    // console.log(index);
    // console.log(item);
    // console.log(ele);

  }

  removeFromCart(cartItem : CartItem){
    let index = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(index,1);
    console.log(cartItem);
	
     this.service.deleteCartItem({"userId": cartItem.userId,"itemId": cartItem.id,"page_type":"cart"}).subscribe(data => {
		 this.total = 0 ; 
			let userName = window.localStorage.getItem('userName');
			let userId = "";
			if(userName != null && userName != undefined){
			  this.service.getUserByUserName(userName).subscribe(data => {
				userId = data.result.id;
				this.service.getCartItem(data.result.id,'cart','').subscribe(data => {
				  //console.log(data.result.cartItems);
				  this.cartItems = data.result.cartItems;
				  for (let cart of data.result.cartItems) {
					this.total = this.total + cart.qty * cart.dbp;
				  }

				});
			  }).add(
				console.log("teardown")
			  );

			} 
	 });
 	

  }

  generateInvoice(){

    let userName = window.localStorage.getItem('userName');
     
    if(userName != null && userName != undefined)
	{
		
      this.service.getUserByUserName(userName).subscribe(data => 
	  {
       var  userId = parseInt(data.result.id);
			
		this.service.createOrder(userId).subscribe(dataP => 
		{		
			this.service.deleteCart(data.result.id,'cart').subscribe(data => 
			{
			  alert("Checkout complete");
			  this.router.navigate(['']);
			});
		
		});
      }).add(
        console.log("teardown shubham")
      );

    }

  }

}
