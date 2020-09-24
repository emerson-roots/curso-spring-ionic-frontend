import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';

//aula 150
@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService) {

      //atribui o pedido com o parametro que veio da pagina de pagamento
      this.pedido = this.navParams.get('pedidoParam_PaymentPageToConfirmationPage');
  }

  //implementado na aula 150 - 9:00
  //o trecho "response['enderecos']" é interessante pois serve como um parametro de resposta da requisição
  //onde no caso, faz uma busca de endereço (findEndereco) de acordo com os enderecos obtidos na resposta
  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id)
    .subscribe(response => {
      this.cliente = response as ClienteDTO;
      //
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos'])
     
    },
    error => {
      //caso gere algum erro, como por exemplo token expirado, retorna para pagina de login
      this.navCtrl.setRoot('HomePage');
    })
  }

  //percorre a lista de enderecos recebida na resposta e retorna o endereco de acordo com o id do endereco de entrega do pedido
  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position]
  }

  //retorna o total do carrinho para mostrar no HTML de confirmação do pedido
  total(){
    return this.cartService.total();
  }

}//fim da classe
