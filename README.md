# DemoNetbank - Corporate Banking Platform

A modern, mobile-first React TypeScript web application for corporate netbanking with a professional navy blue and pink theme.

## Features

### 📊 Account Management
- View multiple accounts (current, savings, foreign currency, payable, receivable)
- Payment cards management with balance tracking
- 12-month account balance history with interactive charts
- Overdraft limit monitoring

### 💰 Loans & Hedging
- Loan portfolio management (fixed and floating rate loans)
- Interest rate hedges (collars, caps, floors)
- Collateral management (investments and real estate)
- 5-year amortization schedules with principal/interest breakdown

### 🌍 Foreign Exchange
- Interactive world map showing money transfer flows with animation
- Currency pair spot rates and spreads
- Major currency pairs (EURUSD, GBPUSD, USDJPY, etc.)
- FX hedges and swap management
- Currency filtering for transfer visualization

### 💼 Asset & Wealth Management
- Portfolio composition tracking (equities, funds, bonds, structured products)
- Multi-dimensional allocation analysis:
  - Geographic allocation
  - Industry sector allocation
  - Credit rating allocation
- Risk metrics (Value at Risk at 95% and 99.5% confidence levels)
- Expected return projections and portfolio volatility

### 🤝 Customer Support
- Staff directory with relationship managers and product specialists
- Meeting timeline (past and upcoming)
- Meeting request form with date/time picker
- Direct contact information for all team members

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Chart.js + react-chartjs-2
- **Maps**: Leaflet + react-leaflet
- **Icons**: Lucide React
- **State Management**: Zustand (for future use)
- **HTTP Client**: Axios

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open automatically at `http://localhost:3000`

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/              # Reusable components
│   ├── Account/            # Account-related components
│   ├── LoanHedge/          # Loan and hedge components
│   ├── FX/                 # Foreign exchange components
│   ├── AssetWealth/        # Asset management components
│   ├── Help/               # Support and help components
│   ├── Charts/             # Chart components
│   ├── Layout/             # Main layout wrapper
│   └── Navigation/         # Navigation components
├── pages/                  # Page components (5 main pages)
├── services/               # API calls and mock data
├── stores/                 # Zustand stores (state management)
├── types/                  # TypeScript interfaces
├── App.tsx                 # Main app component with routing
├── main.tsx                # Application entry point
└── index.css               # Global styles with Tailwind

public/
└── index.html              # HTML template

Configuration files:
- vite.config.ts            # Vite configuration
- tsconfig.json             # TypeScript configuration
- tailwind.config.ts        # Tailwind CSS theme
- postcss.config.js         # PostCSS configuration
- package.json              # Dependencies and scripts
```

## Theme & Design

### Color Palette
- **Primary**: Deep Blue (#001E9E) - used for headers, buttons, and primary UI elements
- **Primary Text on Blue**: Light Gray (#F0F0F0) - text displayed on #001E9E backgrounds
- **Secondary**: Pink (#e91e63) - used for accents and highlights
- **Neutrals**: Gray shades for backgrounds and text on white backgrounds
- **Success**: Green
- **Warning**: Orange
- **Error**: Red
- **Design**: No gradients - solid color blocks for clean, modern appearance

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Fixed bottom navigation bar for mobile
- Optimized layouts for desktop viewing

## Features Implemented

- ✅ Bottom navigation with 5 main sections
- ✅ Account overview with multiple account types
- ✅ Card management and balance tracking
- ✅ 12-month balance history chart
- ✅ Loan and hedge management
- ✅ Collateral display
- ✅ Currency pair spot rates
- ✅ Asset portfolio breakdown
- ✅ Allocation pie charts (geographic, sector, rating)
- ✅ Portfolio evaluation metrics
- ✅ Staff directory
- ✅ Meeting timeline
- ✅ Meeting request form
- ✅ Navy blue + pink theme throughout

## Future Enhancements

- [ ] Animated world map with transfer flows (Leaflet.flowbeans)
- [ ] Amortization schedule charts
- [ ] FX hedges and swaps details
- [ ] Real-time data integration
- [ ] User authentication
- [ ] Backend API integration
- [ ] Dark mode support
- [ ] Advanced analytics and reporting
- [ ] Mobile app version

## Mock Data

The application uses comprehensive mock data in `src/services/mockData.ts`:
- Realistic account balances and transactions
- Loan products with various terms
- Asset holdings with current valuations
- Staff directory with contact information
- Historical meetings and scheduled meetings
- Currency pairs and transfer data

All data is randomly generated for demonstration purposes and updates on page refresh.

## Performance Optimization

- Code splitting with React Router lazy loading
- Memoized components to prevent unnecessary re-renders
- Optimized chart rendering
- Responsive image loading
- CSS-in-JS optimization with Tailwind

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Focus management

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Troubleshooting

### Port already in use
If port 3000 is already in use, Vite will automatically use the next available port.

### Module not found errors
Run `npm install` to ensure all dependencies are installed.

### Chart rendering issues
Clear browser cache and restart the development server.

## License

This is a demo application for educational purposes.

## Contact

For questions or support regarding this demo, please contact your DemoNetbank representative.
