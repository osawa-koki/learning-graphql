/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
