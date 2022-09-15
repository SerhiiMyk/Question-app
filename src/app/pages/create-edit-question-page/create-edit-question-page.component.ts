import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestionPart } from '../../interfaces/question.interface';
import { alphabetEnum, types } from '../../enums/questionnaire.enums';

@Component({
  selector: 'app-create-edit-question-page',
  templateUrl: './create-edit-question-page.component.html',
  styleUrls: ['./create-edit-question-page.component.scss']
})
export class CreateEditQuestionPageComponent implements OnInit {

  public types = Object.keys(types).filter((key: any) => !isNaN(Number(types[key])));
  public alphabetArray = Object.keys(alphabetEnum).filter((key: any) => !isNaN(Number(alphabetEnum[key])));
  public form!: FormGroup;
  public showAnswersField = false;
  public answersFormArray!: AbstractControl[];

  private question: any;

  constructor(private questionnaireService: QuestionnaireService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      questionText: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      answers: new FormArray([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required)
      ]),
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.question = this.questionnaireService.getQuestionnaireById(id);
      this.form.controls['questionText'].setValue(this.question.questionText);
      this.form.controls['type'].setValue(this.question.type);
      this.form.controls['answers'] = new FormArray(this.question.answers.map((answer: IQuestionPart) => new FormControl(answer, Validators.required)));
      this.showAnswersField = this.question.type === 'single choice' || this.question.type === 'multiple choice';
    }
    this.answersFormArray = (this.form.controls['answers'] as FormArray).controls;
  }

  onSubmit() {
    const questionObj: IQuestionPart = this.form.getRawValue();
    if (this.question) {
      this.questionnaireService.editQuestion(questionObj, this.question.id);
    } else {
      this.questionnaireService.addQuestion(questionObj);
    }
    this.router.navigate(['/management-question']);
  }

  onRadioBtnChange(type: string) {
    this.showAnswersField = type === 'single choice' || type === 'multiple choice';
  }

  removeAnswerControl(index: number) {
    if ((this.form.controls['answers'] as FormArray).controls.length > 2) {
      (this.form.controls['answers'] as FormArray).removeAt(index);
    }
  }

  addAnswerControl() {
    if ((this.form.controls['answers'] as FormArray).controls.length < 5) {
      (this.form.controls['answers'] as FormArray).push(new FormControl('', Validators.required));
    }
  }
}
