import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/index";
import{environment } from "../../environments/environment";
import { ApiResponse } from '../model/api.response';
import { User } from '../model/user.model';
import { Item } from '../model/item.model';
import { AddCartItemRequest } from '../model/add-cart-item-request.model';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {
	
	topcat: [];

  deleteCart(id: any,type: any,): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl+"/cart/"+ id+"/"+type)
  }
  deleteCartItem(arg0: { "userId": number; "itemId": number; "page_type": string;}): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+"/cart/deleteItem", arg0);
  }
  
  addtoCartFvrtItem(arg0: { "userId": number; "itemId": number; "page_type": string;}): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+"/cart/addtoCartFvrtItem", arg0);
  }


  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+"/users/signup", user);
  }

  getUserByUserName(userName: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl +'/users/byName/'+ userName);
  }

    
 

  getAllRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl +'/role/getRoles');
  }
  

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl;
  baseUrln: string = environment.baseUrln;
  apiPath: string = '/category';

  createOrder(userId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrln +'/createorder/&userId='+userId );
  } 
  getAllCategories(): Observable<ApiResponse> {
    //console.log("Test");
    return this.http.get<ApiResponse>(this.baseUrl+this.apiPath+"/all");
  }
  getRootCategories(): Observable<ApiResponse> {
    //console.log("Test");
    return this.http.get<ApiResponse>( this.baseUrln+this.apiPath+"/root");
  }
  getOrderById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrln+"/orderlist/&id="+id );
  }
  getOrderByIdDetails(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrln+"/orderlistdetails/&id="+id );
  }
  
  
  
  getRootTopCategories(): Observable<ApiResponse> {
    //console.log("Test");
    return this.http.get<ApiResponse>( this.baseUrln+this.apiPath+"/roottop");
  }
  getRootTopLeafCategories(): Observable<ApiResponse> {
    //console.log("Test");
    return this.http.get<ApiResponse>( this.baseUrln+this.apiPath+"/roottopleaf");
  }
  brandsVihcleCategories(): Observable<ApiResponse> {
    //console.log("Test");
    return this.http.get<ApiResponse>( this.baseUrln+this.apiPath+"/brandsVihcleCategories");
  }
  modelsCategories(): Observable<ApiResponse> {
    //console.log("Test");
    return this.http.get<ApiResponse>( this.baseUrln+this.apiPath+"/modelsCategories");
  }

  getCategoryById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrln+this.apiPath+"/&id="+id+"&rootCat="+window.localStorage.getItem('RootCat')+"&secondlevelCatleaf="+window.localStorage.getItem('LEAFSPRING_secondlevelCat'));
  }

  getProductById(id: number,productlink): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrln+"/"+productlink+"/&id="+id+"&rootCat="+window.localStorage.getItem('RootCat')+"&secondlevelCat="+window.localStorage.getItem('secondlevelCat')+"&state="+window.localStorage.getItem('user_state'));
  }
  getProductByIds(ids: string,productlink): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrln+"/"+productlink+"/&ids="+ids+"&rootCat="+window.localStorage.getItem('RootCat')+"&secondlevelCat="+window.localStorage.getItem('secondlevelCat')+"&state="+window.localStorage.getItem('user_state'));
  }
   getfavouriteById(username: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrln+"/getfavouriteById/&username="+username);
  }
   addfavouriteById(username: string,textdata: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrln+"/addfavouriteById/&username="+username+"&textdata="+textdata,{username:username});
  }
  deletefavouriteById(username: string,id: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrln+"/deletefavouriteById/&username="+username+"&id="+id,{username:username});
  }
  
  

  getItemByCode(code: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"/item/byCode/"+code);
  }

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.baseUrl + '/token/generate-token', loginPayload);
  }

  uploadFile(data: FormData): Observable<HttpEvent<string>>{
    const uploadReq = new HttpRequest('POST', this.baseUrl+'/fileUpload/', data, {
      reportProgress: true,
  });
    return this.http.request(uploadReq);
  }

  addToCart(cartRequest : AddCartItemRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrln + '/cart/addItem', cartRequest);
  }

  getCartItem(userId,type,fvrtid): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+"/cart/"+userId+"/"+type+"/"+fvrtid);
  }
  

}
