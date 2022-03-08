const got = require('got')
const config = require('./config.js')
// import { ServerJiang, userAgent } from './config.js'


async function sendPush(sendObj) {

    await serverJiang(sendObj)
    await pushplus(sendObj)
}

//Server酱推送
async function serverJiang(sendObj) {
    let ServerJiang = config.ServerJiang
    const url = `https://sctapi.ftqq.com/${ServerJiang}.send`

    if (!ServerJiang) {
        console.log(`未配置推送ServerJiang`)
        return;
    }

    //微信server酱推送通知一个\n不会换行，需要两个\n才能换行，故做此替换
    sendObj.content = sendObj.content.replace(/[\n\r]/g, '\n\n');

    try {

        const res = await got.post(url, {
            body: `text=${sendObj.title}&desp=${sendObj.content}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).json()

        console.log(`Server酱推送结果：${JSON.stringify(res)}`)
    } catch (e) {
        console.log(`${e.message}--${e.code}`)
    }
}

//pushplus推送
async function pushplus(sendObj) {
    let Pushplus = config.Pushplus

    if (!Pushplus) {
        console.log(`未配置推送Pushplus`)
        return;
    }
    const url = `http://www.pushplus.plus/send`

    //加空行屏蔽广告
    sendObj.content += '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'

    let body = {
        'token': Pushplus,
        'title': sendObj.title,
        'content': sendObj.content
    }

    try {

        const res = await got.post(url, {
            json: body,
            headers: {
                'Content-Type': 'application/json',
            }
        }).json()

        console.log(`Pushplsh推送结果：${JSON.stringify(res)}`)
    } catch (e) {
        console.log(`${e.message}--${e.code}`)
    }
}

module.exports = sendPush