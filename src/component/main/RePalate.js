import React from 'react';
import Parser from 'html-react-parser';
import Snap from 'snapsvg-cjs';
import { connect } from 'react-redux';
import ColorItemComp from './ColorItemComp.js';
import { deletePalate } from '../../actions/userServices';
import { editPalate } from '../../actions/palate';
import { start, move, stop } from '../../snap/dragCallbacks.js';
import { Link } from 'react-router-dom';
import NoteForm from '../notes/NoteForm';

class RePalate extends React.Component {

  state = {
    loading:false,
    palate: [],
    html: "",
    colors: []
  }

  componentDidMount = () => {
    this.setState({loading: true})
    fetch(process.env.REACT_APP_API_ENDPOINT + this.props.location.pathname.slice(1))
      .then(resp =>  resp.json())
      .then(resp => {
        const html = resp.data.copy.join('')
        const cleaned = html.replace(/style=""/g, '')
        const content = Parser(cleaned)
        this.setState({
          loading: false,
          palate: content.length ? content : [content],
          html: resp.data.copy.join(''),
          title: resp.data.title,
          note: resp.data.note,
          creator: resp.creator,
          colors: resp.data.colors.split(',')
        })
      })
  }

componentDidUpdate = (prevState, prevProps) => {
    if (this.state.palate.length) {
      this.state.palate.forEach( i => {
        const element = Snap(`#${i.props.id}`)
        const circle = element.children().find(c => !c.type.match(/desc|defs/g) && c.children().length )
        circle.drag( move, start, stop )
      })
    }
}


  handleClick = (event) => {
    const id = event.target.baseURI.split('/palates/')[1]
    this.props.deletePalate(id)
    alert("Palate Deleted")
  }

  updateInfo = (event) => {
    const id = event.target.baseURI.split('/palates/')[1]
    const title = this.props.title
    const note = this.props.note
    this.setState({title: title, note: note})
    this.props.editPalate(title, note, id)
  }

  render(){
    const user = localStorage.getItem('username')
    const palateColors = this.state.colors.length ? this.state.colors.map((color,i) =>  <ColorItemComp key={i+color} color={color}/> ) : null
    return(
      <div className={'repalate-container'}>
        <svg width={'400px'} height={'400px'} id={'rePalate'} >
          {this.state.palate}
        </svg>
        <p>{this.state.creator !== localStorage.getItem('username') ? `created by: ${this.state.creator}` : 'created by you'}</p>
        <h1>{this.state.title}</h1>
        <p>{this.state.note}</p>
          {palateColors}
        <br/><br/>
        { (!this.state.title && (this.state.creator === user)) ? <div><NoteForm /><button className={'nice-button'} onClick={this.updateInfo}>Update</button></div> : null}
        <br/><br/>
        {(this.state.creator === user) ? <Link to={`/${user}/palates`}><button className={'mean-button'} props={this.props} onClick={this.handleClick} >Delete Your Palate</button></Link> : null }

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    note: state.palate.note,
    title: state.palate.title
  }
}

function mapDispatchToProps (dispatch) {
  return {
      deletePalate: (id) => {
        dispatch(deletePalate(id))
      },
      editPalate: (title, note, id) => {
        dispatch(editPalate(title, note, id))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RePalate)
