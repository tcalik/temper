import { useState } from "react";
import "./BackupManagement.css";
import copyToClipboard from "../../utils/copyToClipboard";

const BackupManagement = () => {
  const [backupAreaVisible, setBackupAreaVisible] = useState(false);

  const toggleBackupArea = () => {
    setBackupAreaVisible(!backupAreaVisible);
  };

  const getBackup = () => {
    toggleBackupArea();
    console.log(localStorage.getItem("notes"));
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

  return (
    <div className="BackupManagement">
      {backupAreaVisible ? (
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
      ) : (
        <div className="BackupButtonsZone">
          <button className="BackupButton" onClick={getBackup}>
            Save Backup
          </button>
        </div>
      )}
    </div>
  );
};

export default BackupManagement;
