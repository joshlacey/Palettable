import React from 'react'
import { Redirect } from 'react-router-dom'


function Authorize(RenderedComponent, props) {
  return class extends React.Component {

    render() {
      const hasToken = !!localStorage.getItem('jwtToken')
      const location = this.props.location.pathname
      if ((hasToken && location === "/login") || (hasToken && location === "/signup")) {
        return <Redirect to="/palates" />

        // I am logged in
      } else if (!hasToken && location !== "/login") {

        return <Redirect to="/login" />
        // not logged in
      } else {
        return (
          <RenderedComponent {...this.props} {...props}/>
        )
      }

    }
  }
}

export default Authorize
