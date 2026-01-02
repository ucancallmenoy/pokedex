<?php

namespace App\Http\Controllers;

use App\Services\PokeApiService;
use Inertia\Inertia;

class RegionController extends Controller
{
    private $pokeApi;

    public function __construct(PokeApiService $pokeApi)
    {
        $this->pokeApi = $pokeApi;
    }

    /**
     * Show region selection page
     */
    public function index()
    {
        $regions = [
            ['name' => 'kanto', 'display' => 'Kanto', 'color' => 'from-red-500 to-red-700'],
            ['name' => 'johto', 'display' => 'Johto', 'color' => 'from-yellow-500 to-yellow-700'],
            ['name' => 'hoenn', 'display' => 'Hoenn', 'color' => 'from-green-500 to-green-700'],
            ['name' => 'sinnoh', 'display' => 'Sinnoh', 'color' => 'from-blue-500 to-blue-700'],
            ['name' => 'unova', 'display' => 'Unova', 'color' => 'from-purple-500 to-purple-700'],
            ['name' => 'kalos', 'display' => 'Kalos', 'color' => 'from-pink-500 to-pink-700'],
            ['name' => 'alola', 'display' => 'Alola', 'color' => 'from-orange-500 to-orange-700'],
            ['name' => 'galar', 'display' => 'Galar', 'color' => 'from-indigo-500 to-indigo-700'],
            ['name' => 'paldea', 'display' => 'Paldea', 'color' => 'from-teal-500 to-teal-700'],
        ];

        return Inertia::render('Regions/Index', [
            'regions' => $regions
        ]);
    }

    /**
     * Show Pokémon list for a region
     */
    public function show($region)
    {
        $pokedex = $this->pokeApi->getPokedexByRegion($region);

        return Inertia::render('Regions/Show', [
            'region' => ucfirst($region),
            'regionSlug' => $region,
            'pokemon' => $pokedex['pokemon_entries']
        ]);
    }
}