import Options from "./Options";
function Question({ index, question, dispatch, answer, numQuestions }) {
  if (index === numQuestions - 1) {
    return (
      <>
        <button className="btn" onClick={() => dispatch({ type: "finish" })}>
          Finish the Quiz
        </button>
        <button className="btn" onClick={() => dispatch({ type: "restart" })}>
          Restart the Quiz
        </button>
      </>
    );
  }

  return (
    <>
      <div>
        <h4>{question.question}</h4>
        <Options
          question={question}
          dispatch={dispatch}
          answer={answer}
        ></Options>
      </div>
      {index < numQuestions - 1 && question.correctOption === answer ? (
        <button
          className="btn"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : null}
    </>
  );
}

export default Question;
