// libraries
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CalculateService } from '../calculate/calculate.service' 

// models 
import { Door, Window, Wall, Building, dataExchangeObj } from '../../model/models'


@Injectable({
  providedIn: 'root'
})
export class DataTrafficService {

  private wallData = { }
  private doorData = { }
  private windowData = { }

  private inputDdata = { }

  constructor(
    public CalculateService: CalculateService,
    private http: HttpClient, 
  ) { }

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
