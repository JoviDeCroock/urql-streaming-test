import React from 'react'
import { Provider, createClient, ssrExchange, dedupExchange, fetchExchange } from 'urql'
import fetch from 'node-fetch'

import { App } from './App'

export function render() {
    const ssr = ssrExchange({ isClient: false })
    const client = createClient({
        url: 'https://trygql.formidable.dev/graphql/basic-pokedex',
        suspense: true,
        exchanges: [dedupExchange, ssr, fetchExchange],
        // @ts-ignore
        fetch,
    });
  return { ssr, jsx: <Provider value={client}><App /></Provider> };
}