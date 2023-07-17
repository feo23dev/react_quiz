function Progress({ answer, index, numQuestions, points, maxPossiblePoints }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}{" "}
      </p>
      <p>
        <bold>
          {points} /{maxPossiblePoints} points
        </bold>
      </p>
    </header>
  );
}

export default Progress;
