import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/Components/Layout';

export default function Show({ pokemon }) {
    const [showModal, setShowModal] = useState(false); 

    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    const navigateToPokemon = (newId) => {
        if (newId > 0 && newId <= 1025) {
            router.visit(`/pokemon/${newId}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-4">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => window.history.back()}
                        className="text-gba-dark text-base-pixel hover:text-gba-mid transition-colors pixel-text"
                    >
                        ◀ BACK
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigateToPokemon(pokemon.id - 1)}
                            disabled={pokemon.id <= 1}
                            className="px-3 py-2 bg-gba-mid text-gba-dark text-xs-pixel border-2 border-gba-dark gba-button disabled:opacity-50 disabled:cursor-not-allowed pixel-text"
                        >
                            ◀
                        </button>
                        <button
                            onClick={() => navigateToPokemon(pokemon.id + 1)}
                            disabled={pokemon.id >= 1025}
                            className="px-3 py-2 bg-gba-mid text-gba-dark text-xs-pixel border-2 border-gba-dark gba-button disabled:opacity-50 disabled:cursor-not-allowed pixel-text"
                        >
                            ▶
                        </button>
                    </div>
                </div>

                {/* Main Content - Scrollable */}
                <div className="max-h-[450px] overflow-y-auto pr-2 space-y-4 scrollbar-custom">
                    {/* Pokemon Header */}
                    <div className="bg-gba-light border-4 border-gba-dark rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <p className="text-xs-pixel text-gba-dark mb-2 pixel-text">
                                    NO.{String(pokemon.id).padStart(4, '0')}
                                </p>
                                <h1 className="text-xl-pixel text-gba-dark pixel-text uppercase mb-3">
                                    {pokemon.name}
                                </h1>
                                <div className="flex flex-wrap gap-2">
                                    {pokemon.types.map((type) => (
                                        <span
                                            key={type}
                                            className="px-3 py-1 text-xs-pixel text-white border-2 border-black uppercase pixel-text"
                                            style={{ backgroundColor: typeColors[type] }}
                                        >
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white border-4 border-gba-dark rounded p-2">
                                <img
                                    src={pokemon.sprite}
                                    alt={pokemon.name}
                                    className="w-32 h-32 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setShowModal(true)} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gba-mid border-4 border-gba-dark rounded-lg p-4">
                        <h2 className="text-sm-pixel text-gba-dark pixel-text mb-3">
                            DESCRIPTION
                        </h2>
                        <p className="text-xs-pixel text-gba-dark leading-relaxed">
                            {pokemon.description}
                        </p>
                    </div>

                    {/* Physical Info */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gba-light border-4 border-gba-dark rounded-lg p-3">
                            <h3 className="text-xs-pixel text-gba-dark pixel-text mb-2">HEIGHT</h3>
                            <p className="text-lg-pixel text-gba-dark pixel-text">
                                {pokemon.height / 10}M
                            </p>
                        </div>
                        <div className="bg-gba-light border-4 border-gba-dark rounded-lg p-3">
                            <h3 className="text-xs-pixel text-gba-dark pixel-text mb-2">WEIGHT</h3>
                            <p className="text-lg-pixel text-gba-dark pixel-text">
                                {pokemon.weight / 10}KG
                            </p>
                        </div>
                    </div>

                    {/* Abilities */}
                    <div className="bg-gba-mid border-4 border-gba-dark rounded-lg p-4">
                        <h2 className="text-sm-pixel text-gba-dark pixel-text mb-3">
                            ABILITIES
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {pokemon.abilities.map((ability) => (
                                <span
                                    key={ability.name}
                                    className={`px-3 py-2 text-xs-pixel border-2 border-gba-dark uppercase pixel-text ${
                                        ability.is_hidden
                                            ? 'bg-yellow-400 text-gba-dark'
                                            : 'bg-gba-light text-gba-dark'
                                    }`}
                                >
                                    {ability.name.replace('-', ' ')}
                                    {ability.is_hidden && ' ★'}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-gba-light border-4 border-gba-dark rounded-lg p-4">
                        <h2 className="text-sm-pixel text-gba-dark pixel-text mb-4">
                            BASE STATS
                        </h2>
                        <div className="space-y-3">
                            {pokemon.stats.map((stat) => {
                                const percentage = Math.min((stat.base_stat / 255) * 100, 100);
                                return (
                                    <div key={stat.name}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs-pixel text-gba-dark uppercase pixel-text">
                                                {stat.name.replace('-', ' ')}
                                            </span>
                                            <span className="text-xs-pixel text-gba-dark pixel-text">
                                                {stat.base_stat}
                                            </span>
                                        </div>
                                        <div className="w-full h-4 bg-gba-dark border-2 border-black rounded">
                                            <div
                                                className="h-full bg-green-500 transition-all duration-500 rounded"
                                                style={{ 
                                                    width: `${percentage}%`,
                                                    background: percentage > 75 ? '#22c55e' : percentage > 50 ? '#eab308' : '#ef4444'
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Total Stats */}
                        <div className="mt-4 pt-4 border-t-4 border-gba-dark">
                            <div className="flex justify-between">
                                <span className="text-sm-pixel text-gba-dark pixel-text">TOTAL</span>
                                <span className="text-sm-pixel text-gba-dark pixel-text">
                                    {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="relative">
                        <div className="bg-white border-4 border-gba-dark rounded p-4 scanlines">
                            <img
                                src={pokemon.sprite}
                                alt={pokemon.name}
                                className="w-96 h-96 object-contain"
                            />
                        </div>
                        <button
                            className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .scrollbar-custom::-webkit-scrollbar {
                    width: 8px;
                }
                .scrollbar-custom::-webkit-scrollbar-track {
                    background: var(--gba-mid);
                    border: 2px solid var(--gba-dark);
                }
                .scrollbar-custom::-webkit-scrollbar-thumb {
                    background: var(--gba-dark);
                    border: 1px solid var(--gba-light);
                }
            `}</style>
        </Layout>
    );
}