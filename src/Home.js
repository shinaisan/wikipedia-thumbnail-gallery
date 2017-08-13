import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

export default function Home() {
  return (
    <div>
      <Link
        to={{
          pathname: '/search',
          search: queryString.stringify({keyword: 'wikipedia'})
        }}>Example Query</Link>
    </div>
  );
}

