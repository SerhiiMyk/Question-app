import { Injectable } from '@angular/core';
import { IQuestion } from '../interfaces/question.interface';
import { LocalStorage } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  @LocalStorage(true, 'QUESTIONNAIRE', [])
  private questionnaireData: IQuestion[] = [
    {
      id: '1',
      questionText: 'question 1',
      type: 'open',
      answers: ['1', '2', '3'],
      creationDate: new Date(),
      answerStatus: false,
      userAnswer: [],
    }
  ];

  get _questionnaireData(): IQuestion[] {
    return this.questionnaireData;
  }

  deleteQuestion(id: string): IQuestion[] {
    this.questionnaireData = this.questionnaireData.filter(item => item.id !== id);
    return [...this.questionnaireData];
  }
}
