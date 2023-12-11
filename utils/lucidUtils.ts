import { Blockfrost, Lucid } from "lucid-cardano";

export const lucid = await Lucid.new(
    new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnetkmSazmafnDmFFIVAoX1jKsFUL6f8CQcd"),
    "Mainnet",
);
