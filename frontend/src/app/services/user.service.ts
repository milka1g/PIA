import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/login`, data);
  }

  setNovaLozinka(username, oldpw, newpw){
    const data = {
      username:username,
      password:oldpw,
      newpw:newpw
    }

    return this.http.post(`${this.uri}/setNovaLozinka`,data);
  }

  registracija(username, password, index, title, name, lastname, status){
    const data = {
      username:username,
      mail:index,
      password:password, 
      pwchg:0,
      name:name,
      lastname:lastname, 
      address:null,
      phone:null,
      title:title,
      office:null,
      status:status,
      picture:null,
      bio:null,
      website:null,
      type:"S"
    }
    return this.http.post(`${this.uri}/registracija`, data);
  }

  dohvatiKorisnikePoTipu(type){
    const data = {
      type:type
    }

    return this.http.post(`${this.uri}/dohvatiKorisnikePoTipu`,data);
  }

  dohvatiSveKorisnike(){
    return this.http.get(`${this.uri}/dohvatiSveKorisnike`);
  }

  dohvatiKorisnikaPoUsername(username){
    const data = {
      username:username
    }

    return this.http.post(`${this.uri}/dohvatiKorisnikaPoUsername`,data);
  }

  obrisiKorisnika(username){
    const data = {
      username:username
    }

    return this.http.post(`${this.uri}/obrisiKorisnika`,data);
  }

  azurirajKorisnika(username: string,
    mail: string,
    password: string,
    pwchg: number,
    name: string,
    lastname: string,
    address: string,
    phone: string,
    title: string,
    office: string,
    status: string,
    picture: string,
    bio: string,
    website: string,
    type: string){
      const data = {
        username: username,
        mail: mail,
        password: password,
        pwchg: pwchg,
        name: name,
        lastname: lastname,
        address: address,
        phone: phone,
        title: title,
        office: office,
        status: status,
        picture: picture,
        bio: bio,
        website: website,
        type: type
      }
      return this.http.post(`${this.uri}/azurirajKorisnika`,data);
  }

  dodajKorisnika(username: string,
    mail: string,
    password: string,
    pwchg: number,
    name: string,
    lastname: string,
    address: string,
    phone: string,
    title: string,
    office: string,
    status: string,
    picture: string,
    bio: string,
    website: string,
    type: string){
      pwchg = 0;
      const data = {
        username: username,
        mail: mail,
        password: password,
        pwchg: pwchg,
        name: name,
        lastname: lastname,
        address: address,
        phone: phone,
        title: title,
        office: office,
        status: status,
        picture: picture,
        bio: bio,
        website: website,
        type: type
      }

      return this.http.post(`${this.uri}/dodajKorisnika`,data);
  }

  odaberiPredmete(niz:Array<String>, username){
    const data = {
      predmeti:niz,
      username:username
    }
    return this.http.post(`${this.uri}/odaberiPredmete`,data);
  }

}
