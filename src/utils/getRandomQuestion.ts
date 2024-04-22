import type { QuizDataType } from '@/types/QuizDataType';

export const getRandomQuestion = (questions: QuizDataType[]) => {
    if (questions.length === 0) return null;

    const min = Math.ceil(0);
    const max = questions.length - 1;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    const pickedQuestion = questions[randomIndex]!;
    questions.splice(randomIndex, 1);

    return pickedQuestion;
};
