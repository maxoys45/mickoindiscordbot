const { token, prefix, delimiter } = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client()

// const balances = {
//   maxoys45: 1000,
// }

const balances = {
  crekk: 5000,
  maxoys45: 5000,
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
    // return

    if (balances[message.author.username] && balances[message.author.username] >= amount && balances[recipient]) {
      balances[recipient] += amount
      balances[message.author.username] -= amount

      message.channel.send(`${message.author.username} sent ${recipient} ${delimiter}**${amount}**`)
      message.channel.send(`${recipient} now has ${delimiter}**${balances[recipient]}**`)
    } else {
      message.channel.send(`Message must be in !send [username] [amount] format eg. !send maxoys45 1000`)
    }
  }

  if (message.content === '!balance') {
    message.channel.send(`${message.author.username} has ${delimiter}${balances[message.author.username]}`)
  }
})

const messageCommandResponse = (clientMessage, string, response) => {
  if (clientMessage.content === `${prefix}${string}`) {
    clientMessage.channel.send(response)
  }
}

const setUserBalance = user => {
  if (!balances.hasOwnProperty(user)) {
    balances[user] = 5000
  }

  console.log(balances)
}

client.login(token)