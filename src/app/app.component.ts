import { MediaMatcher } from '@angular/cdk/layout';
import { Component, Input, ViewChild } from '@angular/core';
import {ChangeDetectorRef, OnDestroy} from '@angular/core'; 
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

export interface StateGroup {
  letter: string;
  checked: boolean;
  names: string[];
  index: number;
  visibility: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'verdisaitask';  
  states = new FormControl();
  stateRecord:any = [];
  isExpandCategory:boolean[] = [];
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger | undefined;
  @ViewChild('search') search:any;
  currentSelectedMenu:string = "";

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    
  }
  counter(){
    return new Array(4);
  }
  level1Click(e:any){
    console.log(e.target.innerHTML);
    (document.querySelectorAll('li')).forEach(element => {
      if(element.classList.contains('active')){
        element.classList.remove('active');
      }
    });
    e.target.classList.toggle('active');
    this.currentSelectedMenu = e.target.innerText;
  }

  expandDocumentTypes(group: any) {
    console.log("expanding dropdown", group);
    this.isExpandCategory[group.index] = !this.isExpandCategory[group.index]; 
  }

  toggleSelection(event:any, name: any, group: any) { 
    console.log("toggleSelection", name, event.checked, group);
    if(event.checked) {
      console.log("stastateRecordtelist", this.stateRecord);
      this.stateRecord.push(name);
      this.states.setValue(this.stateRecord);
      if(this.stateList.filter((x)=>  { return  x.letter === group.letter})[0].names.length === group.names.length){
        console.log("Need to enable Main ");
      }
      console.log("toggleselection ", this.states.value);
    }
    else {
        this.stateRecord = this.stateRecord.filter((x:any) => x!== name);
        console.log("else toggleselection", name, group, this.states.value);
        this.states.setValue(this.states.value.filter((x:any) => x!== name));
        console.log("after filter ", this.states.value);
        //this.states.setValue([]);
    }
  }

  toggleParent(event: any, group: any) { 
    group.checked = event.checked;
    console.log("event", event.checked, "group", group, "states value", this.states.value);
    let states = this.states.value;
    states = states ? states : [];
    if(event.checked) {
      states.push(...group.names)
      states = [... new Set(states)];
    } else {
      console.log("else", states);
      group.names.forEach((x: string) => {
          if(states.indexOf(x) > -1) {
            states.splice(states.indexOf(x), 1)
          }
        });
    }
    this.states.setValue(states);
    console.log("statesvalue", this.states.value);
      if(!event.checked) {
          this.states.setValue(this.states.value.filter((x:any) => !x.includes(group.names)))
        //this.states.setValue([]);
    }
    this.stateRecord = this.states.value;
    console.log("final statesvalue", this.states.value);
  }

  stateList: StateGroup[] = [{
    letter: 'Main Option 1',
    checked: false,
    index: 0,
    visibility: true,
    names: ['Option 1.1', 'Option 1.2', 'Option 1.3']
  }, {
    letter: 'Main Option 2',
     checked: false,
     index: 1,
    visibility: true,
    names: ['Option 2.1', 'Option 2.2', 'Option 2.3']
  }, {
    letter: 'Main Option 3',
     checked: false,
     index: 2,
     visibility: true,
    names: ['Option 3.1', 'Option 3.2', 'Option 3.3']
  }, {
    letter: 'Main Option 4',
     checked: false,
     index: 3,
     visibility: true,
    names: ['Option 4.1', 'Option 4.2', 'Option 4.3']
  }];

  searchbar(event:Event){ 
    const currentFalseList = this.stateList.filter((x)=>{ return !x.letter.includes(this.search.nativeElement.value) });
    currentFalseList.forEach((x)=>{
      x.visibility = false;
    })
    const currentTrueList = this.stateList.filter((x)=>{ return x.letter.includes(this.search.nativeElement.value) });
    currentTrueList.forEach((x)=>{
      x.visibility = true;
    })
  }

  ngOnDestroy(): void { 
  }

  ngOnInit(){
    this.autocomplete?.openPanel(); 
  }

  ngAfterViewInit(){
    console.log(this.autocomplete);
  }
}
