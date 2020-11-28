import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type DeviceType = {
    __typename?: "DeviceType";
    id?: Maybe<Scalars["ID"]>;
    name?: Maybe<Scalars["String"]>;
    type?: Maybe<Scalars["String"]>;
};

export type Device = {
    __typename?: "Device";
    alias?: Maybe<Scalars["String"]>;
    home?: Maybe<Home>;
    id?: Maybe<Scalars["ID"]>;
    lastOnline?: Maybe<Scalars["String"]>;
    online?: Maybe<Scalars["Boolean"]>;
    owner?: Maybe<User>;
    private?: Maybe<Scalars["Boolean"]>;
    status?: Maybe<Scalars["String"]>;
    type?: Maybe<DeviceType>;
};

export type User = {
    __typename?: "User";
    devices?: Maybe<Array<Maybe<Device>>>;
    email?: Maybe<Scalars["String"]>;
    home?: Maybe<Home>;
    id?: Maybe<Scalars["ID"]>;
    roles?: Maybe<Roles>;
    terms?: Maybe<Terms>;
    username?: Maybe<Scalars["String"]>;
};

export type Roles = {
    __typename?: "Roles";
    admin?: Maybe<Scalars["Boolean"]>;
};

export type Terms = {
    __typename?: "Terms";
    agelimit?: Maybe<Scalars["Boolean"]>;
    privacy?: Maybe<Scalars["Boolean"]>;
    promotion?: Maybe<Scalars["Boolean"]>;
    usepolicy?: Maybe<Scalars["Boolean"]>;
};

export type Home = {
    __typename?: "Home";
    admins?: Maybe<Array<Maybe<User>>>;
    devices?: Maybe<Array<Maybe<Device>>>;
    family?: Maybe<Array<Maybe<User>>>;
    id?: Maybe<Scalars["ID"]>;
    name?: Maybe<Scalars["String"]>;
};

export type NewDeviceInput = {
    alias: Scalars["String"];
    id: Scalars["String"];
    private: Scalars["Boolean"];
    type: Scalars["String"];
};

export type Session = {
    __typename?: "Session";
    access_token: Scalars["ID"];
    user?: Maybe<User>;
};

export type NewUserInput = {
    agelimit: Scalars["Boolean"];
    email: Scalars["String"];
    password: Scalars["String"];
    privacy: Scalars["Boolean"];
    promotion: Scalars["Boolean"];
    usepolicy: Scalars["Boolean"];
    username: Scalars["String"];
};

export type SignInUserInput = {
    email: Scalars["String"];
    password: Scalars["String"];
};

export type Query = {
    __typename?: "Query";
    user?: Maybe<User>;
    me?: Maybe<User>;
    deviceTypes?: Maybe<Array<Maybe<DeviceType>>>;
    fetchDeviceStatus?: Maybe<Scalars["String"]>;
};

export type QueryUserArgs = {
    id: Scalars["ID"];
};

export type QueryFetchDeviceStatusArgs = {
    device: Scalars["ID"];
};

export type Mutation = {
    __typename?: "Mutation";
    newUser?: Maybe<Session>;
    signInUser?: Maybe<Session>;
    newHome?: Maybe<Home>;
    joinHome?: Maybe<Home>;
    newDevice?: Maybe<Device>;
    deleteDevice?: Maybe<Device>;
    tnid?: Maybe<Scalars["ID"]>;
    pushDeviceStatus?: Maybe<Scalars["String"]>;
};

export type MutationNewUserArgs = {
    user: NewUserInput;
};

export type MutationSignInUserArgs = {
    user: SignInUserInput;
};

export type MutationNewHomeArgs = {
    name: Scalars["String"];
};

export type MutationJoinHomeArgs = {
    home: Scalars["String"];
};

export type MutationNewDeviceArgs = {
    device: NewDeviceInput;
};

export type MutationDeleteDeviceArgs = {
    id: Scalars["ID"];
};

export type MutationPushDeviceStatusArgs = {
    device: Scalars["ID"];
    status?: Maybe<Scalars["String"]>;
};

export type NewDeviceMutationVariables = Exact<{
    device: NewDeviceInput;
}>;

