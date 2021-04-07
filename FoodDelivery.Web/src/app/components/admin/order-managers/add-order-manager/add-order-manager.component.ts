import { SignUpErrors } from '../../../../models/enums/errors/SignUpErrors';
import { UserSignUpModel } from './../../../../models/auth/UserSignUpModel';
import { MessageComponent } from './../../../message/message.component';
import { AuthenticationService } from './../../../../services/authentication.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ageValidator, confirmPasswordValidator } from 'src/app/helpers/Validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order-manager',
  templateUrl: './add-order-manager.component.html',
  styleUrls: ['./add-order-manager.component.css']
})
export class AddOrderManagerComponent implements OnInit {

  addManagerForm = new FormGroup({
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

  errorsEnum = SignUpErrors;

  constructor(public modalRef: NgbActiveModal,
    private authService:AuthenticationService,
    private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const manager: UserSignUpModel = {
      firstName: this.addManagerForm.get('firstName').value,
      lastName: this.addManagerForm.get('lastName').value,
      email: this.addManagerForm.get('email').value,
      phoneNumber: this.addManagerForm.get('phoneNumber').value,
      birthday: this.addManagerForm.get('birthday').value,
      password: this.addManagerForm.get('password').value,
      roles: ["orderManager"]
    }

    this.authService.signUp(manager).subscribe(_ => {
      let msg = "Added manager successfully";
      const modal = this.modalService.open(MessageComponent);
      modal.componentInstance.message = msg;
      
      this.modalRef.close();
      modal.result.then((result) => {
        location.reload();
      }, (reason) => {
        location.reload();
      });
    },
    err => {
      this.addManagerForm.setErrors({"server": +err.error});
    })
  }
}
