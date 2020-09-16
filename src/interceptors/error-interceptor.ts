import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';
import { FieldMessage } from '../models/fieldmessage';


/*aula 119
esta classe tem a função de captar os propagar os
erros
=================================*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService, public alertCtrl : AlertController){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        //teste da interceptação
        //console.log("Passou no interceptor");

        //caso ocorra tudo bem, continua com a requisição
        return next.handle(req)

        //caso ocorra algum erro, intercepta o erro e propaga
        .catch((error, caught) => {

            //testa se a requisição possui o campo erro
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }

            //converte o objeto de erro para JSON
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            
            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            //aula 127
            switch(errorObj.status){

                case 401:
                    this.handle401();
                    break;
                case 403:
                    this.handle403();
                    break;
                case 422:
                    this.handle422(errorObj);
                    break;
                default:
                    this.handleDefaultError(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    //aula 128
    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            //define se o usuario deve clicar no botão da mensagem ou se pode clicar em qlqr lugar na tela para sair
            enableBackdropDismiss: false,
            //define botões pro alert
            buttons: [
                {text: 'OK'}
            ]
        });
        //mostra o alert
        alert.present();
    }

    /* aula 128
    intercepta erro e mostra para o usuario com o "Alert" */
    handle401(){
        let alert = this.alertCtrl.create({
            title:'Erro 401 falha de autenticação',
            message: 'Email ou senha incorretos',
            //define se o usuario deve clicar no botão da mensagem ou se pode clicar em qlqr lugar na tela para sair
            enableBackdropDismiss: false,
            //define botões pro alert
            buttons: [
                {text: 'OK'}
            ]
        });
        //mostra o alert
        alert.present();
    }

    /*aula 127 
    caso gere um erro 403, força a limpeza do localStorage */
    handle403(){
        this.storage.setLocalUser(null);
    }

    //aula 135
    handle422(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {text: 'OK'}
            ]
        });

     alert.present();
    }

    //aula 135
    private listErrors(messages : FieldMessage[]) : string {

        let s : string = '';
        for(var i=0; i<messages.length;i++){
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }

        return s;
    }

}//fim da classe

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};