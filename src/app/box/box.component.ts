import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { max } from 'rxjs';

/**
 * TODO:
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
   * @description This function takes the value of the button(saved in button id via html), and adds it to the total
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
        this.onMinEvent();
      }
    } 

    if(this.derivedValues.length == 1){
      if(selectedValue == 1){
        //trigger 1 event
      }else{
        this.onPerfectEvent();
      }
    }

    this.genAndAssignVals();
    this.scrollToBottom();
  }

  /**
   * @description Shuffles given array.
   * @param arr 
   * @returns number[]
   */
  derivedValuesShuffler(arr: number[]): number[]{
    const arrTemp = arr;
    for (let i = arrTemp.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [arrTemp[i], arrTemp[j]] = [arrTemp[j], arrTemp[i]]; 
    } 
    return arrTemp; 
  }

  /**
   * @description Creates a string version of the array.
   * @param arr 
   * @returns 
   */
  derivedValuesStringifier(arr: number[]): string{
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

  /**
   * @description Displays the choice of numbers user can select from.
   * @param stringifiedDerivedValues 
   */
  genPreChoiceLog(stringifiedDerivedValues: string){
    this.logBoxArray.push("You are choosing one of these numbers: " + stringifiedDerivedValues);
  }

  /**
   * @description Clears the choice text, making way for the display text that shows the chosen number.
   */
  clearPreChoiceLog(){
    this.logBoxArray.pop();
  }

  /**
   * @description Displays what number the user has selected, out of possible choices.
   */
  genPostChoiceLog(buttonId: string, stringifiedDerivedValues: string){
    
    var buttonIdNumber = parseInt(buttonId);
    var x: string = `You rolled ${this.derivedValues[buttonIdNumber]} out of ${stringifiedDerivedValues}`;
    this.logBoxArray.push(x);
    console.log(this.logBoxArray[0])
  }

  /**
   * @description Scroll utility.
   */
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

  /**
   * @description Awards player by incrementing ceiling value when they choose highest value.
   * @param max 
   */
  onMaxEvent(max: number){
    this.genCeiling += max;
    this.logBoxArray.push(`You selected the highest value! The ceiling value has been incremented by ${max}!`);
  }

  /**
   * @description Punishes player when they select the lowest value by quartering veiling value.
   */
  onMinEvent(){
    this.genCeiling = this.genCeiling/4;
    this.genCeiling = Math.round(this.genCeiling);
    this.logBoxArray.push(`You selected the lowest value! The ceiling value has been quartered!`);
  }

  /**
   * @description Upon player getting lucky and drawing only one choice, i.e. the ceiling val, 
   * they are awarded and the ceiling value is squared.
   */
  onPerfectEvent(){
    this.genCeiling *= this.genCeiling;
    this.logBoxArray.push(`You got lucky! The ceiling value has been squared!`);
  }

  /**
   * @description Application was looping when ceiling value was set to 1, this function handles that by
   * giving the player grace.
  */
  onOneEvent(){
    this.genCeiling += 5;
    this.logBoxArray.push("You have gotten really unlucky huh, here take 5 :)")
  }

}
