import { Models } from '@rematch/core'
import { RematchDispatch, RematchRootState, init } from '@rematch/core'
import loading, { ExtraModelsFromLoading } from '@rematch/loading'
// 基础
import base from './base'

export interface RootModel extends Models<RootModel> {
    base: typeof base
}

export const models: RootModel = { base }

type FullModel = ExtraModelsFromLoading<RootModel>

const store = init<RootModel, FullModel>({
    models,
    plugins: [loading()],
})

export default store

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>
