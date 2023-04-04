const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'

export function setTokens ({refreshToken, idToken, expiresIn = 3600}) {
    const expirationDate = (Date.now() + expiresIn * 1000).toString()
    localStorage.setItem(TOKEN_KEY, idToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expirationDate)
}

export function getAccessToken () {
    return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken () {
    return localStorage.getItem(REFRESH_KEY)
}

export function getTokenExpirationDate () {
    return localStorage.getItem(EXPIRES_KEY)
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpirationDate,
}

export default localStorageService