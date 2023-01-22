import * as anchor from "@project-serum/anchor";

const assert = require('assert');
import {Program, BN} from "@project-serum/anchor";
import {TheCommunityAtlas} from "../target/types/the_community_atlas";

const {SystemProgram} = anchor.web3;

const baseAccountWallet = anchor.web3.Keypair.generate();
const exampleJobReferrerWallet = anchor.web3.Keypair.generate();

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.TheCommunityAtlas as Program<TheCommunityAtlas>;

describe("the_community_atlas", () => {
    it('Creates a Job Application', async () => {
        await program.rpc.saveTransactionInAccount(
            new BN(1),
            new BN(1),
            new BN(1),
            new BN(1),
            exampleJobReferrerWallet.publicKey,
            new BN(1000),
            {
                accounts: {
                    baseAccount: baseAccountWallet.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId
                },
                signers: [baseAccountWallet]
            });

        const account = await program.account.baseAccount.fetch(baseAccountWallet.publicKey)

        // console.log("Account Key", baseAccountWallet.publicKey.toString());
        // console.log("Account Details", account);

        assert.ok(
            account.operationType.eq(new BN(1)) &&
            account.jobId.eq(new BN(1)) &&
            account.subjectId.eq(new BN(1)) &&
            account.personId.eq(new BN(1)) &&
            account.applicantKey.toString() === exampleJobReferrerWallet.publicKey.toString() &&
            account.referralAmount.eq(new BN(1000))
        );
    })
});
