// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import useAnswers from '../../hooks/useAnswers';
import Analysis from '../Analysis';
import Summary from '../Summary';

export default function Result() {
    const { id } = useParams();
    const { state } = useLocation();
    // eslint-disable-next-line no-unused-vars
    const { qna } = state;

    const { loading, error, answers } = useAnswers(id);

    function calculate() {
        let score = 0;

        answers.forEach((question, index1) => {
            const correctIndexes = [];
            const checkedIndexes = [];

            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2);
                if (qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            });

            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score += 5;
            }
        });
        return score;
    }

    const userScore = calculate();

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error</div>}

            {answers && answers.length > 0 && (
                <>
                    <Summary score={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}
        </>
    );
}
