// libraries
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

// models
import { Wall } from '../model/models'

// sevices
import { DataTrafficService } from '../service/dataTraffic/data-traffic.service'

@Component({
  selector: 'app-wall-management',
  templateUrl: './wall-management.component.html',
  styleUrls: ['./wall-management.component.css']
})
export class WallManagementComponent implements OnInit {

  public wallData = [
  ]

  public wallForm;

  public currentWall = {}

  public loadingData = true

  constructor(
    public dataTrafficService: DataTrafficService,
    private formBuilder: FormBuilder,
  ) { 
    this.initiateWallForm()
  }

  ngOnInit(): void {
    this.loadWallData();
  }

  async loadWallData() {
    this.loadingData = true;
    console.log("getting wall data")
    await this.dataTrafficService.loadData("demo-wall-data.json").then((res) => {
      console.log("logging this.gisgameService.bootGisgame response");
      console.log(res);
      this.wallData = res.data
    });
    this.loadingData = false;
  }

  public updateWallData() {
    alert("currently un available")
    return true
  }

  public selectWall(wall) {
    this.currentWall = wall
    this.wallForm = this.formBuilder.group({
      name: wall.name,
      thickness: wall.data.thickness
    })
  }

  private initiateWallForm() {
    this.wallForm = this.formBuilder.group({
      name: '',
      thickness: 0
    })
  }

  public onSubmit(customerData) {
    // Process wall edit data here
    // this.items = this.cartService.clearCart();
    this.wallForm.reset();

    console.warn('Your order has been submitted', customerData);
  }

  public editNewWall() {
    this.wallForm = this.formBuilder.group({
      name: '',
      thickness: 0
    });
    this.currentWall = {}
  }
}
