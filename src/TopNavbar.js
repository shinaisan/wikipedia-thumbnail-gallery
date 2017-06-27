import React from 'react'
import {
  Navbar
} from 'react-bootstrap'

class TopNavbar extends React.Component {
  render() {
    return (
      <Navbar fixedTop={true} inverse={true}>
        <Navbar.Header>
          <Navbar.Brand>{this.props.title}</Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}

export default TopNavbar;

