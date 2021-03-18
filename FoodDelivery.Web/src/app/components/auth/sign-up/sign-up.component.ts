import { HttpErrorResponse } from '@angular/common/http';
import { authErrors } from '../../../errors/authErrors';
import { throwError } from 'rxjs';
import { userSignUpModel } from '../../../models/auth/userSignUpModel';
import { AuthenticationService } from '../../../services/authentication.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { LogInComponent } from '../log-in/log-in.component';
import { Router, RouterModule } from '@angular/router';
import { Component, ContentChild, ElementRef, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ageValidator, confirmPasswordValidator } from 'src/app/helpers/validators';

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
    ]),
    roles: new FormControl('', Validators.required)
  }, {validators: confirmPasswordValidator("password", "confirmPassword")});

  errorsEnum = authErrors;

  constructor(public modalRef: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthenticationService)
  {   }

  ngOnInit(): void {
  }

  openLogIn(){
    this.modalService.open(LogInComponent);
    this.modalRef.close();
  }

  onSubmit(){
    const user: userSignUpModel = {
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      email: this.signUpForm.get('email').value,
      phoneNumber: this.signUpForm.get('phoneNumber').value,
      birthday: this.signUpForm.get('birthday').value,
      password: this.signUpForm.get('password').value,
      roles: this.signUpForm.get('roles').value
    }

    let msg = "Signed up sucessfully.";
    if(user.roles.includes("owner")){
      msg += ' Admin will contact you within 24 hours to verify your role. You will be emailed when he makes the decision. ';
    }

    this.authService.signUp(user).subscribe(_ => {
      const modal = this.modalService.open(ConfirmEmailComponent);
      modal.componentInstance.email = user.email;
      modal.componentInstance.message = msg;
      this.modalRef.close();
    },
    err => {
      this.signUpForm.setErrors({"server": +err.error});
    })
  }
}
