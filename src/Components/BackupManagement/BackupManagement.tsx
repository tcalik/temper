import { useRef, useState } from "react";
import "./BackupManagement.css";
import copyToClipboard from "../../utils/copyToClipboard";
import { useDispatch } from "react-redux";
import { notesActions } from "../../store/notesStore";

const BackupManagement = () => {
  const [backupAreaVisible, setBackupAreaVisible] = useState(false);
  const [backupMode, setBackupMode] = useState<"save" | "import">("save");
  const importContentRef = useRef<HTMLTextAreaElement | null>(null);

  const dispatch = useDispatch();

  const toggleBackupArea = () => {
    setBackupAreaVisible(!backupAreaVisible);
  };

  const getBackup = () => {
    setBackupMode("save");
    toggleBackupArea();
    console.log(localStorage.getItem("notes"));
  };

  const importBackup = () => {
    setBackupMode("import");
    toggleBackupArea();
  };
  const getStorage = (): string => {
    if (localStorage.getItem("notes") !== null) {
      return localStorage.getItem("notes")!;
    }
    return "";
  };
  const copyBackup = () => {
    copyToClipboard(getStorage());
  };

  const importToApp = () => {
    if (importContentRef.current?.value)
      localStorage.setItem("notes", importContentRef.current?.value);
    else console.error("Eerr");

    dispatch(notesActions.refreshNotes());
  };

  return (
    <div className="BackupManagement">
      {backupAreaVisible && backupMode === "save" ? (
        <div>
          <p>Copy and save this text to use as a backup later</p>
          <textarea
            className="BackupText"
            readOnly
            value={getStorage()}
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
          <p>Paste your backup and import</p>
          <textarea ref={importContentRef} className="BackupText"></textarea>
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
