import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  /* utilizado no categorias.html 
  faz referencia a URL do bucket no aws */
  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  
  /*utilizado no categorias.html
  busca as categorias no banco*/
  items: CategoriaDTO[];
 

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {

    /* primeiro uso de função anônima utilizada
    como argumento do método .subscribe
    no trecho;
    ===================================
    (response => {
        console.log(response);
    });
    ===================================
    também conhecida como "arrow function"
    ela é a função que é pra ser executada quando a resposta
    da requisição for obtida com sucesso.
    
    no caso foram utilizadas 2 funções anônimas. Uma para
    quando a resposta da requisição for obtida com sucesso e outra quando
    a resposta obtiver um erro, ambas separadas pela virgula*/
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {
        /*na aula 119 foi modificado esta declaracao.
        Foi deletado um tratamento de erro simples e criado
        o error-interceptor.ts para interceptar os erros, passando a responsabilidade
        pare o interceptor de imprimir na tela o erro*/
      });

  }


  //aula 136
  showProdutos(){
    this.navCtrl.push('ProdutosPage');
  }

}//fim da classe
