import React from 'react'
import { Redirect } from 'react-router-dom'


function Authorize(RenderedComponent, props) {
  return class extends React.Component {

    render() {
      const hasToken = !!localStorage.getItem('jwtToken')
      const location = this.props.location.pathname
      if ((hasToken && location === "/login") || (hasToken && location === "/signup")) {
        const path = '/' + localStorage.username + '/palates'
        return <Redirect to={path} />
        // I am logged in
      } else {
        return (
          <RenderedComponent {...this.props} {...props}/>
        )
      }

    }
  }
}

export default Authorize
