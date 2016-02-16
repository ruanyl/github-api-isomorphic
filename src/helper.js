var apiRoot = 'https://api.github.com';

function toQueryString(queryObj) {
  let queryString = '';
  Object.keys(queryObj).forEach((key) => {
    queryString = queryString ? `${queryString}&` : '';
    queryString = `${queryString}${key}=${encodeURIComponent(queryObj[key])}`;
  });
  return queryString;
}

module.exports = {
  apiRoot,
  toQueryString,
};
