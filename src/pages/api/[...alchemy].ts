
import { Network, Alchemy } from "alchemy-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY,
    network: Network.ETH_MAINNET,

};

const alchemy = new Alchemy(settings);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = [];
        for await (const nft of alchemy.nft.getNftsForOwnerIterator(req.query.address?.toString() ?? "")) {
            data.push(nft)
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).send(err);
    }
};
