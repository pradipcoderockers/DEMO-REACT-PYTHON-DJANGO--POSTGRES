import { Component, OnInit } from '@angular/core';
import { CatagoryService } from '../service/catagory.service';
import { Category } from '../model/catagory.model';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Item } from '../model/item.model';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public catagoryService: CatagoryService,public router: Router,private _location: Location) { }


 categories : Category[];
 segments: Category[];
 brands :  Category[];
 models :  Category[];
 selectedCategory: Category;
 selectedSegment : Category;
 selectedBrand : Category;
 selectedModel: Category;
 searchPartCode: string;
 product :Category[];
 items: Item[];
 loginuser: boolean = false;
 slist = '';

  ngOnInit() {
	  this.loginuser = (window.localStorage.getItem('userName'))?true:false;
	  this.catagoryService.topcat = (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
    this.loadCategory();
  }

  loadCategory(){
   this.catagoryService.getRootTopCategories().subscribe(data => {
    this.categories = data.result;
	this.catagoryService.topcat = (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];;	 
   });
  }

  backClicked() {
	
	var breadcrum = window.localStorage.getItem('breadcrum');
	var breadcrumNPP = (breadcrum)?JSON.parse(breadcrum):[];
	var breadcrumNPPNew = (breadcrum)?JSON.parse(breadcrum):[];
	var Dataext = false;
	var cnt = 0; 
	var cnthold = 0; 
	
	
	
	if(breadcrumNPP.length>0)
	{
 		
 		 breadcrumNPP.splice(-1,1); 
		 var breadcrum = JSON.stringify(breadcrumNPP );
		 window.localStorage.setItem('breadcrum',breadcrum );
		 this.catagoryService.topcat  = (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
		 
		 var backbt = parseInt(breadcrumNPPNew.length)-1  ;
		 console.log(breadcrumNPPNew[backbt],backbt);
		 
		if((window.localStorage.getItem('RootCat')=="LIFT AXLE COMPONENTS" || window.localStorage.getItem('RootCat')=="TRAILER SUSPENSION" ) && breadcrumNPPNew[backbt].savesecondlevel==3)
		{
			window.localStorage.setItem('secondlevelCat',breadcrumNPPNew[backbt-1].name);
			window.localStorage.setItem('RootCatlavel','1')
		}
		else if(window.localStorage.getItem('RootCat')=="LEAF SPRING ALLIED" && breadcrumNPPNew[backbt].savesecondlevel==2)
		{
			window.localStorage.setItem('secondlevelCat',breadcrumNPPNew[backbt-1].name);
		}
		else if(window.localStorage.getItem('RootCat')=="LEAF SPRING" && breadcrumNPPNew[backbt].savesecondlevel==2)
		{
			window.localStorage.setItem('LEAFSPRING_secondlevelCat',breadcrumNPPNew[backbt-1].name);
		}
		
		
		var RootCatlavel = window.localStorage.getItem('RootCatlavel') ;
 		 if(breadcrumNPPNew[backbt].typeP=='pro' )
		 {
			 this.router.navigate(['/products',breadcrumNPPNew[backbt].id]); 
		 }else
		 {
			 if( RootCatlavel == "1" || RootCatlavel == "2" || RootCatlavel == "3")
			 {
				 if(backbt == 0)
				 {
					this.router.navigate(['/']);  	  	 
				 }
				 else
				 {
					 
					this.router.navigate(['/category',breadcrumNPPNew[backbt-1].id]); 
				 }
			 }
			 else
			 {
				 
				this.router.navigate(['/category',breadcrumNPPNew[backbt].id]); 
			 }
		 }
	}else
	{
		this.router.navigate(['/']);  	
	}
 	 	
    //this._location.back();
  }

  forwardClicked() {	 
   // this._location.forward();
   
   
  }

 openSubCatBrud(event, cat){
		
	if(cat.name=="LEAF SPRING" || cat.name=="LEAF SPRING ALLIED" || cat.name=="LIFT AXLE COMPONENTS" || cat.name=="TRAILER SUSPENSION" || cat.name=="TRAILER SPD")
	{		
		window.localStorage.setItem('RootCat',cat.name);
		window.localStorage.setItem('RootCatlavel',"1");
	}
	
 	var breadcrumN = [];		
	if(window.localStorage.getItem('RootCat')=="LEAF SPRING ALLIED")
	{
		window.localStorage.setItem('RootCatlavel',"2");
	}
	
	var breadcrum = window.localStorage.getItem('breadcrum');
	var breadcrumNPP = (breadcrum)?JSON.parse(breadcrum):[];
	var Dataext = false;
	var cnt = 0; 
	var cnthold = 0; 
 
	if(breadcrumNPP.length>0)
	{
		breadcrumNPP.map(function (pbread){

			if(pbread.id==cat.id)
			{
				Dataext = true;	
				cnthold = cnt; 
			}
			cnt ++;
		});
	}
 	if(Dataext)
	{
		var breadcrumNP = [];
		cnt = 0; 
		breadcrumNPP.map(function (pbread){

			if(cnt <= cnthold)
			{
				breadcrumNP.push(pbread);
			}
			cnt ++;
		});
		
		breadcrum = JSON.stringify(breadcrumNP );
		window.localStorage.setItem('breadcrum',breadcrum);
	}
			
	if(cat.typeP && cat.typeP=='pro') 
	{
		this.router.navigate(['item',cat.id]);  
	}else
	{
		this.router.navigate(['category',cat.id]);  
	}
	 
    
   this.catagoryService.topcat = (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];;
    
  }

  openSubCat(event, cat: Category){
		
	window.localStorage.setItem('RootCat',cat.name);
	window.localStorage.setItem('RootCatlavel',"1");
	 
 	var breadcrumN = [];
	breadcrumN.push({'id':cat.id,'name':cat.name,'savesecondlevel':cat.savesecondlevel});
	var breadcrum = JSON.stringify(breadcrumN );
	window.localStorage.setItem('breadcrum',breadcrum);
			
	if(window.localStorage.getItem('RootCat')=="LEAF SPRING ALLIED")
	{
		window.localStorage.setItem('RootCatlavel',"2");
	}
   this.router.navigate(['category',cat.id]);   
   this.catagoryService.topcat = (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];;
    
  }

  searchCategory(){
 	  window.localStorage.setItem('RootCat',this.selectedCategory.name);
	   window.localStorage.setItem('RootCatlavel',"1");
	   var breadcrumN = [];
	
	breadcrumN.push({'id':this.selectedCategory.id,'name':this.selectedCategory.name,'savesecondlevel':this.selectedCategory.savesecondlevel});
	var breadcrum = JSON.stringify(breadcrumN );
	window.localStorage.setItem('breadcrum',breadcrum);
	
	
		if(window.localStorage.getItem('RootCat')=="LEAF SPRING ALLIED")
		{
			window.localStorage.setItem('RootCatlavel',"2");
		}
	  this.catagoryService.getCategoryById(this.selectedCategory.id).subscribe(data => {
		this.segments = data.result.subcat;
		this.router.navigate(['category',this.selectedCategory.id]);
	});
	this.catagoryService.topcat = (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];;	
  }

  searchSegment(){

	if(window.localStorage.getItem('RootCat')=="LEAF SPRING ALLIED")
		{
			window.localStorage.setItem('secondlevelCat',this.selectedSegment.name);
		}
		var pct=this.selectedSegment.id;
 	this.catagoryService.getCategoryById(this.selectedSegment.id).subscribe(data => {
		this.brands  = data.result.subcat;
		
		if(data.result.subcat){
			
			var breadcrum = window.localStorage.getItem('breadcrum');
			var breadcrumN = (breadcrum)?JSON.parse(breadcrum):[];
			var Dataext = false;
			if(breadcrumN.length>0)
			{
				breadcrumN.map(function (pbread){
					if(pbread.id == pct)
					{
						Dataext = true;	
					}
				});
			}
			if(!Dataext)
			{
				breadcrumN.push({'id':this.selectedSegment.id ,'name':this.selectedSegment.name ,'savesecondlevel':this.selectedSegment.savesecondlevel});			
				breadcrum = JSON.stringify(breadcrumN );
				window.localStorage.setItem('breadcrum',breadcrum);
			}
			
			this.catagoryService.topcat  = (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];

		  this.router.navigate(['category',this.selectedSegment.id]);
		 }else{
		  this.router.navigate(['products',this.selectedSegment.id]);
		 } 
	});  
	
	

   
  }


  searchBrand(){
	  
	  this.catagoryService.getCategoryById(this.selectedBrand.id).subscribe(data => 
	  {
		if(window.localStorage.getItem('RootCat')=="LEAF SPRING")
		{  
			this.models  = data.result.products;
		}
		if(window.localStorage.getItem('RootCat')=="LIFT AXLE COMPONENTS"  )
		{  
			this.models  = [];
			//alert(this.selectedBrand.name);
			window.localStorage.setItem('secondlevelCat',this.selectedBrand.name);
			 
		}
		if(window.localStorage.getItem('RootCat')=="TRAILER SUSPENSION"  )
		{  
			
			window.localStorage.setItem('secondlevelCat',this.selectedBrand.name);
			this.models  = data.result.subcat;
			 
			 
		}
		if(data.result.categories && window.localStorage.getItem('RootCat')!="LIFT AXLE COMPONENTS" ){
		  this.router.navigate(['category',this.selectedBrand.id]);
		 }else{
		  this.router.navigate(['products',this.selectedBrand.id]);
		 } 
	});  
  }

  searchModel(){
    
 
	  if(window.localStorage.getItem('RootCat')=="TRAILER SUSPENSION"  )
		{  
			
			window.localStorage.setItem('secondlevelCat',this.selectedModel.name);
			 
			 
		}
				this.router.navigate(['products',this.selectedModel.id]);

			 
      
  }

  searchByPartCode(){
	 

    this.catagoryService.getItemByCode(this.searchPartCode).subscribe(data => {
	  this.catagoryService.topcat = [];
      this.items = data.result;
		if(data.type == "item" && data.status==1)
		{
			//window.localStorage.setItem('secondlevelCat',data.result[0].catnamep);
		    window.localStorage.setItem('RootCat',"LEAF SPRING");	
			this.router.navigate(['item-signle',data.result[0].id]);
		}
		else
		{
			if(data.status==1)
			{
				window.localStorage.setItem('secondlevelCat',data.result[0].catnamep);
				window.localStorage.setItem('RootCat',data.result[0].comefrom);			 
				this.router.navigate(['products-signle',data.result[0].id]);
			}
			else
			{
				alert("Opps! No Data Found with this code"); 
			}
		}
		 
		
  
     });
  }
    
  resetSearch(){
    this.selectedCategory=null;
    this.selectedSegment = null;
    this.selectedBrand = null;
    this.selectedModel = null;
    this.router.navigate(['']);
	this.catagoryService.topcat  = (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
  }
   selectChange( $event) {
    //In my case $event come with a id value
 	window.localStorage.setItem('user_state',$event);
  }
  someMethod(event:any){
   if(event.keyCode == 13){
      this.searchByPartCode();
   }else{
   }
}

}
