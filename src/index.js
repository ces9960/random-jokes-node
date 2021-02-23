// console.log("First web service starting up ...");

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');

const query = require('querystring');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const urlStruct = {
  '/random-joke': responseHandler.getRandomJokeResponse,
  '/random-jokes': responseHandler.getRandomJokesResponse,
  notFound: htmlHandler.get404Response,
};

// 4 - here's our index page

// 5 - here's our 404 page

// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  /// /console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  // console.log("parsedUrl=", parsedUrl);
  // console.log("pathname=", pathname);

  // const params = query.parse(parsedUrl.query);
  // console.log("params=", params);
  // console.log("max=", max);

  const params = query.parse(parsedUrl.query);
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  // const { limit } = params;

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params, acceptedTypes, request.method);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);

// console.log(`Listening on 127.0.0.1: ${port}`);
