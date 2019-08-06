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
  return <span className={styles.heading}>{children}</span>;
};

Header.Actions = ({ children }) => {
  return <span>{children}</span>;
};

export default Header;
