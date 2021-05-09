import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from "rxjs";
import { Product } from "../components/model/product.model";
//Injectable => c'est service , providedIn:"root" => utilisert dans tous le projet
@Injectable({providedIn:"root"})
export class ProductService {
constructor(private http:HttpClient){
}


getAllProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products")
}


getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?selected=true")
}

getAvailabeProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?available=true")
}

searchProducts(keyword:string):Observable<Product[]>{
  let host=environment.host;
  return this.http.get<Product[]>(host+"/products?name_like="+keyword)
}

select(product:Product):Observable<Product>{
  let host=environment.host;
  product.selected=!product.selected;
  return this.http.put<Product>(host+"/products/"+product.id,product)
}

deletProduct(product:Product):Observable<void>{
  let host=environment.host;
  return this.http.delete<void>(host+"/products/"+product.id)
}

saveProduct(product:Product):Observable<void>{
  let host=environment.host;
  return this.http.post<void>(host+"/products/",product)
}


getProducts(id:number):Observable<Product>{
  let host=environment.host;
  return this.http.get<Product>(host+"/products/"+id)
}

updateProducts(product:Product):Observable<Product>{
  let host=environment.host;
  return this.http.put<Product>(host+"/products/"+product.id,product)
}

}
