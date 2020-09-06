import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";

//aula 122
@Injectable()
export class StorageService {

    //obtem um usuario armazenado no LocalStorage
    getLocalUser(): LocalUser {

        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    //seta um usuario e armazena no localStorage
    setLocalUser(obj: LocalUser) {

        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }

    }

}