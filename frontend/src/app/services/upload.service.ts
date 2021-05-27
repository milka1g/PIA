import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http:HttpClient
  ) { }

  uri = 'http://localhost:4000';


  uploadFile(uploadData:FormData, ime, prezime){
    uploadData.append('ime',ime);
    uploadData.append('prezime',prezime);
    return this.http.post('http://localhost:4000/upload', uploadData);
  }
  
  downloadFile(filename): Observable<Blob> {
    const data = {
      filename: filename
    }
    return this.http.post(`${this.uri}/download`, data, {responseType: "blob"});
  }

}
