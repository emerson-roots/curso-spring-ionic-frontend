import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  /*aula 115
  método que faz a navegação da pagina home
  para a página Categorias */
  login() {
    //push empilha uma pagina em cima de outra, passando como parametro o nome da classe
    //this.navCtrl.push('CategoriasPage');

    //não empilha e elimina o botão voltar para tela anterior
    this.navCtrl.setRoot('CategoriasPage');

  }

}
