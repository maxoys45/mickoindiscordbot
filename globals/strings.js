const strings = {
  help: `Command list:\n  !join - Creates your account\n  !users - Lists the user\'s accounts & balances\n  !balance - Shows your balance\n  !send - Send Mickoins to another user\n    * Format: !send [user] [amount]\n    * e.g. !send maxoys45 1000`,
  noAccount: '- You do not have an account yet. Type !join to create one.',
  sendFormatWarning: 'Message must be in !send [username] [amount] format. eg. !send maxoys45 1000.',
  accountCreated: '+ Your account has been created.',
  insufficientFunds: '- You do not have enough Mickoin.',
  noRecipient: '- This recipient does not exist or hasn\'t created an account yet.',
  invalidBet: '- Invalid bet.',
}

export default strings