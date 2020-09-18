import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { ProdutoDTO } from '../../models/produto.dto';

//aula 137
@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  //aula 140
  findById(produto_id: string){
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }

  findByCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  //aula 138
  getSmallImageFromBucket(id: string) : Observable<any>{

    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url,{responseType : 'blob'});

  }

  //aula 140
  getImageFromBucket(id: string) : Observable<any>{

    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
    return this.http.get(url,{responseType : 'blob'});

  }


}//fim da classe