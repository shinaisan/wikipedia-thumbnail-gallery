import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
  Panel
} from 'react-bootstrap';
import axiosCore from 'axios';
import axiosCache from 'axios-cache-plugin';

let axios = axiosCache(axiosCore, {
  maxCacheSize: 30,
  ttl: 60*60*1000,
  excludeHeaders: true
});
axios.__addFilter(/api/);

const config = {
  lang: process.env.REACT_APP_LANG
};

const wikipediaUrl = (title) => {
  const lang = (config.lang || 'en');
  return `https://${lang}.wikipedia.org/wiki/` + encodeURIComponent(title);
};

const Thumbnail = ({ small, large, title }) => {
  return (
    <Panel
      header={
        <a href={wikipediaUrl(title)} >
          {title}
        </a>
      }
    >
      <Link
        to={{
          pathname: '/img',
          // search: '',
          // hash: '',
          state: { title: title, url: large, modal: true }
        }}
      >
        <img src={small} alt={title} />
      </Link>
    </Panel>
  );
}

class Gallery extends React.Component {
  fetchThumbnails(params) {
    const dispatch = this.props.dispatch;
    const loading = this.props.loading;
    const key = params.keyword;
    console.log('fetchThumbnails', key);
    if (loading) {
      return null;
    }
    dispatch({type: 'START_SEARCHING_FOR_KEYWORD', keyword: key});
    return axios.get('/api/search', {params: {kw: key}})
      .then(response => {
        let result = response.data;
        console.log("fetchThumbnails result", result);
        dispatch({
          type: 'RECEIVED_THUMBNAILS',
          keyword: key,
          thumbnails: result
        });
      })
      .catch(error => {
        console.log("Error in fetchThumbnails", error);
        dispatch({
          type: 'ERROR_IN_API',
          keyword: key,
          error: error
        });
      });
  }

  componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    this.fetchThumbnails(query);
  }

  componentWillReceiveProps(nextProps) {
    let oldQuery = queryString.parse(this.props.location.search);
    let query = queryString.parse(nextProps.location.search);
    if (oldQuery.keyword !== query.keyword) {
      this.fetchThumbnails(query);
    }
  }

  render() {
    let { loading, keyword, thumbnails, error } = this.props;
    if (error) {
      return (
        <div>
          <h2>Error</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )
    } else if (thumbnails.length > 0) {
      return (
        <div>
          {thumbnails.map((page) => {
            const title = page.title;
            const small = page.thumbnails.small;
            const large = page.thumbnails.large;
            return (
              <div
                style={{display: 'inline-block'}}
              >
                {
                  (small.length > 0)
                  ? <Thumbnail title={title}
                    small={small}
                    large={large}
                  />
                  : <Panel
                    header={
                      <a href={wikipediaUrl(title)} >
                        {title}
                      </a>
                    }
                  >
                    <p>Thumbnail not found.</p>
                  </Panel>
                }
              </div>
            );
          })}
        </div>
      )
    } else if (loading) {
      return (
        <div>
          <p>Waiting for response ... (keyword: {keyword}).</p>
        </div>
      )
    } else {
      return (
        <div>Nothing to show here.</div>
      )
    }
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(Gallery);

