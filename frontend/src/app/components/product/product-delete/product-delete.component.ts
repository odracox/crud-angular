import { ActivatedRoute } from '@angular/router';
import { Product } from './../product.model';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private route : ActivatedRoute
  ) {}


  ngOnInit(): void {

    var strId = this.route.snapshot.paramMap.get('id')
    var id = parseInt(strId)

    this.productService.readById(id).subscribe((product) => {
       this.product = product;
     });
  }


  deleteBtnEventHandler():void {

    this.productService.delete(this.product.id).subscribe( () => {

      this.productService.showMsg('Product Deleted !')
      this.router.navigate(['/products'])
    })
    
  }


  cancelBtnEventHandler():void {

    this.router.navigate(['/products'])

}


}
