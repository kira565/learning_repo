import { ReactNode, createContext, useState } from "react";

const Toggle: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState({});
  const ToggleContext = createContext({});
  //* CORE LOGIC...
  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};

export const ToggleOn: React.FC<{ children: ReactNode; isOn: boolean }> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export const ToggleOff: React.FC<{ children: ReactNode; isOff: boolean }> = ({
  children,
}) => {
  return <div>{children}</div>;
};
export const ToggleButton: React.FC<{ isOn: boolean }> = () => {
  return <button></button>;
};

//? Problem
// Many variations of toggle component , which are different a little bit

// * Solution: we can create compound component, destructurized to many parts
// 1 <Toggle /> contains main logic of toggle which is always same (core logic)
// he doesnt know how it looks like

// 2 Children components are responsible for visualization

const compoundToggle: React.FC = () => {
  return (
    <Toggle>
      <ToggleOn isOn={true}>button is on</ToggleOn>
      <ToggleOff isOff={false}>button is off</ToggleOff>
      <ToggleButton isOn={true} />
    </Toggle>
  );
};
