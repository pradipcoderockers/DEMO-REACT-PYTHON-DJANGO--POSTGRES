import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatagoryService } from '../service/catagory.service';
import { Category } from '../model/catagory.model';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HomepageModalComponent  } from '../modal/homepage-modal/homepage-modal.component';
  import { NgbModal,ModalDismissReasons, NgbModalRef,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig] 
})


export class HomeComponent implements OnInit,OnDestroy  {

  constructor(private catagoryService: CatagoryService,private router: Router,config: NgbCarouselConfig, private modalService: NgbModal ,private service:CatagoryService ) {

    config.interval = 1000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
   }
   closeResult: string;

  images = ['../../assets/images/slider-1.jpg', '../../assets/images/slider-2.jpg', '../../assets/images/slider-3.jpg']
 categories : Category[];
 segment : Category;
 segments: Category[];
 brands: Category[];
 models: Category[];
  brandsvihcle :  Category[];
  dtTrigger: Subject<Category> = new Subject();


  ngOnInit() {
	  window.localStorage.setItem('RootCat','');
  	window.localStorage.setItem('breadcrum','');
	this.service.topcat= (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
	
    this.loadCategory();
	this.openN() ;
  }

  configSwipe: SwiperOptions = {
    autoplay: 3000, // Autoplay option having value in milliseconds
    initialSlide: 3, // Slide Index Starting from 0
    slidesPerView: 3, // Slides Visible in Single View Default is 1
    pagination: '.swiper-pagination', // Pagination Class defined
    paginationClickable: true, // Making pagination dots clicable
    nextButton: '.swiper-button-next', // Class for next button
    prevButton: '.swiper-button-prev', // Class for prev button
    spaceBetween: 30 // Space between each Item
  };

  loadCategory(){
   this.catagoryService.getRootTopCategories().subscribe(data => {
    this.categories = data.result;
    });
	
	this.catagoryService.getRootTopLeafCategories().subscribe(data => {
    this.segments = data.result;
    });
	this.catagoryService.brandsVihcleCategories().subscribe(data => {
    this.models  = data.result;
    });
	
	this.catagoryService.modelsCategories().subscribe(data => {
    this.brandsvihcle = data.result;
    });
	
  }

  openSubCat(event, cat: Category,type){
	  if(type=='pro')
	  {
	   window.localStorage.setItem('RootCat','LEAF SPRING');
	   window.localStorage.setItem('RootCatlavel','1');
	   window.localStorage.setItem('LEAFSPRING_secondlevelCat','MEDIUM/ HEAVY COMMERCIAL VEHICLE');
	   
		var breadcrumPX = [{"id":"12","name":"LEAF SPRING"},{"id":"22","name":"HEAVY PARABOLIC VEHICLE"}];
			var breadcrumNPX = breadcrumPX;
			var Dataext = false;
			if(breadcrumNPX.length>0)
			{
				breadcrumNPX.map(function (pbread){
					 
					if(pbread.id == cat.id.toString())
					{
						Dataext = true;	
					}
				});
			}
			if(!Dataext)
			{
				breadcrumNPX.push({'id':cat.id.toString() ,'name':cat.name });			
				var breadcrumP = JSON.stringify(breadcrumNPX );
				window.localStorage.setItem('breadcrum',breadcrumP);
			}
			this.service.topcat= (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
			
	  }else{
		 window.localStorage.setItem('RootCat',cat.name);
	    window.localStorage.setItem('RootCatlavel','1'); 
	  }

    if(cat.id){

			var breadcrum = window.localStorage.getItem('breadcrum');
			var breadcrumN = (breadcrum)?JSON.parse(breadcrum):[];
			var Dataext = false;
			if(breadcrumN.length>0)
			{
				breadcrumN.map(function (pbread){
					if(pbread.id==cat.id)
					{
						Dataext = true;	
					}
				});
			}
			if(!Dataext)
			{
				breadcrumN.push({'id':cat.id ,'name':cat.name,'savesecondlevel':cat.savesecondlevel });			
				breadcrum = JSON.stringify(breadcrumN );
				window.localStorage.setItem('breadcrum',breadcrum);
			}
			
			this.router.navigate(['category',cat.id]);
			
    }else{
      console.log(JSON.stringify(cat));
      this.router.navigate(['products',cat.id]);
    }
    
    //
  }
  
  openpros(event, cat: Category){
	   window.localStorage.setItem('RootCat','LEAF SPRING');
	   window.localStorage.setItem('RootCatlavel','1');

     
      console.log(JSON.stringify(cat));
      this.router.navigate(['products',cat.id]);
    
    //
  }
  
  openN() 
  {
 	var userName = (window.localStorage.getItem('userName'))?window.localStorage.getItem('userName'):'';

		if(!userName)
		{
	  
 			const modal: NgbModalRef =  this.modalService.open(HomepageModalComponent);
  			modal.componentInstance.customer = [];
 			modal.result.then((result) => {
			  this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
			  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
