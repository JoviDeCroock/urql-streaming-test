import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { Provider, createClient, dedupExchange, cacheExchange, ssrExchange, fetchExchange } from 'urql'

import { App } from "./App"

// @ts-ignore
export const ssr = ssrExchange({ isClient: true, initialState: window.urqlData })
const client = createClient({
    url: 'https://trygql.formidable.dev/graphql/basic-pokedex',
    suspense: true,
    exchanges: [dedupExchange, cacheExchange, ssr, fetchExchange]
});

const element = document.getElementById('main')
let jsx = <Provider value={client}><App /></Provider>;

if (element && element.hasChildNodes()) {
  hydrateRoot(element, jsx)
} else if (element) {
  // Dev
  createRoot(element).render(jsx)
}
