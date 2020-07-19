import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ItemComponent } from './item/item.component';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { LogoutComponent } from './logout/logout.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CartComponent } from './cart/cart.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrderComponent } from './order/order.component';
import { FavouriteaddComponent } from './favouriteadd/favouriteadd.component';
import { AssemblylistComponent } from './assemblylist/assemblylist.component';





const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'products-signle/:id', component: ProductComponent,data:[{idp:'pro'}] },
  { path: 'item/:id', component: ItemComponent },
  { path: 'item-signle/:id', component: ItemComponent,data:[{idp:'item'}] },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'createProfile', component: CreateUserComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'cart', component: CartComponent },
  { path: 'fave', component: FavouriteComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'order', component: OrderComponent },
  { path: 'favouriteadd', component: FavouriteaddComponent },
  { path: 'assembalylist', component: AssemblylistComponent },


];

export const routing = RouterModule.forRoot(routes);
