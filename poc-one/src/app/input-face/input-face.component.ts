// libraries
import { Component, OnInit } from '@angular/core';

// models
import { Door, Window, Wall, Building } from '../model/models'

// sevices
import { DataTrafficService } from '../service/dataTraffic/data-traffic.service'

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
                        totLengh: 0,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 0,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  },
                  {
                    id: 0, 
                    name: "100", 
                    data:{
                        thickness: 100, 
                        totLengh: 24.2,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 5.8,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  },
                  {
                    id: 0, 
                    name: "120", 
                    data:{
                        thickness: 120, 
                        totLengh: 261.75,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 136.25,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  },
                  {
                    id: 0, 
                    name: "120外墙", 
                    data:{
                        thickness: 120, 
                        totLengh: 7.6,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 7.6,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  }
                ]
            }
          }, 
          {
            id: 1,
            name: "1F",
            data: {
                walls: [
                  {
                    id: 0, 
                    name: "80+80", 
                    data:{
                        thickness: 80, 
                        totLengh: 0,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 0,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  },
                  {
                    id: 0, 
                    name: "100", 
                    data:{
                        thickness: 100, 
                        totLengh: 24.2,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 5.8,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  },
                  {
                    id: 0, 
                    name: "120", 
                    data:{
                        thickness: 120, 
                        totLengh: 261.75,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 136.25,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  },
                  {
                    id: 0, 
                    name: "120外墙", 
                    data:{
                        thickness: 120, 
                        totLengh: 7.6,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 7.6,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  }
                ]
            }
          },
          {
            id: 1,
            name: "2F",
            data: {
                walls: [
                  {
                    id: 0, 
                    name: "80+80", 
                    data:{
                        thickness: 80, 
                        totLengh: 0,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 0,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  },
                  {
                    id: 0, 
                    name: "100", 
                    data:{
                        thickness: 100, 
                        totLengh: 24.2,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 5.8,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  },
                  {
                    id: 0, 
                    name: "120", 
                    data:{
                        thickness: 120, 
                        totLengh: 261.75,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 136.25,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
                            doorDetail: []
                        }
                    } 
                  },
                  {
                    id: 0, 
                    name: "120外墙", 
                    data:{
                        thickness: 120, 
                        totLengh: 7.6,
                        beamDepth: 0.53,
                        depUnderBoard: 6.68,
                        preDeductable: {
                            beamLengh: 7.6,
                            marginalHeight: 0
                        },
                        doorAndWindow: {
                            totalSize: 0,
                            windowsDetail: [],
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

}
