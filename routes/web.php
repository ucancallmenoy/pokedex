<?php

use App\Http\Controllers\RegionController;
use App\Http\Controllers\PokemonController;
use Illuminate\Support\Facades\Route;

// Home - Region selection
Route::get('/', [RegionController::class, 'index'])->name('regions.index');

// Region Pokédex - List Pokémon by region
Route::get('/region/{region}', [RegionController::class, 'show'])->name('regions.show');

// Pokémon Detail
Route::get('/pokemon/{id}', [PokemonController::class, 'show'])->name('pokemon.show');