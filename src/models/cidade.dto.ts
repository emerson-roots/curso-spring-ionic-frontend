import { EstadoDTO } from "./estado.dto";

//aula 133
export interface CidadeDTO {
    id: string;
    nome: string;
    //adicionado na aula 146
    estado? : EstadoDTO;
}