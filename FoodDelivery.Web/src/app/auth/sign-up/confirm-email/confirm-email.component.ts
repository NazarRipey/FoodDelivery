import { PickRoleComponent } from './../pick-role/pick-role.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  confirmEmailForm = new FormGroup({
    code: new FormControl('', Validators.required)
  })

  constructor(public modalRef: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onCodeSubmited(){
    console.log(this.confirmEmailForm.get('code').value);
    this.modalService.open(PickRoleComponent);
    this.modalRef.close();
  }
}
