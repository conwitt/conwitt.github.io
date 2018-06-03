/*
** Vue for Trump Markov
** Author: Connor Witt
*/

const axios = require('axios');
const textUtil = require('./text_util');
const audioUtil = require('./audio_util');

// TODO: Generate URLS
const TRUMP_TWEET_URL = 'https://conwitt-markov.herokuapp.com/trump-markov/';

// Vue app
var potusVsAi = new Vue({
  el: '#TweetApp',
  data: {
    tweet: null,
    answer: null,
    answerFeedback: {
      text: 'Loading...',
      correct: false
    },
    score: 0,
    total: 0,
    buttonsDisabled: true
  },
  methods: {
    getTweet: function() {
      axios.get(TRUMP_TWEET_URL)
        .then((response) => {
          if (this.tweet === null) {
            this.answerFeedback.text = 'Ready!';
            this.answerFeedback.correct = true;
          }
          var rawText = response.data.text;
          this.tweet = textUtil.formatTweetText(rawText);
          this.answer = response.data.trump;
          this.buttonsDisabled = false;
        })
        .catch(function (error) {
            console.log(error.message);
        });
    },
    checkAnswer: function(answer) {
      this.buttonsDisabled = true;
      if (answer === this.answer) {
        this.score++;
        this.answerFeedback.text = 'Correct';
        this.answerFeedback.correct = true;
        audioUtil.playAnswerAudio(true, answer);
      } else {
        this.answerFeedback.text = 'Incorrect';
        this.answerFeedback.correct = false;
        audioUtil.playAnswerAudio(false, answer);
      }
      // Get new tweet
      this.total++;
      this.getTweet();
    }
  },
  created() {
    this.getTweet();
  }
})
