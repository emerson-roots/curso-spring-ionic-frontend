import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";


//aula 117 - 8:10
@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {

    }

    //faz requisição get retornando as categorias
    findAll() : Observable <CategoriaDTO[]>{
        /*==================================== 
        OBSERVAÇÃO SOBRE STRINGS NO JAVASCRIPT
        a crase no javascript permite inserir 
        variáveis dentro de uma string
        sem precisar ficar concatenando com o operador "+" 
        ======================================*/
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }

}
