import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WC({                          
      url: "http://localhost/wordpress/",
      consumerKey: "ck_13a1af926accdeac39e2cd1c2f0dde80de7a569a",
      consumerSecret: "cs_4517d5811e5ef68521ab3b5426ff48abae3716f4"
      });

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => {    // slug uniq name for category in woocommerce plugin
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
      }, (err) => {
          console.log(err);
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

  loadMoreProducts(event) {
    this.page++;
    console.log("Getting page " + this.page);
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
      let temp = (JSON.parse(data.body).products)
      console.log(this.products);
      event.complete();

      if (temp.length < 10) {
        event.enable(false);
      }
    });
  }

}
