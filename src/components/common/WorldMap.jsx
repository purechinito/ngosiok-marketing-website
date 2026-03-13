import React, { useState, useCallback } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Line,
    ZoomableGroup,
} from 'react-simple-maps';
import { Globe } from 'lucide-react';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ─── Cebu HQ coordinates ─────────────────────────────────────────────────────
const CEBU = [123.8854, 10.3157];

// ─── All pins (no China) ─────────────────────────────────────────────────────
const PINS = [
    // ── Philippines ──────────────────────────────────────────────────────────
    { name: 'Cebu (HQ)', lon: 123.8854, lat: 10.3157, type: 'hub', isHub: true, ph: true },
    { name: 'Manila', lon: 120.9842, lat: 14.5995, type: 'major', ph: true },
    { name: 'Davao', lon: 125.4553, lat: 7.1907, type: 'hub', ph: true },
    { name: 'Iloilo', lon: 122.5621, lat: 10.7202, type: 'major', ph: true },
    { name: 'Bacolod', lon: 122.9500, lat: 10.6667, type: 'hub', ph: true },
    { name: 'Cagayan de Oro', lon: 124.6400, lat: 8.4750, type: 'major', ph: true },
    { name: 'Zamboanga', lon: 122.0790, lat: 6.9080, type: 'hub', ph: true },
    { name: 'General Santos', lon: 125.1716, lat: 6.1164, type: 'partner', ph: true },
    { name: 'Makati', lon: 121.0244, lat: 14.5547, type: 'hub', ph: true },
    { name: 'Baguio', lon: 120.5960, lat: 16.4023, type: 'major', ph: true },
    { name: 'Palawan', lon: 118.7300, lat: 9.8349, type: 'hub', ph: true },
    { name: 'Tacloban', lon: 125.0081, lat: 11.2430, type: 'major', ph: true },
    { name: 'Legazpi', lon: 123.7332, lat: 13.1391, type: 'hub', ph: true },
    { name: 'Batangas', lon: 121.0583, lat: 13.7565, type: 'major', ph: true },

    // ── Americas ─────────────────────────────────────────────────────────────
    { name: 'New York', lon: -74.0060, lat: 40.7128, type: 'major' },
    { name: 'Los Angeles', lon: -118.2437, lat: 34.0522, type: 'partner' },
    { name: 'Chicago', lon: -87.6298, lat: 41.8781, type: 'major' },
    { name: 'Houston', lon: -95.3698, lat: 29.7604, type: 'partner' },
    { name: 'San Francisco', lon: -122.4194, lat: 37.7749, type: 'hub' },
    { name: 'Seattle', lon: -122.3321, lat: 47.6062, type: 'partner' },
    { name: 'Miami', lon: -80.1918, lat: 25.7617, type: 'major' },
    { name: 'Las Vegas', lon: -115.1398, lat: 36.1699, type: 'partner' },
    { name: 'Boston', lon: -71.0589, lat: 42.3601, type: 'partner' },
    { name: 'Toronto', lon: -79.3470, lat: 43.6510, type: 'major' },
    { name: 'Vancouver', lon: -123.1207, lat: 49.2827, type: 'partner' },
    { name: 'Montreal', lon: -73.5674, lat: 45.5017, type: 'partner' },
    { name: 'Mexico City', lon: -99.1332, lat: 19.4326, type: 'major' },
    { name: 'São Paulo', lon: -46.6333, lat: -23.5505, type: 'hub' },
    { name: 'Rio de Janeiro', lon: -43.1729, lat: -22.9068, type: 'major' },
    { name: 'Buenos Aires', lon: -58.3816, lat: -34.6037, type: 'major' },
    { name: 'Lima', lon: -77.0428, lat: -12.0464, type: 'partner' },
    { name: 'Bogotá', lon: -74.0721, lat: 4.7110, type: 'partner' },
    { name: 'Santiago', lon: -70.6693, lat: -33.4489, type: 'partner' },
    { name: 'Havana', lon: -82.3666, lat: 23.1136, type: 'partner' },
    { name: 'Panama City', lon: -79.5197, lat: 8.9936, type: 'partner' },

    // ── Europe ───────────────────────────────────────────────────────────────
    { name: 'London', lon: -0.1278, lat: 51.5074, type: 'hub' },
    { name: 'Paris', lon: 2.3522, lat: 48.8566, type: 'major' },
    { name: 'Berlin', lon: 13.4050, lat: 52.5200, type: 'partner' },
    { name: 'Madrid', lon: -3.7038, lat: 40.4168, type: 'major' },
    { name: 'Rome', lon: 12.4964, lat: 41.9028, type: 'major' },
    { name: 'Amsterdam', lon: 4.9041, lat: 52.3676, type: 'partner' },
    { name: 'Brussels', lon: 4.3517, lat: 50.8503, type: 'partner' },
    { name: 'Vienna', lon: 16.3738, lat: 48.2082, type: 'partner' },
    { name: 'Prague', lon: 14.4378, lat: 50.0755, type: 'partner' },
    { name: 'Warsaw', lon: 21.0122, lat: 52.2297, type: 'partner' },
    { name: 'Stockholm', lon: 18.0686, lat: 59.3293, type: 'partner' },
    { name: 'Oslo', lon: 10.7522, lat: 59.9139, type: 'partner' },
    { name: 'Copenhagen', lon: 12.5683, lat: 55.6761, type: 'partner' },
    { name: 'Athens', lon: 23.7275, lat: 37.9838, type: 'partner' },
    { name: 'Lisbon', lon: -9.1393, lat: 38.7223, type: 'partner' },
    { name: 'Dublin', lon: -6.2603, lat: 53.3498, type: 'partner' },
    { name: 'Zurich', lon: 8.5417, lat: 47.3769, type: 'partner' },
    { name: 'Barcelona', lon: 2.1734, lat: 41.3851, type: 'major' },
    { name: 'Milan', lon: 9.1900, lat: 45.4654, type: 'major' },
    { name: 'Munich', lon: 11.5820, lat: 48.1351, type: 'partner' },
    { name: 'Kyiv', lon: 30.5234, lat: 50.4501, type: 'partner' },
    { name: 'Helsinki', lon: 24.9384, lat: 60.1699, type: 'partner' },
    { name: 'Bucharest', lon: 26.1025, lat: 44.4268, type: 'partner' },

    // ── Middle East ──────────────────────────────────────────────────────────
    { name: 'Dubai', lon: 55.2708, lat: 25.2048, type: 'hub' },
    { name: 'Abu Dhabi', lon: 54.3773, lat: 24.4539, type: 'major' },
    { name: 'Riyadh', lon: 46.6753, lat: 24.7136, type: 'major' },
    { name: 'Doha', lon: 51.5310, lat: 25.2854, type: 'hub' },
    { name: 'Kuwait City', lon: 47.9783, lat: 29.3759, type: 'partner' },
    { name: 'Muscat', lon: 58.5922, lat: 23.5880, type: 'partner' },
    { name: 'Istanbul', lon: 28.9784, lat: 41.0082, type: 'major' },
    { name: 'Ankara', lon: 32.8597, lat: 39.9334, type: 'partner' },
    { name: 'Beirut', lon: 35.5018, lat: 33.8938, type: 'partner' },
    { name: 'Baghdad', lon: 44.3661, lat: 33.3152, type: 'partner' },
    { name: 'Tehran', lon: 51.3890, lat: 35.6892, type: 'partner' },
    { name: 'Amman', lon: 35.9106, lat: 31.9454, type: 'partner' },

    // ── Africa ───────────────────────────────────────────────────────────────
    { name: 'Cairo', lon: 31.2357, lat: 30.0444, type: 'major' },
    { name: 'Lagos', lon: 3.3792, lat: 6.5244, type: 'major' },
    { name: 'Nairobi', lon: 36.8219, lat: -1.2921, type: 'major' },
    { name: 'Cape Town', lon: 18.4241, lat: -33.9249, type: 'partner' },
    { name: 'Johannesburg', lon: 28.0473, lat: -26.2041, type: 'major' },
    { name: 'Accra', lon: -0.1870, lat: 5.6037, type: 'partner' },
    { name: 'Addis Ababa', lon: 38.7469, lat: 9.0320, type: 'partner' },
    { name: 'Casablanca', lon: -7.5898, lat: 33.5731, type: 'partner' },
    { name: 'Dar es Salaam', lon: 39.2083, lat: -6.7924, type: 'partner' },
    { name: 'Khartoum', lon: 32.5599, lat: 15.5007, type: 'partner' },
    { name: 'Luanda', lon: 13.2344, lat: -8.8368, type: 'partner' },
    { name: 'Tunis', lon: 10.1815, lat: 36.8065, type: 'partner' },

    // ── Asia / Pacific (NO CHINA) ────────────────────────────────────────────
    { name: 'Tokyo', lon: 139.6503, lat: 35.6762, type: 'hub' },
    { name: 'Seoul', lon: 126.9780, lat: 37.5665, type: 'major' },
    { name: 'Taipei', lon: 121.5654, lat: 25.0330, type: 'major' },
    { name: 'Singapore', lon: 103.8198, lat: 1.3521, type: 'hub' },
    { name: 'Kuala Lumpur', lon: 101.6869, lat: 3.1390, type: 'major' },
    { name: 'Jakarta', lon: 106.8456, lat: -6.2088, type: 'major' },
    { name: 'Bangkok', lon: 100.5018, lat: 13.7563, type: 'hub' },
    { name: 'Ho Chi Minh', lon: 106.6297, lat: 10.8231, type: 'major' },
    { name: 'Hanoi', lon: 105.8342, lat: 21.0278, type: 'major' },
    { name: 'Mumbai', lon: 72.8777, lat: 19.0760, type: 'hub' },
    { name: 'Delhi', lon: 77.1025, lat: 28.7041, type: 'major' },
    { name: 'Bangalore', lon: 77.5946, lat: 12.9716, type: 'major' },
    { name: 'Chennai', lon: 80.2707, lat: 13.0827, type: 'partner' },
    { name: 'Kolkata', lon: 88.3639, lat: 22.5726, type: 'partner' },
    { name: 'Karachi', lon: 67.0104, lat: 24.8607, type: 'partner' },
    { name: 'Dhaka', lon: 90.4125, lat: 23.8103, type: 'partner' },
    { name: 'Colombo', lon: 79.8612, lat: 6.9271, type: 'partner' },
    { name: 'Yangon', lon: 96.1561, lat: 16.8661, type: 'partner' },
    { name: 'Phnom Penh', lon: 104.9160, lat: 11.5564, type: 'partner' },
    { name: 'Vientiane', lon: 102.6331, lat: 17.9757, type: 'partner' },
    { name: 'Ulaanbaatar', lon: 106.9057, lat: 47.8864, type: 'partner' },
    { name: 'Kathmandu', lon: 85.3240, lat: 27.7172, type: 'partner' },
    { name: 'Osaka', lon: 135.5023, lat: 34.6937, type: 'major' },

    // ── Oceania ───────────────────────────────────────────────────────────────
    { name: 'Sydney', lon: 151.2093, lat: -33.8688, type: 'hub' },
    { name: 'Melbourne', lon: 144.9631, lat: -37.8136, type: 'major' },
    { name: 'Brisbane', lon: 153.0251, lat: -27.4698, type: 'partner' },
    { name: 'Perth', lon: 115.8605, lat: -31.9505, type: 'partner' },
    { name: 'Auckland', lon: 174.7633, lat: -36.8485, type: 'major' },
    { name: 'Wellington', lon: 174.7762, lat: -41.2865, type: 'partner' },
];

