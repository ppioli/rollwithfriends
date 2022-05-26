/**
 * @public
 */
import {IsAny} from "@reduxjs/toolkit/dist/tsHelpers";
import {PayloadAction} from "@reduxjs/toolkit";

export type EntityId = number | string

/**
 * @public
 */
export type Comparer<T> = (a: T, b: T) => number

/**
 * @public
 */
export type IdSelector<T> = (model: T) => EntityId

/**
 * @public
 */
export interface DictionaryNum<T> {
  [id: number]: T | undefined
}

/**
 * @public
 */
export interface Dictionary<T> extends DictionaryNum<T> {
  [id: string]: T | undefined
}


export type Create<T> = {
  timestamp: string;
  entity: T;
}

/**
 * @public
 */
export type Update<T> = Create<T> & { id: EntityId; }

/**
 * @public
 */
export interface EntityState<T> {
  ids: EntityId[]
  entities: Dictionary<T>
  committedState: Dictionary<CommittedState<T>>
}

export interface CommittedState<T> {
  value: T,
  lastCommit: string,
  lastUpdate: string,
}

/**
 * @public
 */
export interface EntityDefinition<T> {
  selectId: IdSelector<T>
  sortComparer: false | Comparer<T>
}

export type PreventAny<S, T> = IsAny<S, EntityState<T>, S>

/**
 * @public
 */
export interface EntityStateAdapter<T> {
  addOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: Create<T>): S
  addOne<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    action: PayloadAction<Create<T>>
  ): S
  addMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: readonly Create<T>[] | Record<EntityId, Create<T>>
  ): S
  addMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: PayloadAction<readonly Create<T>[] | Record<EntityId, Create<T>>>
  ): S

  setOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: Create<T>): S
  setOne<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    action: PayloadAction<Create<T>>
  ): S
  setMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: readonly  Create<T>[] | Record<EntityId, Create<T>>
  ): S
  setMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: PayloadAction<readonly Create<T>[] | Record<EntityId, Create<T>>>
  ): S
  setAll<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: readonly Create<T>[] | Record<EntityId, Create<T>>
  ): S
  setAll<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: PayloadAction<readonly Create<T>[] | Record<EntityId, Create<T>>>
  ): S

  removeOne<S extends EntityState<T>>(state: PreventAny<S, T>, key: EntityId): S
  removeOne<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    key: PayloadAction<EntityId>
  ): S

  removeMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    keys: readonly EntityId[]
  ): S
  removeMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    keys: PayloadAction<readonly EntityId[]>
  ): S

  removeAll<S extends EntityState<T>>(state: PreventAny<S, T>): S

  updateOne<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    update: Update<T>
  ): S
  updateOne<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    update: PayloadAction<Update<T>>
  ): S

  updateMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    updates: ReadonlyArray<Update<T>>
  ): S
  updateMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    updates: PayloadAction<ReadonlyArray<Update<T>>>
  ): S

  upsertOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: Update<T>): S
  upsertOne<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entity: PayloadAction<Update<T>>
  ): S

  upsertMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: readonly Update<T>[] | Record<EntityId, Update<T>>
  ): S
  upsertMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: PayloadAction<readonly Update<T>[] | Record<EntityId, Update<T>>>
  ): S

  commit<S extends EntityState<T>>(
      state: PreventAny<S, T>,
      update: Update<T>
  ): S
  commit<S extends EntityState<T>>(
      state: PreventAny<S, T>,
      update: PayloadAction<Update<T>>
  ): S
  revert<S extends EntityState<T>>(
      state: PreventAny<S, T>,
      update: Update<T>
  ): S
  revert<S extends EntityState<T>>(
      state: PreventAny<S, T>,
      update: PayloadAction<Update<T>>
  ): S
}

/**
 * @public
 */
export interface EntitySelectors<T, V> {
  selectIds: (state: V) => EntityId[]
  selectEntities: (state: V) => Dictionary<T>
  selectAll: (state: V) => T[]
  selectTotal: (state: V) => number
  selectById: (state: V, id: EntityId) => T | undefined
}

/**
 * @public
 */
export interface EntityAdapter<T> extends EntityStateAdapter<T> {
  selectId: IdSelector<T>
  sortComparer: false | Comparer<T>
  getInitialState(): EntityState<T>
  getInitialState<S extends object>(state: S): EntityState<T> & S
  getSelectors(): EntitySelectors<T, EntityState<T>>
  getSelectors<V>(
    selectState: (state: V) => EntityState<T>
  ): EntitySelectors<T, V>
}
