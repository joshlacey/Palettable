import React from 'react';
import Parser from 'html-react-parser'
import Snap from 'snapsvg-cjs';
import { connect } from 'react-redux'
import { deletePalate } from '../../actions/userServices'
import { start, move, stop } from '../../snap/dragCallbacks.js'
import { Link, Redirect } from 'react-router-dom'

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

class RePalate extends React.Component {

  state = {
    loading:false,
    palate: [],
    html: "",
    colors: []
  }

  loading = () => {
    return(
        <svg width="48" height="48" viewBox="0 0 300 300">
          <path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#ccc">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur=".5s" fill="freeze" repeatCount="indefinite"></animateTransform>
          </path>
        </svg>
    )
  }

  componentDidMount = () => {
    this.setState({loading: true})
    const s = Snap(`#rePalate`)
    fetch(process.env.REACT_APP_API_ENDPOINT + this.props.location.pathname.slice(1))
      .then(resp =>  resp.json())
      .then(resp => {
        console.log(resp)
        const html = resp.data.copy.join('')
        const cleaned = html.replaceAll('style=""', '')
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
        const circle = element.children().find(c => !c.type.match(/desc|defs/g))
        circle.drag( move, start, stop )
      })
    }
}

hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `( ${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)} )` : null;
}

  handleClick = (event) => {
    const id = event.target.baseURI.split('/palates/')[1]
    this.props.deletePalate(id)
    alert("Palate Deleted")
  }

  render(){
    const user = localStorage.getItem('username')
    console.log(this.state.palate)
    const palateColors = this.state.colors.length ? this.state.colors.map(color => <div style={{backgroundColor: color}}>Hex Value: {color.toUpperCase()}, RGB Value: {this.hexToRgb(color)}</div>) : null
    return(
      <div>
        <svg style={{border: "1px solid grey"}} width={'400px'} height={'400px'} id={'rePalate'} >
          {this.state.palate}
        </svg>
        <h1>{this.state.title}</h1>
        <p>{this.state.note}</p>
        <p>{this.state.creator !== localStorage.getItem('username') ? `created by: ${this.state.creator}` : 'created by you'}</p>

        {localStorage.getItem('jwtToken') ? <Link to={`/${user}/palates`}><button props={this.props} onClick={this.handleClick}>Delete Your Palate</button></Link> : null }
        {palateColors}
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
      deletePalate: (id) => {
        dispatch(deletePalate(id))
      }
    }
}
//{ this.state.loading ? this.loading() : svg }
export default connect(null, mapDispatchToProps)(RePalate)
