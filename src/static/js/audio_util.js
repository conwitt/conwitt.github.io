/*
* Audio playback functions and filepaths
* Author: Connor Witt
*/

var exports = module.exports = {};

const SOUNDS_PATH = 'src/static/trump_soundbites/';
const CORRECT_SOUNDS_PATH = SOUNDS_PATH + 'correct/';
const INCORRECT_SOUNDS_PATH = SOUNDS_PATH + 'incorrect/';

const CORRECT_SOUNDS = [
  'because_of_my_genius.mp3',
  'believe_it_or_not.mp3',
  'bing_bong.mp3',
  'genius.mp3',
  'it_only_makes_common_sense.mp3',
  'maybe_winning.mp3',
  'phenomenal.mp3',
  'so_amazing.mp3',
  'thats_fine.mp3',
  'tired_of_winning.mp3',
  'without_question.mp3',
  'probably.mp3'
];

const WAS_TRUMP_SOUNDS = [
  'at_real_donald_trump.mp3',
  'run_by_stupid_people.mp3',
  'best_words.mp3',
  'so_great.mp3'
]

const INCORRECT_SOUNDS = [
  'beating_badly.mp3',
  'dont_think_so.mp3',
  'i_had_no_idea.mp3',
  'outta_here.mp3',
  'we_have_losers.mp3',
  'wrong.mp3',
  'yuge_mistake.mp3',
  'can_you_believe_this.mp3'
];

let answerAudio = null;
exports.playAnswerAudio = function(correct, isTrump) {
  if (answerAudio) {
    answerAudio.pause();
  }
  var soundPath = null;
  if (correct) {
    // Play 'correct' sound
    let soundSet = null;
    if (isTrump) {
      soundSet = CORRECT_SOUNDS.concat(WAS_TRUMP_SOUNDS)
    } else {
      soundSet = CORRECT_SOUNDS
    }
    var numSounds = soundSet.length;
    var sound = soundSet[Math.floor(Math.random() * numSounds)];
    soundPath = CORRECT_SOUNDS_PATH + sound;
  } else {
    // Play 'incorrect' sound
    var numSounds = INCORRECT_SOUNDS.length;
    var sound = INCORRECT_SOUNDS[Math.floor(Math.random() * numSounds)];
    soundPath = INCORRECT_SOUNDS_PATH + sound;
  }
  answerAudio = new Audio(soundPath);
  answerAudio.play();
}
