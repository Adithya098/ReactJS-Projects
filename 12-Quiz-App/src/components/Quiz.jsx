import { useState, useEffect, useCallback } from 'react';
import questions from '../questions.js';
import QuizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';

const TIMER = 3000;

export default function Quiz() {
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');
    let activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizisComplete = activeQuestionIndex === questions.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        const originalQuestion = questions[activeQuestionIndex];
        const correctAnswer = originalQuestion.answers[0];

        setAnswerState('answered');
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if (selectedAnswer === correctAnswer) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }
            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);

    const handleskip = () => handleSelectAnswer(null);

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    useEffect(() => {
        // Shuffle questions and their answers once when the component mounts
        const shuffled = questions.map(question => ({
            ...question,
            answers: shuffle([...question.answers])
        }));
        setShuffledQuestions(shuffled);
    }, []); // No dependencies since this should only run once on mount

    if (quizisComplete) {
        return (
            <div id='summary'>
                <img src={QuizCompleteImg} alt="Quiz Complete Logo" /> 
                <h2>Quiz Done</h2>
                <ul>
                {userAnswers.map((answer, index) => (
                    <li key={index}>
                        <p>
                            <span style={{ color: 'white' }}>
                                <b>Question:</b> {shuffledQuestions[index].text}
                            </span>
                            <br />
                            <span style={{ color: '#000000' }}>
                                <b>Your Answer:</b> {answer}
                            </span>
                            <br />
                            <span style={{ color: '#adf504' }}>
                                <b>Correct Answer:</b> {questions[index].answers[0]}
                            </span>
                            <br />
                            .................................
                        </p>

                    </li>
                ))}
                </ul>
            </div>
        );
    } else {
        if (shuffledQuestions.length === 0) return null; // Ensure shuffledQuestions is initialized

        return (
            <div id='quiz'>
                <div id='question'>
                    <h2>{shuffledQuestions[activeQuestionIndex].text}</h2>
                </div>
                <ul id='answers'>
                    {shuffledQuestions[activeQuestionIndex].answers.map(answer => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClasses = '';

                        if (answerState === 'answered' && isSelected) cssClasses = 'selected';
                        if (answerState === 'correct' && isSelected) cssClasses = 'correct';
                        if (answerState === 'wrong' && isSelected) cssClasses = 'wrong';

                        return (
                            <li key={answer} className='answer'>
                                <button onClick={() => handleSelectAnswer(answer)} className={cssClasses}>{answer}</button>
                            </li>
                        );
                    })}
                </ul>
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={() => handleSelectAnswer(null)} /> 
            </div>
        );
    }
}
