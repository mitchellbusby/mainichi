const buses = require('../server/TfNsw');

const busesHandler = (event, context, callback) => {
  buses.getBusTimesFromJake().then(result => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result),
    });
  });
}

export {busesHandler as handler}