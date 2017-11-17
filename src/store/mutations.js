import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer;
  },
  [types.SET_PLAYING_STATE] (state, playing) {
    state.playing = playing;
  },
  [types.SET_FULLSCREEN_STATE] (state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  [types.SET_PLAY_LIST] (state, playList) {
    state.playList = playList;
  },
  [types.SET_SEQUENCE_LIST] (state, sequenceList) {
    state.sequenceList = sequenceList;
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX] (state, currentIndex) {
    state.currentIndex = currentIndex;
  },
  [types.SET_DISC] (state, disc) {
    state.disc = disc;
  }
};

export default mutations;
