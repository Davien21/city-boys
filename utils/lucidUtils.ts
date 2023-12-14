import { Blockfrost, Lucid, UTxO } from "lucid-cardano";

export const initLucid = async () => {
    return await Lucid.new(
        new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnetkmSazmafnDmFFIVAoX1jKsFUL6f8CQcd"),
        "Mainnet",
    );
}

export const getBalance = (utxos: UTxO[]) => {
    if (utxos.length === 0) {
        return null;
    } else {
        let balance: any = {};
        for (const utxo of utxos) {
            for (const assetKey of Object.keys(utxo.assets)) {
                if (balance[assetKey] === undefined) {
                    balance[assetKey] = 0n;
                }
                balance[assetKey] += utxo.assets[assetKey];
            }
        }
        return balance;
    }
}

export let lucid = await initLucid();

export const resetLucid = async () => {
    lucid = await initLucid();
}