export type NewDeviceMutation = { __typename?: "Mutation" } & {
    newDevice?: Maybe<
        { __typename?: "Device" } & Pick<Device, "id" | "alias" | "private"> & {
                type?: Maybe<
                    { __typename?: "DeviceType" } & Pick<
                        DeviceType,
                        "id" | "type" | "name"
                    >
                >;
                owner?: Maybe<
                    { __typename?: "User" } & Pick<User, "id" | "username">
                >;
                home?: Maybe<
                    { __typename?: "Home" } & Pick<Home, "id" | "name">
                >;
            }
    >;
};

export type DeleteDeviceMutationVariables = Exact<{
    id: Scalars["ID"];
}>;

export type DeleteDeviceMutation = { __typename?: "Mutation" } & {
    deleteDevice?: Maybe<
        { __typename?: "Device" } & Pick<Device, "id" | "alias">
    >;
};

export type GetDeviceTypesQueryVariables = Exact<{ [key: string]: never }>;

export type GetDeviceTypesQuery = { __typename?: "Query" } & {
    deviceTypes?: Maybe<
        Array<
            Maybe<
                { __typename?: "DeviceType" } & Pick<
                    DeviceType,
                    "id" | "type" | "name"
                >
            >
        >
    >;
};

export type NewHomeMutationVariables = Exact<{
    name: Scalars["String"];
}>;

export type NewHomeMutation = { __typename?: "Mutation" } & {
    newHome?: Maybe<{ __typename?: "Home" } & Pick<Home, "id" | "name">>;
};

export type JoinHomeMutationVariables = Exact<{
    homeId: Scalars["String"];
}>;

export type JoinHomeMutation = { __typename?: "Mutation" } & {
    joinHome?: Maybe<{ __typename?: "Home" } & Pick<Home, "id" | "name">>;
};

export type NewUserMutationVariables = Exact<{
    params: NewUserInput;
}>;

export type NewUserMutation = { __typename?: "Mutation" } & {
    newUser?: Maybe<
        { __typename?: "Session" } & Pick<Session, "access_token"> & {
                user?: Maybe<
                    { __typename?: "User" } & Pick<
                        User,
                        "id" | "email" | "username"
                    >
                >;
            }
    >;
};

export type SignInMutationVariables = Exact<{
    params: SignInUserInput;
}>;

export type SignInMutation = { __typename?: "Mutation" } & {
    signInUser?: Maybe<
        { __typename?: "Session" } & Pick<Session, "access_token"> & {
                user?: Maybe<
                    { __typename?: "User" } & Pick<
                        User,
                        "id" | "email" | "username"
                    >
                >;
            }
    >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
    me?: Maybe<
        { __typename?: "User" } & Pick<User, "id" | "email" | "username"> & {
                home?: Maybe<
                    { __typename?: "Home" } & Pick<Home, "id" | "name"> & {
                            family?: Maybe<
                                Array<
                                    Maybe<
                                        { __typename?: "User" } & Pick<
                                            User,
                                            "id" | "email" | "username"
                                        >
                                    >
                                >
                            >;
                            devices?: Maybe<
                                Array<
                                    Maybe<
                                        { __typename?: "Device" } & Pick<
                                            Device,
                                            | "id"
                                            | "alias"
                                            | "private"
                                            | "online"
                                            | "status"
                                        > & {
                                                type?: Maybe<
                                                    {
                                                        __typename?: "DeviceType";
                                                    } & Pick<
                                                        DeviceType,
                                                        "id" | "type" | "name"
                                                    >
                                                >;
                                                owner?: Maybe<
                                                    {
                                                        __typename?: "User";
                                                    } & Pick<
                                                        User,
                                                        "id" | "username"
                                                    >
                                                >;
                                            }
                                    >
                                >
                            >;
                        }
                >;
                devices?: Maybe<
                    Array<
                        Maybe<
                            { __typename?: "Device" } & Pick<
                                Device,
                                "id" | "alias" | "private" | "online" | "status"
                            > & {
                                    type?: Maybe<
                                        { __typename?: "DeviceType" } & Pick<
                                            DeviceType,
                                            "id" | "type" | "name"
                                        >
                                    >;
                                    owner?: Maybe<
                                        { __typename?: "User" } & Pick<
                                            User,
                                            "id" | "username"
                                        >
                                    >;
                                }
                        >
                    >
                >;
            }
    >;
};

export type UserQueryVariables = Exact<{
    id: Scalars["ID"];
}>;

export type UserQuery = { __typename?: "Query" } & {
    user?: Maybe<
        { __typename?: "User" } & Pick<User, "id" | "email" | "username"> & {
                terms?: Maybe<
                    { __typename?: "Terms" } & Pick<
                        Terms,
                        "agelimit" | "privacy" | "promotion" | "usepolicy"
                    >
                >;
            }
    >;
};

