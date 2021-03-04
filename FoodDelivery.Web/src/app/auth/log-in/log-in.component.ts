import { SignUpComponent } from './../sign-up/sign-up.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(public modalRef: NgbActiveModal, private modalService: NgbModal) { }

  logInForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required),
    remember: new FormControl(),
  });

  ngOnInit(): void {
  }

  openSignUp(){
    this.modalService.open(SignUpComponent);
    this.modalRef.close();
  }
}
