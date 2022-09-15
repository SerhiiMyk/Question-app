import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../../interfaces/question.interface';
import { QuestionnaireService } from '../../services/questionnaire.service';

@Component({
  selector: 'app-questions-list-page',
  templateUrl: './questions-list-page.component.html',
  styleUrls: ['./questions-list-page.component.scss']
})
export class QuestionsListPageComponent implements OnInit {

  public questionnaireAnswered!: IQuestion[];
  public questionnaireUnanswered!: IQuestion[];

  constructor(private questionnaireService: QuestionnaireService) {
  }

  ngOnInit(): void {
    this.getQuestionnaire();
  }

  onEmitAnswer(question: IQuestion) {
    this.questionnaireService.updateQuestionnaireData(question);
    this.getQuestionnaire();
  }

  getQuestionnaire() {
    this.questionnaireAnswered = [...this.questionnaireService._questionnaireData.filter(question => question.answerStatus)];
    this.questionnaireUnanswered = [...this.questionnaireService._questionnaireData.filter(question => !question.answerStatus)];
  }
}
