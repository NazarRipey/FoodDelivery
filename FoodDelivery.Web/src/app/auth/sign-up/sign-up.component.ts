import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LogInComponent } from './../log-in/log-in.component';
import { Router, RouterModule } from '@angular/router';
import { Component, ContentChild, ElementRef, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ageValidator, confirmPasswordValidator } from 'src/app/validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    firstName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+(-[a-zA-Z]+)?$")
      ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+(-[a-zA-Z]+)?$")
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern("^\\+[0-9]{1,3}[0-9]{9}$")
    ]),
    birthday: new FormControl('', [
      Validators.required,
      ageValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ])
  }, {validators: confirmPasswordValidator("password", "confirmPassword")});

  constructor(public modalRef: NgbActiveModal, private modalService: NgbModal)
  { }

  ngOnInit(): void {
  }

  openLogIn(){
    this.modalService.open(LogInComponent);
    this.modalRef.close();
  }

  onSubmit(){
    this.modalService.open(ConfirmEmailComponent);
    this.modalRef.close();
  }
}
