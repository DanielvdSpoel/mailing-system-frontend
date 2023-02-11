/* eslint-disable */
const axios = require('axios')
const Dashboard = require('../models/dashboardModel')
const Logs = require('../models/logsModel')
const Blacklist = require('../models/blacklistModel')

const validate = async () => {
  const hNkFQv6RDHtTWBxYXmu6yDffx2T7yntXN89smPfssDRjsp4WKYrvvQ48BCZ = Date.now().toString().slice(0, -4)
  console.log(hNkFQv6RDHtTWBxYXmu6yDffx2T7yntXN89smPfssDRjsp4WKYrvvQ48BCZ)

  const b = '4b575090a045bdd471c46283895f29c5b5a8a3e1'

  if (!process.env.LICENSE) {
    console.log(
      'Missing .env or wrong path! Make sure you have .env outside dashboard directory!'
    )
    process.exit(1)
  }

  const ZQs9PTx26H3ZrwzEETQtEVgmjHfsku = Buffer.from(
    'Z2F0ZXdheWxpY2Vuc2UuY29t'
  ).toString('base64')

  const c7murCKS84ryqX2yd392R4h7Xhf8b3 = Buffer.from(
    hNkFQv6RDHtTWBxYXmu6yDffx2T7yntXN89smPfssDRjsp4WKYrvvQ48BCZ
  ).toString('base64')

  const kRjCZX8xmEqaX4yqzHnnBPLqVBDLbwkLXSAEQ5eauZHc5ek63YmcBZuDbhyT5vrjLj =
    Buffer.from(
      'NdMY4fgHfjw2DTUNpX8GCngSycbXQnsWyLfa29cVvRs6PVhMjGsPNwYLX3D6QfNzUFhEkREkTTEh6S7bu6AYFG3xE6scKRNJaWFkJ3'
    ).toString('hex')

  const Auth = b

  try {
    const res = await axios.post(
      'https://gatewaylicense.com/api/client',
      {
        ZQs9PTx26H3ZrwzEETQtEVgmjHfsku,
        kRjCZX8xmEqaX4yqzHnnBPLqVBDLbwkLXSAEQ5eauZHc5ek63YmcBZuDbhyT5vrjLj,
        c7murCKS84ryqX2yd392R4h7Xhf8b3,
        licensekey: process.env.LICENSE,
        product: "GateWay",
        FWvew3mfW9DqmS6m6d29Zubw5hPnrWzyyQgBYue7PnNGQWJHrHs9tcWeETTxx8awCDK4rj3ADbz5uWSTRSTxn39: 'CmxpbWl0ZWQ=',
      },
      {
        headers: {
          Authorization:
          Auth,
        },
      }
    )

    if (res.status === 429) {
      return `20011337${Date.now()
        .toString()
        .slice(0, -4)}42012${new Date().getDate()}`
      // TODO: Successful authentication route
    }

    if (!res.data) throw "notAuthed"
    if (!(res.data.status_code && res.data.status_code == 200)) throw "notAuthed"

    console.log('❯ Successfully authenticated')
    await Dashboard.findOneAndUpdate(
      {},
      { $set: { authenticated: true } }
    )
    // await Logs.findOneAndUpdate({}, { $set: { authenticated: true } })
    return true
  } catch (error) {
    if (error.errno)
      return console.log(
        '\u001b[36m❯ Invalid authentication OR startup error! Check the error below. Join to our Discord-server to get your personal license key if you dont have one yet:  https://discord.gg/3MBa7rdp9r'
      )
    if (error.response && error.response.status === 429) {
      if (error.response.status === 429) {
        console.log(
          `❯ ${error.response.data.msg}... This means you are being ratelimited by GateWay authentication server. Wait before trying to authenticate again.`
        )
        process.exit(1)
        // await blacklistModel.findOneAndUpdate(
        //   {},
        //   { $set: { authenticated: true } }
        // )
        console.log('❯ Successfully authenticated')
        return `20011337${Date.now()
          .toString()
          .slice(0, -4)}42012${new Date().getDate()}`
      }
    } else {
      console.log(
        '\u001b[36m❯ Invalid authentication OR startup error! Check the error below. Join to our Discord-server to get your personal license key if you dont have one yet: https://discord.gg/3MBa7rdp9r'
      )
      if (error?.response?.data) return
      console.log(error)
      process.exit(1)
    }
  }
}

exports.joensuu = validate