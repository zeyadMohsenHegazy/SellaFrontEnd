import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../Model/icart';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartProducts } from '../Model/icart-products';
import { IProduct } from '../Model/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartDetialsService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  private cartItems: any[] = [];

  constructor() { 
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

public getCartItems(): any[] {
  return this.cartItems;
}






  getProducts() {
   // return this.cartItems.asObservable();
    return this.productList.asObservable();

  }

  setProducts(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtocart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);

    this.cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice(): number {
    let grandtotal = 0;
    this.cartItemList.map((a: any) => {
      grandtotal += a.price;
    })
    return grandtotal;
  }

  removeCartItem(product: any) {
    let grandtotal = 0;
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
        this.cartItems.splice(index, 1);
      }
    })
    
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.productList.next(this.cartItemList);
      
      
  }

  removeAllcart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
      this.cartItems = [];
      localStorage.removeItem('cartItems');
  }



  // apiUrl = 'http://localhost:49182/api';
  // constructor(private http: HttpClient) { }

  // getCartByUser(id: number): Observable<ICart[]> {
  //   return this.http.get<ICart[]>(`${this.apiUrl}/Cart/${id}`);
  // }

  // getProductsByCartId(id: number): Observable<ICartProducts[]> {
  //   return this.http.get<ICartProducts[]>(`${this.apiUrl}/ProductsCart/${id}`);
  // }

  // getProductById(id: number): Observable<IProduct[]> {
  //   return this.http.get<IProduct[]>(`${this.apiUrl}/Product/${id}`);
  // }

}
