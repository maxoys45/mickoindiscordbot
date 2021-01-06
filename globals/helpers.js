export const formatMsg = (msg, type = 'fix') => {
  return `\`\`\`${type}
${msg}\`\`\``
}