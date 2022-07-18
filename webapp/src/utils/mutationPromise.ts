import { MutationParameters } from "relay-runtime/lib/mutations/commitMutation";
import { PayloadError } from "relay-runtime/lib/network/RelayNetworkTypes";

export type CommitMutationFunction<TOperation extends MutationParameters> = (
  variables: TOperation["variables"],
  onCompleted?: (
    result: TOperation["response"],
    errors: ReadonlyArray<PayloadError> | null | undefined
  ) => void
) => void;

export type CommitMutationPromiseFunction<
  TOperation extends MutationParameters
> = (variables: TOperation["variables"]) => Promise<TOperation["response"]>;
export type WrapInPromiseFunction = <TOperation extends MutationParameters>(
  commitFunction: CommitMutationFunction<TOperation>
) => CommitMutationPromiseFunction<TOperation>;

export const wrapInPromise: WrapInPromiseFunction =
  <TOperation extends MutationParameters>(
    commitFunction: CommitMutationFunction<TOperation>
  ) =>
  (variables) =>
    new Promise((resolve, reject) => {
      commitFunction(variables, (result, error) => {
        if (error != null) {
          reject(error);
        }
        resolve(result);
      });
    });
