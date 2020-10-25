import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Product } from './product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMsg(msg:string, isError: boolean=false) : void {

    this.snackBar.open(msg, 'X', {
      duration: (msg.length)*100,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],

    })
  }

create(product: Product): Observable <Product> {
    return this.http.post<Product>(this.baseUrl, product)
    
  }


read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }


readById(id: number): Observable<Product> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.get<Product>(url)
}

update(product: Product): Observable<Product> {
  const url = `${this.baseUrl}/${product.id}`;
  return this.http.put<Product>(url, product)
}


delete(id:number) : Observable<Product> {

  const url = `${this.baseUrl}/${id}`;
  return this.http.delete<Product>(url)

}
errorHandler(e: any): Observable<any> {
  this.showMsg("Server is down !", true);
  return EMPTY;
}

}

