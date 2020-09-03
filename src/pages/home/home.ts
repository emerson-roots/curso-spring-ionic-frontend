import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

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

  /* aula 116
  aprendido sobre eventos ao carregar ou sair de paginas
  mais infos no site/documentação do ionic
  buscar por "ionic lifecycle events" 
  .
  .
  tem função de executar algo quando entrar NESTA pagina HOME */
  ionViewWillEnter(){
    //desativa menu/deslize para a direita
    this.menu.swipeEnable(false);
  }

  /*tem função de executar algo quando SAIR desta pagina HOME */
  ionViewDidLeave(){
    //ativa menu
    this.menu.swipeEnable(true);
  }

}
