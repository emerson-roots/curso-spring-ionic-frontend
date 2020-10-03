import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture_param: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          //aula 147 - 2:40 - 1° uso de casting - 
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
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

  //aula 125 - 14:47
  //testa se a imagem de perfil existe no bucket
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
        error => { })
  }

  /**aula 156
   * metodo criado a partir do template da documentação do site ionic
   * 
   */
  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture_param = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
    });
  }

}
