import FinishScreen from "./FinishScreen";

function Options({ question, answer, dispatch, maxPossiblePoints, points }) {
  const hasAnswered = answer !== null;

  return (
    <div>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : " "} ${
            hasAnswered && index === question.correctOption
              ? "correct"
              : "wrong"
          }`}
          key={option}
          disabled={answer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
