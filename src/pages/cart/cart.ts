import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

//AULA 141
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
          error => { });
    }
  }

  //aula 142
  removeItem(produto: ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).items;
  }

  //aula 142
  increaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  //aula 142
  decreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  //aula 142
  total() : number{
    return this.cartService.total();
  }

  /**
   * aula 142
   * 
   * metodo que continua a compra caso o carrinho seja esvaziado
  */
  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  //aula 146
  checkout(){
    this.navCtrl.push('PickAddressPage');
  }

}//fim da classe