import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createPrefecture?: Maybe<Prefecture>;
  deletePrefecture?: Maybe<Prefecture>;
  updatePrefecture?: Maybe<Prefecture>;
};


export type MutationCreatePrefectureArgs = {
  input?: InputMaybe<PrefectureInput>;
};


export type MutationDeletePrefectureArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdatePrefectureArgs = {
  id: Scalars['Int']['input'];
  input?: InputMaybe<PrefectureInput>;
};

export type Prefecture = {
  __typename?: 'Prefecture';
  area: Scalars['Float']['output'];
  capital: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  population: Scalars['Int']['output'];
};

export type PrefectureFilter = {
  areaMax?: InputMaybe<Scalars['Float']['input']>;
  areaMin?: InputMaybe<Scalars['Float']['input']>;
  capital?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  populationMax?: InputMaybe<Scalars['Int']['input']>;
  populationMin?: InputMaybe<Scalars['Int']['input']>;
};

export type PrefectureInput = {
  area: Scalars['Float']['input'];
  capital: Scalars['String']['input'];
  name: Scalars['String']['input'];
  population: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  prefectures?: Maybe<Array<Maybe<Prefecture>>>;
};


export type QueryPrefecturesArgs = {
  filter?: InputMaybe<PrefectureFilter>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Prefecture: ResolverTypeWrapper<Prefecture>;
  PrefectureFilter: PrefectureFilter;
  PrefectureInput: PrefectureInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Prefecture: Prefecture;
  PrefectureFilter: PrefectureFilter;
  PrefectureInput: PrefectureInput;
  Query: {};
  String: Scalars['String']['output'];
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPrefecture?: Resolver<Maybe<ResolversTypes['Prefecture']>, ParentType, ContextType, Partial<MutationCreatePrefectureArgs>>;
  deletePrefecture?: Resolver<Maybe<ResolversTypes['Prefecture']>, ParentType, ContextType, RequireFields<MutationDeletePrefectureArgs, 'id'>>;
  updatePrefecture?: Resolver<Maybe<ResolversTypes['Prefecture']>, ParentType, ContextType, RequireFields<MutationUpdatePrefectureArgs, 'id'>>;
};

export type PrefectureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Prefecture'] = ResolversParentTypes['Prefecture']> = {
  area?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  capital?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  population?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  prefectures?: Resolver<Maybe<Array<Maybe<ResolversTypes['Prefecture']>>>, ParentType, ContextType, Partial<QueryPrefecturesArgs>>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Prefecture?: PrefectureResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

