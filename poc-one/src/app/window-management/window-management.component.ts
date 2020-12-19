import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

// models
import { Window } from '../model/models'

// sevices
import { DataTrafficService } from '../service/dataTraffic/data-traffic.service'

@Component({
  selector: 'app-window-management',
  templateUrl: './window-management.component.html',
  styleUrls: ['./window-management.component.css']
})
export class WindowManagementComponent implements OnInit {

  public windowData = [
  ]

  public windowForm;

  public currentWindow = {}

  public loadingData = true

  constructor(
    public dataTrafficService: DataTrafficService,
    private formBuilder: FormBuilder,
  ) { 
    this.initiateWindowForm()
  }

  ngOnInit(): void {
    this.loadWallData();
  }

  async loadWallData() {
    this.loadingData = true;
    console.log("getting wall data")
    await this.dataTrafficService.loadData("demo-window-data.json").then((res) => {
      console.log("logging loadWallData() response");
      console.log(res);
      this.windowData = res.data
    });
    this.loadingData = false;
  }

  public updateWindowData() {
    alert("currently un available")
    return true
  }

  public selectWindow(wall) {
    this.currentWindow = wall
    this.windowForm = this.formBuilder.group({
      name: wall.name,
      thickness: wall.data.thickness
    })
  }

  private initiateWindowForm() {
    this.windowForm = this.formBuilder.group({
      name: '',
      height: 0,
      width: 0
    })
  }

  public onSubmit(customerData) {
    // Process wall edit data here
    // this.items = this.cartService.clearCart();
    this.windowForm.reset();

    console.warn('Your order has been submitted', customerData);
  }

  public editNewWindow() {
    this.windowForm = this.formBuilder.group({
      name: '',
      height: 0,
      width: 0
    });
    this.currentWindow = {}
  }

}
