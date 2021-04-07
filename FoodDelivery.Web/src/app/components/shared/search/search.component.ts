import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  value: string;

  @Input()
  placeholder?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(searchPhrase){
    this.router.navigate([], {queryParams: {search: searchPhrase}, queryParamsHandling: 'merge'});
  }
}
