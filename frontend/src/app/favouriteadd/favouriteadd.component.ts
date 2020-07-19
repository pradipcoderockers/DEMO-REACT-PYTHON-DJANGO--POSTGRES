 import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Favouriteadd } from '../model/favouriteadd.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CatagoryService } from '../service/catagory.service';
 import { NgbModal,ModalDismissReasons, NgbModalRef,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  

@Component({
  selector: 'app-favouriteadd',
  templateUrl: './favouriteadd.component.html',
  styleUrls: ['./favouriteadd.component.css']
})
export class FavouriteaddComponent implements OnInit,OnDestroy  {

 dtOptions: DataTables.Settings = {};
  id: number;
   rootCatprohelp : String;
   favouriteList : Favouriteadd;
  loaded: boolean = false;
  productsloading: boolean = false;
  dtTrigger: Subject<Favouriteadd> = new Subject();
  loginuserName: string ;
  constructor(private router: Router,private route: ActivatedRoute, private service:CatagoryService , private modalService: NgbModal  ) { }
    closeResult: string;

  ngOnInit() {
		this.loginuserName = (window.localStorage.getItem('userName'))?window.localStorage.getItem('userName'):'';
		 this.dtOptions = {
		  pagingType: 'full_numbers',
		  pageLength: 20
		};
		this.loadpagedata();
		  
  }
  
  loadpagedata()
  {
	  this.productsloading = true;
		  this.service.getfavouriteById(this.loginuserName).subscribe(data => {
		  this.favouriteList = data.result;
		  this.loaded = true;
		  this.dtTrigger.next();
		   this.productsloading = false;
 		  });
  }
  openNalert()
  {
	  var person = prompt("Please enter your favourite name:", "");
	  if (person) 
	  {
		  
		 this.service.addfavouriteById(this.loginuserName,person).subscribe(data => {
			 this.favouriteList = data.result;
		 }); 
	  }  
	  
  }
  deletefvt(id)
  {
	  
	  var r = confirm("Are you sure?");
		if (r == true) {
		  this.service.deletefavouriteById(this.loginuserName,id).subscribe(data => {
			 this.favouriteList = data.result;
		 });  
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

}
