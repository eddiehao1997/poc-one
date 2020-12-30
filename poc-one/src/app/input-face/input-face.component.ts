// libraries
import { Component, OnInit } from '@angular/core';

// models
import { Door, Window, Wall, Building } from '../model/models'

// sevices
import { DataTrafficService } from '../service/dataTraffic/data-traffic.service'
import { CalculateService } from '../service/calculate/calculate.service';


@Component({
  selector: 'app-input-face',
  templateUrl: './input-face.component.html',
  styleUrls: ['./input-face.component.css']
})
export class InputFaceComponent implements OnInit {

  currentBuilding = {
    id: 1, 
    name: "1#楼",
    data:{
        sumSurface: 11910.84,
        sumVolume: 1374.98,
        floor: [
          {
            id: 1,
            name: "B1",
            data: {
                walls: [
                  {
                    id: 0, 
                    name: "80+80", 
                    data:{
                        thickness: 80, 
                        totLengh: 100,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLength: 0,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [{
                              "id": 2,
                              "name": "24*27窗口",
                              "count": 1,
                              "data":{
                                  "height": 27,
                                  "width": 24
                              }
                          }],
                            doorDetail: []
                        }
                    } 
                  }
                ]
            }
          }
        ]
    }
  }

  constructor(
    public dataTrafficService: DataTrafficService,
    public calculateService: CalculateService
  ) { }



  ngOnInit(): void {
  }

  async loadWallData() {
    // await this.dataTrafficService.loadData("demo_wall_data.json").then((res) => {
    //   console.log("logging this.gisgameService.bootGisgame response");
    //   console.log(res);
    //   if (res === true) {
    //     console.log("Loading wall data success");
    //   } else {
    //     alert("Failed to load!");
    //   }
    // })
  }
  


  public calculateResult() {
    var calResult = {
      sumSurface: 0,
      sumVolume: 0,
    }
    this.calculateService.loadDemoData(this.currentBuilding);
    calResult = this.calculateService.goCalculate();

    console.log("updating result");
    console.log(calResult);
    this.currentBuilding.data.sumSurface = calResult.sumSurface;
    this.currentBuilding.data.sumVolume = calResult.sumVolume;
  }

}
