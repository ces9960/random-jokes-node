const jokes = [
    { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
    { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
    { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
    { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
    { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
    { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
    { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
    { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
    { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
    { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me.' },
    { q: 'Can February March?', a: 'No, but April May' },
    { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
    { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
    { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire.' },
    { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved.' },
    { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite' },
  ];
  const getRandomJokes = (limit) => {
    let jokeCount;//how many jokes to print
    let usedJokes = [];//keeps track of which jokes are used
    let jokesToReturn = [];
    //always print at least 1 joke
    if(limit < 1){
      jokeCount = 1;
    }
  //never print more jokes than there are in the array
    else if(limit > jokes.length){
      jokeCount = jokes.length;
    }
  //if the limit is within range, print that many jokes
    else{
      jokeCount = limit;
    }
    
    //generates random numbers without duplicates
    while(usedJokes.length < jokeCount){
      let jokeNumber = Math.floor(Math.random() * jokes.length);
      if(!(usedJokes.includes(jokeNumber))){
        usedJokes.push(jokeNumber);
      }
    }

    for(let i = 0; i < jokeCount; i++){
      let jokeNumber = usedJokes[i];
      let responseObj = {
        question: jokes[jokeNumber].q,
        answer: jokes[jokeNumber].a,
      };
      
      jokesToReturn.push(responseObj);
    }
      return JSON.stringify(jokesToReturn);
  }
  
  const getRandomJokesResponse = (request,response,params) => {
    response.writeHead(200,{'Content-Type':'application/json'});
    response.write(getRandomJokes(params.limit));
    response.end();
  };

  const getRandomJokeResponse = (request,response) => {
    const jokeNumber = Math.floor(Math.random() * jokes.length);
    const responseObj = {
      question: jokes[jokeNumber].q,
      answer: jokes[jokeNumber].a,
    };
    let joke = JSON.stringify(responseObj);
    

    response.writeHead(200,{'Content-Type':'application/json'});
    response.write(joke);
    response.end();
  };

  module.exports.getRandomJokeResponse = getRandomJokeResponse;
  module.exports.getRandomJokesResponse = getRandomJokesResponse;