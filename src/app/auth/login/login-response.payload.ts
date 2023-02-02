export interface LoginResponsePayload {
    authenticationToken: string;
    refreshToken: string;
    expirationTime: string;
    username: string;

}