// libraries
import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationStart } from "@angular/router";

// models
import { Door, Window, Wall, Building, Floor, WallTemp } from '../model/models'

// sevices
import { DataTrafficService } from '../service/dataTraffic/data-traffic.service'
import { CalculateService } from '../service/calculate/calculate.service';

@Component({
  selector: 'app-input-hole',
  templateUrl: './input-hole.component.html',
  styleUrls: ['./input-hole.component.css']
})
export class InputHoleComponent implements OnInit {

  currentBuilding = {
    id: 1, 
    name: "1#楼",
    data:{
        sumSurface: 0,
        sumVolume: 0,
    }
  }

  public availableDoorList: Array<Door>
  public availableWindowList: Array<Window>

  public buildingForm = this.fb.group({
    id: [''],
    name: [''],
    floors: this.fb.array([
    ])
  });

  constructor(
    public dataTrafficService: DataTrafficService,
    public fb: FormBuilder,
    public calculateService: CalculateService,
    public router: Router,
  ) {  
  }
  
  get walls(): FormGroup {
    return this.fb.group({
      id: [1],
      name: [''],
      thickness: [0], 
      totLengh: [0],
      beamDepth: [0.53],
      depUnderBoard: [6.68],
      preDeductable: this.fb.group({
          beamLength: [0],
          marginalHeight: [0]
      }),
      totalHole: [0],
      windowsDetail: this.fb.array([
        
      ]),
      doorDetail: this.fb.array([
      ]),
    });
  }

  ngOnInit(): void {
    this.loadDoorData();
    this.loadWindowData();

    if (this.dataTrafficService.haveBuildings) {
      this.loadBuildingData()
    }
    if (this.dataTrafficService.havebuildingData) {
      this.currentBuilding = this.dataTrafficService.getCurrentBuildingData()
    }
  }

  public deleteDoor(wall, doorIndex): void {
    wall.get("doorDetail").removeAt(doorIndex);
  }

  public deleteWindow(wall, windowIndex): void {
    wall.get("windowsDetail").removeAt(windowIndex);
  }

  public onSelectDoor(doorName, doorControl) {
    // console.log(this.availableWallList[wallIndex]);
    console.log(doorControl);
    for (let index = 0; index < this.availableDoorList.length; index++) {
      const element = this.availableDoorList[index];
      if (element.name === doorName) {
        doorControl.patchValue({
          // name: this.availableWallList[wallIndex].name,
          data: {
            height: element.data.height,
            width: element.data.width
          }
        })
      }
    }
  }

  public onSelectWindow(windowName, windowrControl) {
    // console.log(this.availableWallList[wallIndex]);
    console.log(windowrControl);
    for (let index = 0; index < this.availableWindowList.length; index++) {
      const element = this.availableWindowList[index];
      if (element.name === windowName) {
        windowrControl.patchValue({
          // name: this.availableWallList[wallIndex].name,
          data: {
            height: element.data.height,
            width: element.data.width
          }
        })
      }
    }
  }

  public addDoor(wall) {
    console.log(wall.get("doorDetail"));
    var newDoor= this.fb.group({
      id: [0],
      name: [''],
      count: [0],
      data: this.fb.group({
          height: [0],
          width: [0] 
      })
    })
    wall.get("doorDetail").push(newDoor);
  }

  public addWindow(wall) {
    console.log(wall);
    var newWindow= this.fb.group({
      id: [0],
      name: [''],
      count: [0],
      data: this.fb.group({
          height: [0],
          width: [0] 
      })
    });
    (wall.get("windowsDetail") as FormArray).push(newWindow);
  }

  public loadBuildingData(){
    const savedBuildingData = this.dataTrafficService.getBuildingData();
    console.log("checking saved form data:");
    console.log(savedBuildingData);

    for (let ifloor = 0; ifloor < savedBuildingData.floors.length; ifloor++) {
      const floor = savedBuildingData.floors[ifloor];
      this.addFloor();
      var floorControl = this.buildingForm.get("floors")['controls'][ifloor]

      for (let iwall = 0; iwall < floor.walls.length; iwall++) {
        const wall = floor.walls[iwall];
        this.addWall(floorControl);
        var wallControl = floorControl.get("walls")['controls'][iwall]

        for (let idoor = 0; idoor < wall.doorDetail.length; idoor++) {
          const door = wall.doorDetail[idoor];
          this.addDoor(wallControl);
        }
        for (let iwindow = 0; iwindow < wall.windowsDetail.length; iwindow++) {
          const door = wall.windowsDetail[iwindow];
          this.addWindow(wallControl);
        }

      }
    }

    this.buildingForm.patchValue(savedBuildingData);
  }

