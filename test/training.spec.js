const utils = require('./helpers/utils'),
  { mockCommand } = require('./helpers/mocks'),
  {
    basicFiles,
    sequelizeFiles,
    sequelizeFilesGraphql,
    travisFiles,
    herokuFiles,
    jenkisFiles,
    dockerFiles,
    examplePrompts,
    basicFilesGraphql
  } = require('./helpers/constants');

const technologys = ['expressJS', 'graphQL'];

describe.each(technologys)('WTraining project', technology => {
  beforeAll(() => {
    mockCommand();
    return utils.runKickoff({ ...examplePrompts, inTraining: true, technology });
  });
  test('creates training files', () => {
    if (technology === 'graphQL') {
      utils.checkExistentFiles(
        [basicFilesGraphql, sequelizeFilesGraphql, travisFiles, herokuFiles],
        'WTraining'
      );
      return utils.checkNonExistentFiles([jenkisFiles, dockerFiles], 'WTraining');
    }
    utils.checkExistentFiles([basicFiles, sequelizeFiles, travisFiles, herokuFiles], 'WTraining');
    return utils.checkNonExistentFiles([jenkisFiles, dockerFiles], 'WTraining');
  });
});
