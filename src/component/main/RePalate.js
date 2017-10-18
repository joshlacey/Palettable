import React from 'react';
import Parser from 'html-react-parser'
import Snap from 'snapsvg-cjs';
import addHandleFunc from '../../snap/scale.js'
import { start, move, stop } from '../../snap/dragCallbacks.js'

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

let stateChange

class RePalate extends React.Component {

  state={
    loading:false,
    palate: []
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

  doubleclick = (circle, outer) => {
    const index = outer.state.palate.findIndex(e => e.props.id == circle.parent().node.id)

    function swapElement(array, indexA, indexB) {
      var tmp = array[indexA];
      array[indexA] = array[indexB];
      array[indexB] = tmp;
    }
    let copy = outer.state.palate
    swapElement(copy, index, 0)

    console.log('copy', copy)
    this.setState({palate: copy})
    console.log('palate', this.state.palate)
  }

  palateStop = (circle, outer) => {
    const g = circle.outerSVG()
    const index = outer.state.palate.findIndex(e => e.props.id == circle.parent().node.id)
    outer.state.palate[index].props.children[2] = Parser(g)
    console.log(outer.state.palate[index])
    this.setState({palate: outer.state.palate})
    console.log(this.state.palate)
  }

  componentDidMount = () => {
    this.setState({loading: true})
    const s = Snap(`#rePalate`)
    fetch(process.env.REACT_APP_API_ENDPOINT + this.props.location.pathname.slice(1))
      .then(resp =>  resp.json())
      .then(resp => {
        const html = resp.data.copy.join('')
        const content = Parser(html)
        this.setState({
          loading: false,
          palate: content,
          html: html
        })
        //refactor with snap methods
        document.getElementById('rePalate').innerHTML = this.state.html
      })
      .then(()=> {
        //console.log(this.state.palate)
        this.state.palate.forEach( i => {
          const element = Snap(`#${i.props.id}`)
          const circle = element.children()[2]
          circle.drag( move, start, () => this.palateStop(circle, this) )
          circle.dblclick(() => this.doubleclick(circle, this))
        })
      })
  }

  render(){

    return(
      <div>
        <svg width={'400px'} height={'400px'} id={'rePalate'} >
        </svg>
      </div>
    )
  }
}
//{ this.state.loading ? this.loading() : svg }
export default RePalate
