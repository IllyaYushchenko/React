import React, { useState } from "react";
import "./App.css";

function Entry ({ entry, index, removeEntry, completeEntry }) {
  return (
    <div className="entry">
      <div>
        <b>Name:</b>
        {entry.name} , <br/>
        <b>Description:</b>
        {entry.description}, 
      </div>
      <div><p style={{ visibility: entry.isCompleted ? "visible" : "hidden" }}> <b>Comment:</b>{entry.comment}</p></div>

      <div>
        <button onClick={() => removeEntry(index)}>Delete</button>
        <button onClick={() => completeEntry(index)}>Details</button>
      </div>
    </div>
  );
}

function EntryForm({ addEntry }) {
  const [valueName, setValueName] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valueComment, setValueComment] = useState("");

  const Submit = () => {
    if (!valueName || !valueDescription) return;
    addEntry(valueName, valueDescription, valueComment);
    setValueName("");
    setValueDescription("");
    setValueComment("");
  };
  const Clear = () => {
    setValueName("");
    setValueDescription("");
    setValueComment("");
  }
  return (
    <div>
      Name:
      <input
        type="text"
        className="input"
        value={valueName}
        placeholder="your name plz..."
        onChange={e => setValueName(e.target.value)}
      />
      Description:
      <input
        type="text"
        className="input"
        value={valueDescription}
        placeholder="description..."
        onChange={e => setValueDescription(e.target.value)}
      />
      Comment:
      <input
        type="text"
        className="input"
        value={valueComment}
        placeholder="comment..."
        onChange={e => setValueComment(e.target.value)}
      />
      <button onClick={Submit}>Add</button>
      <button onClick={Clear}>Clear</button>
    </div>

  );
}

function App() {
  const [entries, setEntries] = useState([
    {
      name: "First Name",
      description: "Some text",
      comment: "some comment",
      isCompleted: false
    }
  ]);

  const addEntry = (name, description, comment) => {
    if (!comment) comment = "No comments were left about his entry";
    const newEntries = [...entries, { name, description, comment }];
    setEntries(newEntries);
  };


  const completeEntry = index => {
    const newEntries = [...entries];
    newEntries[index].isCompleted = true;
    setEntries(newEntries);
  };

  const removeEntry = index => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  return (
    <div className="app">
      <div> <EntryForm addEntry={addEntry} /> </div>
      <div className="entry-list">
        {entries.map((entry, index) => (
          <Entry
            key={index}
            index={index}
            entry={entry}
            completeEntry={completeEntry}
            removeEntry={removeEntry}
          />
        ))}

      </div>
    </div>
  );
}

export default App;
