import './NoteEditor.css'

interface NoteEditorPropsInterface {
  changeDraft: Function;
  saveDraft: Function;
  currContent: string;
  closeEditor: Function;
}

const NoteEditor = (props: NoteEditorPropsInterface) => {


  const setupTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.style.height = "";
    event.target.style.height = event.target.scrollHeight - 5 + "px";
    event.target.style.overflow = "hidden";
  };

  const closeEditor = () => {
    props.closeEditor();
  };
  const saveDraft = () => {
    props.saveDraft();
  };
  const changeDraft = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.changeDraft(event?.target.value);
    setupTextareaHeight(event);
  };
  return (
    <div>
    <button className="SaveButton NoteButton" onClick={saveDraft}>Save</button>
    <button className="CloseButton NoteButton" onClick={closeEditor}>Cancel</button>
      <textarea
        defaultValue={props.currContent}
        id="draftNote"
        onChange={changeDraft}
        onFocus={setupTextareaHeight}
        autoFocus
      ></textarea>
    </div>
  );
};

export default NoteEditor;
