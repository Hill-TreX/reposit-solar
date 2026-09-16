# Reposit Solar Landing Page

A modern, responsive landing page for Reposit Solar - a UK-based solar energy company offering guaranteed $0 electricity bills for seven years.

## Overview

Reposit Solar provides solar panel installation with battery storage and a smart controller that learns your energy usage patterns. The company guarantees $0 electricity bills for seven years, covering any shortfall if the system underproduces.

## Features

- **Interactive Solar Calculator**: Users can adjust daily electricity usage, panel output, and sun hours to get a personalized system recommendation
- **3D House Visualization**: Interactive 3D model showing solar panel placement
- **Seven-Year Guarantee**: Underwritten guarantee that covers any shortfall in energy production
- **Fast Installation**: Next business day installation available
- **Grid Export**: Sell excess energy back to the grid

## Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **3D Rendering**: Three.js / React Three Fiber
- **Build Tool**: Vite
- **Language**: TypeScript

## Project Structure

```
reposit-solar/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   └── styles/         # CSS/Tailwind styles
├── public/
│   └── screenshots/    # Website preview screenshots
├── dist/               # Production build
├── index.html          # Entry HTML
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Screenshots

The `public/screenshots/` directory contains preview images of the landing page:

- `hero.png` - Hero section with main headline and call-to-action
- `calculator.png` - Interactive solar system calculator
- `testimonials.png` - Customer testimonials and reviews
- `footer.png` - Contact information and footer links

## License

© 2026 Reposit Energy Ltd. All rights reserved.
