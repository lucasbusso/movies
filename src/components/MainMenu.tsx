import React from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexShrink: 0,
  },
});

interface MainMenuItem {
  iconComponent: any;
  path: string;
  label?: string;
  icon?: React.ReactElement;
}

type MainMenuProps = {
  items?: MainMenuItem[];
};

export default function MainMenu({ items }: MainMenuProps) {
  const classes = useStyles();
  const itemsMap = new Map(items!.map((item) => [item.path, item]));
  const navigate = useNavigate();
  // const params = useParams();

  return (
    <Tabs
      className={classes.root}
      value={itemsMap.has(location.pathname) ? location.pathname : false}
      onChange={(_event, value) => {
        navigate(value);
      }}
    >
      {Array.from(itemsMap.values()).map((item) => (
        <Tab
          value={item.path}
          label={item.label}
          icon={<item.iconComponent />}
          key={item.path}
        />
      ))}
    </Tabs>
  );
}
