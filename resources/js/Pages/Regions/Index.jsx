import { Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function Index({ regions }) {
    return (
        <Layout>
            <div className="space-y-6">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl-pixel text-gba-dark pixel-text mb-4">
                        SELECT REGION
                    </h1>
                    <div className="h-1 w-32 bg-gba-dark mx-auto"></div>
                </div>
                
                {/* Region Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {regions.map((region, index) => (
                        <Link
                            key={region.name}
                            href={`/region/${region.name}`}
                            className="retro-card bg-gba-light hover:bg-gba-mid p-6 text-center group relative overflow-hidden"
                        >
                            {/* Region Number */}
                            <div className="absolute top-2 right-2 text-gba-dark text-xs-pixel opacity-50">
                                #{String(index + 1).padStart(2, '0')}
                            </div>
                            
                            {/* Region Name */}
                            <h2 className="text-lg-pixel text-gba-dark pixel-text uppercase mb-2">
                                {region.display}
                            </h2>
                            
                            {/* Decorative Pokeball */}
                            <div className="mt-4 flex justify-center">
                                <div className="w-12 h-12 rounded-full border-4 border-gba-dark relative bg-white">
                                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-red-600 rounded-t-full"></div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-gba-dark rounded-full"></div>
                                </div>
                            </div>
                            
                            {/* Arrow indicator */}
                            <div className="mt-4 text-gba-dark text-base-pixel opacity-0 group-hover:opacity-100 transition-opacity">
                                ▶ SELECT
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Instructions */}
                <div className="mt-8 text-center bg-gba-mid p-4 rounded border-2 border-gba-dark">
                    <p className="text-xs-pixel text-gba-dark">
                        USE MOUSE TO SELECT A REGION
                    </p>
                </div>
            </div>
        </Layout>
    );
}