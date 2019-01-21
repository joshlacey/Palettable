import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

 function NoteForm(props) {
  return (
    <div>
      <form className={'note-form'} id="titleof">
        <input
          type="text"
          placeholder="Title"
          onChange={props.actions.handleTitleChange}
          value={props.title}
        />
        <br />
        <textarea
          placeholder="Add description..."
          onChange={props.actions.handleNoteChange}
          name="note"
          value={props.note}
          rows="10"
          cols="30"
        />
      </form>
    </div>
  );
}

NoteForm.propTypes = {
	actions: PropTypes.shape({
		handleTitleChange: PropTypes.func,
		handleNoteChange: PropTypes.func
	}),
	title: PropTypes.string,
	note: PropTypes.string
}

export default NoteForm;
