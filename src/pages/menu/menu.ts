import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: any;
  WooCommerce: any;
  categories: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;
    this.categories = [];

    this.WooCommerce = WC({                           // WC takes json obj as parametar
      url: "http://localhost/wordpress/",
      consumerKey: "ck_13a1af926accdeac39e2cd1c2f0dde80de7a569a",
      consumerSecret: "cs_4517d5811e5ef68521ab3b5426ff48abae3716f4"
  });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);
  
      let temp: any[] = JSON.parse(data.body).product_categories;
     
      for(let i = 0; i < temp.length; i++) {
        if(temp[i].parent == 0) {

          if(temp[i].slug == "clothing") {         // if current category equals to clothing
            temp[i].icon = "shirt";
          }
          if(temp[i].slug == "music") {         // if current category equals to clothing
            temp[i].icon = "musical-notes";
          }
          if(temp[i].slug == "posters") {         // if current category equals to clothing
            temp[i].icon = "images";
          }
          this.categories.push(temp[i]);
        }
      }
  
    }, (err) => {
      console.log(err)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category) {
    this.navCtrl.setRoot(ProductsByCategoryPage, {"category": category});
  }

}
