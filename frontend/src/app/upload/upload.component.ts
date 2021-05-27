import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {saveAs as importedSaveAs} from "file-saver";
import { User } from '../model/user.model';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private uploadService:UploadService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  selectedFile: File
  upl:string="";
  filename:string;

  user:User;


  
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    // alert(this.selectedFile.name)
    // alert(this.selectedFile.size)
    // alert(this.selectedFile.type)
  }

  onFileSelected(event){
    console.log(event);
    this.filename = this.selectedFile.name;
    this.upl="";
  }

  onUpload() {
      // this.http is the injected HttpClient
      let uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);
      this.uploadService.uploadFile(uploadData, this.user.name, this.user.lastname)
        .subscribe(res=>{
          //console.log("USPEH:)");
          if(res["ret"]=="ok")
            this.upl="Uspesan upload";
            this.filename="";
        });
  }

  downloadApple(){
    this.uploadService.downloadFile(this.selectedFile.name).subscribe(blob => {
      importedSaveAs(blob, this.selectedFile.name);
  }
    )
  }

}
