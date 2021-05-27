import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http:HttpClient
  ) { }

  uri = 'http://localhost:4000';


    dohvatiFajlPoNazivu(naziv){
      const data = {
        naziv:naziv
      }

      return this.http.post(`${this.uri}/dohvatiFajlPoNazivu`,data);
    }

    azurirajPrioritet(naziv:string,prioritet:number){
      const data = {
        naziv:naziv,
        prioritet:prioritet
      }

      return this.http.post(`${this.uri}/azurirajPrioritet`,data);
    }

}
