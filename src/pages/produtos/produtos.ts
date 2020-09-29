import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produto.service';

//aula 136
@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

    /**
     * alteração na aula 137
    I M P O R T A N T E 
    =======================================
    .
    .
    recebe valor de parametro passado por outra pagina
    a string "cat_id" esta recendo o valor declarado no arquivo categoria.ts...
    Os nomes devem coincidir*/
    let categoria_id = this.navParams.get('cat_id')

    //aula 153 - alert de loading
    let loader = this.presentLoadingDefault();
    
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        //como no backend o endpoint de retornar os produtos de uma determinada
        //categoria vem de forma especial (com mais dados, paginação, etc)
        //na resposta nós apenas retornamos o que esta dentro do atributo 'content'
        this.items = response['content'];
        loader.dismiss();
        this.loadImageUrls();
        
      },
        error => { 
          loader.dismiss();
        })
  }

  //auça 138
  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(respponse => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        },
          error => { })
    }

  }

  //aula 139
  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { prod_id: produto_id });
  }


  //aula 153
  presentLoadingDefault() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    loader.present();
    return loader;
  }


}//fim da classe
