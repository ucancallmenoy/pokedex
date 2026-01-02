# Pokédex App

A retro-styled web-based Pokédex inspired by the Game Boy Advance, built with **Laravel** and **React**. Explore Pokémon regions, browse Pokémon lists, and view detailed stats in a nostalgic gaming aesthetic.

## Features

- **Region Selection**: Choose from 9 Pokémon regions (Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, Paldea)
- **Pokémon Browser**: View Pokémon by region with real-time search functionality
- **Detailed Pokémon Pages**: View stats, types, abilities, height, weight, and official descriptions
- **GBA-Inspired Design**: Pixelated fonts, scanlines, retro colors, and physical device styling
- **Interactive Elements**: Clickable Pokémon images with zoom modal, navigation between Pokémon
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Smart Caching**: API responses cached for 1 hour to improve performance

## Technologies Used

| Layer | Technology |
|-------|-----------|
| **Backend** | Laravel 12 (PHP 8.2+) |
| **Frontend** | React 19 with Inertia.js |
| **Styling** | Tailwind CSS 3.4 with custom retro classes |
| **API** | PokeAPI v2 |
| **Database** | SQLite (default) |
| **Build Tool** | Vite 7 |

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pokedex-app.git
cd pokedex-app
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node.js Dependencies

```bash
npm install
```

### 4. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` and configure if needed (SQLite is already configured by default):

```env
APP_NAME="Pokedex App"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database
```

### 5. Generate Application Key

```bash
php artisan key:generate
```

### 6. Run Database Migrations

```bash
php artisan migrate
```

### 7. Build Frontend Assets

```bash
npm run build
```

For development with hot reload:

```bash
npm run dev
```

### 8. Start the Development Server

```bash
php artisan serve
```

The app will be available at: **http://localhost:8000**

## Quick Setup (All-in-One)

If you have all dependencies installed, run the setup script:

```bash
composer run setup
```

This automatically runs all installation steps.

## Development Mode

To run the full development environment with Laravel server, queue listener, logs, and Vite watcher:

```bash
composer run dev
```

## How PokeAPI is Used

