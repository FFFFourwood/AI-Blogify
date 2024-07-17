"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import DirectionsIcon from "@mui/icons-material/Directions";
import Stack from "@mui/material/Stack";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";

const pages = ["Home", "Articles", "Discover", "Report", "Admin", "About"];

const drawerWidth = 240;
interface Props {
	children: React.ReactElement;
}

const HeaderSearchPC = () => {
	return (
		<>
			<Paper component="form" sx={{ p: "2px 4px", display: { xs: "none", md: "flex" }, alignItems: "center", width: 250, height: 40 }}>
				<InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." inputProps={{ "aria-label": "Search..." }} />
				<IconButton type="button" sx={{ p: "10px" }} aria-label="search">
					<SearchIcon />
				</IconButton>
			</Paper>
			<IconButton type="button" sx={{ p: "10px", display: { xs: "flex", md: "none" }, color: "white" }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</>
	);
};

function HideOnScroll(props: Props) {
	const { children } = props;
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}
const Header = () => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [auth, setAuth] = React.useState(true);
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const [blogName, setBlogName] = React.useState("Blog Name");
	const open = Boolean(anchorElUser);
	const handleLogin = () => {
		setAuth(true);
		handleClose();
	};

	const handleLogout = () => {
		setAuth(false);
		handleClose();
	};

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleMenuMob = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorElUser(null);
		setAnchorElNav(null);
	};

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2, height: "100px" }}>
				{auth ? (
					<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 48, height: 48 }} />
				) : (
					<Button onClick={handleLogin} sx={{ my: 2 }}>
						Log In
					</Button>
				)}
			</Box>
			<Divider />
			<List>
				{pages.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<CssBaseline />
			<HideOnScroll>
				<AppBar color="primary" component="nav">
					<Toolbar>
						<IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: "none" } }}>
							<MenuIcon />
						</IconButton>

						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => (
								<Button key={page} onClick={handleClose} sx={{ my: 2, color: "white", display: "block" }}>
									{page}
								</Button>
							))}
						</Box>
						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<Typography textAlign="center">{blogName}</Typography>
						</Box>
						<Box>
							<Stack direction="row" spacing={2}>
								<HeaderSearchPC />
								{!auth && (
									<Button onClick={handleLogin} sx={{ my: 2, color: "white", display: { xs: "none", md: "inline-block" } }}>
										Log In
									</Button>
								)}
								{auth && (
									<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", ml: 2 }}>
										<IconButton onClick={handleMenu} sx={{ p: 0 }}>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }} onClick={handleMenu} aria-controls={open ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} />
										</IconButton>
										<Menu
											id="menu-appbar"
											anchorEl={anchorElUser}
											keepMounted
											open={open}
											onClose={handleClose}
											PaperProps={{
												elevation: 0,
												sx: {
													overflow: "visible",
													filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
													mt: 1.5,
													"& .MuiAvatar-root": {
														width: 32,
														height: 32,
														ml: -0.5,
														mr: 1,
													},
													"&::before": {
														content: '""',
														display: "block",
														position: "absolute",
														top: 0,
														right: 14,
														width: 10,
														height: 10,
														bgcolor: "background.paper",
														transform: "translateY(-50%) rotate(45deg)",
														zIndex: 0,
													},
												},
											}}
											transformOrigin={{ horizontal: "right", vertical: "top" }}
											anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
										>
											<MenuItem onClick={handleClose}>Profile</MenuItem>
											<MenuItem onClick={handleClose}>Account</MenuItem>
											<Divider />
											{/* <MenuItem onClick={handleClose}>
											<ListItemIcon>
												<Settings fontSize="small" />
											</ListItemIcon>
											Settings
										</MenuItem> */}
											<MenuItem onClick={handleLogout}>
												<ListItemIcon>
													<Logout fontSize="small" />
												</ListItemIcon>
												Logout
											</MenuItem>
										</Menu>
									</Box>
								)}
							</Stack>
						</Box>
					</Toolbar>
				</AppBar>
			</HideOnScroll>

			<nav>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", md: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</Box>
	);
};

export default Header;
