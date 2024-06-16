import * as React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Box, ListItemButton } from "@mui/material";
import {
  InventoryOutlined,
  WidgetsOutlined,
  ReceiptOutlined,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function LeftNavigation() {
  const links = [
    { label: "Dashboard", path: "/", icon: <WidgetsOutlined /> },
    { label: "Inventory", path: "/inventory", icon: <InventoryOutlined /> },
    { label: "Orders", path: "/orders", icon: <LocalShippingOutlined /> },
    { label: "Transactions", path: "/transactions", icon: <ReceiptOutlined /> },
  ];
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState(links[0].label);

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
          <ListItem
            key={index}
            selected={selected === link.label}
            onClick={() => handleItemClick(link.label)}
            component={Link}
            to={link.path}
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
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
