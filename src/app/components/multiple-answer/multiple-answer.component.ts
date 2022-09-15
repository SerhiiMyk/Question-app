import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { IQuestion } from '../../interfaces/question.interface';
import { alphabetEnum } from '../../enums/questionnaire.enums';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-multiple-answer',
  templateUrl: './multiple-answer.component.html',
  styleUrls: ['./multiple-answer.component.scss']
})
export class MultipleAnswerComponent implements AfterViewInit, OnInit {

  @Input() question!: IQuestion;
  @Input() disable = false;
  @Output() emitAnswer: EventEmitter<IQuestion> = new EventEmitter();
  @ViewChildren('input') input!: any;

  public buttonName = 'answer';
  public answers = new FormArray([], Validators.required);
  public alphabetArray = Object.keys(alphabetEnum).filter((key: any) => !isNaN(Number(alphabetEnum[key])));

  ngOnInit(): void {
    if (this.disable) {
      this.buttonName = 'roll back';
    }
  }

  ngAfterViewInit(): void {
    if (this.disable) {
      this.input._results.forEach((item: ElementRef) => {
        if (this.question.userAnswer.includes(item.nativeElement.defaultValue)) {
          item.nativeElement.checked = true;
        }
      });
    }
  }

  onChangeCheckbox(name: string, e: Event) {
    if ((e.target as HTMLInputElement).checked) {
      this.answers.push(new FormControl(name));
    } else {
      let index = this.answers.controls.findIndex((index) => index.value == name);
      this.answers.removeAt(index);
    }
  }

  onSubmit() {
    let emitObj = { ...this.question, userAnswer: !this.disable ? this.answers.value : [] };
    emitObj.answerStatus = !this.disable;
    this.emitAnswer.emit(emitObj);
  }
}
