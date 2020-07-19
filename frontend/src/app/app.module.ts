import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { routing } from './app.routing';
import { DataTablesModule } from 'angular-datatables';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ItemModalComponent } from './modal/item-modal/item-modal.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { LogoutComponent } from './logout/logout.component';
import {TokenInterceptor} from "./service/interceptor";
import { FileUploadComponent } from './file-upload/file-upload.component';
import {FileUploadModule ,FileDropDirective, FileSelectDirective} from "ng2-file-upload";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserComponent } from './create-user/create-user.component';
import { CartComponent } from './cart/cart.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SwiperModule } from 'angular2-useful-swiper';
import { OrderComponent } from './order/order.component';
import { OrderModalComponent } from './modal/order-modal/order-modal.component';
import { HomepageModalComponent } from './modal/homepage-modal/homepage-modal.component';
import { FavouriteaddComponent } from './favouriteadd/favouriteadd.component';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { AssemblylistComponent } from './assemblylist/assemblylist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    ItemComponent,
    LoginComponent,
    CategoryComponent,
    BreadcrumComponent,
    ItemModalComponent,
    SearchComponent,
    ProfileComponent,
    EditprofileComponent,
    LogoutComponent,
    FileUploadComponent,
    CreateUserComponent,
    CartComponent,
    FavouriteComponent,
    UserProfileComponent,
	OrderComponent,
	OrderModalComponent,
	HomepageModalComponent,
	FavouriteaddComponent,
	AssemblylistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    SwiperModule,
	NgFlashMessagesModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent,
    ItemModalComponent,OrderModalComponent,HomepageModalComponent]
})
export class AppModule { }
