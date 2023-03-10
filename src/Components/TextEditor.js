import { useState, useRef, useEffect } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";

import Footer from "./Footer";
import Toolbar from "./Toolbar";
import { contentStringToEditorState } from "../modules/textEditor-utils";

import classes from "./TextEditor.module.css";

const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const titleRef = useRef("");

  useEffect(() => {
    if (props.editMode && props.contentString !== "") {
      const placeHolder = contentStringToEditorState(props.contentString);
      setEditorState(placeHolder);
    }
  }, [props.editMode, props.contentString]);

  let domEditor = null;

  const setDomEditorRef = (ref) => {
    domEditor = ref;
  };

  const focus = () => {
    domEditor.focus();
  };

  const onEditorStateChange = (changedState) => {
    setEditorState(changedState);
  };

  const toggleInlineStyle = (event) => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    onEditorStateChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (event) => {
    event.preventDefault();
    let block = event.currentTarget.getAttribute("data-style");
    onEditorStateChange(RichUtils.toggleBlockType(editorState, block));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const content = {
      title: titleRef.current.value,
      text: JSON.stringify(rawContentState),
    };
    setEditorState(EditorState.createEmpty());
    props.submitHandler(content);
  };

  return (
    <div className={classes["daddy-wrapper"]}>
      <form className={classes["editor-form"]} onSubmit={submitHandler}>
        <div className={classes["editor-wrapper"]}>
          <Toolbar
            toggleInlineStyle={toggleInlineStyle}
            toggleBlockType={toggleBlockType}
            editorState={editorState}
          />
          {props.originalPost && (
            <div className={classes["title-wrapper"]}>
              <label className={classes.titleLabel} htmlFor="title">
                Thread Title
              </label>
              <input
                className={classes["thread-title"]}
                type="text"
                ref={titleRef}
                id="title"
              />
            </div>
          )}
          <div className={classes["textSection"]} onClick={focus}>
            <Editor
              editorState={editorState}
              onChange={onEditorStateChange}
              ref={setDomEditorRef}
            />
          </div>
          <Footer />
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
