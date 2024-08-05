import { mongoose, Schema } from "mongoose";


const CampaignSchema = new Schema({
    campaignID: { type: String, required: true, maxLength: 50, unique: true },
    creatorAddress: { type: String, required: true, maxLength: 50 },
    goal: { type: BigInt, required: true },
    amountPledged: { type: BigInt, default: 0, required: true },
    createdAt: Date,
    endAt: Date
});
export const Campaign = mongoose.model("Campaign", CampaignSchema);


const ContributionSchema = new Schema({
    amount: { type: BigInt, required: true },
    campaignID: { type: String, required: true, maxLength: 50 },
    contributor: { type: String, required: true, maxLength: 50 },
});
export const Contribution = mongoose.model("Contribution", ContributionSchema);
