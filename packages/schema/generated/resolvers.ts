import { GraphQLResolveInfo } from 'graphql';
import { MappedUser, MappedDevice, MappedHome } from '@/mappers';
import { IContext } from '@psh/api/src/resolvers/types';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Device = {
  __typename?: 'Device';
  alias?: Maybe<Scalars['String']>;
  home?: Maybe<Home>;
  id?: Maybe<Scalars['ID']>;
  lastOnline?: Maybe<Scalars['String']>;
  online?: Maybe<Scalars['Boolean']>;
  owner?: Maybe<User>;
  private?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  devices?: Maybe<Array<Maybe<Device>>>;
  email?: Maybe<Scalars['String']>;
  home?: Maybe<Home>;
  id?: Maybe<Scalars['ID']>;
  roles?: Maybe<Roles>;
  terms?: Maybe<Terms>;
  username?: Maybe<Scalars['String']>;
};

export type Roles = {
  __typename?: 'Roles';
  admin?: Maybe<Scalars['Boolean']>;
};

export type Terms = {
  __typename?: 'Terms';
  agelimit?: Maybe<Scalars['Boolean']>;
  privacy?: Maybe<Scalars['Boolean']>;
  promotion?: Maybe<Scalars['Boolean']>;
  usepolicy?: Maybe<Scalars['Boolean']>;
};

export type Home = {
  __typename?: 'Home';
  admins?: Maybe<Array<Maybe<User>>>;
  devices?: Maybe<Array<Maybe<Device>>>;
  family?: Maybe<Array<Maybe<User>>>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type Session = {
  __typename?: 'Session';
  access_token: Scalars['ID'];
  user?: Maybe<User>;
};

export type NewUserInput = {
  agelimit: Scalars['Boolean'];
  email: Scalars['String'];
  password: Scalars['String'];
  privacy: Scalars['Boolean'];
  promotion: Scalars['Boolean'];
  usepolicy: Scalars['Boolean'];
  username: Scalars['String'];
};

export type SignInUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newUser?: Maybe<Session>;
  signInUser?: Maybe<Session>;
  tnid?: Maybe<Scalars['ID']>;
};


export type MutationNewUserArgs = {
  user: NewUserInput;
};


export type MutationSignInUserArgs = {
  user: SignInUserInput;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Device: ResolverTypeWrapper<MappedDevice>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  User: ResolverTypeWrapper<MappedUser>;
  Roles: ResolverTypeWrapper<Partial<Roles>>;
  Terms: ResolverTypeWrapper<Partial<Terms>>;
  Home: ResolverTypeWrapper<MappedHome>;
  Session: ResolverTypeWrapper<Partial<Omit<Session, 'user'> & { user?: Maybe<ResolversTypes['User']> }>>;
  NewUserInput: ResolverTypeWrapper<Partial<NewUserInput>>;
  SignInUserInput: ResolverTypeWrapper<Partial<SignInUserInput>>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Device: MappedDevice;
  String: Partial<Scalars['String']>;
  ID: Partial<Scalars['ID']>;
  Boolean: Partial<Scalars['Boolean']>;
  User: MappedUser;
  Roles: Partial<Roles>;
  Terms: Partial<Terms>;
  Home: MappedHome;
  Session: Partial<Omit<Session, 'user'> & { user?: Maybe<ResolversParentTypes['User']> }>;
  NewUserInput: Partial<NewUserInput>;
  SignInUserInput: Partial<SignInUserInput>;
  Query: {};
  Mutation: {};
}>;

export type DeviceResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Device'] = ResolversParentTypes['Device']> = ResolversObject<{
  alias?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  home?: Resolver<Maybe<ResolversTypes['Home']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastOnline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  online?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  private?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  devices?: Resolver<Maybe<Array<Maybe<ResolversTypes['Device']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  home?: Resolver<Maybe<ResolversTypes['Home']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<ResolversTypes['Roles']>, ParentType, ContextType>;
  terms?: Resolver<Maybe<ResolversTypes['Terms']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RolesResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Roles'] = ResolversParentTypes['Roles']> = ResolversObject<{
  admin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TermsResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Terms'] = ResolversParentTypes['Terms']> = ResolversObject<{
  agelimit?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  privacy?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  promotion?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  usepolicy?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HomeResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Home'] = ResolversParentTypes['Home']> = ResolversObject<{
  admins?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  devices?: Resolver<Maybe<Array<Maybe<ResolversTypes['Device']>>>, ParentType, ContextType>;
  family?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = ResolversObject<{
  access_token?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  newUser?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<MutationNewUserArgs, 'user'>>;
  signInUser?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<MutationSignInUserArgs, 'user'>>;
  tnid?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IContext> = ResolversObject<{
  Device?: DeviceResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Roles?: RolesResolvers<ContextType>;
  Terms?: TermsResolvers<ContextType>;
  Home?: HomeResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = IContext> = Resolvers<ContextType>;
