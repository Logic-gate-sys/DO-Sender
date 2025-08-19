'use client' // this works completely on the client


import { getDefaultConfig } from '@rainbow-me/rainbowkit';

import { zksync, anvil ,sepolia} from 'wagmi/chains';

export default getDefaultConfig({
    appName: 'TS-Sender',
    projectId:"3f82870bd617f1f324b758827a6885fe",// this 100% exist
    chains: [anvil, sepolia, zksync],
    ssr: false, // this is a static site
});