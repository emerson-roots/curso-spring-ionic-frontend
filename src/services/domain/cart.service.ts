import { Injectable } from "@angular/core";
import { ItemSliding } from "ionic-angular";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

/**
 * aula 141
 * 
 * Cart é um domain somente da aplicação - nao esta presete no backend
*/
@Injectable()
export class CartService {

    constructor(public storage: StorageService) {

    }

    createOrClearCart(): Cart {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto : ProdutoDTO) : Cart{

        let cart = this.getCart();

        /** metodo "findIndex" - recebe um predicado como argumento.
         * encontra um elemento "x" tal que o "x.produto.id" seja igual 
         * ao id que veio como argumento do metodo.
         * 
         * se o produto existir, sera retornado o iID dele, caso contraro, por padrão
         * será retornado o valor -1
         */
        let position = cart.items.findIndex(x => x.produto.id == produto.id);

        if(position == -1){
            //push é o metodo que insere um elemento na lista
            cart.items.push({quantidade: 1 , produto : produto});
        }

        this.storage.setCart(cart);
        return cart;

    }

}//fim da classe