import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Person } from '../model/person.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CatagoryService } from '../service/catagory.service';
import { Category } from '../model/catagory.model';
import { Product } from '../model/product.model';
import { ItemModalComponent } from '../modal/item-modal/item-modal.component';
import { Item } from '../model/item.model';
import { NgbModal,ModalDismissReasons, NgbModalRef,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCartItemRequest } from '../model/add-cart-item-request.model';
import { Favouriteadd } from '../model/favouriteadd.model';
//import { NgFlashMessageService } from 'ng-flash-messages';
// var $ = require('jquery');
//  var dt = require('datatables.net');
// declare var $;

 

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy  {
  dtOptions: DataTables.Settings = {};
  id: number;
  category: Category;
  rootCatprohelp : String;
  products: Product[];
  loaded: boolean = false;
  productsloading: boolean = false;
  dtTrigger: Subject<Product> = new Subject();
  loginuser: boolean = false;
  favouriteList : Favouriteadd;
  successmsg : string;
  alertClass : string;          
  selectedproductArray : {}; 
  constructor(private router: Router,private route: ActivatedRoute, private service:CatagoryService , private modalService: NgbModal  ) { }
  //, private ngFlashMessageService: NgFlashMessageService
  transform(value) {
        var p =  value.split('_');
		 return  p[1]?p[1]:p[0];
    }
	
  ngOnInit(): void {
	 this.loginuser = (window.localStorage.getItem('userName'))?true:false;
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20
    };
	this.rootCatprohelp = window.localStorage.getItem('RootCat');
		
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
     // console.log("In side sub folder ");
     // console.log(this.id);
		var productlink  = "";
		if(this.route.snapshot.data[0])
	{
		 productlink  = "productSignle";

	}else
	{
		productlink  = "product";
	}
	
		
	 this.productsloading = true;
      this.service.getProductById(this.id,productlink).subscribe(data => {
         
      this.category = data.result;
      this.products = this.category.products;
	  console.log(this.products,"sdddddd",params)
      this.loaded = true;
      this.dtTrigger.next();
	   this.productsloading = false;
      console.log(JSON.stringify(this.products  ));
      });
	  
        var loginuserName = window.localStorage.getItem('userName')
		this.service.getfavouriteById(loginuserName).subscribe(data => {
			 
		  this.favouriteList = data.result;
		});
      // In a real app: dispatch action to load the details here.
   });
   
  }
    closeResult: string;

  openN(content,item:Item) {
    const modal: NgbModalRef =  this.modalService.open(ItemModalComponent);
	console.log(item,"sddsds",window.localStorage.getItem('RootCat'))

    modal.componentInstance.item = item;
		

    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  addToCartpro(item: Item,type,pro,fvrtid){
	
	let userName = window.localStorage.getItem('userName');
	if(!userName){
		this.alertClass = "info"; 
				this.successmsg = "User not logged in. Please login to continue.";
				setTimeout(()=>{  
 this.successmsg = ''; }, 6000);
		return false;
	}

 var quntity = prompt("Please enter quantity :", "1");
 var quntityp = parseInt(quntity);
   if (quntityp>0) {
			
	   let cartReq = new AddCartItemRequest();
		
		cartReq.itemId = item.id;
		cartReq.qty = parseInt(quntity);;
		if(userName != null && userName != undefined){
		  this.service.getUserByUserName(userName).subscribe(data => {
			cartReq.userId = data.result.id;
			cartReq.page_type =type;
			cartReq.pro = (pro)?pro:'';
			cartReq.fvrtid = (fvrtid)?fvrtid:'';

			this.service.addToCart(cartReq).subscribe(data => {
				type = (type=='fvrt')?"FAVOURITE":"Cart";
				 document.getElementById("closebtn").click();
 				 
				 //alert("Added to "+type);
				this.alertClass = "success"; 
				this.successmsg = "Added to "+type;
				setTimeout(()=>{  
 this.successmsg = ''; }, 6000);
				  
				
			});	
		  });
		}else{
		 this.alertClass = "info"; 
				this.successmsg = "User not logged in. Please login to continue.";
				setTimeout(()=>{  
 this.successmsg = ''; }, 6000);
		}
	}else
	{
		//alert("Please enter quantity .");
				this.alertClass = "danger"; 
				this.successmsg = "Please enter quantity .";
				setTimeout(()=>{  
 this.successmsg = ''; }, 6000);
	}
	
  }
   
  
  selectedprolist (item: Item)
  {
	  this.selectedproductArray = item; 
  }
  
  addToCart(item: Item,type,pro){

   let cartReq = new AddCartItemRequest();
    let userName = window.localStorage.getItem('userName');
    cartReq.itemId = item.id;
    cartReq.qty = 1;
 	if(!userName){
		 
				this.alertClass = "info"; 
				this.successmsg = "User not logged in. Please login to continue.";
				setTimeout(()=>{  
 this.successmsg = ''; }, 6000);
		return false;
	}
	
    if(userName != null && userName != undefined){
      this.service.getUserByUserName(userName).subscribe(data => {
        cartReq.userId = data.result.id;
		cartReq.page_type =type;
		cartReq.pro = (pro)?pro:'';

        this.service.addToCart(cartReq).subscribe(data => {
			type = (type=='fvrt')?"FAVOURITE":"Cart";
			this.alertClass = "success"; 
				this.successmsg = "Added to "+type;
				setTimeout(()=>{  
 this.successmsg = ''; }, 6000);
			 
		});	
      });
    }else{
      alert("User not logged in. Please login to continue.");
    }
	
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  createbreadcrumpro(product)
  {
	  var breadcrum = window.localStorage.getItem('breadcrum');
		var breadcrumN = (breadcrum)?JSON.parse(breadcrum):[];
		var Dataext = false;
		 
			breadcrumN.push({'id':product.id.toString() ,'name':product.code,'typeP':'pro','savesecondlevel':product.savesecondlevel });			
			breadcrum = JSON.stringify(breadcrumN );
			window.localStorage.setItem('breadcrum',breadcrum);
			this.service.topcat= (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
  }

 

}
