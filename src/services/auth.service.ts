import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

//aula 121
@Injectable()
export class AuthService{

    /*construtor injetando um HttpCliente que envia para o backend o dados de 
    credenciais como login e senha para o endpoint login*/
    constructor(public http: HttpClient){

    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        creds,
        {
            //aguarda a resposta da requisição para capturar o header
            observe: 'response',
            /*como o endpoint de login retorna uma resposta de corpo vazio
            nós declaramos que a resposta sera um texto, para que o framework
            não tente fazer um parse no JSON, gerando erro de parse*/
            responseType: 'text'
        });
    }
}