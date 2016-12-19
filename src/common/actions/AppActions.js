const {AppActionTypes} = require('../constants');

function setCurrentLocation(location) {
  return {
    type: AppActionTypes.SET_CURRENT_LOCATION,
    location
  }
}

const setFlag = flag => ({flag, type: AppActionTypes.SET_APP_FLAGS});

module.exports = {
  setCurrentLocation,
  setFlag
}
