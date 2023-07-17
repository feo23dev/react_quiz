import { useEffect, useReducer } from "react";
import Loader from "./Loader.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Error from "./Error.js";
import Start from "./StartScreen.js";
import Question from "./Question.js";
import Progress from "../Progress.js";
import FinishScreen from "./FinishScreen.js";

const initialState = {
  questions: [],
  // 'loading,'error,'ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        points: 0,
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div>
      <header className="app">
        <Header></Header>

        <Main>
          <Progress
            numQuestions={numQuestions}
            index={index}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            answer={answer}
          ></Progress>
          {status === "loading" && <Loader></Loader>}
          {status === "error" && <Error></Error>}
          {status === "ready" && (
            <Start numQuestions={numQuestions} dispatch={dispatch}></Start>
          )}
          {status === "active" && (
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            ></Question>
          )}
          {status === "finished" ? (
            <FinishScreen
              maxPossiblePoints={maxPossiblePoints}
              points={points}
            ></FinishScreen>
          ) : null}
        </Main>
      </header>
      ;
    </div>
  );
}
