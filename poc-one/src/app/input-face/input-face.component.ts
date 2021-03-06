// libraries
import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

// models
import { Door, Window, Wall, Building, Floor, WallTemp } from '../model/models'

// sevices
import { DataTrafficService } from '../service/dataTraffic/data-traffic.service'
import { CalculateService } from '../service/calculate/calculate.service';


@Component({
  selector: 'app-input-face',
  templateUrl: './input-face.component.html',
  styleUrls: ['./input-face.component.css']
})
export class InputFaceComponent implements OnInit {

  public currentBuilding = {
    id: 1, 
    name: "1#楼",
    data:{
        sumSurface: 0,
        sumVolume: 0,
    }
  }

  public availableWallList: Array<Wall>

  public buildingForm = this.fb.group({
    id: [''],
    name: [''],
    floors: this.fb.array([
      this.fb.group({
        id: [1],
        name: [''],
        walls: this.fb.array([
          this.walls
        ])
      })
    ])
  });

  constructor(
    public dataTrafficService: DataTrafficService,
    public fb: FormBuilder,
    public calculateService: CalculateService
  ) {  
  }
  
  get walls(): FormGroup {
    return this.fb.group({
      id: [0],
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
    this.loadWallData();
    if (this.dataTrafficService.haveBuildings) {
      this.buildingForm = this.fb.group({
        id: [''],
        name: [''],
        floors: this.fb.array([
        ])
      });
      this.loadBuildingData()
    }

    if (this.dataTrafficService.havebuildingData) {
      this.currentBuilding = this.dataTrafficService.getCurrentBuildingData()
    }
  }

  public addDoor(wall) {
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
    var newWindow= this.fb.group({
      id: [0],
      name: [''],
      count: [0],
      data: this.fb.group({
          height: [0],
          width: [0] 
      })
    })
    wall.get("windowsDetail").push(newWindow);
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

  async loadWallData() {
    const hasWall = this.dataTrafficService.getWallData();
    if (hasWall) {
      this.availableWallList = this.dataTrafficService.getWallData();
    } else {
      this.availableWallList = await this.dataTrafficService.chamberWallData();
    }
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
          // console.log(currDoor);
          var holeTemplate: Door;
          holeTemplate = {
            id: currDoor.id,
            name:'noName',
            count: 0,
            data: {
              height: 0,
              width: 0 
            }
          }
          wallTemplate.data.doorAndWindow.doorDetail.push(holeTemplate)
        }
        for (let index = 0; index < currWall.windowsDetail.length; index++) {
          const currWindow = currWall.windowsDetail[index];
          // console.log(currWindow);
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
    this.dataTrafficService.saveCurrentBuildingData(this.currentBuilding);
  }

  public onSelectWall(wallIndex, wallControl) {
    // console.log(this.availableWallList[wallIndex]);
    console.log(wallControl);
    for (let index = 0; index < this.availableWallList.length; index++) {
      const element = this.availableWallList[index];
      if (element.name === wallIndex) {
        wallControl.patchValue({
          // name: this.availableWallList[wallIndex].name,
          thickness: element.data.thickness
        })
      }
    }
  }

}
