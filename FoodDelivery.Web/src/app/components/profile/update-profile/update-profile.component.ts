import { AccountService } from './../../../services/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UpdateProfile } from './../../../models/userProfile/UpdateProfile';
import { ageValidator } from 'src/app/helpers/Validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserHelper } from './../../../helpers/UserHelper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm = new FormGroup({
    firstName: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+(-[a-zA-Z]+)?$")
      ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]+(-[a-zA-Z]+)?$")
    ]),
    birthday: new FormControl('', [
      Validators.required,
      ageValidator(),
    ]),
    address: new FormControl('', [

    ]),
  });

  constructor(public modalRef: NgbActiveModal, 
    public userHerlper: UserHelper,
    private accountService: AccountService) { }

  ngOnInit(): void {
    let bd: Date = new Date(this.userHerlper.profile.birthday);

    this.updateProfileForm.patchValue({
      firstName: this.userHerlper.profile.firstName,
      lastName: this.userHerlper.profile.lastName,
      birthday : formatDate(bd,'yyyy-MM-dd','en'),
      address: this.userHerlper.profile.address
    });
  }

  onSubmit(){
    const userProfile : UpdateProfile = {
      id: this.userHerlper.profile.id,
      firstName: this.updateProfileForm.get('firstName').value,
      lastName: this.updateProfileForm.get('lastName').value,
      birthday: this.updateProfileForm.get('birthday').value,
      address: this.updateProfileForm.get('address').value,
    }

    this.accountService.updateProfile(userProfile).subscribe(
      _ => {
        this.modalRef.close();
      },
      err => {
        this.updateProfileForm.setErrors({"server": +err.error});
      }
    );
  }
}
