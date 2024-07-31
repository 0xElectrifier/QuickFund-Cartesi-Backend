import { Hex, hexToString } from "viem";

const rollup_server = process.env.ROLLUP_SERVER_URL;

/**
 * Sends a `Report` to the rollup server.
 * @param {Object} body - Request body.
 */
async function sendReport(body) {
    const endpoint = rollup_server + "/report";
    const reportReq = await fetch(endpoint, {
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
        // TODO: Handle exception
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

}


/**
 * Sends donation amount to intended campaign wallet.
 * @param {Object} options - Transaction information.
 * @param {Object} options.metadata - Additional information related to a
 *                                    transaction, E.g msg_sender.
 * @param {Object} options.payload - Hex encoded data, usually passed by
 *                                   the user initiating the transaction.
 */
export async function donateToCampaign({ metadata, payload }) {

}