import React from 'react'
import { Provider, createClient, ssrExchange, dedupExchange, fetchExchange, Exchange } from 'urql'
import fetch from 'node-fetch'
import { delay, pipe } from 'wonka';

import { App } from './App'

const delayExchange: Exchange = ({ forward }) => {
  return ops$ => {
    return pipe(ops$, forward, delay(500));
  };
};

export function render() {
    const ssr = ssrExchange({ isClient: false })
    const client = createClient({
        url: 'https://trygql.formidable.dev/graphql/basic-pokedex',
        suspense: true,
        exchanges: [dedupExchange, ssr, delayExchange, fetchExchange],
        // @ts-ignore
        fetch,
    });
  return { ssr, jsx: <Provider value={client}><App /></Provider> };
}