async function getConfigs(config) {
    let configs = []

    let cookies = config?.cookie.split('\n')

    if (cookies && cookies.length > 0) {
        for (let index = 0; index < cookies.length; index++) {
            //signature    uuid    aid     cookie
            configs.push({
                cookie: cookies[index]?.trim(),
                aid: await splitValue(config?.aid, index),
                uuid: await splitValue(config?.uuid, index),
                signature: await splitValue(config?._signature, index),
                userid: await splitValue(config?.userid, index),
            })

        }
    }

    return configs
}

async function splitValue(str, index) {
    if (str) {
        let arr = str.split('\n')
        return arr.length > index ? arr[index]?.trim() : arr[arr.length - 1]?.trim()
    }
}

// function sleep(n) {
//     // Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
//     // return new Promise(res => setTimeout(res, n))
//     new Promise((res, rej) => setTimeout(res, n));

// }

function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

async function range_random(min, max) {
    const random = Math.round(Math.random() * (min - max) + max)
    return random
}

module.exports = {
    getConfigs: getConfigs,
    sleep: wait,
    range_random: range_random
}