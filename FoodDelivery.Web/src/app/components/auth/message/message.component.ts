import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public modalRef: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  public message;
  
  openLogIn(){
    this.modalService.open(LogInComponent);
    this.modalRef.close();
  }
}
