const NoteEditor = (props: any) => {
  const closeEditor = () => {
    props.closeEditor();
  };
  const saveDraft = () => {
    props.saveDraft();
  };
  const changeDraft = (event: any) => {
    props.changeDraft(event?.target.value);
  };
  return (
    <div>
      <textarea
        defaultValue={props.currContent}
        id="draftNote"
        onChange={changeDraft}
      ></textarea>
      <button onClick={saveDraft}>Save</button>
      <button onClick={closeEditor}>Close</button>
    </div>
  );
};

export default NoteEditor;
