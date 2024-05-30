import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { max } from 'rxjs';

/**
 * TODO:update comments
 * TODO:Add option to increase totalFactor
 * TODO:Make it so that if they choose the highest number, genCEil is incremented by said num,
 * and if they select the lowest number, genCeil is decremented by thatt value.
 */

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  genCeiling: number = 50;
  principalValue: number = 0;
  derivedValues: number[] = [];
  logBoxArray: string[] = [];
  @ViewChild('scroll') scrollContainer!: ElementRef;

  ngOnInit() {
    this.genAndAssignVals();
  }

  /**
   * @description This function generates random values, in such a way that they always add up to 50. 
   * These values are pushed to derived values. The function also clears the said array 
   * before generating new 
   * values.
   */
  genAndAssignVals() {
    var sum: number = 0;
    var factor: number = this.genCeiling;

    this.derivedValues.length = 0;

    while (sum < this.genCeiling) {
      var temp = this.randomIntFromInterval(1, factor);
      this.derivedValues.push(temp);
      sum += temp;
      factor = factor - temp;
    }

    this.genPreChoiceLog((this.derivedValuesStringifier(this.derivedValues)));
    //this.preChoiceClear();
  }

  /**
   * @description This function return a random integer in the given limits.
   * @param min 
   * @param max 
   * @returns integer
   */
  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * This function takes the value of the button(saved in button id via html), and adds it to the total
   * factor
   * @param event 
   */
  activateVal(event: Event): void {
    const buttonId = (event.target as HTMLElement).id;
    var selectedValue = this.derivedValues[parseInt(buttonId)]
    this.principalValue = this.principalValue + selectedValue;

    this.clearPreChoiceLog();
    this.genPostChoiceLog(buttonId, this.derivedValuesStringifier(this.derivedValues));

    if(this.derivedValues.length > 1){
      if(selectedValue == Math.max(...this.derivedValues)){
        this.onMaxEvent(selectedValue);
      }
  
      if(selectedValue == Math.min(...this.derivedValues)){
        this.onMinEvent(selectedValue);
      }
    } 

    this.genAndAssignVals();
    this.scrollToBottom();
  }

  derivedValuesShuffler(arr: number[]){
    const arrTemp = arr;
    for (let i = arrTemp.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [arrTemp[i], arrTemp[j]] = [arrTemp[j], arrTemp[i]]; 
    } 
    return arrTemp; 
  }

  derivedValuesStringifier(arr: number[]){
    var a: string = "";
    const arrTemp = this.derivedValuesShuffler(arr);

    arrTemp.forEach(function(value, index){
      a += value.toString();
      if(index < arr.length-1){
        a += ", ";
      }
    });
    return a;
  }

  genPreChoiceLog(stringifiedDerivedValues: string){
    this.logBoxArray.push("You are choosing one of these numbers: " + stringifiedDerivedValues);
  }

  clearPreChoiceLog(){
    this.logBoxArray.pop();
  }

  genPostChoiceLog(buttonId: string, stringifiedDerivedValues: string){
    
    var buttonIdNumber = parseInt(buttonId);
    var x: string = `You rolled ${this.derivedValues[buttonIdNumber]} out of ${stringifiedDerivedValues}`;
    this.logBoxArray.push(x);
    console.log(this.logBoxArray[0])
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      try {
        setTimeout(() => {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        }, 100); // 100 milliseconds delay to ensure the DOM has rendered the new content
      } catch (err) {
        console.error(`Error scrolling to bottom: ${err}`);
      }
    }
  }

  onMaxEvent(max: number){
    this.genCeiling += max;
    this.logBoxArray.push(`You selected the highest value! The ceiling value has been incremented by ${max}`);
  }

  onMinEvent(min: number){
    this.genCeiling -= min;
    this.logBoxArray.push(`You selected the lowest value! The ceiling value has been incremented by ${min}`);
  }

}
