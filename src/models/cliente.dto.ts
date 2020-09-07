//aula 125
export interface ClienteDTO {

    id : string;
    nome : string;
    email : string;
    //atributo seguido de "?" significa que é um atributo opcional
    imageUrl ?: string;
}