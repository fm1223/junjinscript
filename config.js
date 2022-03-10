const env = process.env || {}

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 Edg/98.0.1108.62'

module.exports = {
    config: env.config,
    ServerJiang: env.serverJiang,
    Pushplus: env.pushplus,
    userAgent: userAgent
};
