import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})
export class NavibarComponent implements OnInit {

  constructor(
    public router: Router,
    private http: HttpClient,
  ) { } 

  ngOnInit(): void {
  }

  public gotoRoute(itemRoute: string) {
    // alert(itemRoute)
    this.router.navigate([itemRoute]);
  }

  public getRoute(itemRoute: string){
    if (this.router.url === itemRoute){
      return true
    } else {
      return false
    }
  }
}
