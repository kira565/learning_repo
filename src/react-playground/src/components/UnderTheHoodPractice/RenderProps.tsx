// * Render Props pattern

import { ReactElement } from "react";
import { ToggleButton, ToggleOff, ToggleOn } from "./CompoundComponents";

// we have parent with props, which is functions
type TLayout = {
  renderToggleOn: (isOn: boolean) => ReactElement;
  renderToggleOff: (isOff: boolean) => ReactElement;
  renderToggleButton: (isOn: boolean) => ReactElement;
};

const Layout: React.FC<TLayout> = ({
  renderToggleButton,
  renderToggleOff,
  renderToggleOn,
}) => {
  return (
    <div>
      <div>{renderToggleButton(true)}</div>
    </div>
  );
};

const RenderProps: React.FC = () => {
  return (
    <Layout
      renderToggleButton={(isOn) => <ToggleButton isOn={isOn} />}
      renderToggleOn={(isOn) => <ToggleOn isOn={isOn}> </ToggleOn>}
      renderToggleOff={(isOn) => <ToggleOff isOff={isOn}> </ToggleOff>}
    />
  );
};
