import './NoteEditor.css'

interface NoteEditorPropsInterface {
  changeDraft: Function;
  saveDraft: Function;
  currContent: string;
  closeEditor: Function;
}

const NoteEditor = (props: NoteEditorPropsInterface) => {
  const closeEditor = () => {
    props.closeEditor();
  };
  const saveDraft = () => {
    props.saveDraft();
  };
  const changeDraft = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.changeDraft(event?.target.value);
  };
  return (
    <div>
    <button className="SaveButton NoteButton" onClick={saveDraft}>Save</button>
    <button className="CloseButton NoteButton" onClick={closeEditor}>Cancel</button>
      <textarea
        defaultValue={props.currContent}
        id="draftNote"
        onChange={changeDraft}
      ></textarea>
    </div>
  );
};

export default NoteEditor;
