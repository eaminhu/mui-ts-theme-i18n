export const headerParams = {
    companyId: Number(process.env.COMPANY_ID), // 公司id
    api_url: `${process.env.API_URL}`, // 接口地址
    pk: `${process.env.PK}`, // 公钥
    isEncrypt: process.env.ENCRYPT === 'false' ? false : true, // 是否加密 uat/pre有效
}

// 国旗地址
export const FLAGS_URL = 'https://cats2.oss-cn-hongkong.aliyuncs.com/images/countries_flags'
