# The Community Atlas - Solana Implementation

This repository contains the source code of the Solana Program developed by [The Community Atlas](https://thecommunityatlas.com).

The purpose of this code is to provide the backend structure to leverage the Solana ecosystem to offer revenue sharing incentives to users in the form of “bounties”.

This will help applications build trust among their members as they provide referral incentives in the form of bounties.

The system has three potential actors:
- Users or Communities sharing the bounty with their members of followers
- Users who refer the bounty to a friend
- Users who apply for the bounty (either directly of after being referred)

Members can either:
- Apply for a bounty directly (in which casse the bounty is to be shared between the community and the user)
- Or Refer a friend for the bounty, who in turn can apply to the bounty (in which case the bounty is to be shared between the community, the referrer and the user who applies)

The system will:
- track the referrals
- and the revenue sharing due if a referral is successful

Next steps:
The next version of the application will also allow to directly distribute crypto through all the wallets involved.

In this repository you can find the code of the Solana Program and the code of the Node.js API used to save Job Applications and Referrals.

### Solan Program

To run this program you need first to prepare the development environment necessary for Solana. You can find more info [here](https://docs.solana.com/cli/install-solana-cli-tools).

Once you prepare the development environment. You then need to decide the network you need to test and deploy the app in Anchor.toml `cluster` property. Right now is in `mainnet`.

You then need to generate a new KeyPair which will then be used as the Program Wallet necessary to deploy the Program. Execute this command:
```bash
solana-keygen new -o id.json
```

This command will generate a new Wallet which will be used by the app. Copy that file and paste it inside `/api`

Run this commands to deploy the program using `anchor`:
```bash
   anchor build
   anchor deploy
```

### Node.js API

This app is used to access the Solana Program and use it to store the data in the Blockchain.
This app creates Solana Accounts as a way to store the data we need for each Job Referral or Application.

You can find here the Postman Collection for the Node.js API: [api_postman_collection.json](./api_postman_collection.json)