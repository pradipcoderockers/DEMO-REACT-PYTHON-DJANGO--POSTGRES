import { Component, OnInit } from '@angular/core';
import { CatagoryService } from '../service/catagory.service';
import { CartItem } from '../model/cart-item.model';
import { Router } from '@angular/router';
import { Favouriteadd } from '../model/favouriteadd.model';


@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

   cartItems : CartItem[];
  cartTotal: number;
  total: number = 0;
  favouriteList : Favouriteadd;
  listdata :string; 
  constructor(private service:CatagoryService,private router: Router) { }

  ngOnInit() {
	window.localStorage.setItem('breadcrum','');
	this.service.topcat= (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
    this.loadpagedata('');
		 var loginuserName = window.localStorage.getItem('userName')
		this.service.getfavouriteById(loginuserName).subscribe(data => {
			 
		  this.favouriteList = data.result;
		});
    
  }
  loadpagedata (fvrtid) 
  {
	let userName = window.localStorage.getItem('userName');
    let userId = "";
    if(userName != null && userName != undefined){
      this.service.getUserByUserName(userName).subscribe(data => {
        userId = data.result.id;
        this.service.getCartItem(data.result.id,'fvrt',fvrtid).subscribe(data => {
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
     this.service.deleteCartItem({"userId": cartItem.userId,"itemId": cartItem.id,"page_type":"fvrt"}).subscribe();
  }
  addtoCartFvrt(cartItem : CartItem){
    let index = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(index,1);
    console.log(cartItem);
     this.service.addtoCartFvrtItem({"userId": cartItem.userId,"itemId": cartItem.id,"page_type":"fvrt"}).subscribe();
  }
  

  generateInvoice(){

    let userName = window.localStorage.getItem('userName');
    let userId = "";
    if(userName != null && userName != undefined){
      this.service.getUserByUserName(userName).subscribe(data => {
        userId = data.result.id;
        this.service.deleteCart(data.result.id,'fvrt').subscribe(data => {
          //console.log(data.result.cartItems);
          alert("Checkout complete");
          this.router.navigate(['']);
        });
      }).add(
        console.log("teardown")
      );

    }

  }


}
