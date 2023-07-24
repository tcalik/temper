import { useRef, useState } from "react";
import "./BackupManagement.css";
import copyToClipboard from "../../utils/copyToClipboard";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../../store/notesStore";
import NoteInterface from "../../Interfaces/NoteInterface";
import SharedStateInterface from "../../Interfaces/SharedStateInterface";
import NotesBackupInterface from "../../Interfaces/NotesBackupInterface";

const BackupManagement = () => {
  const [backupAreaVisible, setBackupAreaVisible] = useState(false);
  const [backupMode, setBackupMode] = useState<"save" | "import">("save");
  const [importResult, setImportResult] = useState<null | "success" | "error">(
    null
  );
  const importContentRef = useRef<HTMLTextAreaElement | null>(null);
  const savedNotes = useSelector(
    (state: SharedStateInterface) => state.notes.currentNotes
  );

  const dispatch = useDispatch();

  const toggleBackupArea = () => {
    setBackupAreaVisible(!backupAreaVisible);
    setImportResult(null);
  };

  const getBackup = () => {
    setBackupMode("save");
    toggleBackupArea();
  };

  const importBackup = () => {
    setBackupMode("import");
    toggleBackupArea();
  };

  const copyBackup = () => {
    copyToClipboard(getStoredBackup());
  };

  const getStoredBackup = () => {
    let contentArr: NotesBackupInterface[] = [];
    savedNotes.forEach((procNote) => {
      contentArr.push({ content: procNote.content });
    });
    return JSON.stringify(contentArr);
  };

  const importToApp = () => {
    let res;
    try {
      if (importContentRef.current?.value) {
        const parsedImport = JSON.parse(importContentRef.current?.value);
        parsedImport.forEach((element: NoteInterface) => {
          if (!element.content) {
            setImportResult("error");
            res = false;
          } else {
            if (element.content)
              dispatch(notesActions.addNote({ draftContent: element.content }));
          }
        });
        dispatch(notesActions.refreshNotes());
        setImportResult("success");
      }
    } catch (err: any) {
      setImportResult("error");
      console.error(err);
    }
    return res;
  };

  return (
    <div className="BackupManagement">
      {backupAreaVisible && backupMode === "save" ? (
        <div>
          <p>Copy and save this text to use as a backup later</p>
          <textarea
            className="BackupText"
            readOnly
            value={getStoredBackup()}
          ></textarea>
          <div className="BackupButtonsZone">
            <button onClick={copyBackup} className="BackupButton">
              Copy
            </button>
            <button
              onClick={toggleBackupArea}
              className="BackupButton CloseBackupButton"
            >
              Close
            </button>
          </div>
        </div>
      ) : backupAreaVisible && backupMode === "import" ? (
        <div>
          {importResult === null ? (
            <p>Paste your backup and import</p>
          ) : importResult === "success" ? (
            <p className="ImportSuccessMessage">Backup successfully restored</p>
          ) : importResult === "error" ? (
            <p className="ImportErrorMessage">Incorrect backup text</p>
          ) : (
            <></>
          )}
          <textarea
            ref={importContentRef}
            className="BackupText"
            spellCheck={false}
          ></textarea>
          <div className="BackupButtonsZone">
            <button onClick={importToApp} className="BackupButton">
              Import
            </button>
            <button
              onClick={toggleBackupArea}
              className="BackupButton CloseBackupButton"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="BackupButtonsZone">
          <button className="BackupButton" onClick={getBackup}>
            Save Backup
          </button>
          <button className="BackupButton" onClick={importBackup}>
            Import Backup
          </button>
        </div>
      )}
    </div>
  );
};

export default BackupManagement;
