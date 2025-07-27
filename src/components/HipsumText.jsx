import React, { useReducer } from "react";
import data from "../data";
import { nanoid } from "nanoid";

const SET_COUNT = "SET_COUNT";
const GENERATE_TEXT = "GENERATE_TEXT";

const defaultState = {
  count: 1,
  text: [],
};

const reducer = (state, action) => {
  if (action.type === SET_COUNT) {
    return { ...state, count: action.payload };
  }
  if (action.type === GENERATE_TEXT) {
    const amount = parseInt(state.count);
    return { ...state, text: data.slice(0, amount) };
  }
  throw new Error(`No matching "${action.type}" action-type`);
};

const HipsumText = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: GENERATE_TEXT });
  };

  return (
    <section className="section-center">
      <h4>tired of boring ipsum text?</h4>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">paragraphs:</label>
        <input
          type="number"
          value={state.count}
          onChange={(e) =>
            dispatch({ type: SET_COUNT, payload: parseInt(e.target.value) })
          }
          min={1}
          max={8}
          step={1}
          className="lorem-input"
        />
        <button className="btn">generate</button>
      </form>
      <article className="lorem-text">
        {state.text.map((item) => {
          return <p key={nanoid()}>{item}</p>;
        })}
      </article>
    </section>
  );
};

export default HipsumText;
