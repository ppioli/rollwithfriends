import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { RollMessageContentProps } from "utils/rollUtils";
import { RollDetail } from "features/chat/RollDetail";
import classNames from "classnames";

const STEP_COUNT = 15;
const MAX_DELAY = 1000;
const MIN_DELAY = 100;

/**
 * Linear delay function
 */
function getDelay(step: number) {
  const delay = MIN_DELAY + (step / STEP_COUNT) * (MAX_DELAY - MIN_DELAY);
  console.log(delay);
  return delay;
}

/**
 * Linear delay function
 */
function getExponentialDelay(step: number) {
  console.log(step);
  const end = 10;
  const normalizedInterval = (step / STEP_COUNT) * end;
  const delay = Math.pow(normalizedInterval, 3);
  console.log(normalizedInterval, delay);
  return delay;
}

export function RollMessageContent({ rolls, isNew }: RollMessageContentProps) {
  const total = _.sumBy(rolls, (roll) => _.sum(roll.result));
  const max = _.sumBy(rolls, (roll) => roll.faces * roll.count);
  const [value, setValue] = useState<number>(isNew ? 1 : total);
  const [isRolling, setIsRolling] = useState(true);
  const steps = useMemo(() => {
    if (isNew) {
      let lastStepValue: number | null = null;
      const step = Math.ceil(max * 0.2);
      const suspenseValues = _.range(0, STEP_COUNT).map(() => {
        if (lastStepValue == null) {
          lastStepValue = total;
          return lastStepValue;
        }
        const mod = Math.random() < 0.5 ? -1 : 1;
        const delta = (1 + Math.round(Math.random() * (step - 1))) * mod;
        lastStepValue = (lastStepValue + delta) % max;

        if (lastStepValue < 1) {
          lastStepValue = max + lastStepValue;
        }
        return lastStepValue;
      });
      return suspenseValues.reverse();
    } else {
      return [];
    }
  }, [isNew, max, total]);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep === steps.length) {
      setIsRolling(false);
      return;
    }
    setValue(steps[currentStep]);

    const handle = setTimeout(
      () => setCurrentStep((s) => s + 1),
      getExponentialDelay(currentStep + 1)
    );
    return () => clearTimeout(handle);
  }, [steps, currentStep]);

  return (
    <div className={"w-full p-2 text-center text-white"}>
      <div
        className={classNames("text-5xl font-bold", {
          "animate-bounce": isRolling,
        })}
      >
        {value}
      </div>
      <RollDetail rolls={rolls} isRolling={isRolling} />
    </div>
  );
}
