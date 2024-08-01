import { createApp } from "@deroll/app";
import { createWallet } from "@deroll/wallet";
import dotenv from "dotenv";

import "./database/config";
import {
    contributeToCampaign, createCampaign,
    parsePayload
} from "./helpers";


dotenv.config();
const wallet = createWallet();

const app = createApp({
    url: process.env.ROLLUP_SERVER_URL || "http://127.0.0.1:5004",
});

app.addAdvanceHandler(wallet.handler);

app.addAdvanceHandler(async ({ metadata, payload }) => {
    const jsonPayload = parsePayload(payload);
    if (jsonPayload == null) {
        return "reject";
    }

    if (jsonPayload.method == "create_campaign") {
        createCampaign({ metadata, payload: jsonPayload });
    } else if (jsonPayload.method == "contribute") {
        contributeToCampaign({ metadaata, payload: jsonPayload });
    }

});