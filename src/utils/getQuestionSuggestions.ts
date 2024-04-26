import type { QuestionSuggestionType } from '@/types/QuestionSuggestionType';
import type { QuizDataType } from '@/types/QuizDataType';
import { ref } from 'vue';

const questionId = ref(0);

export const getQuestionSuggestions = (levelQuestions: QuizDataType[], answer: string) => {
    const suggestions = levelQuestions.map((q) => q.number)
        .filter((v) => v !== answer)
        .toSorted(() => 0.5 - Math.random())
        .slice(0, 3);

    return [answer, ...suggestions]
        .toSorted(() => 0.5 - Math.random())
        .map<QuestionSuggestionType>((v) => {
            return {
                id: questionId.value++,
                value: v
            };
        });
};
