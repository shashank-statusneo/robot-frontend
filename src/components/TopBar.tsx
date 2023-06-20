import React from 'react'
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Button,
    IconButton,
    Badge,
    Tooltip,
    Menu,
    Avatar,
    MenuItem,
    Typography,
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useLocation, useNavigate } from 'react-router-dom'
import UserSession from '../services/auth'

const TopBar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    // @ts-ignore
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    // @ts-ignore
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {UserSession.isAuthenticated() && (
                            <Button
                                key='dashboard'
                                onClick={() => navigate('/warehouse')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Optimization
                            </Button>
                        )}
                    </Box>

                    {UserSession.isAuthenticated() ? (
                        <>
                            {/* <IconButton
                                size="large"
                                aria-label="show 1 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={1} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton> */}
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title='Open settings'>
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt='Remy Sharp'
                                            src='./profilepic.svg'
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id='menu-appbar'
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            navigate('/profile')
                                        }}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign='center'>
                                            Account
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign='center'>
                                            Dashboard
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            UserSession.removeUser()
                                            navigate('/signin')
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    ) : location.pathname === '/signup' ? (
                        <Button
                            key='Login'
                            onClick={() => navigate('/signin')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Login
                        </Button>
                    ) : (
                        <Button
                            key='Signup'
                            onClick={() => navigate('/signup')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sign Up
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default TopBar
