import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})

//aula 146
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  //implementado na aula 147
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //aula 147 - 2:40 - 1° uso de casting - 
          this.items = response['enderecos'];
        },
          error => {
            /*aula 127 - 
            caso gere erro, redireciona para a pagina inicial */
            if (error.status == 403) {
              this.navCtrl.setRoot('HomePage');
            }
          });
    } else {
      //aula 127 - redireciona para pagina inicial caso de erro no localUser
      this.navCtrl.setRoot('HomePage');
    }
  }

}