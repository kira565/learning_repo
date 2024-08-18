import { ChildCount, ChildVerySlow } from "./Example1SlowChild";

// Whats the problem
// before we had isAvailable: false, now we have true
// the problem is that when react will compare fiber nodes
// he will check <ChildCount /> !== <ChildVerySLow>
// so he will unmount childveryslow and mount it again,
// * So instead of just skip or little update we have unmount and mount
// * SOLUTION:
// * 1. USE keys, we always can help react to determine if is it existing or new component
//! KEYS ARE NOT ONLY FOR ARRAYS, ARRAYS are частный случай,SIBLINGS are unique
//я тебя помню я тебя не буду обновлять ты просто чуть чуть сместился
// * 2. Conditional rendering can solve this (1 return)

const Example2Remount: React.FC<{ isAvailable: boolean }> = ({
  isAvailable,
}) => {
  if (isAvailable) {
    return (
      <div>
        <ChildCount />
        <ChildVerySlow key="very-slow-uniq" />
      </div>
    );
  }

  return (
    <div>
      <ChildVerySlow key="very-slow-uniq" />
    </div>
  );
};
