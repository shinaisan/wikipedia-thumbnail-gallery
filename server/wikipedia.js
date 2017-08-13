const axios = require('axios');

const config = {
  lang: process.env.REACT_APP_LANG
};

let wp = {
  opensearch: (key) => {
    const lang = (config.lang || 'en');
    const head = `https://${lang}.wikipedia.org/w/api.php?action=opensearch&format=json&search=`;
    const param = encodeURIComponent(key);
    const url = head + param;
    console.log("Fetching opensearch", url);
    return axios.get(url)
      .then(response => {
        const json = response.data;
        return {
          key: key,
          titles: json[1],
          pageUrls: json[3]
        };
      });
  },
  thumbnails: {
    small: (titles) => (wp.query.pageimages(titles, 100)),
    large: (titles) => (wp.query.pageimages(titles, 600))
  },
  query: {
    pageimages: (titles, size) => {
      const lang = (config.lang || 'en');
      const head = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=${size}&format=json&titles=`;
      const param = encodeURIComponent(titles.join('|'));
      const url = head + param;
      console.log("Fetching pageimages", url);
      return axios.get(url)
        .then(response => {
          const json = response.data;
          const pages = json.query.pages;
          return pages;
        })
    }
  },
  fetchTitlesAndThumbnails: (keyword) => {
    if (keyword === 'uuddlrlrba') {
      return Promise.reject('How did you know this command?');
    }
    return wp.opensearch(keyword)
      .then(suggestion => {
        let titles = suggestion.titles;
        return Promise.all(
          [wp.thumbnails.small(titles), wp.thumbnails.large(titles)]
        ).then(([small, large]) => {
          const pageIds = Object.keys(small);
          const pages = pageIds.map(pageId => [small[pageId], large[pageId]]);
          return pages.map(([smallPage, largePage]) => ({
            title: smallPage.title,
            thumbnails: {
              small: (smallPage.thumbnail ? smallPage.thumbnail.source : ''),
              large: (largePage.thumbnail ? largePage.thumbnail.source : '')
            }
          }));
        });
      });
  },
  injectRequestError: (pattern) => {
    axios.interceptors.request.use((config) => {
      if (config.url.includes(pattern)) {
        console.log('Changing URL to localhost:9999');
        config.url = 'http://localhost:9999'; // Specify non-existent URL.
      }
      return config;
    });
  }
};

module.exports = wp;

