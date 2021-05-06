import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['Int'];
  title: Title;
  artist: Artist;
  releaseDate: ReleaseDate;
  city: City;
  country: Country;
  location: Location;
  url: Scalars['String'];
  numberTracks: Scalars['Int'];
  genres: Array<Genre>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Float'];
  name: Scalars['String'];
  albums: Array<Album>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['Int'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  albums: Array<Album>;
  cities: Array<City>;
  city?: Maybe<City>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  artists: Array<Artist>;
  artist?: Maybe<Artist>;
  titles: Array<Title>;
  title?: Maybe<Title>;
  dates: Array<ReleaseDate>;
  date?: Maybe<ReleaseDate>;
  genres: Array<Genre>;
  genre?: Maybe<Genre>;
  genreByName?: Maybe<Genre>;
  locations: Array<Location>;
};


export type QueryCityArgs = {
  name: Scalars['String'];
};


export type QueryCountryArgs = {
  name: Scalars['String'];
};


export type QueryArtistArgs = {
  name: Scalars['String'];
};


export type QueryTitleArgs = {
  name: Scalars['String'];
};


export type QueryDateArgs = {
  date: Scalars['String'];
};


export type QueryGenreArgs = {
  id: Scalars['Float'];
};


export type QueryGenreByNameArgs = {
  name: Scalars['String'];
};

export type ReleaseDate = {
  __typename?: 'ReleaseDate';
  id: Scalars['Int'];
  date: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Title = {
  __typename?: 'Title';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type AlbumsQuery = (
  { __typename?: 'Query' }
  & { albums: Array<(
    { __typename?: 'Album' }
    & Pick<Album, 'url' | 'numberTracks'>
    & { title: (
      { __typename?: 'Title' }
      & Pick<Title, 'name'>
    ), artist: (
      { __typename?: 'Artist' }
      & Pick<Artist, 'name'>
    ), releaseDate: (
      { __typename?: 'ReleaseDate' }
      & Pick<ReleaseDate, 'date'>
    ), city: (
      { __typename?: 'City' }
      & Pick<City, 'name'>
    ), country: (
      { __typename?: 'Country' }
      & Pick<Country, 'name'>
    ), genres: Array<(
      { __typename?: 'Genre' }
      & Pick<Genre, 'name'>
    )>, location: (
      { __typename?: 'Location' }
      & Pick<Location, 'lat' | 'lng'>
    ) }
  )> }
);

export type GenreByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GenreByNameQuery = (
  { __typename?: 'Query' }
  & { genreByName?: Maybe<(
    { __typename?: 'Genre' }
    & Pick<Genre, 'name'>
    & { albums: Array<(
      { __typename?: 'Album' }
      & Pick<Album, 'url' | 'numberTracks'>
      & { title: (
        { __typename?: 'Title' }
        & Pick<Title, 'name'>
      ), artist: (
        { __typename?: 'Artist' }
        & Pick<Artist, 'name'>
      ), location: (
        { __typename?: 'Location' }
        & Pick<Location, 'lat' | 'lng'>
      ), city: (
        { __typename?: 'City' }
        & Pick<City, 'name'>
      ), country: (
        { __typename?: 'Country' }
        & Pick<Country, 'name'>
      ), releaseDate: (
        { __typename?: 'ReleaseDate' }
        & Pick<ReleaseDate, 'date'>
      ) }
    )> }
  )> }
);

export type GenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresQuery = (
  { __typename?: 'Query' }
  & { genres: Array<(
    { __typename?: 'Genre' }
    & Pick<Genre, 'name'>
    & { albums: Array<(
      { __typename?: 'Album' }
      & { title: (
        { __typename?: 'Title' }
        & Pick<Title, 'name'>
      ) }
    )> }
  )> }
);


export const AlbumsDocument = gql`
    query Albums {
  albums {
    title {
      name
    }
    artist {
      name
    }
    url
    releaseDate {
      date
    }
    numberTracks
    city {
      name
    }
    country {
      name
    }
    genres {
      name
    }
    location {
      lat
      lng
    }
  }
}
    `;

export function useAlbumsQuery(options: Omit<Urql.UseQueryArgs<AlbumsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AlbumsQuery>({ query: AlbumsDocument, ...options });
};
export const GenreByNameDocument = gql`
    query GenreByName($name: String!) {
  genreByName(name: $name) {
    name
    albums {
      title {
        name
      }
      artist {
        name
      }
      location {
        lat
        lng
      }
      url
      city {
        name
      }
      country {
        name
      }
      numberTracks
      releaseDate {
        date
      }
    }
  }
}
    `;

export function useGenreByNameQuery(options: Omit<Urql.UseQueryArgs<GenreByNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GenreByNameQuery>({ query: GenreByNameDocument, ...options });
};
export const GenresDocument = gql`
    query Genres {
  genres {
    name
    albums {
      title {
        name
      }
    }
  }
}
    `;

export function useGenresQuery(options: Omit<Urql.UseQueryArgs<GenresQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GenresQuery>({ query: GenresDocument, ...options });
};