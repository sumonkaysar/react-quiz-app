import { getDatabase, ref, set } from 'firebase/database';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useQuestions from '../../hooks/useQuestions';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';

const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case 'questions':
            action.value.forEach((question) => {
                // eslint-disable-next-line no-return-assign
                question.options.forEach((option) => (option.checked = false));
            });
            return action.value;
        case 'answer':
            // eslint-disable-next-line no-case-declarations
            const questions = _.cloneDeep(state);
            questions[action.questionId].options[action.optionIndex].checked = action.value;

            return questions;
        default:
            return state;
    }
};

export default function Quiz() {
    const { id } = useParams();
    const { loading, error, questions } = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [qna, dispatch] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { videoTitle } = state;

    useEffect(() => {
        dispatch({
            type: 'questions',
            value: questions,
        });
    }, [questions]);

    function handleAnswerChange(e, index) {
        dispatch({
            type: 'answer',
            questionId: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        });
    }

    // handle when user clicks next button to get next questions
    function nextQuestion() {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prevCurrent) => prevCurrent + 1);
        }
    }

    // handle when user clicks prev button to get prev questions
    function prevQuestion() {
        if (currentQuestion >= 1 && currentQuestion <= questions.length) {
            setCurrentQuestion((prevCurrent) => prevCurrent - 1);
        }
    }

    // calculate percentage of progress
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    // submit quiz
    async function submitQuiz() {
        const { uid } = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);
        await set(resultRef, {
            [id]: qna,
        });
        navigate(`/result/${id}`, { state: { qna } });
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error!</div>}
            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers
                        input
                        options={qna[currentQuestion].options}
                        handleChange={handleAnswerChange}
                    />
                    <ProgressBar
                        next={nextQuestion}
                        prev={prevQuestion}
                        progress={percentage}
                        submit={submitQuiz}
                    />
                    <MiniPlayer id={id} title={videoTitle} />
                </>
            )}
        </>
    );
}
