'use client';
// rainbowkit styling 
import '@rainbow-me/rainbowkit/styles.css';

import { useEffect, type ReactNode } from "react";
import config from '@/RainbowKitConfig'
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const client = new QueryClient();
import { JSX } from 'react';

type providerProps = {
    children?: React.ReactNode
}

// wrap providers around the entire application so that every component knows of it
export const Providers=( props: providerProps) =>{
    const [mounted, setMounted] = useState(false);

    // mount components on load
    useEffect(() => setMounted(true), []);

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
            <RainbowKitProvider >
               { mounted? props.children: null}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}



