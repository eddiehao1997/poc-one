import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

// models
import { Door } from '../model/models'

// sevices
import { DataTrafficService } from '../service/dataTraffic/data-traffic.service'

@Component({
  selector: 'app-door-management',
  templateUrl: './door-management.component.html',
  styleUrls: ['./door-management.component.css']
})
export class DoorManagementComponent implements OnInit {

  public doorData = [];

  public doorForm: any;

  public currentDoor: Door;

  public loadingData = true;

  constructor(
    public dataTrafficService: DataTrafficService,
    private formBuilder: FormBuilder,
    
  ) { 
    this.initiateDoorForm();
    this.loadDoorData();
  }

  ngOnInit(): void {
  }

  async loadDoorData() {
    this.loadingData = true;
    console.log("getting door data"); 
    if (this.dataTrafficService.haveDoors) {
      this.doorData = this.dataTrafficService.getDoorData();
    } else {
      this.doorData = await this.dataTrafficService.chamberDoorData();
    }
    this.loadingData = false;
  }

  public updateDoorData() {
    alert("currently unavailable")
    return true
  }

  private initiateDoorForm() {
    this.doorForm = this.formBuilder.group({
      id: 0,
      name: '',
      height: 0,
      width: 0
    })
  }

  public selectDoor(door) {
    this.currentDoor = door;
    this.doorForm = this.formBuilder.group({
      id: door.id,
      name: door.name,
      height: door.data.height,
      width: door.data.width
    })
  }

  public editNewDoor() {
    this.currentDoor = {
      "id": this.doorData.length + 1,
      "name": "新门洞",
      "data":{
          "height": 0,
          "width": 0
      }
    }

    this.doorForm = this.formBuilder.group({
      id: this.doorData.length + 1,
      name: '',
      height: '',
      width: ''
    });

    this.dataTrafficService.addNewDoor(this.currentDoor);
    this.doorData = this.dataTrafficService.getDoorData();
  }

  public onSubmit(customerData) {
    console.warn('Your order has been submitted', customerData);
    this.currentDoor = {
      "id": customerData.id,
      "name": customerData.name,
      "data":{
          "height": customerData.height,
          "width": customerData.width
      }
    }

    for (let index = 0; index < this.doorData.length; index++) {
      const element = this.doorData[index];
      if (element.id === customerData.id) {
        this.doorData[index] = this.currentDoor;
      }
    }
    // this.doorForm.reset();
  }


}
