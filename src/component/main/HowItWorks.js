import React from 'react'

class HowItWorks extends React.Component {
  state={
    showButton:true
  }

  showButton = () => {
    return (<button className={'nice-button'} onClick={this.handleClick}>How it works</button>)
  }

  showVideo = () => {
    return (<div><iframe width="853" title="Palettable Demo" height="480" src="https://www.youtube.com/embed/quzmSH9CaOY?rel=0" frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
    <button className={'nice-button'} style={{display: 'block', margin: '0 auto'}} onClick={this.handleClick}>Hide</button></div>)
  }

  handleClick = () => {
    this.setState({
     showButton: !this.state.showButton
    })
  }

  render () {
    return (
      <div className={'how-it-works-wrapper'}>
        {this.state.showButton ? this.showButton() : this.showVideo()}
      </div>
    )
  }

}

export default HowItWorks
