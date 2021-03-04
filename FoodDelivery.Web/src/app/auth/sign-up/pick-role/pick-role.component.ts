import { MessageComponent } from './../message/message.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pick-role',
  templateUrl: './pick-role.component.html',
  styleUrls: ['./pick-role.component.css']
})
export class PickRoleComponent implements OnInit {

  roleForm = new FormGroup({
    role: new FormControl('customer', Validators.required)
  })
  constructor(public modalRef: NgbActiveModal, private modalService: NgbModal) { }

  
  ngOnInit(): void {
  }

  onRolePicked(){
    let msg = 'Succesfully signed up.';
    if(this.roleForm.get('role').value == 'owner'){
      msg += ' Admin will contact you within 24 hours to approve your role. You will be emailed when he makes the decision';
    }

    const msgModal = this.modalService.open(MessageComponent);
    msgModal.componentInstance.message = msg;
    this.modalRef.close();
  }
}
