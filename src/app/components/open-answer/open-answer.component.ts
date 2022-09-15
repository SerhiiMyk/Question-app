import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQuestion } from '../../interfaces/question.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-open-answer',
  templateUrl: './open-answer.component.html',
  styleUrls: ['./open-answer.component.scss']
})
export class OpenAnswerComponent implements OnInit {

  @Input() question!: IQuestion;
  @Input() disable = false;
  @Output() emitAnswer: EventEmitter<IQuestion> = new EventEmitter();

  public buttonName = 'answer';
  public form = new FormGroup({
    answer: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });

  ngOnInit(): void {
    if (this.disable) {
      this.form.get('answer')?.setValue(this.question.userAnswer);
      this.buttonName = 'roll back';
    }
  }

  onSubmit() {
    let emitObj = { ...this.question, userAnswer: !this.disable ? this.form.value.answer : [] };
    emitObj.answerStatus = !this.disable;
    this.emitAnswer.emit(emitObj);
  }
}
