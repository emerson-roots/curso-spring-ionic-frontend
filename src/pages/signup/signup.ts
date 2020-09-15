import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  //aula 132
  formGroup: FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      //aula 132
      this.formGroup = formBuilder.group({
        nome: [ 'joao' , [Validators.required,Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joao@gmail.com',[Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Maracana', [Validators.required]],
        numero : ['244', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Praia Grande', []],
        cep : ['10828333', [Validators.required]],
        telefone1 : ['928987469', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]    
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(){
    console.log('enviou o log');
  }

}
