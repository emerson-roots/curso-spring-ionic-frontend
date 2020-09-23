import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
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

  //aula 148 - 6:15
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  //implementado na aula 147
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //aula 147 - 2:40 - 1° uso de casting - 
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();

          //aula 148
          this.pedido = {
            cliente: {id: response['id']},
            //endereço de entrega e pagamento sera verificado nas proximas telas pelo usuario, por isso são nulos
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
           }
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

  nextPagePickAddressToPaymentPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.navCtrl.push('PaymentPage', {pedido_param_pick_address_to_payment: this.pedido})
  }

}