  async loadDoorData() {
    const hasDoor = this.dataTrafficService.haveDoors;
    console.log(hasDoor);
    if (hasDoor) {
      this.availableDoorList = this.dataTrafficService.getDoorData();
    } else {
      this.availableDoorList = await this.dataTrafficService.chamberDoorData();
    }
    console.log(this.availableDoorList);
  }

  async loadWindowData() {
    const haveWindows = this.dataTrafficService.haveWindows;
    console.log(haveWindows);
    if (haveWindows) {
      this.availableWindowList = this.dataTrafficService.getWindowData();
    } else {
      this.availableWindowList = await this.dataTrafficService.chamberWindowData();
    }
    console.log(this.availableWindowList);
  }

  public addFloor(): void {
    console.log("adding new floor");
    var newFloors= this.fb.group({
      id: [''],
      name: [''],
      walls: this.fb.array([
      ])
    });
    (this.buildingForm.get("floors") as FormArray).push(newFloors);
    console.log(this.buildingForm.get("floors"));
  }

  public deleteFloor(fIndex): void {
    (this.buildingForm.get("floors") as FormArray).removeAt(fIndex);
  }
  
  public addWall(targetFloor): void {
    console.log("adding new wall");
    targetFloor.get("walls").push(this.walls);
  }

  public deleteWall(floor, wallIndex): void {
    floor.get("walls").removeAt(wallIndex);
  }

  public formatData(preFormatData: any): Object {
    var formatedBuildingData = {
      id: preFormatData.id,
      name: preFormatData.name,
      data:{
        floors: []
      }
    }
    // processing Data
    for (let ifloor = 0; ifloor < preFormatData.floors.length; ifloor++) {
      const currfloor = preFormatData.floors[ifloor];
      // console.log(currfloor);
      var floorTemplate: Floor;

      floorTemplate = {
        id: currfloor.id,
        name: currfloor.name,
        data: {
          walls: []
        }
      }

      // processing Wall
      for (let iwall = 0; iwall < currfloor.walls.length; iwall++) {
        
        const currWall = currfloor.walls[iwall];
        // console.log(currWall);
        var wallTemplate: WallTemp;
        wallTemplate = {
          id: currWall.id,
          name: currWall.name,
          data: {
            // thickness: 100,
            thickness: Number(currWall.thickness),
            totLengh: Number(currWall.totLengh),
            beamDepth: Number(currWall.beamDepth),
            depUnderBoard: Number(currWall.depUnderBoard),
            preDeductable: {
                beamLength: Number(currWall.preDeductable.beamLength),
                marginalHeight: Number(currWall.preDeductable.marginalHeight),
            },
            doorAndWindow: {
                totalSize: 0,
                windowsDetail: [],
                doorDetail: []
            }
          } 
        }
        for (let index = 0; index < currWall.doorDetail.length; index++) {
          const currDoor = currWall.doorDetail[index];
          console.log(currDoor);
          var holeTemplate: Door;
          holeTemplate = {
            id: currDoor.id,
            name: currDoor.name,
            count: currDoor.count,
            data: {
              height: currDoor.data.height,
              width: currDoor.data.width
            }
          }
          wallTemplate.data.doorAndWindow.doorDetail.push(holeTemplate)
        }
        for (let index = 0; index < currWall.windowsDetail.length; index++) {
          const currWindow = currWall.windowsDetail[index];
          console.log(currWindow);
          var holeTemplate: Door;
          holeTemplate = {
            id: currWindow.id,
            name:'noName',
            count: 0,
            data: {
              height: 0,
              width: 0 
            }
          }
          wallTemplate.data.doorAndWindow.windowsDetail.push(holeTemplate)
        }
        floorTemplate.data.walls.push(wallTemplate)
      }
      formatedBuildingData.data.floors.push(floorTemplate);
    }
    console.log(formatedBuildingData);
    return formatedBuildingData
  }

  public calculateResult() {
    console.log("checking form data:");
    console.log(this.buildingForm.value);
    var buildingData = this.formatData(this.buildingForm.value);
    var calResult = {
      sumSurface: 0,
      sumVolume: 0,
    }
    this.calculateService.loadBuildingData(buildingData);
    calResult = this.calculateService.goCalculate();
    this.dataTrafficService.saveBuildingData(this.buildingForm.value);
    console.log("updating result");
    console.log(calResult);
    this.currentBuilding.data.sumSurface = calResult.sumSurface;
    this.currentBuilding.data.sumVolume = calResult.sumVolume;
    console.log(this.currentBuilding);
    // this.dataTrafficService.saveCurrentBuildingData(this.currentBuilding);
  }

  public onSelectWall(wallThickness, wallIndex) {
    wallIndex.patchValue({
      thickness: wallThickness
    })
  }

  public goNavigate(target: string) {
    this.router.navigate([target]);
  }
}
