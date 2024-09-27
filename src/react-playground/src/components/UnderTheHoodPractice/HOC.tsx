// * High Order Component

import { ChildCount, ChildVerySlow } from "./Example1SlowChild";

//  функции высшего порядка которые либо принимают либо возвращают другие функции
// компоненты прпнимают или возвразабт компоненты

// HOC is useful because eg with auth we need many complex logix, but no auth should renturn just 1 field
// so we can avoid all complex logic and conditionally return component for Auth

// * HOC IS VERY USEFUL TO AVOID EXTRA HOOK CALLS
export const WithAuth = (
  isAuthorized: boolean,
  {
    AuthComponent,
    UnAuthComponent,
  }: { AuthComponent: React.FC; UnAuthComponent: React.FC }
) => {
  const WrappedComponentWithAuth = (props: any) => {
    if (isAuthorized) {
      return <AuthComponent {...props} />;
    } else {
      return <UnAuthComponent {...props} />;
    }
  };

  return WrappedComponentWithAuth;
};

const DetailWithAuthorize = WithAuth(true, {
  AuthComponent: ChildCount,
  UnAuthComponent: ChildVerySlow,
});

// *
