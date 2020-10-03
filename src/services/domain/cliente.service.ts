import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

//aula 125
@Injectable()
export class ClienteService {

    constructor(public http: HttpClient,
        public storage: StorageService,
        public imageUtilService: ImageUtilService) {

    }

    //aula 150
    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    /**
     * método implementado na aula 125 porém foi alterada na aula 126 
     * 
     * AULA 147 - nova alteração deste metodo
     * foi removido a TIPAGEM do tipo ClienteDTO pois aqui no front-end, 
     * ClienteDTO retorna somente id, nome, email e imagem... 
     * Ao retirar a tipagem, sera retornado o objeto inteiro do BACK-END, 
     * inclusive os endereços associados do cliente*/
    findByEmail(email: string) {

        //retorna a requisição do tipo Observable<ClienteDTO> em conjunto do cabeçalho com token
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    //aula 125
    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    //aula 135
    insert(obj: ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    //aula 157
    uploadPicture(picture) {
        //converte a image recebida em base64 pra blob
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);

        //instancia um objeto do tipo form-date, conforme o requerido no postman
        let formData: FormData = new FormData();

        /**pode ser o metodo "set()" ou o "append()" pois os dois funcionam
         * 'file' é o nome do atributo
         * pictureBlob é o valor do atributo ja convertido
         * e 'file.png' ´é um nome qualquer/aleatório ... pode ser qlqr um
         * 
        */
        formData.set('file', pictureBlob, 'file.png');

        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

}//fim da classe