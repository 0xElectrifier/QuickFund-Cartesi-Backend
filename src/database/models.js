import { mongoose, Schema } from "mongoose";


const CampaignSchema = new Schema({
    campaignId: { type: String, required: true, maxLength: 50 },
    creatorAddress: { type: String, required: true, maxLength: 50 },
    goal: { type: BigInt, required: true },
    amountPledged: { type: BigInt, default: 0, required: true },
    createdAt: Date,
    endAt: Date
});
export Campaign = mongoose.model("Campaign", CampaignSchema);


const ContributionSchema = new Schema({
    amount: { type: BigInt, required: true },
    campaignId: { type: String, required: true, maxLength: 50 },
    contributor: { type: String, required: true, maxLength: 50 },
});
export Contribution = mongoose.model("Contribution", ContributionSchema);


// const ContributorSchema = new Schema({
//     address: { type: String, required: true },
//     contribution: { ref: "Contribution", is_list: true }

// });
// export Contributor = mongoose.model("Contributor", ContributorSchema);
