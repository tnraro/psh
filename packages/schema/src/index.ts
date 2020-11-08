import schema from "./schema";

export { default as schema } from "./schema";
export interface IResponse {
    code: string;
    success: boolean;
    message?: string;
}
export interface INewUserResponse extends IResponse {
    code: string;
    success: boolean;
    message?: string;
    user?: IUser
}
export interface INewUserInput {
    email: string;
    username: string;
    password: string;
    terms: ITermsInput;
}
export interface ITermsInput {
    agelimit: boolean;
    usepolicy: boolean;
    privacy: boolean;
    promotion: boolean;
}
export interface ITerms {
    agelimit: boolean;
    usepolicy: boolean;
    privacy: boolean;
    promotion: boolean;
}
export interface IUser {
    id: string;
    email: string;
    homeId?: string;
    username: string;
    terms: ITerms;
}