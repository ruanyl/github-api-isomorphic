let apiRoot = 'https://api.github.com';

function toQueryString(queryObj) {
  let queryString = '';
  Object.keys(queryObj).forEach((key) => {
    queryString = queryString ? `${queryString}&` : '';
    queryString = `${queryString}${key}=${encodeURIComponent(queryObj[key])}`;
  });
  return queryString;
}

function makeHeader(headers, key, value) {
  let newHeaders = Object.assign({}, headers);
  if (value !== null) {
    newHeaders[key] = value;
  }

  return newHeaders;
}

module.exports = {
  apiRoot,
  toQueryString,
  makeHeader,
};
