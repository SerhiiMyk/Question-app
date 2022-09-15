import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQuestion } from '../../interfaces/question.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { alphabetEnum } from '../../enums/questionnaire.enums';

@Component({
  selector: 'app-single-answer',
  templateUrl: './single-answer.component.html',
  styleUrls: ['./single-answer.component.scss']
})
export class SingleAnswerComponent implements OnInit {
  @Input() question!: IQuestion;
  @Input() disable = false;
  @Output() emitAnswer: EventEmitter<IQuestion> = new EventEmitter();

  public buttonName = 'answer';
  public form = new FormGroup({
    answer: new FormControl('', Validators.required),
  });
  public alphabetArray = Object.keys(alphabetEnum).filter((key: any) => !isNaN(Number(alphabetEnum[key])));

  ngOnInit(): void {
    if (this.disable) {
      this.form.get('answer')?.setValue(this.question.userAnswer[0]);
      this.buttonName = 'roll back';
    }
  }

  onSubmit() {
    let emitObj = { ...this.question, userAnswer: !this.disable ? this.form.value.answer : [] };
    emitObj.answerStatus = !this.disable;
    this.emitAnswer.emit(emitObj);
  }
}
