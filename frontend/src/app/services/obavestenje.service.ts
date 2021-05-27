import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  constructor(
    private http:HttpClient
  ) { }

  uri = 'http://localhost:4000';


    dodajObavestenje(id, naslov, tekst, predmeti, username, ime, prezime, datum, fajlovi){
      const data = {
        id:id,
        naslov:naslov,
        tekst:tekst,
        predmeti:predmeti,
        username:username,
        ime:ime,
        prezime:prezime,
        datum:datum,
        fajlovi:fajlovi
      }

      return this.http.post(`${this.uri}/dodajObavestenje`,data);
    }

    dohvatiSvaObavestenja(){
      return this.http.get(`${this.uri}/dohvatiSvaObavestenja`);
    }

    dohvatiObavestenjeId(id){
      const data = {
        id:id
      }
      return this.http.post(`${this.uri}/dohvatiObavestenjeId`,data);
    }

    azurirajObavestenje(id, naslov, tekst, predmeti, username, ime, prezime, datum, fajlovi){
      const data = {
        id:id,
        naslov:naslov,
        tekst:tekst,
        predmeti:predmeti,
        username:username,
        ime:ime,
        prezime:prezime,
        datum:datum,
        fajlovi:fajlovi
      }

      return this.http.post(`${this.uri}/azurirajObavestenje`,data);

    }

    azurirajFajloveObavestenja(fajlovi, id){
      const data = {
        fajlovi:fajlovi,
        id:id
      }
      return this.http.post(`${this.uri}/azurirajFajloveObavestenja`,data);
    }

    obrisiObavestenje(id){
      const data = {
        id:id
      }
      return this.http.post(`${this.uri}/obrisiObavestenje`,data);

    }

}
