// Setup Wallet
const fs = require("fs");
const {Program} = require("@project-serum/anchor");
const {Keypair, PublicKey, clusterApiUrl, Connection} = require("@solana/web3.js");
const {Wallet, AnchorProvider} = require("@project-serum/anchor");

const programWalletKeypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('./id.json'))));

const programWallet = new Wallet(programWalletKeypair);

const idl = JSON.parse(fs.readFileSync('./idl.json'));
const programId = new PublicKey(idl.metadata.address);
const network = clusterApiUrl(process.env.APP_SOLANA_CLUSTER_API);
const opts = {
    preflightCommitment: "processed" // or "finalized" when the entire blockchain has agnoledged the transaction
};

const getProgramAndProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, programWallet, opts.preflightCommitment);
    const program = new Program(idl, programId, provider);

    return [provider, program];
}

const getAccountDetails = async (accountKey) => {
    const [provider, program] = getProgramAndProvider();
    return await program.account.baseAccount.fetch(accountKey)
}

exports.getProgramAndProvider = getProgramAndProvider;
exports.getAccountDetails = getAccountDetails;