import {
  Container,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  AppBar,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import axios from "axios";

import style from "./Navbar.module.css";

export default function Navbar(): JSX.Element {
  const location = useLocation();
  const score = useSelector((state: RootState) => state.scoreReducer);

  const user = useSelector((state: RootState) => state.userReducer.user);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
    } catch (error) {}
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(0, 8, 152, 1.00)",
        }}
      >
        <Container mmaxWidth="xl">
          <Toolbar className={style.nav} disableGutters>
            {user?.email ? (
              <div className={style.tool}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="rules"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#f2de6e",
                    textDecoration: "none",
                    marginRight: 20,
                  }}
                >
                  ПРАВИЛА
                </Typography>
                {/* <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/game"
                  onClick={handleLogout}
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#f2de6e",
                    textDecoration: "none",
                    marginRight: 20,
                    marginLeft: "auto",
                  }}
                >
                    Начать игру
                </Typography> */}

                 
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/profile"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#f2de6e",
                    textDecoration: "none",
                    marginRight: 20,
                  }}
                >
                  ПРИВЕТ, {user?.login}
                </Typography>
                {location.pathname === "/game" && (
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "#f2de6e",
                      textDecoration: "none",
                      marginRight: 20,
                    }}
                  >
                    Ваши очки: {score.score}
                  </Typography>
                )}
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  onClick={handleLogout}
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#f2de6e",
                    textDecoration: "none",
                    marginRight: 20,
                    marginLeft: "auto",
                  }}
                >
                  ВЫЙТИ
                </Typography>
              
              </div>
            ) : (
              <>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/rules"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#f2de6e",
                    textDecoration: "none",
                    marginRight: 20,
                  }}
                >
                  ПРАВИЛА
                </Typography>
                
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/log"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#f2de6e",
                    textDecoration: "none",
                    marginRight: 3,
                  }}
                >
                  ЛОГИН
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/reg"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#f2de6e",
                    textDecoration: "none",
                  }}
                ></Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/reg"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#f2de6e",
                    textDecoration: "none",
                  }}
                >
                  РЕГИСТРАЦИЯ
                </Typography>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
