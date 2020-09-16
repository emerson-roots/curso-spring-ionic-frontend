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

    /* método implementado na aula 125 porém foi alterada na aula 126 */
    findByEmail(email: string): Observable<ClienteDTO> {

        //retorna a requisição do tipo Observable<ClienteDTO> em conjunto do cabeçalho com token
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    //aula 125
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    //aula 135
    insert(obj: ClienteDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
        obj,
        {
            observe: 'response',
            responseType:'text'
        });
    }

}