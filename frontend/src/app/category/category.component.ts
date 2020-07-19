import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatagoryService } from '../service/catagory.service';
import { Category } from '../model/catagory.model';
  

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, public service:CatagoryService ) { }

  id: number;
  category: Category;
  categories: Category[];
  subcategories :  Category[]; 
  innerproductslenth :number;
  subcategoriesloading: boolean = false;
  saveproidAssem :[]; 
  leafspringcheck : string;
  ngOnInit() {
	window.localStorage.removeItem('multiAssembaly');
	this.leafspringcheck = window.localStorage.getItem('RootCat');
	this.service.topcat= (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
     // console.log("In side sub folder ");
     // console.log(this.id);
	  this.subcategoriesloading = true; 
	  
      this.service.getCategoryById(this.id).subscribe(data => {
         
      this.category = data.result
      this.categories = this.category.categories;
	  this.subcategories = (data.result.subcat && data.result.subcat.length>0)?data.result.subcat:[];
	  this.innerproductslenth = (data.result.products)?data.result.products.length:0;
 	  if(this.innerproductslenth>0)
	  { 	
		this.subcategories = data.result.products;
			//alert("fdfdfd");
		  //console.log("xcv"+this.innerproductslenth); 
		  //this.router.navigate(['products',this.category.categories[0].id]);
	  }	  
     // console.log(JSON.stringify(this.innerproducts));
	 this.subcategoriesloading = false; 
      });
      // In a real app: dispatch action to load the details here.
   });
   }

	
  openSubCat(event, cat: Category){
    event.preventDefault();
	console.log(cat);
     if(cat && !cat.flagpro)
	 {
			 
		if((window.localStorage.getItem('RootCat')=="LIFT AXLE COMPONENTS" || window.localStorage.getItem('RootCat')=="TRAILER SUSPENSION" ) && cat.savesecondlevel==3)
		{
			window.localStorage.setItem('secondlevelCat',cat.name);
			window.localStorage.setItem('RootCatlavel','3')
		}
		else if(window.localStorage.getItem('RootCat')=="LEAF SPRING ALLIED" && cat.savesecondlevel==2)
		{
			window.localStorage.setItem('secondlevelCat',cat.name);
		}
		else if(window.localStorage.getItem('RootCat')=="LEAF SPRING" && cat.savesecondlevel==2)
		{
			window.localStorage.setItem('LEAFSPRING_secondlevelCat',cat.name);
		}
		
		var breadcrum = window.localStorage.getItem('breadcrum');
			var breadcrumN = (breadcrum)?JSON.parse(breadcrum):[];
			var Dataext = false;
			if(breadcrumN.length>0)
			{
				breadcrumN.map(function (pbread){
					if(pbread.id==cat.id.toString())
					{
						Dataext = true;	
					}
				});
			}
			if(!Dataext)
			{
				breadcrumN.push({'id':cat.id.toString() ,'name':cat.name,'savesecondlevel':cat.savesecondlevel  });			
				breadcrum = JSON.stringify(breadcrumN );
				window.localStorage.setItem('breadcrum',breadcrum);
			}
			this.service.topcat= (window.localStorage.getItem('breadcrum'))?JSON.parse(window.localStorage.getItem('breadcrum')):[];
			 
		if( (window.localStorage.getItem('RootCat')=="LIFT AXLE COMPONENTS" || window.localStorage.getItem('RootCat')=="TRAILER SUSPENSION" ) && window.localStorage.getItem('RootCatlavel')=='3')
		{
			 this.router.navigate(['products',cat.id]);
		}
		else if(window.localStorage.getItem('RootCat')=="LEAF SPRING ALLIED" && cat.savesecondlevel==2)
		{
			this.router.navigate(['products',cat.id]);
		}
		else
		{	
			if((window.localStorage.getItem('RootCat')=="LIFT AXLE COMPONENTS" || window.localStorage.getItem('RootCat')=="TRAILER SUSPENSION" ) &&  cat.savesecondlevel==3)
			{
				window.localStorage.setItem('RootCatlavel',cat.savesecondlevel.toString());
			}
			
			
			
			this.router.navigate(['category',cat.id]);
		}
		
	}else{
     // console.log(JSON.stringify(cat));
      this.router.navigate(['products',cat.id]);
    }
    
    //
  }

 valuesaveAssembely (id)
 {
	var multiAssembaly = (window.localStorage.getItem('multiAssembaly'))?JSON.parse(window.localStorage.getItem('multiAssembaly')):[];
		
	var index = multiAssembaly.indexOf(id);
    if (index > -1) {
       multiAssembaly.splice(index, 1);
    }else
	{
		multiAssembaly.push(id);
	}
	window.localStorage.setItem('multiAssembaly',JSON.stringify(multiAssembaly));
 }

	getAssmbly()
	{
		var multiAssembaly = (window.localStorage.getItem('multiAssembaly'))?JSON.parse(window.localStorage.getItem('multiAssembaly')):[];
		if(multiAssembaly.length==0)
		{
			alert("Seems Like you have not select any of ");
		}else
		{
			this.router.navigate(['assembalylist']);
		}
	}
}
