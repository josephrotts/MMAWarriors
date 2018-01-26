import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;  

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    this.page = 2;
    this.moreProducts = [];
    
    this.WooCommerce = WC({                           // WC takes json obj as parametar
        url: "http://localhost/wordpress/",
        consumerKey: "ck_13a1af926accdeac39e2cd1c2f0dde80de7a569a",
        consumerSecret: "cs_4517d5811e5ef68521ab3b5426ff48abae3716f4"
    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then( (data) => {
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })
  }

  /**
   * This is afunction which is
   * executed every time when 
   * page is loaded. 
   */
  ionViewDidLoad() {
    setInterval(() => {
      if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();                 // this will be executed every 3 sec
    }, 3000)
  }

  loadMoreProducts(event) {
    if (event == null) {
      this.page = 2;
    } else {
      this.page ++;
    } 
    
    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {     // this: "products?page=" + this.page  = will get the products from the second page, which means the next 10 products will be loaded/retrived from woocommerce store.  
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);
      if (event != null) {
        event.complete();
      }
      if (JSON.parse(data.body).products.length < 10) {
        event.enable(false);
        this.toastCtrl.create({
          message: "No more products!",
          duration: 5000
        }).present();
      }
    }, (err) => {
      console.log(err)
    })
  }

}
