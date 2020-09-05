import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

/*aula 119
esta classe tem a função de captar os propagar os
erros
=================================*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        //teste da interceptação
        console.log("Passou no interceptor");

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

            return Observable.throw(errorObj);
        }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};