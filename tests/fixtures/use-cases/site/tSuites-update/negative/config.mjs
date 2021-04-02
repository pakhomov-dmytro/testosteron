import SiteTSuitesUpdate from '../../../../../../lib/use-cases/site/tSuites/Update.mjs';

export default {
    useCaseClass : SiteTSuitesUpdate,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const tsuites = await factory.setupTSuites();

        const userId = users[0].id;
        const tSuiteId = tsuites[0].id;

        return { userId, tSuiteId };
    }
};
