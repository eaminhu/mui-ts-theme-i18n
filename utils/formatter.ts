import dayjs from 'dayjs'

/** 解析json字符串 */
export function parseJSON(str: string | null, defaultValue: any) {
    if (str === null) return defaultValue
    try {
        const res = JSON.parse(str)
        return res || defaultValue
    } catch (e) {
        return defaultValue
    }
}

export function getThousandsGroupRegex(thousandsGroupStyle: string) {
    switch (thousandsGroupStyle) {
        // 十万分位
        case 'lakh':
            return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g
        // 万分位
        case 'wan':
            return /(\d)(?=(\d{4})+(?!\d))/g
        // 千分位
        case 'thousand':
        default:
            return /(\d)(?=(\d{3})+(?!\d))/g
    }
}

/** 金额分隔符格式化 */
export function applyThousandSeparator(str: string, thousandSeparator = ',', thousandsGroupStyle = 'thousand') {
    const thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle)
    let index = str.search(/[1-9]/)
    index = index === -1 ? str.length : index
    return str.substring(0, index) + str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator)
}

/** 格式化消息返回的字符串的时间戳 */
export const formatNoticeTimeStamp = (content: string) => {
    try {
        const reg = /<?time[^>]*>[^<]*<\/time>/gi
        const tag = content.match(reg)
        let returnVal = ''
        if (Array.isArray(tag) && tag.length > 0) {
            tag.forEach(() => {
                returnVal = content.replace(reg, (matchStr) => {
                    const time = matchStr.toString().replace(/<\/?time>/g, '')
                    return dayjs(Number(time)).format('YYYY-MM-DD HH:mm:ss')
                })
            })
            return returnVal
        } else {
            return content
        }
    } catch (error) {
        console.log(error)
    }
    return content
}
