import { FlushSync } from "./FlushSync";
import { RefList } from "./RefList";
import { Stopwatch } from "./StopWatch";

export const ReactRefs: React.FC = () => {
  return (
    <section className="p-8">
      <Stopwatch />
      <RefList />
      <FlushSync />
    </section>
  );
};
