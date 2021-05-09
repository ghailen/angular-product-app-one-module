import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup: FormGroup;
submitted:boolean=false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productFormGroup = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSaveProduct() {
    this.submitted=true;
    if (this.productFormGroup.invalid) return;
    this.productService.saveProduct(this.productFormGroup.value).subscribe(data=>{
      alert("success saving product");
    });
  }

}
