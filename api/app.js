const express = require('express')
require('dotenv').config()

const {PublicKey, Keypair} = require("@solana/web3.js");
const {web3, BN} = require("@project-serum/anchor");
const {SystemProgram} = web3;

const {getProgramAndProvider, getAccountDetails} = require("./lib/solana_init");

// Setup Express
const app = express();
const port = process.env.APP_NODE_PORT;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var validateAPIKeyMiddleware = function(req, res, next) {
    if(req.headers['api-key'] != process.env.APP_API_KEY){
        res.statusCode = 401;
        res.send("Invalid API KEY");
    } else {
        next();
    }
};

app.use(validateAPIKeyMiddleware);

app.post('/api/job-application', validateAPIKeyMiddleware, async (req, res) => {
    const baseAccountWallet = Keypair.generate();

    try {
        const [provider, program] = getProgramAndProvider();

        await program.rpc.saveTransactionInAccount(
            new BN(req.body.operation_type),
            new BN(req.body.job_id),
            new BN(req.body.subject_id),
            new BN(req.body.person_id),
            new PublicKey(req.body.applicant_key),
            new BN(req.body.referral_amount),
            {
                accounts: {
                    baseAccount: baseAccountWallet.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId
                },
                signers: [baseAccountWallet]
            },
        );

        res.send({
            "account_key": baseAccountWallet.publicKey
        })
    } catch (e) {
        res.statusCode = 400;
        res.send({
            "error": e.message
        })
    }
});

app.get('/api/account/:account_key', async (req, res) => {
    try {
        const accountDetails = await getAccountDetails(req.params.account_key);

        res.send(accountDetails);
    } catch (e) {
        res.statusCode = 400;
        res.send({
            "error": e.message
        })
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})