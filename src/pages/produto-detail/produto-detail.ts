import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

//aula 139
@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    //recebe como parametro o id declarado no metodo showDetail em produto.ts
    //trabalha em conjunto com o binding de click de seleção do produto na tela produtos.html
    let produto_id = this.navParams.get('prod_id');

    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
        error => { })

  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
    .subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`
    },
    error => {})
  }

}
