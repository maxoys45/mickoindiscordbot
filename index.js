import dotenv from 'dotenv'
import Discord from 'discord.js'
import globals from './globals/vars'

import { userNotCreated, showHelp, listUsers, createUser, userBalance, sendCoin, gambleCoin } from './actions'

dotenv.config()

const client = new Discord.Client()

client.once('ready', () => {
	console.log('Ready!')
})

client.on('message', message => {
  if (
    message.content.startsWith('!') &&
    message.content !== '!join' &&
    message.content !== '!users' &&
    message.content !== '!helpme' &&
    !globals.balances.hasOwnProperty(message.author.username)
  ) {
    userNotCreated(message)

    return
  }

  switch (message.content) {
    case '!helpme':
      showHelp(message)
      break;
    
    case '!users':
      listUsers(message)
      break;
      
    case '!join':
      createUser(message)
      break;
    
    case '!balance':
      userBalance(message)
      break;
  }

  if (message.content.startsWith('!send')) {
    sendCoin(message)
  }
  
  if (message.content.startsWith('!gamble')) {
    gambleCoin(message)
  }
})

client.login(process.env.BOT_TOKEN)