export const NewDeviceDocument = gql`
    mutation NewDevice($device: NewDeviceInput!) {
        newDevice(device: $device) {
            id
            type {
                id
                type
                name
            }
            alias
            private
            owner {
                id
                username
            }
            home {
                id
                name
            }
        }
    }
`;
export type NewDeviceMutationFn = Apollo.MutationFunction<
    NewDeviceMutation,
    NewDeviceMutationVariables
>;

/**
 * __useNewDeviceMutation__
 *
 * To run a mutation, you first call `useNewDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newDeviceMutation, { data, loading, error }] = useNewDeviceMutation({
 *   variables: {
 *      device: // value for 'device'
 *   },
 * });
 */
export function useNewDeviceMutation(
    baseOptions?: Apollo.MutationHookOptions<
        NewDeviceMutation,
        NewDeviceMutationVariables
    >
) {
    return Apollo.useMutation<NewDeviceMutation, NewDeviceMutationVariables>(
        NewDeviceDocument,
        baseOptions
    );
}
export type NewDeviceMutationHookResult = ReturnType<
    typeof useNewDeviceMutation
>;
export type NewDeviceMutationResult = Apollo.MutationResult<NewDeviceMutation>;
export type NewDeviceMutationOptions = Apollo.BaseMutationOptions<
    NewDeviceMutation,
    NewDeviceMutationVariables
>;
export const DeleteDeviceDocument = gql`
    mutation DeleteDevice($id: ID!) {
        deleteDevice(id: $id) {
            id
            alias
        }
    }
`;
export type DeleteDeviceMutationFn = Apollo.MutationFunction<
    DeleteDeviceMutation,
    DeleteDeviceMutationVariables
>;

/**
 * __useDeleteDeviceMutation__
 *
 * To run a mutation, you first call `useDeleteDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeviceMutation, { data, loading, error }] = useDeleteDeviceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDeviceMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteDeviceMutation,
        DeleteDeviceMutationVariables
    >
) {
    return Apollo.useMutation<
        DeleteDeviceMutation,
        DeleteDeviceMutationVariables
    >(DeleteDeviceDocument, baseOptions);
}
export type DeleteDeviceMutationHookResult = ReturnType<
    typeof useDeleteDeviceMutation
>;
export type DeleteDeviceMutationResult = Apollo.MutationResult<DeleteDeviceMutation>;
export type DeleteDeviceMutationOptions = Apollo.BaseMutationOptions<
    DeleteDeviceMutation,
    DeleteDeviceMutationVariables
>;
export const GetDeviceTypesDocument = gql`
    query GetDeviceTypes {
        deviceTypes {
            id
            type
            name
        }
    }
`;

/**
 * __useGetDeviceTypesQuery__
 *
 * To run a query within a React component, call `useGetDeviceTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeviceTypesQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetDeviceTypesQuery,
        GetDeviceTypesQueryVariables
    >
) {
    return Apollo.useQuery<GetDeviceTypesQuery, GetDeviceTypesQueryVariables>(
        GetDeviceTypesDocument,
        baseOptions
    );
}
export function useGetDeviceTypesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetDeviceTypesQuery,
        GetDeviceTypesQueryVariables
    >
) {
    return Apollo.useLazyQuery<
        GetDeviceTypesQuery,
        GetDeviceTypesQueryVariables
    >(GetDeviceTypesDocument, baseOptions);
}
export type GetDeviceTypesQueryHookResult = ReturnType<
    typeof useGetDeviceTypesQuery
>;
export type GetDeviceTypesLazyQueryHookResult = ReturnType<
    typeof useGetDeviceTypesLazyQuery
>;
export type GetDeviceTypesQueryResult = Apollo.QueryResult<
    GetDeviceTypesQuery,
    GetDeviceTypesQueryVariables
>;
export const NewHomeDocument = gql`
    mutation NewHome($name: String!) {
        newHome(name: $name) {
            id
            name
        }
    }
`;
export type NewHomeMutationFn = Apollo.MutationFunction<
    NewHomeMutation,
    NewHomeMutationVariables
>;

/**
 * __useNewHomeMutation__
 *
 * To run a mutation, you first call `useNewHomeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewHomeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newHomeMutation, { data, loading, error }] = useNewHomeMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useNewHomeMutation(
    baseOptions?: Apollo.MutationHookOptions<
        NewHomeMutation,
        NewHomeMutationVariables
    >
) {
    return Apollo.useMutation<NewHomeMutation, NewHomeMutationVariables>(
        NewHomeDocument,
        baseOptions
    );
}
export type NewHomeMutationHookResult = ReturnType<typeof useNewHomeMutation>;
export type NewHomeMutationResult = Apollo.MutationResult<NewHomeMutation>;
export type NewHomeMutationOptions = Apollo.BaseMutationOptions<
    NewHomeMutation,
    NewHomeMutationVariables
>;
export const JoinHomeDocument = gql`
    mutation JoinHome($homeId: String!) {
        joinHome(home: $homeId) {
            id
            name
        }
    }
`;
export type JoinHomeMutationFn = Apollo.MutationFunction<
    JoinHomeMutation,
    JoinHomeMutationVariables
>;

/**
 * __useJoinHomeMutation__
 *
 * To run a mutation, you first call `useJoinHomeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinHomeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinHomeMutation, { data, loading, error }] = useJoinHomeMutation({
 *   variables: {
 *      homeId: // value for 'homeId'
 *   },
 * });
 */
