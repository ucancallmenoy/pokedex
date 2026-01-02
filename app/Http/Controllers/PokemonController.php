<?php

namespace App\Http\Controllers;

use App\Services\PokeApiService;
use Inertia\Inertia;

class PokemonController extends Controller
{
    private $pokeApi;

    public function __construct(PokeApiService $pokeApi)
    {
        $this->pokeApi = $pokeApi;
    }

    /**
     * Show Pokémon details
     */
    public function show($id)
    {
        $pokemon = $this->pokeApi->getPokemonById($id);

        return Inertia::render('Pokemon/Show', [
            'pokemon' => $pokemon
        ]);
    }
}