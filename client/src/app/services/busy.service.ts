import { R3TargetBinder } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
 busycount=0;
  constructor(private spinner:NgxSpinnerService) { }

  busy(){
    this.busycount++;
    this.spinner.show(undefined,{
      type:'line-scale-party',
      bdColor:'rgb(255,255,255,0)',
      color:'#333333'
    })
  }

  idle()
  {
    this.busycount--;
    if(this.busycount <= 0)
    {
      this.busycount=0;
      this.spinner.hide();
    }
  }
}
