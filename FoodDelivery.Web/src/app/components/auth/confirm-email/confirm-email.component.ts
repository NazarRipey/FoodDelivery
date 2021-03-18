import { authErrors } from '../../../errors/authErrors';
import { sendConfirmationCodeModel } from '../../../models/auth/sendConfirmationCodeModel';
import { throwError } from 'rxjs';
import { MessageComponent } from '../message/message.component';
import { confirmEmailModel } from '../../../models/auth/confirmEmailModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  confirmEmailForm = new FormGroup({
    code: new FormControl('', Validators.required)
  })

  email;
  message;
  errorsEnum = authErrors;

  constructor(public modalRef: NgbActiveModal,
    private modalService: NgbModal, 
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  Skip(){
    if(this.message){
      const modal = this.modalService.open(MessageComponent);
      modal.componentInstance.message = this.message;
    }
    this.modalRef.close();
  }

  SendAgain(){
    let sendCodeModel: sendConfirmationCodeModel = {
      email: this.email
    };

    this.authService.sendCode(sendCodeModel).subscribe(
      _ => {
        alert("Sent new code to " + this.email);
      },
      error => {
        console.log("Couldn't send code");
        console.log(error);
      }
    );
  }

  onCodeSubmited(){
    const emailConfirm: confirmEmailModel = {
      email: this.email,
      code: this.confirmEmailForm.get('code').value,
    }

    this.authService.confirmEmail(emailConfirm).subscribe(_ => {
      let msg = "Email confirmed successfully.";
      if(this.message){
        this.message += msg;
      }
      else{
        this.message = msg;
      }
      const modal = this.modalService.open(MessageComponent);
      modal.componentInstance.message = this.message;
      this.modalRef.close();
    },
    err => {
      this.confirmEmailForm.setErrors({"server": +err.error});
    })    
  }
}
