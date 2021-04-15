import { UserHelper } from './../../../helpers/UserHelper';
import { AccountService } from './../../../services/account.service';
import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { UpdateProfileComponent } from './../update-profile/update-profile.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { imgSrc } from '../../../globals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  imgSrc = imgSrc;

  constructor(public userHelper:UserHelper,
    private modalService:NgbModal,
    private accountService:AccountService) { }

  ngOnInit(): void {
  }

  openUpdateForm(){
    const modal = this.modalService.open(UpdateProfileComponent);

    modal.result.then((result) => {
      this.userHelper.getProfile().subscribe();
    });
  }

  deactivateAccount(){
    const modal = this.modalService.open(ConfirmDialogComponent);
    modal.componentInstance.confirmHeader = "Account deactivation";
    modal.componentInstance.confirmMessage = "Are you sure you want to deactivate your account?\r\n" +
     "Only admin can activate it back.\r\nIf you are a restaurant owner all your restaurants will also be DEACTIVED";

    modal.result.then((result) => {
      if(result == true){
        this.accountService.deactivateAccount(this.userHelper.profile.email).subscribe(_ => {
          this.userHelper.LogOut()
        });
      }
    });
  }
}
