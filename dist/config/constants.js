"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
class Constants {
}
exports.Constants = Constants;
// time formats
Constants.TIME_STAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";
Constants.STANDARD_YMD_FORMAT = "YYYY-MM-DD";
// response status codes
Constants.RESPONSE_STATUS_CODE = {
    SUCCESS_CODE: 200,
    CREATED_SUCCESS_CODE: 200,
    UPDATE_SUCCESS_CODE: 204,
    FAIL_CODE: 400,
    UNAUTHORIZED_CODE: 401,
    NOT_FOUND_CODE: 404,
    CONFLICT_CODE: 409,
    INTERNAL_SERVER_ERROR_CODE: 500,
    TOO_MANY_REQUESTS: 429,
    TIMEOUT_CODE: 408
};
// S3
Constants.S3_PATHS = {
    MOVIE_POSTER_IMAGE_S3_PATH: 'posterImages/{movie_uuid}',
};
//# sourceMappingURL=constants.js.map