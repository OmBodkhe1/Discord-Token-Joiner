const { default: axios } = require('axios')
const prompt = require('prompt-sync')()
const fs = require('fs')
const colors = require('colors');
const config = require('./config.json')
const fetch = require('node-fetch')
const ac = require('ombodkhe');

async function join({ token: token, code: code }) {
    console.log('\n')
    const profile = await axios.get('https://discord.com/api/v9/users/@me', { headers: { "authorization": token } })
    console.log(`${colors.red(`[!]`)} User: ${colors.green(`${profile.data.username}#${profile.data.discriminator}`)}`)
    ac.setAPIKey(config.captcha_key);
    const { data: { fingerprint } } = await axios.get("https://discord.com/api/v9/experiments")
    console.log(`${colors.red(`[!]`)} Fingerprint: ${colors.green(`${fingerprint}`)}`)
    console.log(`${colors.red(`[!]`)} Code: ${colors.green(`https://discord.gg/${code}`)}`)
    console.log(`${colors.red(`[!]`)} Solving Captcha`)
    const captcha = await ac.solveHCaptchaProxyless('https://discord.com', '4c672d35-0701-42b2-88c3-78380b0db560', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36")
    console.log(`${colors.red(`[!]`)} Captcha Solved`)
    const body = { "captcha_key": captcha }
    const res = await fetch(`https://discord.com/api/v9/invites/${code}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json',
            "accept": "*/*",
            "accept-language": "en-US",
            "connection": "keep-alive",
            "DNT": "1",
            "origin": "https://discord.com",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "referer": "https://discord.com/channels/@me",
            "TE": "Trailers",
            "X-Fingerprint": fingerprint,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9001 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36",
            "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDAxIiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDIiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiY2xpZW50X2J1aWxkX251bWJlciI6ODMwNDAsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9"
        }
    })
    const data = await res.json()
    console.log(`${colors.red(`[!]`)} Token Joined In ${data.guild.name} | ${colors.green(`${token}`)}`)
}

const main = async () => {
    console.clear()
    process.title = `Token Joiner | Made with ❤️ by Oᴍ !!!#9649`
    const text = `
    

              ▒█▀▀▀█ ▒█▀▄▀█ 　 ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀▄ ▒█░▄▀ ▒█░▒█ ▒█▀▀▀ 
              ▒█░░▒█ ▒█▒█▒█ 　 ▒█▀▀▄ ▒█░░▒█ ▒█░▒█ ▒█▀▄░ ▒█▀▀█ ▒█▀▀▀ 
              ▒█▄▄▄█ ▒█░░▒█ 　 ▒█▄▄█ ▒█▄▄▄█ ▒█▄▄▀ ▒█░▒█ ▒█░▒█ ▒█▄▄▄
--------------------------------------------------------------------------------
                          Discord Token Joiner
--------------------------------------------------------------------------------`
    console.log(text.blue)
    console.log('\n')
    const tokens = [...new Set(fs.readFileSync('tokens.txt', 'utf-8').replace(/\r/g, '').split('\n'))];
    const invite = prompt(`${colors.red(`[!]`)} Invite Code: `)
    const delay = prompt(`${colors.red(`[!]`)} Delay In Ms: `)
    let token_s = 0;
    let checkInterval = setInterval(function () {
        let token = tokens[token_s++]
        if (token_s >= tokens.length) {
            clearInterval(checkInterval)
        }
        join({ token: token, code: invite })
    }, delay)

}

main()


process.on('unhandledRejection', (reason, p) => {
});

process.on('uncaughtException', (err, origin) => {
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
});

process.on('multipleResolves', (type, promise, reason) => {
});
  
