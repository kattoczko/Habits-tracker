import React from "react";
import styles from "./Header.module.css";

interface HeaderElements {
  Heading: React.FunctionComponent<React.ReactNode>;
  Actions: React.FunctionComponent<React.ReactNode>;
}

const Header: React.FunctionComponent<React.ReactNode> & HeaderElements = ({
  children
}) => {
  return <header className={styles.header}>{children}</header>;
};

Header.Heading = ({ children }) => {
  return <div className={styles.heading}>{children}</div>;
};

Header.Actions = ({ children }) => {
  return <div>{children}</div>;
};

export default Header;
