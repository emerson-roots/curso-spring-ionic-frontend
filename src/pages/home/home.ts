import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /*aula 120
  injeta objeto para trabalhar com binding na pagina de login*/
  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };


  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {
      
  }

  /*aula 115
  método que faz a navegação da pagina home
  para a página Categorias */
  login() {

    /* aula 121 
    se vier uma resposta com sucesso, chama função sucessfulLogin, passando como parametro o bearer/token */
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.sucessfulLogin(response.headers.get('Authorization'));
        //setRoot não empilha e elimina o botão voltar para tela anterior
        this.navCtrl.setRoot('CategoriasPage');
      },
        error => { });
  }

  /* aula 116
  aprendido sobre eventos ao carregar ou sair de paginas
  mais infos no site/documentação do ionic
  buscar por "ionic lifecycle events" 
  .
  .
  tem função de executar algo quando entrar NESTA pagina HOME */
  ionViewWillEnter() {
    //desativa menu/deslize para a direita
    this.menu.swipeEnable(false);
  }

  /*tem função de executar algo quando SAIR desta pagina HOME */
  ionViewDidLeave() {
    //ativa menu
    this.menu.swipeEnable(true);
  }

  //aula 129
  ionViewDidEnter(){

    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.sucessfulLogin(response.headers.get('Authorization'));
        //setRoot não empilha e elimina o botão voltar para tela anterior
        this.navCtrl.setRoot('CategoriasPage');
      },
        error => { });
  }

  //aula 131
  signup(){
    this.navCtrl.push('SignupPage');
  }

}
