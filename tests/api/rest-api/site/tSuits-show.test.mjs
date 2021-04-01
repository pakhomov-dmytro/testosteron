import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(tSuitId, token) {
    return {
        method  : 'GET',
        url     : `/api/v1/site/tSuits/${tSuitId}`,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuits-show/positive`,
    'site/tSuits-show/positive',
    async ({ config: { before }, expected }) => {
        const { tSuitId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCasePositive({
            requestBuilder : () => requestBuilder(tSuitId, accessToken),
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuits-show/negative`,
    'site/tSuits-show/negative',
    async ({ config: { before }, input, exception }) => {
        const { userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : () => requestBuilder(input.id, accessToken),
            input,
            exception
        });
    }
);