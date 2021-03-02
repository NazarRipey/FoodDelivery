import { Router, RouterModule } from '@angular/router';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { Component, ContentChild, ElementRef, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as EventEmitter from 'events';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  singUpForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl,
    phoneNumber: new FormControl(),
    birthday: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });

  constructor(public modalRef: NgbActiveModal, private modalService: NgbModal,
     private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.singUpForm.value);
    this.modalService.open(ConfirmEmailComponent);
    this.modalRef.close();
  }
}
