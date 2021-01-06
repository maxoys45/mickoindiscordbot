import { delimiter } from './config.json'
import { formatMsg } from './globals/helpers'
import globals from './globals/vars'
import strings from './globals/strings'

/**
 * Output warning for users who do not have an account yet.
 */
export const userNotCreated = message => {
  message.channel.send(formatMsg(strings.noAccount, 'diff'))
}

/**
 * Show the list of commands.
 */
export const showHelp = message => {
  message.channel.send(formatMsg(strings.help.trim()))
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
 * Create a user and set their balance.
 */
export const createUser = message => {
  if (!globals.balances.hasOwnProperty(message.author.username)) {
    globals.balances[message.author.username] = globals.startingBalance

    message.channel.send(formatMsg(strings.accountCreated, 'diff'))
  }

  console.log('\nBalances:\n', globals.balances)
}

/**
 * Show the users balance.
 */
export const userBalance = message => {
  message.channel.send(formatMsg(`${message.author.username} has ${delimiter}${globals.balances[message.author.username]}`, 'apache'))
}

/**
 * Send Mickoin's to another user.
 */
export const sendCoin = message => {
  const recipient = message.content.split(' ')[1]
  const amount = Math.abs(Number(message.content.split(' ')[2]))

  if (globals.balances[message.author.username] >= amount && globals.balances.hasOwnProperty(recipient)) {
    globals.balances[recipient] += amount
    globals.balances[message.author.username] -= amount

    message.channel.send(`\`\`\`apache
${message.author.username} sent ${recipient} ${delimiter}${amount}
${recipient} now has ${delimiter}${globals.balances[recipient]}\`\`\``)
  } else {
    if (globals.balances[message.author.username] < amount) {
      message.channel.send(formatMsg(strings.insufficientFunds, 'diff'))
    } else if (!globals.balances.hasOwnProperty(recipient)) {
      message.channel.send(formatMsg(strings.noRecipient, 'diff'))
    } else {
      message.channel.send(formatMsg(strings.sendFormatWarning))
    }
  }

  console.log(`recipient=${recipient}\namount=${amount}\nsenderBalance=${globals.balances[message.author.username]}\nrecipientBalance=${globals.balances[recipient]}`)
}

/**
 * Gamble coins on a coinflip style game.
 */
export const gambleCoin = message => {
  const userChoice = message.content.split(' ')[1]
  const betAmount = Math.abs(Number(message.content.split(' ')[2]))
  let rouletteText = ''
  
  // Fail if they don't enter a proper choice.
  if (userChoice !== 'red' && userChoice !== 'black' && userChoice !== 'green') {
    message.channel.send(formatMsg(strings.invalidBet, 'diff'))

    return
  }

  // Only spin if user has enough balance.
  if (globals.balances[message.author.username] >= betAmount) {
    const wheel = {
      red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
      black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
      green: [0],
    }
    const result = Math.floor(Math.random() * 37) + 1
    let winningColour
    let multiplier = 1
    
    // Charge the user.
    globals.balances[message.author.username] -= betAmount

    // message.channel.send(formatMsg(`${message.author.username} bet ${delimiter}${betAmount} on ${userChoice}\n`))

    // Determine the winning colour.
    for (const colour in wheel) {
      if (wheel[colour].includes(result)) {
        rouletteText += `Winner is ${colour} ${result}\n`
        winningColour = colour
      }
    }

    // Increase return if green.
    if (winningColour === 'green') {
      multiplier = 36
    }

    // If user is correct, increase their balance.
    if (winningColour === userChoice) {
      const winningAmount = betAmount + (betAmount * multiplier)
      globals.balances[message.author.username] += winningAmount

      rouletteText += `${message.author.username} won ${delimiter}${winningAmount}!\n`
    } else {
      rouletteText += `${message.author.username} lost ${delimiter}${betAmount}\n`
    }

    setTimeout(() => {
      message.channel.send(formatMsg(rouletteText))
    }, 500)
  } else {
    message.channel.send(formatMsg(strings.insufficientFunds, 'diff'))
  }
}