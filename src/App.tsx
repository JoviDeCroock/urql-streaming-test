import React, { Suspense } from 'react'
import PokemonList from './Pokemons'

export const App = () => {
    return (

        <Suspense fallback={<p>test...</p>}>
            <div>
                <h1>
                    Pokemons
                </h1>
                <Suspense fallback={<p>Loading...</p>}>
                    <PokemonList />
                </Suspense>
            </div>
    </Suspense>
    )
}
