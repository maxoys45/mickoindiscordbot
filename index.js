import dotenv from 'dotenv'
import Discord from 'discord.js'
import globals from './globals/vars'

import { showHelp, userNotCreated, listUsers, sendCoin, userBalance, createUser } from './actions'

dotenv.config()

const client = new Discord.Client()

client.once('ready', () => {
	console.log('Ready!')
})

client.on('message', message => {
  if (message.content === '!helpme') {
    showHelp(message)

    return
  }

  if (message.content === '!users') {
    listUsers(message)

    return
  }

  if (message.content === '!join') {
    createUser(message)

    return
  }

  if (
    message.content.startsWith('!') &&
    !globals.balances.hasOwnProperty(message.author.username)
  ) {
    userNotCreated(message)

    return
  }

  if (message.content === '!balance') {
    userBalance(message)
  }

  if (message.content.startsWith('!send')) {
    sendCoin(message)
  }
})

client.login(process.env.BOT_TOKEN)