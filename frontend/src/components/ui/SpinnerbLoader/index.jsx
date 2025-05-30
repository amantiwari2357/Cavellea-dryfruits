import React from "react";
import s from "./SpinnerbLoader.module.css";
import cn from "clsx";

const SpinnerbLoader = ({ className }) => {
  return <span className={cn(s.Loader, className)}></span>;
};

export default SpinnerbLoader;