export function useJoinHomeMutation(
    baseOptions?: Apollo.MutationHookOptions<
        JoinHomeMutation,
        JoinHomeMutationVariables
    >
) {
    return Apollo.useMutation<JoinHomeMutation, JoinHomeMutationVariables>(
        JoinHomeDocument,
        baseOptions
    );
}
export type JoinHomeMutationHookResult = ReturnType<typeof useJoinHomeMutation>;
export type JoinHomeMutationResult = Apollo.MutationResult<JoinHomeMutation>;
export type JoinHomeMutationOptions = Apollo.BaseMutationOptions<
    JoinHomeMutation,
    JoinHomeMutationVariables
>;
export const NewUserDocument = gql`
    mutation NewUser($params: NewUserInput!) {
        newUser(user: $params) {
            access_token
            user {
                id
                email
                username
            }
        }
    }
`;
export type NewUserMutationFn = Apollo.MutationFunction<
    NewUserMutation,
    NewUserMutationVariables
>;

/**
 * __useNewUserMutation__
 *
 * To run a mutation, you first call `useNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newUserMutation, { data, loading, error }] = useNewUserMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useNewUserMutation(
    baseOptions?: Apollo.MutationHookOptions<
        NewUserMutation,
        NewUserMutationVariables
    >
) {
    return Apollo.useMutation<NewUserMutation, NewUserMutationVariables>(
        NewUserDocument,
        baseOptions
    );
}
export type NewUserMutationHookResult = ReturnType<typeof useNewUserMutation>;
export type NewUserMutationResult = Apollo.MutationResult<NewUserMutation>;
export type NewUserMutationOptions = Apollo.BaseMutationOptions<
    NewUserMutation,
    NewUserMutationVariables
>;
export const SignInDocument = gql`
    mutation SignIn($params: SignInUserInput!) {
        signInUser(user: $params) {
            access_token
            user {
                id
                email
                username
            }
        }
    }
`;
export type SignInMutationFn = Apollo.MutationFunction<
    SignInMutation,
    SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useSignInMutation(
    baseOptions?: Apollo.MutationHookOptions<
        SignInMutation,
        SignInMutationVariables
    >
) {
    return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
        SignInDocument,
        baseOptions
    );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
    SignInMutation,
    SignInMutationVariables
>;
export const MeDocument = gql`
    query Me {
        me {
            id
            email
            username
            home {
                id
                name
                family {
                    id
                    email
                    username
                }
                devices {
                    id
                    type {
                        id
                        type
                        name
                    }
                    alias
                    private
                    online
                    owner {
                        id
                        username
                    }
                    status
                }
            }
            devices {
                id
                type {
                    id
                    type
                    name
                }
                alias
                private
                online
                owner {
                    id
                    username
                }
                status
            }
        }
    }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
    baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
        MeDocument,
        baseOptions
    );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
        user(id: $id) {
            id
            email
            username
            terms {
                agelimit
                privacy
                promotion
                usepolicy
            }
        }
    }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(
    baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
    return Apollo.useQuery<UserQuery, UserQueryVariables>(
        UserDocument,
        baseOptions
    );
}
export function useUserLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
    return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
        UserDocument,
        baseOptions
    );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
