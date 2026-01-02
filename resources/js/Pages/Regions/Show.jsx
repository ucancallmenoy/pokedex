import { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function Show({ region, regionSlug, pokemon }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPokemon = useMemo(() => {
        return pokemon.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.entry_number.toString().includes(searchTerm)
        );
    }, [pokemon, searchTerm]);

    return (
        <Layout>
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <Link 
                        href="/"
                        className="text-gba-dark text-base-pixel hover:text-gba-mid transition-colors pixel-text"
                    >
                        ◀ BACK
                    </Link>
                    <h1 className="text-xl-pixel text-gba-dark pixel-text uppercase">
                        {region}
                    </h1>
                    <div className="text-gba-dark text-xs-pixel">
                        {pokemon.length} PKM
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-4">
                    <div className="bg-gba-mid border-4 border-gba-dark rounded-lg p-2">
                        <input
                            type="text"
                            placeholder="SEARCH..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gba-light text-gba-dark text-sm-pixel px-3 py-2 border-2 border-gba-dark rounded focus:outline-none focus:ring-2 focus:ring-gba-dark uppercase placeholder-gba-mid"
                            style={{ fontFamily: 'Press Start 2P, cursive' }}
                        />
                    </div>
                </div>

                {/* Pokémon Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-custom">
                    {filteredPokemon.map((p) => (
                        <Link
                            key={p.id}
                            href={`/pokemon/${p.id}`}
                            className="retro-card bg-gba-light hover:bg-white p-3 text-center group transition-all"
                        >
                            <div className="text-xs-pixel text-gba-dark mb-2 pixel-text">
                                #{String(p.entry_number).padStart(3, '0')}
                            </div>
                            <div className="bg-white rounded border-2 border-gba-dark p-2 mb-2">
                                <img
                                    src={p.sprite}
                                    alt={p.name}
                                    className="w-16 h-16 mx-auto"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-xs-pixel text-gba-dark uppercase pixel-text truncate">
                                {p.name}
                            </h3>
                        </Link>
                    ))}
                </div>

                {filteredPokemon.length === 0 && (
                    <div className="text-center py-12 text-gba-dark text-sm-pixel pixel-text">
                        NO DATA FOUND!
                    </div>
                )}
            </div>

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