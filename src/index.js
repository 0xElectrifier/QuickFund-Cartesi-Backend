import { createApp } from "@deroll/app";
import { createWallet } from "@deroll/wallet";
import dotenv from "dotenv";
import { hexToString } from "viem";

import { configMongo } from "./database/config";
import {
    contributeToCampaign, createCampaign,
    getAmountRaised, getCampaign,
    listContributors, parsePayloadJSON
} from "./helpers";


dotenv.config();
configMongo();
const wallet = createWallet();

const app = createApp({
    url: process.env.ROLLUP_SERVER_URL || "http://127.0.0.1:5004",
});

app.addAdvanceHandler(wallet.handler);

app.addAdvanceHandler(async ({ metadata, payload }) => {
    const jsonPayload = parsePayloadJSON(payload);
    if (jsonPayload == null) {
        return "reject";
    }

    if (jsonPayload.method == "create_campaign") {
        createCampaign({ metadata, payload: jsonPayload });
    } else if (jsonPayload.method == "contribute") {
        contributeToCampaign({ metadaata, payload: jsonPayload });
    }

    return "accept";
});

app.addInspectHandler(async ({ metadata, payload }) => {
    const path = hexToString(payload).split("/") // inspect/path/to/resource

    switch (path[1]) {
        case "listContributors": // inspect/0x`${String}`/listContributors
            const contributors = await listContributors(metadata, path);
            sendReport({ payload: contributors });
            break;

        case "amountRaised": // inspect/0x`${String}`/amount_raised
            const amountRaised = await getAmountRaised(path[0]);
            if (!amountRaised) {
                sendReport({ error: "No campaign with this id exists." });
                return "reject";
            }
            sendReport({payload: amountRaised});
            break;

        case "about": // inspect/0x`${String}`/about
            const campaignObj = await getCampaign(path[0]);
			if (!campaignObj) {
				sendReport({ error: "No campaign with this id exists." });
          		return "reject";
			}		
            sendReport({ payload: campaignObj });
            break;

        default:
            break;
    }

    return "accept";
})

// Start the application
app.start().catch((e) => {
    console.error(e);
    process.exit(1);
});
