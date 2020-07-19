import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
 import { Router, ActivatedRoute } from '@angular/router';
import { CatagoryService } from '../service/catagory.service';
  import { NgbModal,ModalDismissReasons, NgbModalRef,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCartItemRequest } from '../model/add-cart-item-request.model';
import { Order } from '../model/order.model';
import { OrderModalComponent } from '../modal/order-modal/order-modal.component';

import { ItemModalComponent } from '../modal/item-modal/item-modal.component';
import { Item } from '../model/item.model';

 
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,OnDestroy   {

dtOptions: DataTables.Settings = {};
  id: number;
  orderList: Order;
  rootCatprohelp : String;
  loaded: boolean = false;
  productsloading: boolean = false;
  dtTrigger: Subject<Order> = new Subject();
  userName: String ;
   constructor(private router: Router,private route: ActivatedRoute, private service:CatagoryService , private modalService: NgbModal  ) { }
   closeResult: string;
  ngOnInit() 
  {
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20
    };
	window.localStorage.setItem('breadcrum','');
	this.service.topcat= (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
	
      var userName = (window.localStorage.getItem('userName'))?window.localStorage.getItem('userName'):'';
		
	  if(userName)
	  {
		  this.loaded = true;
		  this.productsloading = true;
		  this.service.getUserByUserName(userName).subscribe(data => {
			  this.service.getOrderById(data.result.id).subscribe(data => {   
				  this.orderList = data.result;
  				  this.productsloading = false;
				  this.dtTrigger.next();
			  });
		 });

	 }
   }

  openN(content,Order:Order) 
  {
			this.productsloading = true;
	  this.service.getOrderByIdDetails(Order.orderid).subscribe(data => {
		  	this.productsloading = false;
			const modal: NgbModalRef =  this.modalService.open(OrderModalComponent);
 			Order.orderlist = data.result;
			console.log(Order)
 			modal.componentInstance.Order = Order;
 			modal.result.then((result) => {
			  this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
			  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  }


