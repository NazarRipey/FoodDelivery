import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogInComponent } from '../auth/log-in/log-in.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public message;
  public showLogIn: boolean;

  constructor(public modalRef: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  openLogIn(){
    this.modalService.open(LogInComponent);
    this.modalRef.close();
  }
}
