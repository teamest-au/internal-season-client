const package = require('../dist');

const { InternalSeasonClient } = package;

(async () => {
  const testClient = new InternalSeasonClient('localhost:50051');
  const result = await testClient.updateTeamSeason({
    events: [],
    matchDuration: 55,
    seasonName: 'Season 1',
    teamName: 'My Team',
    timeScraped: new Date(),
    timezone: 'Australia/Adelaide',
  });
  console.log(result);
})();
