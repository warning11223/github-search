import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IRepository, IUser, IServerResponse} from "../../models/models";

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
    endpoints: (builder) => ({
        searchUsers: builder.query<IUser[], string>({
            query: (name) => ({
                url: `search/users`,
                params: {
                    q: name,
                    per_page: 10,
                }
            }),
            transformResponse: (response: IServerResponse) => response.items,
        }),
        searchRepository: builder.query<IRepository[], string>({
            query: (name) => ({
                url: `users/${name}/repos`,
            }),
        }),
    }),
})

export const { useSearchUsersQuery, useLazySearchRepositoryQuery } = githubApi;