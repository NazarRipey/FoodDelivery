import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(public modalRef: NgbActiveModal, private router: Router) { }

  logInForm = new FormGroup({
    email: new FormControl,
    password: new FormControl(),
    remember: new FormControl(),
  });

  ngOnInit(): void {
  }

  closeModal() {
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
