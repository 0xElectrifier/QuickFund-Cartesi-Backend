import { createApp } from "@deroll/app";
import dotenv from "dotenv";

import "./database/config";
import { createCampaign, parsePayload } from "./helpers";


dotenv.config();

const app = createApp({
    url: process.env.ROLLUP_SERVER_URL || "http://127.0.0.1:5004",
});

app.addAdvanceHandler(async ({ metadata, payload }) => {
    const jsonPayload = parsePayload(payload);
    if (jsonPayload == null) {
        return "reject";
    }

    if (jsonPayload.method == "create_campaign") {
        createCampaign({ metadata, payload: jsonPayload });
    }

});