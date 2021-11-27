import {createApp} from 'vue'
import App from './App.vue'
import getConfig from './config.js';
import * as nearAPI from 'near-api-js';
import 'vue-universal-modal/dist/index.css'

import VueUniversalModal from 'vue-universal-modal'
import 'bootstrap/dist/css/bootstrap.css'

async function initContract() {
    const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

    // Initializing connection to the NEAR TestNet
    const near = await nearAPI.connect({
        deps: {
            keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
        },
        ...nearConfig
    });

    // Needed to access wallet
    const walletConnection = new nearAPI.WalletConnection(near);

    // Load in account data
    let currentUser;
    if (walletConnection.getAccountId()) {
        currentUser = {
            accountId: walletConnection.getAccountId(),
            balance: (await walletConnection.account().state()).amount
        };
    }

    // Initializing our contract APIs by contract name and configuration
    const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
        viewMethods: ["allCandidates"],
        changeMethods: ["vote", "addCandidate"],
        sender: walletConnection.getAccountId()
    });

    return {contract, currentUser, nearConfig, walletConnection};
}

initContract().then(async (contractData) => {
        window.contract = contractData.contract;
        window.currentUser = contractData.currentUser;
        window.nearConfig = contractData.nearConfig;
        window.wallet = contractData.walletConnection;

        const app = createApp(App)
        app.use(VueUniversalModal, {
            teleportTarget: '#modals',
        });
        app.mount('#app');

        const numStars = 200;
        for (let i = 0; i < numStars; i++) {
            let star = document.createElement("div");
            star.className = "star";
            const xy = getRandomPosition();
            star.style.top = xy[0] + 'px';
            star.style.left = xy[1] + 'px';
            document.body.append(star);
        }

        function getRandomPosition() {
            const y = window.innerWidth;
            const x = window.innerHeight;
            const randomX = Math.floor(Math.random() * x);
            const randomY = Math.floor(Math.random() * y);
            return [randomX, randomY];
        }
    }
)