// Foreign pins only (not Philippines) — used for trail lines
const FOREIGN_PINS = PINS.filter(p => !p.ph);

// ─── Styles ──────────────────────────────────────────────────────────────────
const PIN_CFG = {
    hub: { fill: '#7e0f00', glow: 'rgba(126,15,0,0.55)', r: 3.8, rHub: 6 },
    major: { fill: '#E3B631', glow: 'rgba(227,182,49,0.55)', r: 2.6 },
    partner: { fill: '#3387D6', glow: 'rgba(51,135,214,0.55)', r: 1.8 },
};

// ComposableMap SVG viewport (react-simple-maps default)
const MAP_W = 800;
const MAP_H = 450;

export const WorldMap = () => {
    const [tooltip, setTooltip] = useState(null);
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    const handleMoveEnd = useCallback((pos) => setPosition(pos), []);

    return (
        <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-gradient-to-br from-primary-50 via-white to-secondary-50">

            {/* ── Map ── */}
            <div className="relative w-full select-none">
                <ComposableMap
                    projectionConfig={{ scale: 147, center: [0, 0] }}
                    width={MAP_W}
                    height={MAP_H}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                >
                    {/* translateExtent keeps panning within the exact map bounds at any zoom */}
                    <ZoomableGroup
                        zoom={position.zoom}
                        center={position.coordinates}
                        minZoom={1}
                        maxZoom={8}
                        translateExtent={[[0, 0], [MAP_W, MAP_H]]}
                        onMoveEnd={handleMoveEnd}
                    >
                        {/* ── Countries ── */}
                        <Geographies geography={GEO_URL}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#DDE4EF"
                                        stroke="#B8C4D8"
                                        strokeWidth={0.35}
                                        style={{
                                            default: { outline: 'none' },
                                            hover: { fill: '#C9D4E6', outline: 'none' },
                                            pressed: { outline: 'none' },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>

                        {/* ── Trail lines: Cebu → every foreign city ── */}
                        {FOREIGN_PINS.map((pin, i) => (
                            <Line
                                key={`trail-${i}`}
                                from={CEBU}
                                to={[pin.lon, pin.lat]}
                                stroke="rgba(208, 28, 31, 0.18)"
                                strokeWidth={0.45}
                                strokeLinecap="round"
                                strokeDasharray="2.5 3"
                            />
                        ))}

                        {/* ── Pins ── */}
                        {PINS.map((pin, i) => {
                            const cfg = PIN_CFG[pin.type];
                            const r = pin.isHub ? cfg.rHub : cfg.r;
                            return (
                                <Marker
                                    key={i}
                                    coordinates={[pin.lon, pin.lat]}
                                    onMouseEnter={() => setTooltip(pin.name)}
                                    onMouseLeave={() => setTooltip(null)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {/* static halo */}
                                    <circle fill={cfg.glow} r={r * 1.8} opacity={0.25} />

                                    {/* core */}
                                    <circle
                                        r={r}
                                        fill={cfg.fill}
                                        stroke="#fff"
                                        strokeWidth={pin.isHub ? 1.4 : 0.6}
                                        style={{ filter: `drop-shadow(0 0 2px ${cfg.glow})` }}
                                    />

                                    {/* HQ label */}
                                    {pin.isHub && (
                                        <text textAnchor="middle" y={-r - 2.5}
                                            style={{ fontFamily: 'Inter,sans-serif', fontSize: 3.8, fontWeight: 700, fill: '#9B1214', pointerEvents: 'none' }}>
                                            HQ
                                        </text>
                                    )}
                                </Marker>
                            );
                        })}
                    </ZoomableGroup>
                </ComposableMap>

                {/* Tooltip */}
                {tooltip && (
                    <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-3 bg-gray-900/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl pointer-events-none z-30 whitespace-nowrap"
                    >
                        📍 {tooltip}
                    </div>
                )}

                {/* Zoom hint */}
                <div className="absolute top-2 right-3 text-[10px] text-gray-400 font-medium pointer-events-none select-none">
                    Scroll to zoom · Drag to pan
                </div>
            </div>

            {/* ── Info Panel ── */}
            <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 px-5 py-5 md:px-8 md:py-6">
                <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-3 md:gap-4">
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-heading text-lg md:text-xl font-bold">Global Distribution Network</h3>
                                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mt-1 max-w-lg">
                                    From our headquarters in Cebu, we reach over 100 cities worldwide. Trails show our direct shipping routes. Scroll to zoom, drag to explore.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:flex-nowrap">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-primary-500 ring-2 ring-primary-200" />
                                <span className="text-xs text-gray-600 font-medium">Hubs</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-tertiary-500 ring-2 ring-tertiary-200" />
                                <span className="text-xs text-gray-600 font-medium">Distribution</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-secondary-400 ring-2 ring-secondary-200" />
                                <span className="text-xs text-gray-600 font-medium">Partners</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-px border-t border-dashed border-primary-400" />
                                <span className="text-xs text-gray-600 font-medium">Routes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
