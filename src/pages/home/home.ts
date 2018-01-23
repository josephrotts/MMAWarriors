import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  WooCommerce: any;
  products: any[];

  constructor(public navCtrl: NavController) {
    this.WooCommerce = WC({                           // WC takes json obj as parametar
        url: "http://localhost/wordpress/",
        consumerKey: "ck_13a1af926accdeac39e2cd1c2f0dde80de7a569a",
        consumerSecret: "cs_4517d5811e5ef68521ab3b5426ff48abae3716f4"
    });

    this.WooCommerce.getAsync("products").then( (data) => {
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })
  }

}
