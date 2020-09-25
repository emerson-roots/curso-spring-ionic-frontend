import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

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
  codPedidoInseridoParam: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

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

  /**aula 151
   * retorna para pagina de carrinho
  */
  back() {
    this.navCtrl.setRoot('CartPage');
  }

  /**aula 151
   * insere o pedido
   * 
   * se tudo correr bem, 
   * esvazia o carrinho e
   * imprime no console o response.header "location"
   * que no backend, retorna a URL do novo recurso salvo
   * Ex.: localhost:8080/pedidos/3 
   * ... onde o parametro 3 é o novo recurso/pedido inserido
   * 
   * se der erro, retorna para HomePage
  */
  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        //armazena o id do pedido inserido no banco que veio no header/cabeçalho "location"
        this.codPedidoInseridoParam = this.extractId(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  /**aula 152
   * extrai o id da URL do header "location" após salvar o pedido
  */
  private extractId(location: string) : string {
    
    //armazena a posição da ultima barra existente na URL 
    //exemplo: http://localhost:8080/pedidos/3
    //armazenara a posição da barra antes do numero/id "3"
    let position = location.lastIndexOf('/')

    /**quebra a string da URL e retorna somente o que tem depois da ultima barra "/"
     * no caso, é um id do pedido que acabou de ser salvo no banco de dados*/
    return location.substring(position + 1, location.length);
  }

  //aula 152
  home() {
    this.navCtrl.setRoot('HomePage');
  }

}//fim da classe
