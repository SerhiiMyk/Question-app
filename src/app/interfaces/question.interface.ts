export interface IQuestion {
  id: string;
  questionText: string;
  type: string;
  answers: string[];
  creationDate: Date;
  answerStatus: boolean;
  userAnswer: any;
}

export interface IQuestionPart {
  questionText: string;
  type: string;
  answers: string[];
}
