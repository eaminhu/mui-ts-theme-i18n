import React from 'react'
import Image, { ImageProps } from 'next/image'
import { FLAGS_URL } from '@/config'

export default function ImageNew(props: ImageProps) {
    const { alt = '' } = props
    return <Image {...props} alt={alt} />
}

/**
 * 国旗icon
 * @param props code 国家code
 * @returns
 */
export function FlagImg(props: ImageProps & { code: string }) {
    const { code, ...other } = props
    return <Image {...other} alt={code} src={`${FLAGS_URL}/${code}.png`} />
}
