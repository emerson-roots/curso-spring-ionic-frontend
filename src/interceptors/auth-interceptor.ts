import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

//aula 126
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let localUser = this.storage.getLocalUser();

        //pega o tamanho da string da base URL
        let N = API_CONFIG.baseUrl.length;

        //testa se o inicio da URL é igual a base da URL da API do STS 
        let requestToAPI = req.url.substring(0,N) == API_CONFIG.baseUrl;

        /*somente acrescenta cabeçalho se houver um usuario autenticado
        e caso a requisição seja diretamente para a API no STS invés do bucket S3*/
        if(localUser && requestToAPI){

            /* para entendimento, ler a fonte sugerida pelo professor:
            https://angular.io/guide/http 
            .
            .
            adiciona cabeçalho Authorizarion junto do token */
            const authReq = req.clone({headers: req.headers.set('Authorization','Bearer ' + localUser.token)});
            return next.handle(authReq);

        } else{
            return next.handle(req)
        }
    }



}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};