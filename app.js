const got = require('got')

const config = require('./config.js')
const tools = require('./tools.js')
const sendPush = require('./push.js')

const sleep = (n) => new Promise(resolve => setTimeout(() => resolve(), n))


let wait_s = 5000, wait_d = 10000

// run()

async function run() {
  const configs = await tools.getConfigs(config.config)

  let templates = []
  for (let i = 0; i < configs.length; i++) {
    const el = configs[i];

    if (!el.cookie) { continue }
    const HEADERS = {
      'cookie': el.cookie,
      'user-agent': config.userAgent
    }

    console.log(`-------------------------------------ððå¼å§å¦ðð-------------------------------------`)
    let template = {}

    template.user_name = await user_name(el, HEADERS)
    template.check_in = await check_in(el, HEADERS)
    await random_sleep(wait_s, wait_d)
    template.draw = await draw(el, HEADERS)
    await random_sleep(wait_s, wait_d)
    //æ²¾åæ°ä¹åè·åè¢«æ²¾äººçId
    let param = { lottery_history_id: await global_big(el, HEADERS) }
    template.dip_lucky = await dip_lucky(el, HEADERS, param)
    await random_sleep(wait_s, wait_d)
    template.cur_point = await get_cur_point(el, HEADERS)

    templates.push(template)
  }

  let content = ''
  for (let i = 0; i < templates.length; i++) {
    content += `ç¨æ·ï¼${templates[i].user_name}\nç­¾å°ï¼${templates[i].check_in}\næ½å¥ï¼${templates[i].draw}\næ²¾åæ°ï¼${templates[i].dip_lucky}\né»ç³æ»æ°ï¼${templates[i].cur_point}\n`
    content += '\n===========================================\n'
  }
  console.log(content)
  await sendPush({ title: 'æéç­¾å°æ½å¥', content: content })
}




//ç­¾å°
async function check_in(info, headers) {
  const res = await got.post(`https://api.juejin.cn/growth_api/v1/check_in?aid=${info.aid}&uuid=${info.uuid}&_signature=${info.signature}`, {
    headers: headers
  }).json()

  console.log(`ç­¾å°ï¼${JSON.stringify(res)}`)
  return await machiningRes(res, () => {
    return `ç­¾å°æå`
  })
}

//æ½å¥
async function draw(info, headers) {

  const freeLottery = await is_free_lottery(info, headers)
  //åªæ½åè´¹æ¬¡æ°
  if (freeLottery) {
    const res = await got.post(`https://api.juejin.cn/growth_api/v1/lottery/draw?aid=${info.aid}&uuid=${info.uuid}`, {
      headers: headers
    }).json()

    console.log(`æ½å¥ï¼${JSON.stringify(res)}`)
    return await machiningRes(res, () => {
      return `å¥åï¼${res.data.lottery_name}`
    })
  }
  return `åè´¹æ½å¥æ¬¡æ°å·²ç¨å®`

}

//æ²¾åæ°
async function dip_lucky(info, headers, param, retry = 0) {
  headers['Content-Type'] = 'application/json'

  const res = await got.post(`https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky?aid=${info.aid}&uuid=${info.uuid}`, {
    headers: headers,
    body: `{"lottery_history_id":"${param.lottery_history_id}"}`
  }).json()

  console.log(`æ²¾åæ°ï¼${JSON.stringify(res)}`)

  if (retry < 5 && res.erro_no && !res.data?.has_dip && !res.data?.dip_value) {
    console.log(`æ²¾åæ°ç¬¬${retry}è¯·æ±ç»æï¼${JSON.stringify(res)}`)
    await random_sleep(1000, 2000)
    return await dip_lucky(info, headers, param, ++retry)
  }

  return await machiningRes(res, () => {
    return `${(res.data.has_dip ? 'å·²ç»æ²¾è¿åæ°äº' : `æ²¾å°${res.data.dip_value}ä¸ªåæ°`)}ï¼å½ååæ°å¼ï¼${res.data.total_value}`
  })
}

//è·åé»ç³æ»æ°
async function get_cur_point(info, headers) {
  const res = await got(`https://api.juejin.cn/growth_api/v1/get_cur_point?aid=${info.aid}&uuid=${info.uuid}`, {
    headers: headers
  }).json()

  console.log(`é»ç³æ»æ°ï¼${JSON.stringify(res)}`)
  return await machiningRes(res, async () => {
    return `å½åå±æ${res.data}ä¸ªé»ç³`
  })
}

//æ¯å¦æåè´¹æ½å¥æ¬¡æ°
async function is_free_lottery(info, headers) {
  const res = await got(`https://api.juejin.cn/growth_api/v1/lottery_config/get?aid=${info.aid}&uuid=${info.uuid}`, { headers: headers }).json()
  console.log(`åè´¹æ½å¥æ¬¡æ°ï¼${res?.data.free_count}`)

  return await machiningRes(res, async () => {
    return res?.data.free_count > 0
  })
}

//è·åç¨æ·åç§°
async function user_name(info, headers) {
  const res = await got(`https://api.juejin.cn/user_api/v1/user/get?aid=${info.aid}&uuid=${info.uuid}&user_id=${info.userid}&not_self=1`, { headers: headers }).json()
  console.log(`ç¨æ·ä¿¡æ¯ï¼${JSON.stringify(res?.data)}`)

  return await machiningRes(res, async () => {
    return res?.data.user_name
  })
}

//å´è§å¤§å¥
async function global_big(info, headers) {
  const res = await got.post(`https://api.juejin.cn/growth_api/v1/lottery_history/global_big?aid=${info.aid}&uuid=${info.uuid}`, {
    headers: headers,
    body: `{"page_no":1,"page_size":5}`
  }).json()

  console.log(`å´è§å¤§å¥ï¼${JSON.stringify(res)}`)
  return await machiningRes(res, () => {
    if (res?.data?.lotteries?.length > 0) {
      return `${res.data.lotteries[0].history_id}`
    }
    return '7069424055543136264'//é²æ­¢è·åå¤±è´¥åæ­»ä¸ä¸ª
  })
}

async function machiningRes(res, action) {
  if (res.err_no) {
    return res.err_msg
  } else {
    return await action()
  }
}

//éæºæåms
async function random_sleep(min, max) {
  let interval = await tools.range_random(min, max)
  console.log(`${new Date().toISOString()}===éæºæå${interval}ms`)
  await sleep(interval);
}

module.exports = run