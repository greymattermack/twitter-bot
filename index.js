const Twit = require('twit');

const T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
  timeout_ms:           60 * 1000,
});

//  filter the twitter public stream by the word 'mango'.
streamTweetsByKeyboard("mango");

// Post a tweet
sendTweet("Ysabel hacking");

//Stream all of a certain user tweets [GET USER ID HERE : http://gettwitterid.com/]
streamTweetsByUsername("849069059962437632");


/*
 *
 * Twitter functions
 *
*/

function streamTweetsByUsername($username){
    var TWId = $username; // string

    var stream = T.stream('statuses/filter', {
        follow: TWId
      });
      
    console.log('Waiting for tweets, Id:  ' + TWId);
      
    stream.on('tweet', function (tweet) {
        console.log('User: ' + TWId + ' Just tweeted: ' +  tweet.text);
    });
}

function streamTweetsByKeyboard($keyword){
    var stream = T.stream('statuses/filter', { track: $keyword })
    stream.on('tweet', function (tweet) {
        console.log("User : " + tweet.user.screen_name + " Just tweeted: " + tweet.text);
    })
}

function sendTweet($message){
    T.post(
        'statuses/update',
        { status: $message },
        (err, data, response) => {
        //console.log(err, data, response);
         console.log("Tweet sent");
        }
    )
}