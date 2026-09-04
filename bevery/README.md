# Bevery - Roblox Clone Platform

A professional Roblox-like gaming platform with Material You UI design.

## Features
- User authentication (Supabase)
- Game upload with virus scanning
- Moderation system for game submissions
- Friends system with online/offline status
- Game sandbox preview
- Clean, modern Material You design

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Supabase (Auth, Database)
- **Deployment**: Vercel + GitHub

## Getting Started

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/flereofc/bevery.git
cd bevery
```

2. Open `index.html` in your browser

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository: `flereofc/bevery`
4. Vercel auto-detects it's a static site (no build command needed)
5. Click "Deploy"

Your site will be live at: `https://bevery.vercel.app`

### Connecting Supabase

Update the Supabase configuration in `pages/app.js`:
```javascript
const SUPABASE_URL = 'https://wwrhiwayiltqezhaspfl.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## Project Structure
```
bevery/
├── index.html          # Main entry point
├── pages/
│   ├── app.js         # Application logic
│   └── ui.css         # Styling
└── README.md
```

## Supabase Setup
1. Create a project at [supabase.com](https://supabase.com)
2. Enable Email authentication in Authentication settings
3. Copy your Project URL and anon public key
4. Update the config in `app.js`

## License
MIT
