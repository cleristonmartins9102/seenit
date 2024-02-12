declare class CustomError extends Error {
    code: number | undefined;
}
export declare class RequiredParameterError extends CustomError {
    code: number;
    constructor(paramName: string);
}
export declare class BadRequestError extends CustomError {
    code: number;
    constructor(message: string);
}
export declare class UnauthorizedError extends CustomError {
    code: number;
    constructor();
}
export {};
