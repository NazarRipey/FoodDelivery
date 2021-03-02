import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  toggleNavbar = true;
  toggleSort = true;

  sorts = ["price", "name", "rating"];
  pageSizes = [3, 6, 9, 12, 15];

  sortType;
  currentPage;
  pageSize;
  public searchParameter: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params.page ? +params.page : 1;
      this.pageSize = params.pageSize ? +params.pageSize : 3;
      this.sortType = params.sortType ? params.perPage : "Popular";
    });
  }

  changeSort(sort){
    
  }

  changeItemsPerPage(perPage){
   //this.router.navigateByUrl("/", {skipLocationChange: true})
  }

  onSubmit(){
    alert(this.searchParameter);
  }
}
