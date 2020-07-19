import { Component, OnInit, OnDestroy, Input, TemplateRef } from '@angular/core';
import { Product } from '../model/product.model';
import { Item } from '../model/item.model';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CatagoryService } from '../service/catagory.service';
import { NgbModal,ModalDismissReasons, NgbModalRef,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemModalComponent } from '../modal/item-modal/item-modal.component';
import { AddCartItemRequest } from '../model/add-cart-item-request.model';
//import { NgFlashMessageService } from 'ng-flash-messages';
import { Favouriteadd } from '../model/favouriteadd.model';



@Component({
  selector: 'app-assemblylist',
  templateUrl: './assemblylist.component.html',
  styleUrls: ['./assemblylist.component.css']
})
export class AssemblylistComponent implements OnInit {

   dtOptions: DataTables.Settings = {};
  ids: string;
  product: Product;
  items: Item[];
  userName = window.localStorage.getItem('userName');
  loaded: boolean = false;
  data: Item;
  dtTrigger: Subject<Item> = new Subject();
  favouriteList : Favouriteadd;
  selectedproductArray : {}; 
 successmsg : string;
  alertClass : string;  
  constructor(private router: Router,private route: ActivatedRoute, private service:CatagoryService,
    private modalService: NgbModal ) { }
	//, public ngFlashMessageService: NgFlashMessageService

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    

    this.route.params.subscribe(params => {
		var ids = '';
	  var multiAssembaly = (window.localStorage.getItem('multiAssembaly'))?JSON.parse(window.localStorage.getItem('multiAssembaly')):[];
	  multiAssembaly.map(function(onseas){
		  ids = ids +  onseas+",";
	  })
       this.ids = ids; 
      
 	 console.log(ids);
		var productlink  = "assembalylist";
	 
		
      this.service.getProductByIds(this.ids,productlink).subscribe(data => {
        
      this.product = data.result.products;
	  console.log( this.product);
       this.loaded = true;
      this.dtTrigger.next();
      //console.log(JSON.stringify(this.items  ));
      });
      // In a real app: dispatch action to load the details here.
   });
   
	var loginuserName = window.localStorage.getItem('userName')
		this.service.getfavouriteById(loginuserName).subscribe(data => {
			 
		  this.favouriteList = data.result;
		});
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  selectedprolist (item)
  {
	  this.selectedproductArray = item; 
  }
  
 
  closeResult: string;
  open(content,item:Item,namepro) {
    const modal: NgbModalRef =  this.modalService.open(ItemModalComponent);
	console.log(namepro);
	 
	modal.componentInstance.namepro = namepro;
    modal.componentInstance.item = item;
	
     modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  addToCart(item,type,fvrtid){
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
		cartReq.nameparicular = item.products.particuler;
		cartReq.fvrtid = (fvrtid)?fvrtid:'';
		
		
        this.service.addToCart(cartReq).subscribe(data => {
			type = (type=='fvrt')?"FAVOURITE":"Cart";
 			 document.getElementById("closebtn").click();
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
  }
  
  addToCartpro(item,type){
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
 			
	
	if (quntityp>0 ) 
	{
		let cartReq = new AddCartItemRequest();
		cartReq.itemId = item.id;
		cartReq.qty = parseInt(quntity);
		if(userName != null && userName != undefined){
		  this.service.getUserByUserName(userName).subscribe(data => {
			cartReq.userId = data.result.id;
			cartReq.page_type =type;
			cartReq.nameparicular = item.products.particuler;
			this.service.addToCart(cartReq).subscribe(data => {
				type = (type=='fvrt')?"FAVOURITE":"Cart";
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
		this.alertClass = "danger"; 
				this.successmsg = "Please enter quantity .";
				setTimeout(()=>{  
 this.successmsg = ''; }, 6000);
		 
	}
  }

  addToFav(item: Item){

    let userName = window.localStorage.getItem('userName');
      
  }



}
