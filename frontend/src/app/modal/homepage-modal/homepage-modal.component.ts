import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/model/order.model';
 import { CatagoryService } from 'src/app/service/catagory.service';
 


@Component({
  selector: 'app-homepage-modal',
  templateUrl: './homepage-modal.component.html',
  styleUrls: ['./homepage-modal.component.css']
})
export class HomepageModalComponent implements OnInit {
@Input() order: Order;
 loginuser = window.localStorage.getItem('userName');

  constructor(public activeModal: NgbActiveModal, private service:CatagoryService) {}

  ngOnInit() {
  }

}
