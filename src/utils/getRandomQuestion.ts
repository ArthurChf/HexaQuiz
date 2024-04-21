import type { QuizDataType } from '@/types/QuizDataType';

export const getRandomQuestion = (questions: QuizDataType[]) => {
    const min = Math.ceil(0);
    const max = Math.floor(9);
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    const pickedQuestion = questions[randomIndex];
    questions.splice(randomIndex, 1);

    return pickedQuestion;
};
