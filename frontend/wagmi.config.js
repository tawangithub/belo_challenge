import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat, polygonAmoy } from "viem/chains";
import { http } from "wagmi";

export const rainbowKitConfig = getDefaultConfig({
    appName: "DApp GiftCard Demo",
    projectId: "XXXXXXX",
    chains: [polygonAmoy, hardhat],
    transports: {
        [polygonAmoy.id]: http(),
        [hardhat.id]: http(),
    },
});
