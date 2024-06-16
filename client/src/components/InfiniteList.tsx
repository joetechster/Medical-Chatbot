// src/InfiniteScrollComponent.js
import React, { useState, useEffect, ReactNode } from "react";
import { List, ListItem, ListItemText, CircularProgress, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import useWindowDimensions from "../utils/useDimensiong";

const InfiniteScrollComponent = () => {
  const { width } = useWindowDimensions();
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 100) {
      setHasMore(false);
      return;
    }

    // Simulate an API call to fetch more data
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 1500);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Infinite Scroll List
      </Typography>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={hasMore}
        loader={<CircularProgress />}
        useWindow={width > 900 ? false : true}
        getScrollParent={() => document.getElementById("scrollComponent") as ReactNode}
      >
        <List>
          {items.map((_, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Item ${index + 1}`} />
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComponent;