This application integrates with **PokeAPI v2** (https://pokeapi.co/api/v2) to fetch real-time Pokémon data.

### API Integration Points

#### 1. **Regions Data** ([`RegionController::index()`](app/Http/Controllers/RegionController.php))
- Hardcoded 9 region configurations with PokeAPI Pokédex IDs
- Displays region selection screen with cards

#### 2. **Pokédex by Region** ([`PokeApiService::getPokedexByRegion()`](app/Services/PokeApiService.php))
- Fetches Pokédex data for specific region (e.g., `/pokedex/2` for Kanto)
- Maps region names to Pokédex IDs:
  - Kanto → ID 2
  - Johto → ID 3
  - Hoenn → ID 4
  - Sinnoh → ID 5
  - Unova → ID 8
  - Kalos → ID 12
  - Alola → ID 16
  - Galar → ID 27
  - Paldea → ID 31

**Data Returned:**
```json
{
  "entry_number": 1,
  "id": 1,
  "name": "bulbasaur",
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
}
```

#### 3. **Pokémon Details** ([`PokeApiService::getPokemonById()`](app/Services/PokeApiService.php))
- Fetches comprehensive Pokémon data from `/pokemon/{id}`
- Retrieves species data from `/pokemon-species/{id}` for English descriptions
- Transforms data into frontend-ready format

**Data Fetched:**
- ID, name, height, weight
- Types (e.g., Fire, Water)
- Abilities (including hidden abilities)
- Base stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
- Official artwork sprite URL
- English flavor text description

**Example Response:**
```json
{
  "id": 1,
  "name": "bulbasaur",
  "height": 7,
  "weight": 69,
  "types": ["grass", "poison"],
  "abilities": [
    {"name": "overgrow", "is_hidden": false},
    {"name": "chlorophyll", "is_hidden": true}
  ],
  "stats": [
    {"name": "hp", "base_stat": 45},
    {"name": "attack", "base_stat": 49}
  ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  "description": "A strange seed was planted on its back at birth..."
}
```

### Caching Strategy

All PokeAPI calls are cached for **1 hour** using Laravel's cache system to:
- Reduce API load
- Improve response times
- Reduce external API calls

Cache keys:
- `regions` - All regions
- `pokedex_{regionName}` - Region Pokédex (e.g., `pokedex_kanto`)
- `pokemon_{id}` - Individual Pokémon (e.g., `pokemon_25`)

See [PokeApiService](app/Services/PokeApiService.php) for implementation details.

## Project Structure

```
pokedex-app/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── PokemonController.php      # Pokémon detail page
│   │   │   └── RegionController.php       # Region selection & browser
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php  # Inertia config
│   └── Services/
│       └── PokeApiService.php             # PokeAPI integration
├── resources/
│   ├── css/
│   │   └── app.css                        # Tailwind + custom retro styles
│   ├── js/
│   │   ├── app.jsx                        # React entry point
│   │   ├── Components/
│   │   │   └── Layout.jsx                 # Main Pokédex layout
│   │   └── Pages/
│   │       ├── Home.jsx
│   │       ├── Pokemon/
│   │       │   └── Show.jsx               # Pokémon detail page
│   │       └── Regions/
│   │           ├── Index.jsx              # Region selection
│   │           └── Show.jsx               # Region browser
│   └── views/
│       └── app.blade.php                  # Root HTML template
├── routes/
│   └── web.php                            # Application routes
├── config/
│   ├── app.php
│   ├── cache.php
│   ├── database.php
│   └── session.php
├── bootstrap/
│   └── app.php                            # Laravel app configuration
├── vite.config.js                         # Vite build config
├── tailwind.config.js                     # Tailwind config
├── postcss.config.js                      # PostCSS config
├── composer.json                          # PHP dependencies
├── package.json                           # Node.js dependencies
└── README.md

```

## Routes

| Method | Route | Handler | Description |
|--------|-------|---------|-------------|
| GET | `/` | `RegionController@index` | Region selection page |
| GET | `/region/{region}` | `RegionController@show` | Pokémon list for region |
| GET | `/pokemon/{id}` | `PokemonController@show` | Pokémon detail page |

## Usage

1. **Start at Home**: Select a Pokémon region from the main screen
2. **Browse Pokémon**: View all Pokémon in your selected region
3. **Search**: Use the search bar to find specific Pokémon by name or entry number
4. **View Details**: Click any Pokémon to see:
   - Full artwork (clickable for zoom)
   - Type(s) with color-coded badges
   - Height and weight
   - All abilities (with hidden ability indicator ★)
   - Complete base stats with visual bars
   - Official Pokédex description
5. **Navigate**: Use arrow buttons to browse previous/next Pokémon
6. **Go Back**: Use the back button to return to region list or browser

## Development

### Build Assets
```bash
npm run build    # Production build
npm run dev      # Development with hot reload
```

### Run Tests
```bash
php artisan test
```

### View Application Logs
```bash
php artisan pail
```

## Troubleshooting

### Issue: Assets not loading
```bash
npm run build
php artisan cache:clear
```

### Issue: Database errors
```bash
php artisan migrate:fresh
```

### Issue: PokeAPI not responding
- Check internet connection
- PokeAPI servers might be temporarily down
- Cached data will still be available for 1 hour

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open-sourced under the **MIT License** - see LICENSE file for details.

## Acknowledgments

- **[PokeAPI](https://pokeapi.co/)** - Pokémon data and sprites
- **[Laravel](https://laravel.com/)** - Backend framework
- **[React](https://react.dev/)** - Frontend library
- **[Inertia.js](https://inertiajs.com/)** - Rails-like adapter
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **Game Boy Advance** - Design inspiration

---

**Created by Patrick Perez**