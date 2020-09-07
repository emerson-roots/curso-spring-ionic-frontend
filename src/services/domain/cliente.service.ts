import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

//aula 125
@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    findByEmail(email: string): Observable<ClienteDTO> {

        /* IMPLEMENTAÇÃO PROVISÓRIA - SERA RETIRADO POSTERIORMENTE
        =========================================================*/
        //armazena token
        let token = this.storage.getLocalUser().token;
        //adiciona token ao cabeçalho authorization
        let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        /*=========================================================*/


        //retorna a requisição do tipo Observable<ClienteDTO> em conjunto do cabeçalho com token
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            { 'headers': authHeader })
    }

    //aula 125
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

}