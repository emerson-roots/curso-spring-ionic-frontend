//aula 136
export interface ProdutoDTO{
    id : string;
    nome : string;
    preco : number;
    //atributo seguido de "?" significa que é um atributo opcional
    imageUrl ?: string;
}