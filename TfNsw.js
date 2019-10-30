
require('isomorphic-fetch');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

const getBusTimes = async () => {
  const response = await fetch('https://api.transport.nsw.gov.au/v1/gtfs/realtime/buses',
  {
    headers: {
      Authentication: `apikey ${process.env.TFNSW_API_KEY}`,
      Accept: "application/x-google-protobuf"
    },
    
  });

  const feed = GtfsRealtimeBindings.FeedMessage.decode(response.body);
  console.log(feed);
  // console.log(feed);
}

module.exports = {
  getBusTimes,
}