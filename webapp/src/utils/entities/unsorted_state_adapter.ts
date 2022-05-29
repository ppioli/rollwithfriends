import type {
  EntityState,
  EntityStateAdapter,
  IdSelector,
  Update,
  EntityId, Create,
} from 'utils/entities/models'
import {
  createStateOperator,
  createSingleArgumentStateOperator,
} from 'utils/entities/state_adapter'
import {
  ensureEntitiesArray,
  selectIdValue,
} from 'utils/entities/utils'

export function createUnsortedStateAdapter<E>(
  selectId: IdSelector<E>
): EntityStateAdapter<E> {
  type R = EntityState<E>
  type C = Create<E>
  type U = Update<E>

  function addOneMutably({entity, timestamp}: C, state: R): void {
    const key = selectIdValue(entity, selectId)

    if (key in state.entities) {
      return
    }

    state.ids.push(key)
    state.entities[key] = entity
    state.committedState[key] = {
      value: entity,
      lastCommit: timestamp,
      lastUpdate: timestamp,
    };
  }

  function addManyMutably(
    newEntities: readonly C[] | Record<EntityId, C>,
    state: R
  ): void {
    newEntities = ensureEntitiesArray(newEntities)

    for (const entity of newEntities) {
      addOneMutably(entity, state)
    }
  }

  function setOneMutably({entity, timestamp}: C, state: R): void {
    const key = selectIdValue(entity, selectId)
    if (!(key in state.entities)) {
      state.ids.push(key)
    }
    state.entities[key] = entity
    state.committedState[key] = {
      value: entity,
      lastUpdate: timestamp,
      lastCommit: timestamp
    }
  }

  function setManyMutably(
    newEntities: readonly C[] | Record<EntityId, C>,
    state: R
  ): void {
    newEntities = ensureEntitiesArray(newEntities)
    for (const entity of newEntities) {
      setOneMutably(entity, state)
    }
  }

  function setAllMutably(
    newEntities: readonly C[] | Record<EntityId, C>,
    state: R
  ): void {
    newEntities = ensureEntitiesArray(newEntities)

    state.ids = []
    state.entities = {}
    state.committedState = {}

    addManyMutably(newEntities, state)
  }

  function removeOneMutably(key: EntityId, state: R): void {
    return removeManyMutably([key], state)
  }

  function removeManyMutably(keys: readonly EntityId[], state: R): void {
    let didMutate = false

    keys.forEach((key) => {
      if (key in state.entities) {
        delete state.entities[key]
        delete state.committedState[key]
        didMutate = true
      }
    })

    if (didMutate) {
      state.ids = state.ids.filter((id) => id in state.entities)
    }
  }

  function removeAllMutably(state: R): void {
    Object.assign(state, {
      ids: [],
      entities: {},
    })
  }

  function updateAndTakeNewKey(
    keys: { [id: string]: EntityId },
    update: U,
    state: R
  ): boolean {
    // const original = state.mapEntity[update.id]
    // const updated =  Object.assign({}, original, update.entity )
    const newKey = selectIdValue(update.entity, selectId)
    const hasNewKey = newKey !== update.id

    if (hasNewKey) {
      //TODO implement key mutation
      throw new Error("Unimplemented")
      // keys[update.id] = newKey
      // delete state.mapEntity[update.id]
      // // move
      // state.committedState[newKey] = {
      //   ...state.committedState[update.id],
      //
      // }
      // delete state.committedState[update.id]
    }

    state.entities[newKey] = update.entity;
    state.committedState[newKey].lastUpdate = update.timestamp;

    return hasNewKey
  }

  function commit(
      update: U,
      state: R
  ) {
    const newKey = selectIdValue(update.entity, selectId)
    const hasNewKey = newKey !== update.id

    if (hasNewKey) {
      //TODO implement key mutation
      throw new Error("Unimplemented")
      // keys[update.id] = newKey
      // delete state.mapEntity[update.id]
      // // move
      // state.committedState[newKey] = {
      //   ...state.committedState[update.id],
      //
      // }
      // delete state.committedState[update.id]
    }

    state.committedState[newKey].lastCommit = update.timestamp;
    state.committedState[newKey].value = update.entity;
  }

  function revert(
      update: U,
      state: R
  ) {
    const newKey = selectIdValue(update.entity, selectId)
    const hasNewKey = newKey !== update.id

    if (hasNewKey) {
      //TODO implement key mutation
      throw new Error("Unimplemented")
      // keys[update.id] = newKey
      // delete state.mapEntity[update.id]
      // // move
      // state.committedState[newKey] = {
      //   ...state.committedState[update.id],
      //
      // }
      // delete state.committedState[update.id]
    }

    if(state.committedState[newKey].lastUpdate > update.timestamp ) {
      console.log("Trying to revert an old update, ignoring")
      return;
    }
    console.log("Reverting change")
    state.entities[newKey] = state.committedState[newKey].value;
  }

  function updateOneMutably(update: U, state: R): void {
    return updateManyMutably([update], state)
  }

  function updateManyMutably(
    updates: ReadonlyArray<U>,
    state: R
  ): void {
    const newKeys: { [id: string]: EntityId } = {}

    const updatesPerEntity: { [id: string]: U } = {}

    updates.forEach((update) => {
      // Only apply updates to mapEntity that currently exist
      if (update.id in state.entities) {
        // If there are multiple updates to one entity, merge them together
        if( updatesPerEntity[update.id]) {
          if(updatesPerEntity[update.id].timestamp < update.timestamp) {
            updatesPerEntity[update.id] = update;
          }
        } else {
          updatesPerEntity[update.id] = update;
        }
      }
    })

    updates = Object.values(updatesPerEntity)

    const didMutateEntities = updates.length > 0

    if (didMutateEntities) {
      const didMutateIds =
        updates.filter((update) => updateAndTakeNewKey(newKeys, update, state)).length >
        0

      if (didMutateIds) {
        state.ids = state.ids.map((id) => newKeys[id] || id)
      }
    }
  }

  function upsertOneMutably(entity: C, state: R): void {
    return upsertManyMutably([entity], state)
  }

  function upsertManyMutably(
    newEntities: readonly C[] | Record<EntityId, C>,
    state: R
  ): void {
    // const [added, updated] = splitAddedUpdatedEntities<T>(
    //   newEntities,
    //   selectId,
    //   state
    // )
    //
    // updateManyMutably(updated, state)
    // addManyMutably(added, state)
  }

  return {
    removeAll: createSingleArgumentStateOperator(removeAllMutably),
    addOne: createStateOperator(addOneMutably),
    addMany: createStateOperator(addManyMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    updateOne: createStateOperator(updateOneMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    upsertMany: createStateOperator(upsertManyMutably),
    removeOne: createStateOperator(removeOneMutably),
    removeMany: createStateOperator(removeManyMutably),
    commit: createStateOperator(commit),
    revert: createStateOperator(revert),
  }
}
