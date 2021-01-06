import { delimiter } from './config.json'
import { formatMsg } from './globals/helpers'
import globals from './globals/vars'
import strings from './globals/strings'

export const showHelp = message => {
  message.channel.send(formatMsg(strings.help.trim()))
}

/**
 * Output warning for users who do not have an account yet.
 */
export const userNotCreated = message => {
  message.channel.send(formatMsg(strings.noAccount, 'diff'))
}

/**
 * List the users with accounts.
 */
export const listUsers = message => {
  let output = ''

  for (const [key, value] of Object.entries(globals.balances)) {
    output += `${key}: ${value}\n`
  }

  message.channel.send(formatMsg(output, 'apache'))
}

/**
 * Send Mickoin's to another user.
 */
export const sendCoin = message => {
  const recipient = message.content.split(' ')[1].toLowerCase()
  const amount = Math.abs(Number(message.content.split(' ')[2]))

  if (globals.balances[message.author.username] >= amount && globals.balances.hasOwnProperty(recipient)) {
    globals.balances[recipient] += amount
    globals.balances[message.author.username] -= amount

    message.channel.send(`\`\`\`apache
${message.author.username} sent ${recipient} ${delimiter}${amount}
${recipient} now has ${delimiter}${globals.balances[recipient]}\`\`\``)
  } else {
    if (globals.balances[message.author.username] < amount) {
      message.channel.send(formatMsg(strings.notEnoughFunds, 'diff'))
    } else if (!globals.balances.hasOwnProperty(recipient)) {
      message.channel.send(formatMsg(strings.noRecipient, 'diff'))
    } else {
      message.channel.send(formatMsg(strings.sendFormatWarning))
    }
  }

  console.log(`recipient=${recipient}\namount=${amount}\nsenderBalance=${globals.balances[message.author.username]}\nrecipientBalance=${globals.balances[recipient]}`)
}

/**
 * Show the users balance.
 */
export const userBalance = message => {
  message.channel.send(formatMsg(`${message.author.username} has ${delimiter}${globals.balances[message.author.username]}`, 'apache'))
}

/**
 * Create a user and set their balance.
 */
export const createUser = message => {
  if (!globals.balances.hasOwnProperty(message.author.username)) {
    globals.balances[message.author.username.toLowerCase()] = globals.startingBalance

    message.channel.send(formatMsg(strings.accountCreated, 'diff'))
  }

  console.log('\nBalances:\n', globals.balances)
}