import React, { Suspense } from 'react'
import PokemonList from './Pokemons'

export const App = () => {
    return (
        <main>
            <h1>
                Pokemons
            </h1>
            <Suspense>
                <PokemonList />
            </Suspense>
        </main>
    )
}
