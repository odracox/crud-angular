import { Product } from "./../product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product;

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



  updateBtnEventHandler(): void {
    
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMsg("Product Updated !");
      this.router.navigate(["/products"]);
    });
  }



  cancelBtnEventHandler():void {

    this.router.navigate(['/products'])

}


}
