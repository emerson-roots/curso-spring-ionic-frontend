import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';

//aula 149
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;

  parcelas_param: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    this.pedido = this.navParams.get('pedido_param_pick_address_to_payment');

    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    })
  }

  nextPage_PaymentPageToConfirmationPage() {
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot('OrderConfirmationPage', {pedidoParam_PaymentPageToConfirmationPage: this.pedido});
  }

}//fim da classe
