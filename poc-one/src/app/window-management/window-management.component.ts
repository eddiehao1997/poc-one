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

  public windowData = [];

  public windowForm: any;

  public currentWindow: Window;

  public loadingData = true;

  constructor(
    public dataTrafficService: DataTrafficService,
    private formBuilder: FormBuilder,
  ) { 
    this.initiateWindowForm();
    this.loadWindowData();
  }

  ngOnInit(): void {
    // this.loadWallData();
  }

  private initiateWindowForm() {
    this.windowForm = this.formBuilder.group({
      id: 0,
      name: '',
      height: 0,
      width: 0
    })
  }

  async loadWindowData() {
    this.loadingData = true;
    console.log("getting window data")
    if (this.dataTrafficService.haveWindows) {
      this.windowData = this.dataTrafficService.getWindowData();
    } else {
      this.windowData = await this.dataTrafficService.chamberWindowData();
    }
    this.loadingData = false;
  }

  public updateWindowData() {
    alert("currently unavailable")
    return true
  }

  public selectWindow(wall) {
    this.currentWindow = wall
    this.windowForm = this.formBuilder.group({
      id: wall.id,
      name: wall.name,
      height: wall.data.height,
      width: wall.data.width
    })
  }

  public editNewWindow() {
    this.currentWindow = {
      "id": this.windowData.length + 1,
      "name": "新窗口",
      "data":{
          "height": 0,
          "width": 0
      }
    }

    this.windowForm = this.formBuilder.group({
      id: this.windowData.length + 1,
      name: '',
      height: '',
      width: ''
    });
    
    this.dataTrafficService.addNewWindow(this.currentWindow);
    this.windowData = this.dataTrafficService.getWindowData();
  }

  public onSubmit(customerData) {
    console.warn('Your order has been submitted', customerData);
    this.currentWindow = {
      "id": customerData.id,
      "name": customerData.name,
      "data":{
          "height": customerData.height,
          "width": customerData.width
      }
    }

    for (let index = 0; index < this.windowData.length; index++) {
      const element = this.windowData[index];
      if (element.id === customerData.id) {
        this.windowData[index] = this.currentWindow;
      }
    }

    
  }

}
