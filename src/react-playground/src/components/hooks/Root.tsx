import { UseCallbackParent } from "./useCallback";
import { DefferedValueExample } from "./useDefferedValue";
import { UseTransitionExample } from "./useTransition";

export const Hooks: React.FC = () => {
  return (
    <section>
      <UseCallbackParent />
      <UseTransitionExample />
      {/* <UseTransitionWithSuspenseExample /> */}
      <DefferedValueExample />
    </section>
  );
};
