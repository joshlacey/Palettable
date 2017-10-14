import React from 'react';
import Parser from 'html-react-parser'

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

class RePalate extends React.Component {

  state={
    loading:false,
    palate: ''
  }

  loading = () => {
    return(
        <svg width="48" height="48" viewBox="0 0 300 300">
          <path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#76f19a">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur=".5s" fill="freeze" repeatCount="indefinite"></animateTransform>
          </path>
        </svg>
    )
  }

  componentDidMount = () => {
    this.setState({loading: true})
    fetch(process.env.REACT_APP_API_ENDPOINT + this.props.location.pathname.slice(1))
      .then(resp => {console.log('loading'); return resp.json()})
      .then(resp => this.setState({
        loading: false,
        palate: resp
      }))
  }


  render(){
    let svg
    if (this.state.palate === '') {
      svg = ""
    } else {
      console.log(this.props.location.pathname)
      console.log(this.state)
      const string = this.state.palate.data.svg
      const temp = string.replaceAll('style=""', '')
      svg = Parser(temp)
    }


    return(
      <div>
        { this.state.loading ? this.loading() : svg }
      </div>
    )
  }
}

export default RePalate
