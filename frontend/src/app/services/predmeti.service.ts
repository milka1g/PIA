import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PredmetiService {

  constructor(
    private http:HttpClient
  ) { }

  uri = 'http://localhost:4000';

  dohvatiSvePredmeteSmera(smer:string){
    const data = {
      smer:smer
    }
    return this.http.post(`${this.uri}/dohvatiSvePredmeteSmera`,data);
  }

  dohvatiPredmetPoSifri(sifra:string){
    const data = {
      sifra:sifra
    }
    return this.http.post(`${this.uri}/dohvatiPredmetPoSifri`,data);
  }

  dohvatiSvePredmete(){
    return this.http.get(`${this.uri}/dohvatiSvePredmete`);
  }

  obrisiPredmet(sifra){
    const data = {
      sifra:sifra
    } 
    return this.http.post(`${this.uri}/obrisiPredmet`,data);
  }

  dohvatiPredmetPoSifriIOdseku(sifra, odsek){
    const data = {
      sifra:sifra,
      odsek:odsek
    }
    return this.http.post(`${this.uri}/dohvatiPredmetPoSifriIOdseku`,data);
  }

  azurirajPredmet(
    naziv:string,
    tip:string,
    odsek:string,
    semestar:number,
    godina:number,
    sifra:string,
    fond:string,
    espb:number,
    cilj:string,
    ishod:string,
    predavanjaTerm: Array<String>,
    vezbeTerm:Array<String>,
    dodatno:string,
    predavanjaMat: Array<String>,
    vezbeMat: Array<String>,
    ispitniRokovi:Array<String>,
    laboratorija:Array<String>,
    dodatnoLab:string,
    domaci:Array<String>,
    dodatnoDom:string
  ){

    const data = {
      naziv:naziv,
      tip:tip,
      odsek:odsek,
      semestar:semestar,
      godina:godina,
      sifra:sifra,
      fond:fond,
      espb:espb,
      cilj:cilj,
      ishod:ishod,
      predavanjaTerm: predavanjaTerm,
      vezbeTerm:vezbeTerm,
      dodatno:dodatno,
      predavanjaMat: predavanjaMat,
      vezbeMat: vezbeMat,
      ispitniRokovi:ispitniRokovi,
      laboratorija:laboratorija,
      dodatnoLab:dodatnoLab,
      domaci:domaci,
      dodatnoDom:dodatnoDom
    }

    return this.http.post(`${this.uri}/azurirajPredmet`,data);
    
  }

  azurirajPredmetAdmin(
    naziv:string,
    tip:string,
    odsek:string,
    semestar:number,
    godina:number,
    sifra:string,
    fond:string,
    espb:number,
    cilj:string,
    ishod:string,
    predavanjaTerm: Array<String>,
    vezbeTerm:Array<String>,
    dodatno:string
  ){
    const data = {
      naziv:naziv,
      tip:tip,
      odsek:odsek,
      semestar:semestar,
      godina:godina,
      sifra:sifra,
      fond:fond,
      espb:espb,
      cilj:cilj,
      ishod:ishod,
      predavanjaTerm: predavanjaTerm,
      vezbeTerm:vezbeTerm,
      dodatno:dodatno,
    }

    return this.http.post(`${this.uri}/azurirajPredmetAdmin`,data);
    
  }

  dodajPredmetAdmin(
    naziv:string,
    tip:string,
    odsek:string,
    semestar:number,
    godina:number,
    sifra:string,
    fond:string,
    espb:number,
    cilj:string,
    ishod:string,
    predavanjaTerm: Array<String>,
    vezbeTerm:Array<String>,
    dodatno:string
  ){
    const data = {
      naziv:naziv,
      tip:tip,
      odsek:odsek,
      semestar:semestar,
      godina:godina,
      sifra:sifra,
      fond:fond,
      espb:espb,
      cilj:cilj,
      ishod:ishod,
      predavanjaTerm: predavanjaTerm,
      vezbeTerm:vezbeTerm,
      dodatno:dodatno
    }

    return this.http.post(`${this.uri}/dodajPredmetAdmin`,data);

  }

  azurirajDeaktivacije(sifra,deacIspitna, deacLab, deacDomaci){
    const data = {
      sifra:sifra,
      deacIspitna:deacIspitna,
      deacLab:deacLab,
      deacDomaci:deacDomaci
    }
    return this.http.post(`${this.uri}/azurirajDeaktivacije`,data);
  }


}
