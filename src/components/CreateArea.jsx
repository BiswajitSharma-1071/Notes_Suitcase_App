import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import RestoreIcon from '@material-ui/icons/Restore';
import ClearAllIcon from '@material-ui/icons/ClearAll';

function CreateArea(props) {

  const [isExpanded, setExpanded] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [noteContent, setNoteContent] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    let { name, value } = event.target;
    setNoteContent(prevValues => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }


  return (
    <div >
      <form className="formInput"
        onSubmit={event => {
          event.preventDefault();
          if (noteContent.title.trim() !== "" && noteContent.content.trim() !== "") {
            props.onAdd(noteContent);
            setNoteContent({
              title: "",
              content: ""
            });
            setErrMsg("")
          }
          else {
            setErrMsg("Empty Title or Content area.")
          }
        }
        }
      >
        <input className="inpClass"
          onClick={() => { setExpanded(true); }}
          onDoubleClick={() => { setExpanded(false); }}
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={noteContent.title}
        />
        {isExpanded && <textarea
          onMouseOut={() => { setErrMsg("") }}
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={noteContent.content}
        />}
        <Zoom in={isExpanded}>
          <Fab className="butClass" type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
        <Zoom in={isExpanded}>
          <Fab className="butClass2"
            onClick={() => {
              if (props.deletedListNote.length) {
                setErrMsg("")
                props.restoreItems();
              }
              else {
                setErrMsg("No Items to Restore.")
              }
            }}
            >
            <RestoreIcon />
          </Fab>
        </Zoom>
        <Zoom in={isExpanded}>
          <Fab className="butClass3"
          onClick={() => {
            const outvar = props.onClear()
            setErrMsg(outvar)
          }}
            >
            <ClearAllIcon />
          </Fab>
        </Zoom>
        {errMsg && <div style={{ color: 'red' }}>{errMsg}</div>}
      </form>
    </div>
  );
}

export default CreateArea;