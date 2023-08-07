import { createMedia } from '@artsy/fresnel'
import breakpoints from './breakpoints'

const AppMedia = createMedia({
    breakpoints: breakpoints.values,
})

export const mediaStyles = AppMedia.createMediaStyle()

export const { Media, MediaContextProvider } = AppMedia
