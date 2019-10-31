const buses = require('../server/TfNsw');

const busesHandler = (event, context, callback) => {
  buses.getBusTimesFromJake().then(result => {
    callback(result);
  });
}

export {busesHandler as handler}