// libraries
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CalculateService } from '../calculate/calculate.service' 

// models 
import { Door, Window, Wall, WallTemp, Building, dataExchangeObj } from '../../model/models'
import { element } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class DataTrafficService {

  public currentBuildingData: {
    id: number, 
    name: string,
    data:{
        sumSurface: number,
        sumVolume: number,
    }
  }

  private wallData: Array<Wall>;
  private doorData: Array<Door>;
  private windowData: Array<Window>;
  private buildingData: any;

  public havebuildingData: boolean;
  public haveWalls: boolean;
  public haveDoors: boolean;
  public haveWindows: boolean;
  public haveBuildings: boolean;

  
  private inputDdata = []

  constructor(
    public CalculateService: CalculateService,
    private http: HttpClient, 
  ) { 
    this.havebuildingData = false;
    this.haveDoors = false;
    this.haveWalls = false;
    this.haveWindows = false;
    this.haveBuildings = false;
  }

  public getCurrentBuildingData() {
    return this.currentBuildingData
  }

  public saveCurrentBuildingData(currentBuildingData) {
    this.havebuildingData = true;
    this.currentBuildingData = currentBuildingData;
  }

  public getWallData() {
    return this.wallData
  }

  public getDoorData() {
    return this.doorData
  }

  public getWindowData() {
    return this.windowData
  }

  public getBuildingData() {
    return this.buildingData
  }

  async chamberWallData() {
    try {
      const response = await this.loadData("demo-wall-data.json");
      this.wallData = response.data;
      this.haveWalls = true;
      return this.wallData;
    } catch (error) {
      console.log(error);
    }
  }

  async chamberDoorData() {
    try {
      const response = await this.loadData("demo-door-data.json");
      this.doorData = response.data;
      this.haveDoors = true;
      return this.doorData
    } catch (error) {
      console.log(error);
    }
  }
  
  async chamberWindowData() {
    try {
      const response = await this.loadData("demo-window-data.json");
      this.windowData = response.data;
      this.haveWindows = true;
      return this.windowData
    } catch (error) {
      console.log(error);
    }
  }

  public saveBuildingData(buildingData) {
    this.haveBuildings = true;
    this.buildingData = buildingData;
  }

  public addNewWall(wall: Wall) {
    this.wallData.push(wall);
  }

  public addNewDoor(door: Door) {
    this.doorData.push(door);
  }

  public addNewWindow(window: Window) {
    this.windowData.push(window);
  }

  async loadData(file_name: string) {
    console.log(file_name);
    console.log('assets/demo-data/' + file_name);
    const data = await this.http.get<dataExchangeObj>('assets/demo-data/' + file_name).toPromise();
    try {
      if (!data) {
        alert("No data");
        return {
          msg: "No Data!",
          data: []
        };
      } else {
        return {
          msg: "success!",
          data: data.data
        }
      }
    } catch (e) {
      alert(e);
      return {
        msg: e,
        data: []
      }
    }
  }
}
