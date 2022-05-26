import type {
  EntityDefinition,
  Comparer,
  IdSelector,
  EntityAdapter,
} from 'utils/entities/models'
import { createInitialStateFactory } from 'utils/entities/entity_state'
import { createSelectorsFactory } from 'utils/entities/state_selectors'
// import { createSortedStateAdapter } from './sorted_state_adapter'
import { createUnsortedStateAdapter } from 'utils/entities/unsorted_state_adapter'

/**
 *
 * @param options
 *
 * @public
 */
export function createOptimisticEntityAdapter<T>(
  options: {
    selectId?: IdSelector<T>
    sortComparer?: false | Comparer<T>
  } = {}
): EntityAdapter<T> {
  const { selectId, sortComparer }: EntityDefinition<T> = {
    sortComparer: false,
    selectId: (instance: any) => instance.id,
    ...options,
  }

  const stateFactory = createInitialStateFactory<T>()
  const selectorsFactory = createSelectorsFactory<T>()
  if( sortComparer ) {
    throw  new Error("Unimplemented")
  }
  const stateAdapter = createUnsortedStateAdapter(selectId)

  return {
    selectId,
    sortComparer,
    ...stateFactory,
    ...selectorsFactory,
    ...stateAdapter,
  }
}
