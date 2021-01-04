import dotenv from 'dotenv'
import { prefix, delimiter } from './config.json'
import Discord from 'discord.js'

dotenv.config()

const client = new Discord.Client()

const startingBalance = 5000
const balances = {
  crekk: startingBalance,
  maxoys45: startingBalance,
  chubbylove: startingBalance,
}

client.once('ready', () => {
	console.log('Ready!')
})

client.on('message', message => {
  // if (message.content === `${prefix}ping`) {
  //   message.channel.send('Pong.')
  // } else if (message.content === `${prefix}me`) {
  //   message.channel.send(`Your balance: ${balances[message.author.username]}`);
  // }

  messageCommandResponse(message, 'me', 'you smell')

  setUserBalance(message.author.username)

  if (message.content.startsWith('!send')) {
    const recipient = message.content.split(' ')[1]
    const amount = Number(message.content.split(' ')[2])

    console.log(recipient, amount, balances[message.author.username], balances[recipient])
    console.log(balances)

    if (balances[message.author.username] && balances[message.author.username] >= amount && balances[recipient]) {
      balances[recipient] += amount
      balances[message.author.username] -= amount

      message.channel.send(`\`\`\`apache
      ${message.author.username} sent ${recipient} ${delimiter}${amount}
      ${recipient} now has ${delimiter}${balances[recipient]}\`\`\``)
      // message.channel.send(`${recipient} now has ${delimiter}${balances[recipient]}`)

    } else {
      message.channel.send(`Message must be in !send [username] [amount] format eg. !send maxoys45 1000`)
    }
  }

  if (message.content === '!balance') {
    message.channel.send(formatApacheMsg(`${message.author.username} has ${delimiter}${balances[message.author.username]}`))
  }
})

const formatApacheMsg = msg => {
  return `\`\`\`apache
  ${msg}\`\`\``
}

const messageCommandResponse = (clientMessage, string, response) => {
  if (clientMessage.content === `${prefix}${string}`) {
    clientMessage.channel.send(response)
  }
}

const setUserBalance = user => {
  if (!balances.hasOwnProperty(user)) {
    balances[user] = startingBalance
  }

  console.log(balances)
}

client.login(process.env.BOT_TOKEN)