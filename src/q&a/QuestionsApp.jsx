/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionList from './components/QuestionList.jsx';

function Questions({
  trackClick, currentProductName, isDarkMode, currentProduct,
}) {
  const [questions, setQuestions] = useState({});
  const [questionsAdded, setQuestionsAdded] = useState(0);
  const [report, setReport] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3001/qa/questions/${currentProduct}`)
      .then((list) => {
        setQuestions(list.data);
      })
      .catch((err) => (console.error(err)));
  }, [questionsAdded, report, currentProduct]);

  const handleQuestionSubmit = (question) => {
    axios.post('http://localhost:3001/addquestion', question)
      .then(() => setQuestionsAdded(questionsAdded + 1))
      .catch((err) => console.error(err));
  };

  const onReport = () => {
    setReport(report + 1);
  };

  const handleTrackClick = (event) => {
    const clickData = {
      element: event.target.className,
      widget: 'QandA',
      time: new Date(),
    };
    trackClick(clickData);
  };

  useEffect(() => {
    const element = document.getElementsByClassName('QandA-widget');
    element[0].addEventListener('click', handleTrackClick);
  }, []);

  return (
    <QuestionList
      props={questions}
      handleQuestionSubmit={handleQuestionSubmit}
      onReport={onReport}
      currentProductName={currentProductName}
      isDarkMode={isDarkMode}
    />
  );
}

export default Questions;
