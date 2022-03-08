const got = require('got')

const config = require('./config.js')
const tools = require('./tools.js')
const sendPush = require('./push.js')

const sleep = (n) => new Promise(resolve => setTimeout(() => resolve(), n))


let wait_s = 5000, wait_d = 10000

run()

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

    let template = {}

    console.log(`-------------------------------------🎁🎁开始啦🎁🎁-------------------------------------`)
    template.user_name = await user_name(el, HEADERS)
    template.check_in = await check_in(el, HEADERS)
    await random_sleep(wait_s, wait_d)
    template.draw = await draw(el, HEADERS)
    await random_sleep(wait_s, wait_d)
    template.dip_lucky = await dip_lucky(el, HEADERS)
    await random_sleep(wait_s, wait_d)
    template.cur_point = await get_cur_point(el, HEADERS)

    templates.push(template)
  }

  let content = ''
  for (let i = 0; i < templates.length; i++) {
    content += `用户：${templates[i].user_name}\n签到：${templates[i].check_in}\n抽奖：${templates[i].draw}\n沾喜气：${templates[i].dip_lucky}\n钻石总数：${templates[i].cur_point}\n`
    content += '\n===========================================\n'
  }
  console.log(content)
  await sendPush({ title: '掘金签到抽奖', content: content })
}




//签到
async function check_in(info, headers) {
  const res = await got.post(`https://api.juejin.cn/growth_api/v1/check_in?aid=${info.aid}&uuid=${info.uuid}&_signature=${info.signature}`, {
    headers: headers
  }).json()

  console.log(`签到：${JSON.stringify(res)}`)
  return await machiningRes(res, () => {
    return `签到成功`
  })
}

//抽奖
async function draw(info, headers) {

  const freeLottery = await is_free_lottery(info, headers)
  //只抽免费次数
  if (freeLottery) {
    const res = await got.post(`https://api.juejin.cn/growth_api/v1/lottery/draw?aid=${info.aid}&uuid=${info.uuid}`, {
      headers: headers
    }).json()

    console.log(`抽奖：${JSON.stringify(res)}`)
    return await machiningRes(res, () => {
      return `奖品：${res.data.lottery_name}`
    })
  }
  return `免费抽奖次数已用完`

}

//沾喜气
async function dip_lucky(info, headers, retry = 0) {
  const res = await got.post(`https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky?aid=${info.aid}&uuid=${info.uuid}`, {
    headers: headers
  }).json()

  if (retry < 5 && !res.data.has_dip) {
    console.log(`沾喜气第${retry}请求结果：${JSON.stringify(res)}`)
    await random_sleep(1000, 2000)
    return await dip_lucky(info, headers, ++retry)
  }

  console.log(`沾喜气：${JSON.stringify(res)}`)
  return await machiningRes(res, () => {
    return `${(res.data.has_dip ? '已经沾过喜气了' : `沾到${res.data.dip_value}个喜气`)}，当前喜气值：${res.data.total_value}`
  })
}

//获取钻石总数
async function get_cur_point(info, headers) {
  const res = await got(`https://api.juejin.cn/growth_api/v1/get_cur_point?aid=${info.aid}&uuid=${info.uuid}`, {
    headers: headers
  }).json()

  console.log(`钻石总数：${JSON.stringify(res)}`)
  return await machiningRes(res, async () => {
    return `当前共有${res.data}个钻石`
  })
}

//是否有免费抽奖次数
async function is_free_lottery(info, headers) {
  const res = await got(`https://api.juejin.cn/growth_api/v1/lottery_config/get?aid=${info.aid}&uuid=${info.uuid}`, { headers: headers }).json()
  console.log(`免费抽奖次数：${res?.data.free_count}`)

  return await machiningRes(res, async () => {
    return res?.data.free_count > 0
  })
}

//获取用户名称
async function user_name(info, headers) {
  const res = await got(`https://api.juejin.cn/user_api/v1/user/get?aid=${info.aid}&uuid=${info.uuid}&user_id=${info.userid}&not_self=1`, { headers: headers }).json()
  console.log(`用户信息：${JSON.stringify(res?.data)}`)

  return await machiningRes(res, async () => {
    return res?.data.user_name
  })

}

async function machiningRes(res, action) {
  if (res.err_no) {
    return res.err_msg
  } else {
    return await action()
  }
}

//随机暂停ms
async function random_sleep(min, max) {
  let interval = await tools.range_random(min, max)
  console.log(`${new Date().toISOString()}===随机暂停${interval}ms`)
  await sleep(interval);
}

module.exports = run