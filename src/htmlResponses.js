const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const defaultStyles = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const jokeClient = fs.readFileSync(`${__dirname}/../client/joke-client.html`);

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getCssResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(defaultStyles);
  response.end();
};

const getJokeClientResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(jokeClient);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getCssResponse = getCssResponse;
module.exports.getJokeClientResponse = getJokeClientResponse;
