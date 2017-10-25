import React from 'react'
import { connect } from 'react-redux';
import { handleNoteChange, handleTitleChange } from '../../actions/palate';
import '../../index.css'


class NoteForm extends React.Component{

  render() {

    return(
      <div>
        <form className={'note-form'} id="titleof" >
            <input type="text" placeholder="Title" onChange={this.props.handleTitleChange} value={this.props.title}/><br/>
            <textarea  placeholder="Add description..." onChange={this.props.handleNoteChange} name="note" value={this.props.note} rows="10" cols="30"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.palate.title,
    note: state.palate.note
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleNoteChange: (event) => {
      dispatch(handleNoteChange(event))
    },
    handleTitleChange: (event) => {
      dispatch(handleTitleChange(event))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NoteForm)
