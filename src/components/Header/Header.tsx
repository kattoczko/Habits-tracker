import React from "react";

interface HeaderElements {
  Heading: React.FunctionComponent<React.ReactNode>;
  Actions: React.FunctionComponent<React.ReactNode>;
}

const Header: React.FunctionComponent<React.ReactNode> & HeaderElements = ({
  children
}) => {
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      {children}
    </header>
  );
};

Header.Heading = ({ children }) => {
  return <span>{children}</span>;
};

Header.Actions = ({ children }) => {
  return <span>{children}</span>;
};

export default Header;
