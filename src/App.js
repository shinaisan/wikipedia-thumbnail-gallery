import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {
  Panel,
  Glyphicon
} from 'react-bootstrap';
import TopNavbar from './TopNavbar';
import Home from './Home';
import Gallery from './Gallery';

class ModalSwitch extends React.Component {

  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    )
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={Home}/>
          <Route path='/search' component={Gallery} />
        </Switch>
        {
          isModal
          ? <Route path='/img' component={Modal} />
          : null
        }
      </div>
    )
  }
}

const Modal = ({ match, history, location }) => {
  const { title, url } = location.state;
  const back = (e) => {
    e.stopPropagation()
    history.goBack()
  }
  return (
    <div
      onClick={back}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <Panel className='modal-image'
        style={{
          position: 'absolute',
          background: '#fff',
          top: 65,
          left: '10%',
          right: '10%',
          padding: 15
        }}
        header={
          <div>
            <span>{title}</span>
            <Glyphicon glyph="remove" onClick={back} className="pull-right" />
          </div>
        }
      >
        <img src={url} alt={title} />
      </Panel>
    </div>
  )
}

class ModalGallery extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route component={TopNavbar} />
          <Route component={ModalSwitch} />
        </div>
      </Router>
    )
  }
}

export default ModalGallery

