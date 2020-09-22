
import { CidadeDTO } from "./cidade.dto";

//aula 146
export interface EnderecoDTO {
    id : string;
    logradouro : string;
    numero : string;
    complemento : string;
    bairro : string;
    cep : string;
    cidade : CidadeDTO;
}