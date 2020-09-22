import { CurrencyPipe, getLocaleNumberFormat } from "@angular/common";
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

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {

        //pega o carrinho armazenado no local storage
        let cart = this.getCart();

        /** metodo "findIndex" - recebe um predicado como argumento.
         * encontra um elemento "x" tal que o "x.produto.id" seja igual 
         * ao id que veio como argumento do metodo.
         * 
         * se o produto existir, sera retornado o iID dele, caso contraro, por padrão
         * será retornado o valor -1
         */
        let position = cart.items.findIndex(x => x.produto.id == produto.id);

        if (position == -1) {
            //push é o metodo que insere um elemento na lista
            cart.items.push({ quantidade: 1, produto: produto });
        }

        this.storage.setCart(cart);
        return cart;

    }

    /**
     * aula 142
     * 
     * */
    removeProduto(produto: ProdutoDTO): Cart {

        //pega o carrinho armazenado no local storage
        let cart = this.getCart();

        /** metodo "findIndex" - recebe um predicado como argumento.
         * encontra um elemento "x" tal que o "x.produto.id" seja igual 
         * ao id que veio como argumento do metodo.
         * 
         * se o produto existir, sera retornado o iID dele, caso contraro, por padrão
         * será retornado o valor -1
         */
        let position = cart.items.findIndex(x => x.produto.id == produto.id);

        if (position != -1) {
            //splice é o metodo que remove um elemento na lista
            cart.items.splice(position, 1);
        }

        this.storage.setCart(cart);
        return cart;

    }

    /**
     * aula 142
     * 
     * incrementa quantidade do produto no carrinho
     * */
    increaseQuantity(produto: ProdutoDTO): Cart {

        //pega o carrinho armazenado no local storage
        let cart = this.getCart();

        /** metodo "findIndex" - recebe um predicado como argumento.
         * encontra um elemento "x" tal que o "x.produto.id" seja igual 
         * ao id que veio como argumento do metodo.
         * 
         * se o produto existir, sera retornado o iID dele, caso contraro, por padrão
         * será retornado o valor -1
         */
        let position = cart.items.findIndex(x => x.produto.id == produto.id);

        if (position != -1) {
            //splice é o metodo que remove um elemento na lista
            cart.items[position].quantidade++;
        }

        this.storage.setCart(cart);
        return cart;

    }

      /**
     * aula 142
     * 
     * decrementa quantidade do produto no carrinho
     * */
    decreaseQuantity(produto: ProdutoDTO): Cart {

        //pega o carrinho armazenado no local storage
        let cart = this.getCart();

        /** metodo "findIndex" - recebe um predicado como argumento.
         * encontra um elemento "x" tal que o "x.produto.id" seja igual 
         * ao id que veio como argumento do metodo.
         * 
         * se o produto existir, sera retornado o iID dele, caso contraro, por padrão
         * será retornado o valor -1
         */
        let position = cart.items.findIndex(x => x.produto.id == produto.id);

        if (position != -1) {

            //splice é o metodo que remove um elemento na lista
            cart.items[position].quantidade--;

            //se quantidade for menor que 1, remove o item o carrinho
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }

        this.storage.setCart(cart);
        return cart;

    }

    /**
     * aula 142
     * 
     * retorna o valor total dos carrinho
     */
    total():number{

        //pega o carrinho armazenado no localStorage
        let cart = this.getCart();
        let sum = 0;

        //percorre os itens do carrinho multiplicando os valores pelas quantidades
        for(var i=0; i< cart.items.length; i++){
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }

        return sum;
    }

}//fim da classe