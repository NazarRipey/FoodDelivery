import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input()
  confirmMessage: string;

  @Input()
  confirmHeader: string;

  constructor(public modalRef: NgbActiveModal) { }

  ngOnInit(): void {
  }

  yesClicked(){
    this.modalRef.close(true);
  }

  noClicked(){
    this.modalRef.close(false);
  }
}
