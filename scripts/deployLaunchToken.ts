import { toNano } from '@ton/core';
import { LaunchToken } from '../wrappers/LaunchToken';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const launchToken = provider.open(
        LaunchToken.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('LaunchToken')
        )
    );

    await launchToken.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(launchToken.address);

    console.log('ID', await launchToken.getID());
}
