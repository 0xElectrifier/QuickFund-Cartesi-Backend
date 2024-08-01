import { Hex, getAddress, hexToString } from "viem";

import { Campaign, Contribution } from "./database/models";


const rollup_server = process.env.ROLLUP_SERVER_URL;


/**
 * Sends a `Report` to the rollup server.
 * @param {Object} body - Request body.
 */
async function sendReport(body) {
    const endpoint = rollup_server + "/report";
    const reportRes = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body
    });

}


/**
 * Sends a `Notice` to the rollup server.
 * @param {Object} body - Request body.
 */
async function sendNotice(body) {
    const enpoint = rollup_server + "/notice";
    const noticeRes = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body
    });
}


/**
 * Parses the payload(hex) passed by user to json and handles error.
 * @param {Hex} payload - Hex encoded data passed by user.
 */
export function parsePayload(payload) {
    const jsonPayload = {}
    try {
        const payloadString = hexToString(payload);
        jsonPayload = JSON.parse(payloadString);
    } catch (err) {
        sendReport({ payload: "Not a valid JSON." });
    }

    if (jsonPayload.method == undefined) {
        sendReport({ payload: "`Method` not passed in payload" });

        return null;
    }

    return jsonPayload;
}


/**
 * Handler Creates a donation campaign for the user who initiated transaction (msg_sender)
 * @param {Object} options - Transaction information.
 * @param {Object} options.metadata - Additional information related to a transaction, E.g msg_sender.
 * @param {Object} options.payload - Data passed by the user initiating the transaction.
 */
export async function createCampaign({ metadata, payload }) {
    // payload - { method: "create_campaign", goal: String, duration: Number(Days) }
    // Note: One campaign per wallet, so users can test with their wallet addresses
    const sender = metadata.msg_sender;
    const goal = BigInt(payload.goal);
    const startDate = new Date();
    const endDate = new Date(startDate.getTime());
    endDate.setDate( endDate.getDate() + payload.duration )
    const amountPledged = 0;
    // const campaignId = generate
    const obj = {
        campaignId: sender,
        creatorAddress: sender,
        goal,
        createdAt: startDate,
        endAt: endDate
    }

    Campaignn.create(obj);

    // Send `Notice` to Cartesi API
    sendNotices(obj);
}


/**
 * Sends donation amount to intended campaign wallet.
 * @param {Object} options - Transaction information.
 * @param {Object} options.metadata - Additional information related to a
 *                                    transaction, E.g msg_sender.
 * @param {Object} options.payload - Hex encoded data, usually passed by
 *                                   the user initiating the transaction.
 */
export async function contributeToCampaign({ metadata, payload }) {
    // payload - { method: "contribute", campaign_id: String }

    const campaign_id = payload.campaign_id;
    // const amountContributed = metadata.value;
    const updateRes = await Contribution.updateOne(
        { campaignId: campaign_id, },
        { $inc: {amount: amountContributed} }
    );
    if (updateRes.matchedCount == 0) {
        sendReport({ payload: "No campaign with this id exists."});

        return;
    }
        
    const obj = {
        amount: amountContributed,
        campaignId: campaign_id,
        contributor: metadata.msg_sender
    }
    Contribution.create(obj);
    sendNotice(obj);

}
