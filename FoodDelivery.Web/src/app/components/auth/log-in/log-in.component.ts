import { ConfirmEmailComponent } from './../confirm-email/confirm-email.component';
import { authErrors } from '../../../errors/authErrors';
import { userHelper } from '../../../helpers/userHelper';
import { userLogInModel } from '../../../models/auth/userLogInModel';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  redirectUrl;

  constructor(public modalRef: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthenticationService,
    private router: Router,
    public userHelper: userHelper) { }

  logInForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required),
    remember: new FormControl(),
  });

  errorsEnum = authErrors;

  ngOnInit(): void {
  }

  openSignUp(){
    this.modalService.open(SignUpComponent);
    this.modalRef.close();
  }

  openConfirmEmail(){
    const modal = this.modalService.open(ConfirmEmailComponent);
    modal.componentInstance.email =  this.logInForm.get('email').value;
    this.modalRef.close();    
  }

  onSubmit(){    
    const user: userLogInModel = {
      email: this.logInForm.get('email').value,
      password: this.logInForm.get('password').value,
    }

    this.userHelper.LogIn(user)
    .subscribe(response => {
      if(!response){
        this.modalRef.close();
      }
      else{
        this.logInForm.setErrors({"server": +response.error});
      }
    });
  }
}
