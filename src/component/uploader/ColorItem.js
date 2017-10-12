import React from 'react'

class ColorItem extends React.Component {

  state = {
    isClicked: false
  }

  displayCheck(){
    return(
      <svg x={"0px"} y={"0px"} width={"30px"} height={"30px"} viewBox={"0 0 512 512"} style={{enableBackground: "new 0 0 512 512"}}>
      <g>
      	<path d="M223.9,329.7c-2.4,2.4-5.8,4.4-8.8,4.4s-6.4-2.1-8.9-4.5l-56-56l17.8-17.8l47.2,47.2l124.8-125.7l17.5,18.1L223.9,329.7z"/>
      </g>
      </svg>
    )
  }

  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    }, () => {
      if(this.state.isClicked){
        this.props.addColor(
          {id: this.props.id,
          color: this.props.style.backgroundColor}
        )
      } else {
        this.props.deleteColor(this.props.id)
      }
    })
  }



  render() {
    return(
      <div onClick={this.handleClick} style={this.props.style}>
      {this.state.isClicked ? this.displayCheck() : null}
      </div>
    )
  }
}

export default ColorItem
