import React from 'react'
import { connect } from 'react-redux';
import { handleNoteChange, handleTitleChange } from '../../actions/palate';


class NoteForm extends React.Component{

  // state = {
  //   title: "",
  //   note: ""
  // }

  // handleSubmit = (event) => {
  //     event.preventDefault()
  //     const signupParams = { username: this.state.username, password: this.state.password}
  //     console.log('signupForm', signupParams)
  //     this.props.signUp(signupParams)
  //     this.setState({
  //       username: "",
  //       password: ""
  //     })
  //
  //   }


  // handleTitleChange(event) {
  //   return {
  //     type: "TITLE",
  //     payload: event.target.value
  //   }
  // }
  //
  //
  // handleNoteChange = (event) => {
  //   return {
  //     type: "NO TE",
  //     payload: event.target.value
  //   }
  // }

    // handleTitleChange = (event) => {
    //   this.setState({
    //     title: event.target.value
    //   }, () => console.log(this.state.title))
    //
    // }
    //
    //
    // handleNoteChange = (event) => {
    //   this.setState({
    //     note: event.target.value
    //   }, () => console.log(this.state.note))
    //
    // }

  render() {

    return(
      <div>
        <form id="titleof" style={{width: '80%'}}>
            <input style={{width: '100%', marginTop: '15px'}} type="text" placeholder="Title" onChange={this.props.handleTitleChange} value={this.props.title}/><br/>
            <textarea style={{width: '100%', marginTop: '10px'}} placeholder="Add note..." onChange={this.props.handleNoteChange} name="note" value={this.props.note} rows="10" cols="30"/>
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
