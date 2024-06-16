import * as React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Box, ListItemButton } from "@mui/material";
import { SettingsOutlined, HistoryOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function RightNavigation() {
  const links = [
    { label: "Settings", path: "/settings", icon: <SettingsOutlined /> },
    { label: "History", path: "/history", icon: <HistoryOutlined /> },
  ];
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState("");

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleItemClick = (label: string) => {
    setSelected(label);
  };

  const isSelected = (label: string) => {
    return label === selected;
  };

  return (
    <Box>
      <List>
        {links.map((link, index) => (
          <ListItemButton
            key={index}
            selected={selected === link.label}
            onClick={() => handleItemClick(link.label)}
          >
            <ListItemIcon
              sx={{ minWidth: 40, color: isSelected(link.label) ? "primary.main" : "gray" }}
            >
              {link.icon}
            </ListItemIcon>
            <ListItemText
              primary={link.label}
              sx={{ color: isSelected(link.label) ? "primary.main" : "gray" }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
