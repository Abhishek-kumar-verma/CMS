import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const linkStyle: React.CSSProperties = {
  color: "white",
  marginLeft: "10px",
  marginRight: "20px", // Adjust the spacing between links as needed
  textDecoration: "none", // Remove underlines from links
};

type User = {
  name: "Something";
};
type Props =
  | {
      authenticated: false;
      profile: null;
    }
  | {
      authenticated: true;
      profile: User;
    };

function Header(props: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "rgba(0, 0, 255, 0.6)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <a href="/" style={linkStyle}>
          Home
        </a>
        <a href="/about" style={linkStyle}>
          About
        </a>
      </div>

      {props.authenticated ? (
        props.profile.name
      ) : (
        <Button variant="contained" href="/signup" sx={{ margin : 1 , backgroundColor : 'red'}}>
            Sign Up
        </Button>
      )}
    </div>
  );
}

export default Header;
