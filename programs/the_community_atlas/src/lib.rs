use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("EvWszVN16HcjNaZnkvFb54WsQTiF65rMzrqPfekRR583");

#[program]
pub mod the_community_atlas {
    use super::*;

    pub fn save_transaction_in_account(ctx: Context<CreateBaseAccount>, operation_type: u64, job_id: u64, subject_id: u64, person_id: u64, applicant_key: Pubkey, referral_amount: u64) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        base_account.operation_type = operation_type;
        base_account.job_id = job_id;
        base_account.subject_id = subject_id;
        base_account.applicant_key = applicant_key;
        base_account.person_id = person_id;
        base_account.referral_amount = referral_amount;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateBaseAccount<'info> {
    #[account(init, payer=user, space=9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct BaseAccount {
    pub operation_type: u64,
    pub job_id: u64,
    pub subject_id: u64,
    pub applicant_key: Pubkey,
    pub person_id: u64,
    pub referral_amount: u64,
}