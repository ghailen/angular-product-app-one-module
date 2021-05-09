
import { HttpClient } from '@angular/common/http';
import { Product } from './../model/product.model';
import { AppDataState, DataStateEnum } from './../../state/product.state';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/products.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products$:Observable<AppDataState<Product[]>> | null=null;
readonly DataStateEnum=DataStateEnum;

  constructor(private productsService: ProductService,private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$= this.productsService.getAllProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  onGetSelectedProducts(){
    this.products$= this.productsService.getSelectedProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  onGetAvailableProducts(){
    this.products$= this.productsService.getAvailabeProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSearch(dataForm:any){
    this.products$= this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSelect(p :Product){
    this.productsService.select(p).subscribe(data=>{
      p.selected=data.selected

    })

  }

  onDelete(p :Product){
    let v=confirm("etes vous sure ?");
    if (v==true)
    this.productsService.deletProduct(p).subscribe(data=>{
   this.onGetAllProducts();
    })

  }



  onNewProduct(){
    this.router.navigateByUrl("/newProduct");

  }

  onEdit(p: Product){
    this.router.navigateByUrl("/editProduct/"+p.id);

  }
}
