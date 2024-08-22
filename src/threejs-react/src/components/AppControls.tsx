import { useThreeAppContext } from "../hooks/useTreeApp";

export const AppControls: React.FC = () => {
  const app = useThreeAppContext();

  console.log(app);
  //Component for app controls
  return <div style={{ position: "absolute", zIndex: 10 }}></div>;
};
