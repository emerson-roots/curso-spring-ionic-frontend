import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

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
        console.log(response);
      },
      error => {
        console.log(error);
      });

  }




}
