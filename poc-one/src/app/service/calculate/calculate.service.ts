import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  public buildingData: any;

  constructor() { }

  public loadBuildingData(incomingBuildingData: any) {
    this.buildingData = incomingBuildingData;
  }

  /**
   * 依据buildingData计算墙面面积及体积
   */
  public goCalculate() {
    var calResult = {
      sumSurface: 0,
      sumVolume: 0,
    }

    // 楼层数组
    var floorList = this.buildingData.data.floors;

    var tempResult: Array<any>;
    console.log("checking floorList:")
    console.log(floorList);

    /**
     * 1. 计算不同墙面的总面积 = S3 = totLength * depUnderBoard
     * 2. 计算不同楼层、不同墙上的门窗面积总和 = S1
     * 3. 计算不同墙上的梁占面积 = S2
     * 4. 计算不同墙面的净面积 = S3 - S2 - S1
     * 5. 计算不同墙面的体积 = 不同墙面.s3 * 不同墙面.thickness
     * 6. 按墙面类型累加体积、面积
     */

    tempResult = [];
    for (let index = 0; index < floorList.length; index++) {
      // 当前楼层
      const currFloor = floorList[index];
      // 当前楼层的墙面数组
      var wallList = currFloor.data.walls;
      for (let index = 0; index < wallList.length; index++) {
        // 当前墙面
        const currWall = wallList[index]; 
        // 暂存当前墙面的面积
        var currWallResult = {
          area: this.calCurrWallArea(currWall),
          thickness: currWall.data.thickness,
        }
        calResult.sumSurface += currWallResult.area;
        tempResult.push(currWallResult);
      }
    }

    // 依据上述面积计算结果计算墙面体积
    for (let index = 0; index < tempResult.length; index++) {
      const wall = tempResult[index];
      calResult.sumVolume += (wall.area * wall.thickness) / 100;
    }
    
    return calResult
  }

  /**
   * 计算某一面墙的面积
   * @param currWall 待计算的墙面的实例
   */
  public calCurrWallArea(currWall): number {
    console.log("checking wall data: ");
    console.log(currWall);
    var wallArea = 0;
    var wallDataObj = currWall.data;
    // 总面积
    wallArea += wallDataObj.totLengh * wallDataObj.depUnderBoard;
    console.log("总面积");
    console.log(wallArea);
    // 扣除梁占面积
    wallArea -= wallDataObj.beamDepth * wallDataObj.preDeductable.beamLength;
    console.log("扣除梁占面积");
    console.log(wallArea);
    // 依次扣除门窗面积
    var doorAndWindow = wallDataObj.doorAndWindow.windowsDetail.concat(wallDataObj.doorAndWindow.doorDetail);
    for (let index = 0; index < doorAndWindow.length; index++) {
      const hole = doorAndWindow[index];
      console.log(hole);
      console.log((hole.data.width * hole.data.height * hole.count) / 100)
      wallArea -= (hole.data.width * hole.data.height * hole.count) / 100
    }
    console.log("依次扣除门窗面积");
    console.log(wallArea);
    return wallArea
  }
}
