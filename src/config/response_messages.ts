export class ResponseMessages {
    public static common = {
        ERR_SERVER_TIMEOUT: "Server Timeout",
        ERR_URL_NOT_FOUND: "Requested URL not found",
        LOGIN_SUCCESSFULLY: "Login successfully",
        ERR_LOGIN_FAILED: "Incorrect email or password",
        ERR_UNAUTHORIZED: "Unauthorized",
        SIGN_UP_SUCCESSFULLY: "Sign up successfully",
        jwtToken: {
            ERR_CREATE_TOKEN_IN_LOGIN: "Error in create token while login",
            ERR_USER_UNAUTHORISED: "User is not authorised",
            ERR_TOKEN_NOT_EXIST: "Token not exist in request",
            ERR_TOKEN_NOT_VALID: "Token is not valid"
        }
    };

    public static movies = {
        MOVIE_CREATED_SUCCESSFULLY: "Movie created successfully!",
        MOVIE_UPDATED_SUCCESSFULLY: "Movie updated successfully!",
        MOVIE_ALREADY_EXISTS: "Movie already exist with same title.",
        MOVIE_NOT_FOUND: "Movie not found"
    };
}