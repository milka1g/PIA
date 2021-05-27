import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanAngService {

  constructor(
    private http:HttpClient
  ) { }

  uri = 'http://localhost:4000';

    dohvatiSveZaNastavnika(username){
      const data = {
        username:username
      }

      return this.http.post(`${this.uri}/dohvatiSveZaNastavnika`,data);
    }

    dodajUPlan(username, sifra, grupa){
      const data = {
        username:username,
        sifra:sifra,
        grupa:grupa
      }
      return this.http.post(`${this.uri}/dodajUPlan`,data);
    }

    dohvatiSvePlanAng(){
      return this.http.get(`${this.uri}/dohvatiSvePlanAng`);
    }

    dohvatiSveZaPredmet(naziv){
      //naziv je sifra zapravo
      const data = {
        naziv:naziv
      }

      return this.http.post(`${this.uri}/dohvatiSveZaPredmet`,data);
    }

    obrisiPredmetPlanAng(sifra){
      const data = {
        sifra:sifra
      }

      return this.http.post(`${this.uri}/obrisiPredmetPlanAng`,data);
    }

}
