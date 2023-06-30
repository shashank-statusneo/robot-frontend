import { useEffect, useState } from 'react'
import UserSession from './services/auth'
import { password_reset } from '../../redux/actions/auth'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { Box, Typography, TextField, Button, Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

const Profile = () => {
    const dispatch = useAppDispatch()
    const [user, setUser] = useState({
        first_name: 'Unknown',
        last_name: 'User',
        email: 'N/A',
    })

    useEffect(() => {
        // @ts-ignore
        setUser(UserSession.getUser())
    }, [])

    const handleSubmit = (event: {
        preventDefault: () => void
        currentTarget: HTMLFormElement | undefined
    }) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const context = {
            old_password: data.get('old_password'),
            new_password: data.get('new_password'),
        }
        // @ts-ignore
        dispatch(password_reset(context))
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        Change Password
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='old_password'
                            label='Old Password'
                            name='old_password'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='new_password'
                            label='New Password'
                            type='password'
                            id='new_password'
                            autoComplete='current-password'
                        />
                        <Button
                            data-type='Update'
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Profile
