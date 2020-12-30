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

  public currentWall: Wall;

  public loadingData = true

  constructor(
    public dataTrafficService: DataTrafficService,
    private formBuilder: FormBuilder,
  ) { 
    this.initiateWallForm();
    this.loadWallData()
  }

  ngOnInit(): void {
    // this.loadWallData();
  }

  private initiateWallForm() {
    this.wallForm = this.formBuilder.group({
      id: 0,
      name: '',
      thickness: 0
    })
  }

  async loadWallData() {
    this.loadingData = true;
    console.log("getting wall data");
    if (this.dataTrafficService.haveWalls){
      this.wallData = this.dataTrafficService.getWallData();
    } else {
      this.wallData = await this.dataTrafficService.chamberWallData();
    }
    this.loadingData = false;
  }

  public updateWallData() {
    alert("currently un available")
    return true
  }

  public selectWall(wall) {
    this.currentWall = wall
    this.wallForm = this.formBuilder.group({
      id: wall.id,
      name: wall.name,
      thickness: wall.data.thickness
    })
  }

  public editNewWall() {
    this.currentWall = {
      "id": this.wallData.length + 1,
      "name": "新墙面",
      "data":{
          "thickness": 0,
      }
    }

    this.wallForm = this.formBuilder.group({
      id: this.wallData.length + 1,
      name: '',
      thickness: ''
    });

    this.dataTrafficService.addNewWall(this.currentWall);
    this.wallData = this.dataTrafficService.getWallData();
  }
  
  public onSubmit(customerData) {
    console.warn('Your order has been submitted', customerData);
    this.currentWall = {
      "id": customerData.id,
      "name": customerData.name,
      "data":{
        "thickness": customerData.thickness,
      }
    }

    for (let index = 0; index < this.wallData.length; index++) {
      const element = this.wallData[index];
      if (element.id === customerData.id) {
        this.wallData[index] = this.currentWall;
      }
    }

    // this.wallForm.reset();
  }

}
