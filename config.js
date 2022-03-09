// export { config, PUSH_PLUS_TOKEN, userAgent }

const config =
{
    cookie: `_ga=GA1.2.657551368.1646796613; _gid=GA1.2.1739221291.1646796613; MONITOR_WEB_ID=50b164e8-1719-48d7-88b5-cc6f8d7ba47b; _tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%7B%22web_id%22%3A%227072937552769500711%22%2C%22user_unique_id%22%3A%227072937552769500711%22%2C%22timestamp%22%3A1646796613610%7D; passport_csrf_token_default=d7ecf666ab49b1ff0a639414f5dc6860; passport_csrf_token=d7ecf666ab49b1ff0a639414f5dc6860; _tea_utm_cache_2018=undefined; sid_guard=bd4682de0659467f144e9580567ce111|1646798344|5184000|Sun,+08-May-2022+03:59:04+GMT; uid_tt=e4cd9739f923b0d84fec5c398cd0427b; uid_tt_ss=e4cd9739f923b0d84fec5c398cd0427b; sid_tt=bd4682de0659467f144e9580567ce111; sessionid=bd4682de0659467f144e9580567ce111; sessionid_ss=bd4682de0659467f144e9580567ce111; sid_ucp_v1=1.0.0-KDBkZGEyOTU3ZDMyYjRlYjg0OTIxNWYzZjAxZmE3N2JiZTcyMGVhMjAKFwjIhsC__fXFARCIzKCRBhiwFDgCQO8HGgJsZiIgYmQ0NjgyZGUwNjU5NDY3ZjE0NGU5NTgwNTY3Y2UxMTE; ssid_ucp_v1=1.0.0-KDBkZGEyOTU3ZDMyYjRlYjg0OTIxNWYzZjAxZmE3N2JiZTcyMGVhMjAKFwjIhsC__fXFARCIzKCRBhiwFDgCQO8HGgJsZiIgYmQ0NjgyZGUwNjU5NDY3ZjE0NGU5NTgwNTY3Y2UxMTE;
    MONITOR_WEB_ID=fefe37db-f11f-4cf9-8f52-22dd58a70d50; _ga=GA1.2.532647734.1646723834; _gid=GA1.2.312590342.1646723834; _tea_utm_cache_2608={"utm_source":"gold_browser_extension"}; __tea_cookie_tokens_2608=%7B%22web_id%22%3A%227072624978826921508%22%2C%22user_unique_id%22%3A%227072624978826921508%22%2C%22timestamp%22%3A1646723835107%7D; passport_csrf_token_default=6ab8352c39cd5861775e57331423aceb; passport_csrf_token=6ab8352c39cd5861775e57331423aceb; _tea_utm_cache_2018={"utm_source":"gold_browser_extension"}; sid_guard=ae28b48c3d4bfd64c1292aa9aa43a72e|1646723880|5184000|Sat,+07-May-2022+07:18:00+GMT; uid_tt=2990c6a918db05ddce1434df3242cd61; uid_tt_ss=2990c6a918db05ddce1434df3242cd61; sid_tt=ae28b48c3d4bfd64c1292aa9aa43a72e; sessionid=ae28b48c3d4bfd64c1292aa9aa43a72e; sessionid_ss=ae28b48c3d4bfd64c1292aa9aa43a72e; sid_ucp_v1=1.0.0-KGI2ZDIxM2VmZjUwMjhiMjQzZGYwMGNkZGZmMTU0YTk2M2U4Zjk2MDQKFwjtiYCtoIylAhCohpyRBhiwFDgCQO8HGgJsZiIgYWUyOGI0OGMzZDRiZmQ2NGMxMjkyYWE5YWE0M2E3MmU; ssid_ucp_v1=1.0.0-KGI2ZDIxM2VmZjUwMjhiMjQzZGYwMGNkZGZmMTU0YTk2M2U4Zjk2MDQKFwjtiYCtoIylAhCohpyRBhiwFDgCQO8HGgJsZiIgYWUyOGI0OGMzZDRiZmQ2NGMxMjkyYWE5YWE0M2E3MmU; n_mh=NrH1_OC5lnze1SHS0EXdu1Zz6wpgBNh9hr2Eu4epCxk`,
    aid: '2608',
    uuid: `7072937552769500711
    7072624978826921508`,
    _signature: `_02B4Z6wo00901tUQGsAAAIDCVRLggbOmWBLVFB5AANdxtO6Y2LVQWH9elvxKA9ev-zIv1fM1CcbPMIrFqFpdqJugqKWpNv6jlb82CF3AJo6HCi3EEK2-xRcZoOMk0SSXdJxLQ0l4O15zWLed6c
    _02B4Z6wo0010170WrKgAAIDDPRRW6QPZxBO9EqgAAI12C63a98blja2Sj75EhwSMEgNwOVjWDyYd9BG.Ujzb8xW9Hy4Sg-ByE9ClmYgBhyaZ5eSXYh6msmsC5BdnaOu.l2-rcszxAAhsKzR123`,
    userid: `870468939678536
    1289048628921581`
}

const ServerJiang = ``//'SCT2591TjHpAbVsPeMUSVTO0yIrupGIk'//process.env.serverjiqng//
const Pushplus = '5914fc1c066d44dd8a5a8a2f5871404b'// process.env.pushplush//

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 Edg/98.0.1108.62'

module.exports = {
    config: config,
    ServerJiang: ServerJiang,
    Pushplus: Pushplus,
    userAgent: userAgent
}