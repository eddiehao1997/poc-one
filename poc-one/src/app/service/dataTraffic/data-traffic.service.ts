// libraries
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// models 
import { Door, Window, Wall, WallTemp, Building, dataExchangeObj } from '../../model/models'
import { element } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class DataTrafficService {

  private wallData: Array<Wall>;
  private doorData: Array<Door>;
  private windowData: Array<Window>;

  public haveWalls: boolean;
  public haveDoors: boolean;
  public haveWindows: boolean;

  private inputDdata = []

  constructor(
    private http: HttpClient, 
  ) { 
    this.haveDoors = false;
    this.haveWalls = false;
    this.haveWindows = false;
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
