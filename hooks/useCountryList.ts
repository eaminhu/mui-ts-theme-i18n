import { useRequest } from 'ahooks'
import { getCountryList } from '@/services/base'
import { GET_COUNTRY_LIST } from '@/constant'

/**
 * 获取国家接口缓存
 */
export default function useCountryList() {
    return useRequest(getCountryList, {
        cacheKey: GET_COUNTRY_LIST,
        staleTime: -1,
    })
}
