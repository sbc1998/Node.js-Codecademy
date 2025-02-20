// Require modules
const trails = require('./trails.js');
const util = require('util');

// Callback-based function to get trail distance
const getTrailDistance = (trail, callback) => {
  setTimeout(() => {
    if (trails.hasOwnProperty(trail)) {
      callback(null, trails[trail]);
    } else {
      callback(new Error('Trail not found!'));
    }
  }, 1000);
};

// Callback function
function callback(error, trailData) {
  if (error) {
    console.error(error.message);
    process.exit(1);
  } else {
    console.log(`The ${trailData.nickname} is ${trailData.miles} miles long!`);
  }
}

// Using the callback function
getTrailDistance('North Country', callback);

// Convert to promise-based function
const getTrailDistancePromise = util.promisify(getTrailDistance);

// Using the promise-based function
getTrailDistancePromise('North Country')
  .then(({ nickname, miles }) => {
    console.log(`The ${nickname} is ${miles} miles long!`);
  })
  .catch(error => {
    console.log(error.message);
  });
