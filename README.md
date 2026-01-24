# Bangalore Foodie Maps

A platform for curating and mapping the best food spots in Bangalore. This application features a real-time interactive map, category filtering, and a sleek discovery interface.  

## 🚀 Getting Started Locally

Follow these steps to get the project up and running on your machine.

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/BangaloreFoodMap.git
   cd BangaloreFoodMap
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173/BangaloreFoodMap/`.

### Building for Production

To create a production-ready build:
```bash
npm run build
```
The output will be generated in the `dist/` folder.

## 🌐 Deployment to GitHub Pages

The project is pre-configured for GitHub Pages.

1. **GitHub Action**: Every push to the `main` branch triggers the `.github/workflows/deploy.yaml` workflow, which automatically builds and deploys the site to the `gh-pages` branch.
2. **Repository Settings**:
   - Go to **Settings > Pages**.
   - Set the source branch to `gh-pages` and folder to `/ (root)`.
3. **Vite Configuration**:
   - Ensure the `base` property in `vite.config.ts` matches your repository name (currently set to `/BangaloreFoodMap/`).

## 🛠️ Tech Stack

- **React 19**: UI components and state management.
- **Vite**: Ultra-fast build tool and dev server.
- **Tailwind CSS**: Utility-first styling.
- **Leaflet**: Open-source interactive maps.
- **TypeScript**: Static typing for robust code.
- **Google Gemini API**: Integrated for future AI-assisted content (optional).

