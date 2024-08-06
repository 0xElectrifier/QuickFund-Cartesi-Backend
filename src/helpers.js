import { getAddress, hexToString, stringToHex } from "viem";

import { Campaign, Contribution } from "./database/models";


const rollup_server = process.env.ROLLUP_SERVER_URL;


/**
 * Returns data about campaign
 * @param {Strng} campaignID - Campaign ID, which is the wallet address of
 *                              the Campaign creator.
 */
export async function getCampaign(campaignID) {
    const _obj = await Campaign.findOne(
        { campaignID },
        { projection: {_id: 0, __v: 0}}
    )
    return _obj;
}

/**
 * Queries the database for the total amount raised for a campaign
 * @param {String} campaignID - Campaign ID, which is the wallet address of
 *                              the Campaign creator.
 */
export async function getAmountRaised(campaignID) {
    const _obj = await Campaign.findOne(
        { campaignID },
        { projection: {_id: 0, __v: 0, amountPledged: 1} },
    );

    return _obj;
}

/**
 * Get all contributors to a campaign.
 * @param {Object} options - Transaction information.
 * @param {Object} options.metadata - Additional information related to a transaction, E.g msg_sender.
 * @param {Object} options.payload - Data passed by the user initiating the transaction.
 */
export async function listContributors(metadata, path) {
    const campaignID = path[0];
    const contributors = await Contibution.find(
        { campaignID },
        { projection: {_id: 0, __v: 0},
    });

    return contributors;
}


/**
 * Sends a `Report` to the rollup server.
 * @param {Object} body - Request body.
 */
async function sendReport(body) {
    const endpoint = rollup_server + "/report";
    const bodyHex = stringToHex(JSON.stringify(body));
    const reportRes = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        bodyHex
    });

}


/**
 * Sends a `Notice` to the rollup server.
 * @param {Object} body - Request body.
 */
async function sendNotice(body) {
    const endpoint = rollup_server + "/notice";
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
 * @param {String} payload - Hex encoded data passed by user.
 */
export function parsePayloadJSON(payload) {
    let jsonPayload = {}
    try {
        const payloadString = hexToString(payload);
        jsonPayload = JSON.parse(payloadString);
    } catch (err) {
        sendReport({ error: "Not a valid JSON." });
    }

    if (jsonPayload.method == undefined) {
        sendReport({ error: "`Method` not passed in payload" });

        return null;
    }

    return jsonPayload;
}


/**
 * Handler Creates a donation campaign for the user who initiated transaction.
 * One campaign per wallet, so users can easily test with a known wallet address
 * @param {Object} options - Transaction information.
 * @param {Object} options.metadata - Additional information related to a transaction, E.g msg_sender.
 * @param {Object} options.payload - Data passed by the user initiating the transaction.
 */
export async function createCampaign({ metadata, payload }) {
    // payload - { method: "create_campaign", goal: BigInt, duration: Number(Days) }
    const sender = metadata.msg_sender;
    const goal = BigInt(payload.goal);
    const amountPledged = 0;
    const startDate = new Date();
    const endDate = new Date(startDate.getTime());
    endDate.setDate( endDate.getDate() + payload.duration )

    const obj = {
        campaignId: sender,
        creatorAddress: sender,
        goal,
        amountPledged,
        createdAt: startDate,
        endAt: endDate
    }

    Campaignn.create(obj)
        .catch((err) => {
            if (err.code == 11000) { // Duplicate `campaignId` error is thrown
                const _msg = "You can only run one campaign at a time. Please finish or cancel your current campaign before starting a new one.";
                sendReport({error: _msg});
            }
        });

    sendNotice(obj);
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
        sendReport({ error: "No campaign with this id exists." });

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
