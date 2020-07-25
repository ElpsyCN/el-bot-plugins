const { match } = require'mirai-ts/dist/utils/message')
const axios = require('axios')
const { isUrl } = require('el-bot/dist/utils/helper')
const { renderString } = require('el-bot/dist/utils/message')
const { merge } = require('el-bot/dist/utils/config')

let niubiJson = null
let niubi = {
  url: 'https://el-bot-api.vercel.app/api/niubi',
  match: [
    {
      re: '来点(\\S*)笑话',
    },
    {
      includes: 'nb',
    },
  ],
}

async function getRandomSentence(name) {
  let sentence = ''
  if (niubiJson) {
    const index = Math.floor(Math.random() * niubiJson.length)
    sentence = renderString(niubiJson[index], name, 'name')
  } else {
    const { data } = await axios.get(niubi.url)
    sentence = renderString(data[0], name, 'name')
  }
  return sentence
}

module.exports = function (ctx) {
  const config = ctx.el.config
  const mirai = ctx.mirai

  // 覆盖默认配置
  merge(niubi, config.niubi)

  mirai.on('message', (msg) => {
    let name = '我'
    let sentence = ''

    if (!isUrl(niubi.url)) {
      niubiJson = require(niubi.url)
    }

    niubi.match.forEach(async (obj) => {
      const str = match(msg.plain.toLowerCase(), obj)
      if (!str) {
        return
      } else if (Array.isArray(str)) {
        name = str[1]
      }

      msg.messageChain.some((singleMessage) => {
        if (singleMessage.type === 'At') {
          name = '「' + singleMessage.display.slice(1) + '」'
          return true
        }
      })

      const sentence = await getRandomSentence(name)
      msg.reply(sentence)
    })
  })

  // 进群时
  mirai.on('MemberJoinEvent', async (msg) => {
    const sentence = await getRandomSentence(msg.member.memberName)
    mirai.api.sendGroupMessage(sentence, msg.member.group.id)
  })
}
