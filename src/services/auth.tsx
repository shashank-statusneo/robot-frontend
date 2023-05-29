
interface User {
    access_token: null | undefined;
    refresh_token: null | undefined;
}

const getToken = () => {
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.access_token
}

const getRefreshToken = () => {
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.refresh_token
}

const setUserToken = (token: string) => {
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('user'))
    user.access_token = token
}
  

const getUser = () => {
    return localStorage.getItem('user')
    // return JSON.parse(localStorage.getItem('user'))
}

const setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
}

const removeUser = () => {
    localStorage.removeItem('user')
}

const isAuthenticated = () => {
    //@ts-ignore
    return JSON.parse(localStorage.getItem('user')) !== null

}

const UserSession = {
    getToken,
    getRefreshToken,
    getUser,
    setUserToken,
    setUser,
    removeUser,
    isAuthenticated,
}

export default UserSession
