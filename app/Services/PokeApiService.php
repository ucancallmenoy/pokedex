<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class PokeApiService
{
    private $baseUrl = 'https://pokeapi.co/api/v2';

    /**
     * Get all regions
     */
    public function getRegions()
    {
        return Cache::remember('regions', 3600, function () {
            $response = Http::get("{$this->baseUrl}/region");
            return $response->json()['results'];
        });
    }

    /**
     * Get Pokédex by region name
     */
    public function getPokedexByRegion($regionName)
    {
        return Cache::remember("pokedex_{$regionName}", 3600, function () use ($regionName) {
            // Map region names to pokedex IDs
            $pokedexMap = [
                'kanto' => 2,
                'johto' => 3,
                'hoenn' => 4,
                'sinnoh' => 5,
                'unova' => 8,
                'kalos' => 12,
                'alola' => 16,
                'galar' => 27,
                'paldea' => 31,
            ];

            $pokedexId = $pokedexMap[$regionName] ?? 2;
            
            $response = Http::get("{$this->baseUrl}/pokedex/{$pokedexId}");
            $data = $response->json();

            return [
                'name' => $data['name'],
                'region' => $regionName,
                'pokemon_entries' => collect($data['pokemon_entries'])->map(function ($entry) {
                    $id = $this->extractIdFromUrl($entry['pokemon_species']['url']);
                    return [
                        'entry_number' => $entry['entry_number'],
                        'id' => $id,
                        'name' => $entry['pokemon_species']['name'],
                        'sprite' => "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{$id}.png",
                    ];
                })
            ];
        });
    }

    /**
     * Get Pokémon details by ID
     */
    public function getPokemonById($id)
    {
        return Cache::remember("pokemon_{$id}", 3600, function () use ($id) {
            $response = Http::get("{$this->baseUrl}/pokemon/{$id}");
            $pokemon = $response->json();

            // Get species data for description
            $speciesResponse = Http::get("{$this->baseUrl}/pokemon-species/{$id}");
            $species = $speciesResponse->json();

            // Get English flavor text
            $flavorText = collect($species['flavor_text_entries'])
                ->firstWhere('language.name', 'en')['flavor_text'] ?? 'No description available.';

            return [
                'id' => $pokemon['id'],
                'name' => $pokemon['name'],
                'height' => $pokemon['height'],
                'weight' => $pokemon['weight'],
                'types' => collect($pokemon['types'])->pluck('type.name'),
                'abilities' => collect($pokemon['abilities'])->map(fn($a) => [
                    'name' => $a['ability']['name'],
                    'is_hidden' => $a['is_hidden']
                ]),
                'stats' => collect($pokemon['stats'])->map(fn($s) => [
                    'name' => $s['stat']['name'],
                    'base_stat' => $s['base_stat']
                ]),
                'sprite' => $pokemon['sprites']['other']['official-artwork']['front_default'] 
                    ?? $pokemon['sprites']['front_default'],
                'description' => str_replace(["\n", "\f"], ' ', $flavorText),
            ];
        });
    }

    /**
     * Extract ID from PokéAPI URL
     */
    private function extractIdFromUrl($url)
    {
        $parts = explode('/', rtrim($url, '/'));
        return end($parts);
    }
}