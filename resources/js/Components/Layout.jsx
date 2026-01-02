import { Link } from '@inertiajs/react';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen py-8 px-4">
            {/* Pokédex Header */}
            <div className="max-w-6xl mx-auto mb-6">
                <div className="pokedex-case rounded-t-3xl p-6">
                    {/* Top Section with Lights */}
                    <div className="flex items-center gap-4 mb-4">
                        {/* Main LED Light */}
                        <div className="led-indicator bg-blue-400" style={{ width: '20px', height: '20px' }}></div>
                        
                        {/* Small LED Lights */}
                        <div className="flex gap-2">
                            <div className="led-indicator bg-red-500" style={{ width: '10px', height: '10px' }}></div>
                            <div className="led-indicator bg-yellow-400" style={{ width: '10px', height: '10px' }}></div>
                            <div className="led-indicator bg-green-500" style={{ width: '10px', height: '10px' }}></div>
                        </div>
                    </div>

                    {/* Navigation Bar */}
                    <div className="bg-black rounded-lg p-4 border-4 border-gray-800">
                        <Link 
                            href="/" 
                            className="text-white text-xl-pixel hover:text-yellow-400 transition-colors pixel-text"
                        >
                            POKéDEX
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Screen Content */}
            <main className="max-w-6xl mx-auto">
                <div className="pokedex-case rounded-b-3xl rounded-t-lg p-6">
                    <div className="gba-screen scanlines rounded-lg p-6 border-8 border-gray-900 min-h-[500px]">
                        {children}
                    </div>
                    
                    {/* D-Pad and Buttons */}
                    <div className="mt-6 flex justify-between items-center px-8">
                        {/* D-Pad */}
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="grid grid-cols-3 gap-0">
                                    <div></div>
                                    <button className="w-8 h-8 bg-gray-800 border-2 border-black gba-button"></button>
                                    <div></div>
                                    <button className="w-8 h-8 bg-gray-800 border-2 border-black gba-button"></button>
                                    <div className="w-8 h-8 bg-gray-900 border-2 border-black rounded-full"></div>
                                    <button className="w-8 h-8 bg-gray-800 border-2 border-black gba-button"></button>
                                    <div></div>
                                    <button className="w-8 h-8 bg-gray-800 border-2 border-black gba-button"></button>
                                    <div></div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button className="w-16 h-16 bg-red-600 rounded-full border-4 border-black gba-button shadow-lg hover:bg-red-700">
                                <span className="text-white text-xs-pixel">A</span>
                            </button>
                            <button className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-black gba-button shadow-lg hover:bg-yellow-500">
                                <span className="text-black text-xs-pixel">B</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <div className="max-w-6xl mx-auto mt-6 text-center">
                <p className="text-white text-sm-pixel pixel-text">
                    © 2026 Pokedex App | Built with Laravel & React | PokeAPI
                </p>
            </div>
        </div>
    );
}