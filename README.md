# Browser Extensions Manager

A modern, responsive web application for managing browser extensions with a beautiful UI and dark/light theme support.

## Features

- 🎨 **Modern UI/UX**: Clean, responsive design with smooth animations
- 🌙 **Dark/Light Theme**: Toggle between themes with persistent preferences
- 🔍 **Filtering**: Filter extensions by status (All, Active, Inactive)
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Interactive**: Enable/disable extensions with real-time feedback
- 🔔 **Notifications**: Toast notifications for user actions
- 💾 **Local Storage**: Theme preferences are saved locally

## Demo Extensions

The application includes 10 sample extensions:
- AdBlock Plus
- Grammarly
- Dark Reader
- LastPass
- Pocket
- uBlock Origin
- Momentum
- ColorZilla
- Honey
- Stylus

## How to Host on GitHub Pages

### Method 1: Direct Upload (Easiest)

1. **Create a new repository** on GitHub
2. **Upload all files** to the repository:
   - `Browser extension manager.html` (rename to `index.html`)
   - `css/styles.css`
   - `js/data.js`
   - `js/app.js`
   - `README.md`

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Your site will be available at**: `https://yourusername.github.io/repository-name`

### Method 2: Using Git Commands

```bash
# Clone your repository
git clone https://github.com/yourusername/repository-name.git
cd repository-name

# Add your files
# (Copy all the files to this directory)

# Commit and push
git add .
git commit -m "Initial commit: Browser Extensions Manager"
git push origin main
```

## File Structure

```
Portfolio/
├── index.html                 # Main HTML file (rename from "Browser extension manager.html")
├── css/
│   └── styles.css            # All CSS styles
├── js/
│   ├── data.js              # Sample extension data
│   └── app.js               # Main JavaScript functionality
└── README.md                # This file
```

## Important Notes for GitHub Hosting

1. **Rename the HTML file**: Change `Browser extension manager.html` to `index.html` for GitHub Pages to recognize it as the main page.

2. **All resources are self-contained**: The application uses:
   - Google Fonts (CDN) for typography
   - No external dependencies that could break

3. **Cross-browser compatibility**: Works on all modern browsers

## Customization

### Adding New Extensions

Edit `js/data.js` and add new extension objects to the `extensionsData` array:

```javascript
{
    id: 11,
    name: "Your Extension",
    version: "1.0.0",
    description: "Description of your extension",
    status: "active", // or "inactive"
    category: "Category",
    icon: "🔧", // Emoji or icon
    lastUpdated: "2024-01-20",
    size: "1.5 MB",
    rating: 4.5,
    downloads: "1M+"
}
```

### Modifying Styles

Edit `css/styles.css` to customize colors, layout, and animations.

### Adding Features

Extend the `ExtensionsManager` class in `js/app.js` to add new functionality.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!
