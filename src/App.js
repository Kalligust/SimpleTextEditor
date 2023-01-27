import { useState } from "react";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import TextEditor from "./Components/TextEditor";
import Display from "./Components/Display";

import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const submitHandler = (contentObject) => {
    const rawContentState = JSON.parse(contentObject.text);
    const ContentState = convertFromRaw(rawContentState);
    const contentStateAsHtml = stateToHTML(ContentState);
    setNotes((prev) => {
      return [...prev, contentStateAsHtml];
    });
  };

  console.log(notes);

  return (
    <div className={"wrapper"}>
      <TextEditor submitHandler={submitHandler} />
      {notes.map((note) => (
        <Display text={note} />
      ))}
    </div>
  );
}

export default App;
