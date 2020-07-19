import { Product } from './product.model';

export class Category {
id:number;    
longDesc: string;
name: string;
code: string;
shortDesc: string;
largeImgAltText: string;
largeImgName: string;
largeImgUrl: string;
smallImgAltText: string;
smallImgLang: string;
smallImgName: string;
smallImgType: number;
flagpro: number;
smallImgUrl: string;
savesecondlevel:number;
categories: Array<Category>;
products: Array<Product>;
}
