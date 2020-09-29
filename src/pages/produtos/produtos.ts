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

  items: ProdutoDTO[] = [];

  //aula 155
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  /**
   * aula 154
   * 
   * o codigo inserido neste metodo
   * nada mais é do que o que estava dentro do metodo
   * ionViewDidLoad em aulas anteriores a esta
   * 
   * foi feito isto para implementar o metodo doRefresh
  */
  loadData() {

    /**
    * alteração na aula 137
    *I M P O R T A N T E 
    *=======================================
    *.
    *.
    *recebe valor de parametro passado por outra pagina
    *a string "cat_id" esta recendo o valor declarado no arquivo categoria.ts...
    *Os nomes devem coincidir*/
    let categoria_id = this.navParams.get('cat_id')

    //aula 153 - alert de loading
    let loader = this.presentLoadingDefault();

    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        /**
         * como no backend o endpoint de retornar os produtos de uma determinada
         * categoria vem de forma especial (com mais dados, paginação, etc)
         * na resposta nós apenas retornamos o que esta dentro do atributo 'content'
         * 
         * trecho sofreu alteração na aula 155 para fazer infinite scroll
         * invés de retornar o response inteiro ele concatena listas para paginar */
        //armazena o tamanho da lista
        let start = this.items.length;
        //incrementa com uma nova pagina/lista
        this.items = this.items.concat(response['content']);
        //armazena o novo final da lista subtraindo 1 item por causa do index de vetor
        let end = this.items.length - 1
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        //carrega imagens de acordo com o inicio e fim da lista criada pelo infinite scroll
        //infinite scroll é chamado sempre que a tela é rolada para baixo
        this.loadImageUrls(start, end);

      },
        error => {
          loader.dismiss();
        })
  }

  /**aula 138
   * 
   * sofreu alteração na aula 155 para não buscar todas as imagens de uma vez só
   * mas sim a quantidade de imagens da nova pagina carregada somente
  */
  loadImageUrls(start: number, end: number) {
    for (var i = start; i <= end; i++) {
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

  /**
   * aula 154
   * 
   * atualiza lista de produtos ao arrastar para baixo e soltar a tela
   * 
   * sofreu alteração na aula 155 para atualizar com lista de items e pagina vazia
  */
  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);

  }

  //aula 155 - infinit scroll
  doInfinite(event) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }


}//fim da classe
