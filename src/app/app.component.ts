import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //alterado na aula 113 - 9:35
  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService) {
      
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Logout', component: '' }
   
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /* metodo alterado na aula 130 */
  openPage(page : {title:string, component: string}) {
   
    /*implementado na aula 130
    caso seja clicado no menu no item Logout
    chama a função para deslogar usuario*/
    switch(page.title){
      case 'Logout':
        //chama AuthService e desloga usuario
        this.auth.logout();
        //redireciona para a homepage
        this.nav.setRoot('HomePage')
        break;
      default:
        this.nav.setRoot(page.component);
    }

    
  }
}
