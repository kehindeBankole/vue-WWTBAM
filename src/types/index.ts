export interface Question {
  text: string;
  options: {
    isCorrect: boolean;
    text: string;
  }[];
}
