import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  //aula 132
  formGroup: FormGroup
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      //aula 132
      this.formGroup = formBuilder.group({
        nome: [ 'joao gilmar' , [Validators.required,Validators.minLength(5), Validators.maxLength(120)]],
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

  //implementado na aula 133
  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        //seta na combobox do formulario um estado
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();

      },
      error => {});
  }

  //aula 133
  updateCidades(){
    //pega o valor da combobox estado selecionado
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        //retira a seleção, tornando a combobox com o valor Nulo
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }

  signupUser(){
    
    /*o metodo "this.formGroup.value" retorna os dados
    de todos os campos do formulario*/
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      message:'Cadastro efetuado com sucesso',
      enableBackdropDismiss:false,
      buttons:[
        {
          text: 'Ok',
          handler:() => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
