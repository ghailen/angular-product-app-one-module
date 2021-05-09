import { ProductService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId: number;
  submitted: boolean = false;
  productFormGroup?: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private ProductService: ProductService) {
    this.productId = activatedRoute.snapshot.params.id;

  }

  ngOnInit(): void {
    this.ProductService.getProducts(this.productId).subscribe(data => {
      this.productFormGroup= this.fb.group({
        id: [{value: data.id, disabled: true},Validators.required],
        name: [data.name, Validators.required],
        price: [data.price, Validators.required],
        quantity: [data.quantity, Validators.required],
        selected: [data.selected, Validators.required],
        available: [data.available, Validators.required]
      });
    })
  }


  onUpdateProduct() {
    this.ProductService.updateProducts(this.productFormGroup?.value).subscribe(data => {
      alert("Success Product Updated");
    });

  }
}


