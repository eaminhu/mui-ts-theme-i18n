import crypto from 'crypto'
import { isObject } from 'lodash'
import md5 from 'md5'
import { headerParams } from '@/config'

// request入参加密
export function encryptParams(data: any = {}, timestamp: number) {
    const { pk } = headerParams
    if (isObject(data)) {
        data = {
            ...data,
            timestamp,
        }
    }
    const keys = Object.keys(data)
        .filter((el) => ['string', 'number'].includes(typeof data[el]) && data[el] !== '')
        .sort()
    const encryptA = keys.map((el) => `&${el}=${data[el]}`)
    const encryptB = `timestamp=${timestamp}`
    const encryptC = encryptB + encryptA.join('')
    const encryptD = md5(encryptC).toUpperCase()
    const newData: any = { signature: encryptD }
    for (const key in data) {
        if (data.hasOwnProperty(key) && typeof data[key] !== 'undefined') {
            newData[key] = data[key]
        }
    }
    return encryptByChunk(JSON.stringify(newData), pk)
}

export function encryptByChunk(str: string, pubKey: string) {
    let publicKey = '-----BEGIN PUBLIC KEY-----\n'
    for (let i = 0; i < Math.ceil(pubKey.length / 64); i++) {
        publicKey += pubKey.slice(i * 64, (i + 1) * 64) + '\n'
    }
    publicKey += '-----END PUBLIC KEY-----'
    const chunk = 100
    let i = 0
    let encryptedStr = ''
    str = encodeURIComponent(str)
    const strLen = str.length / chunk

    // 对内容进行分块加密
    for (i = 0; i < strLen; i++) {
        const ciphertext = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            Buffer.from(str.slice(i * chunk, (i + 1) * chunk), 'utf8'),
        )
        encryptedStr += ciphertext.toString('base64')
        if (i < strLen - 1) encryptedStr += ','
    }
    return encryptedStr
}
