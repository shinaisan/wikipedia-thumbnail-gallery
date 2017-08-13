import React from 'react'
import {
  Navbar,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'
import queryString from 'query-string';

const title = 'Wikipedia Thumbnail Gallery';

class TopNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  render() {
    let { history } = this.props;
    return (
      <Navbar fixedTop={true} inverse={true}>
        <Navbar.Header>
          <Navbar.Brand>{title}</Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form>
          <Form
            onSubmit={event => {
              event.preventDefault();
              let kw = this.state.keyword;
              history.push({
                pathname: '/search',
                search: queryString.stringify({keyword: kw})
              });
            }}
          >
            <FormControl
              name="keyword"
              placeholder="Keyword"
              size={20}
              onChange={event => this.setState({keyword: event.target.value})}
            />
            <Button type="submit" >Search</Button>
          </Form>
        </Navbar.Form>
      </Navbar>
    )
  }
}

export default TopNavbar;

