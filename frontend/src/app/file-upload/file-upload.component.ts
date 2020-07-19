import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../model/product.model';
import { CatagoryService } from '../service/catagory.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({
    isHTML5: true
  });
  title: string = 'File Upload';
  closeResult: string;
  hasBaseDropZoneOver:any;
  fileOverBase:any
  constructor(private fb: FormBuilder, private http: HttpClient,private modalService: NgbModal,private catServic :  CatagoryService) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  fileUpload = {status: '', message: 0};
  uploadSubmit(){
        for (var i = 0; i < this.uploader.queue.length; i++) {
          let fileItem = this.uploader.queue[i]._file;
        }
        for (var j = 0; j < this.uploader.queue.length; j++) {
          let data = new FormData();
          let fileItem = this.uploader.queue[j]._file;
          console.log(fileItem.name);
          data.append('file', fileItem);
          data.append('fileSeq', 'seq'+j);
          this.uploadFile(data);
        }
        this.uploader.clearQueue();
  }

  uploadFile(data: FormData){

    return this.catServic.uploadFile(data).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.fileUpload = { status: 'progress', message: percentDone };
      }
      else if (event.type === HttpEventType.Response) {
        this.modalService.dismissAll();
        this.fileUpload = {status: 'progress', message: 0};
      }
  });
    
    
  }

  viewOnly: boolean;
  ngOnInit() {

    this.fileUpload = {status: 'progress', message: 0};
   
  }

}


