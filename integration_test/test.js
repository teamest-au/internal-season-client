const package = require('../dist');

const { InternalSeasonClient } = package;

(async () => {
  const testClient = new InternalSeasonClient('localhost:50051');
  const updateResult = await testClient.updateTeamSeason({
    teamSeason: {
      events: [
        {
          type: 'match',
          time: new Date('2020-06-05T20:30:00Z'),
          duration: 60,
          timezone: 'Australia/Adelaide',
          venue: 'Thebarton Senior College',
          court: 'Court 5',
          home: {
            name: 'Dateko',
            isExternal: false,
          },
          away: {
            name: 'Karasuno',
            isExternal: false,
          },
          duty: undefined,
          round: 'Round 1',
        },
      ],
      competitionName: 'Test Competition Please Ignore',
      seasonName: 'Season 1',
      teamName: 'My Team',
      lastScraped: new Date(),
    },
  });
  console.log('Update Result');
  console.log(JSON.stringify(updateResult));
  const readResult = await testClient.getSeasonsForTeam({
    teamSpecifiers: [
      {
        competitionName: 'Test Competition Please Ignore',
        seasonName: 'Season 1',
        teamName: 'My Team',
      },
    ],
  });
  console.log('Read Result');
  console.log(JSON.stringify(readResult));
})();
