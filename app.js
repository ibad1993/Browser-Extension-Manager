// Main application functionality
class ExtensionsManager {
    constructor() {
        this.extensions = extensionsData;
        this.currentFilter = 'all';
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.renderExtensions();
        this.updateFilterButtons();
    }

    setupEventListeners() {
        // Theme toggle
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.setTheme(theme);
            });
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.body.className = theme === 'dark' ? 'dark-theme' : '';
        
        // Update theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });

        // Save theme preference
        localStorage.setItem('theme', theme);
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.updateFilterButtons();
        this.renderExtensions();
    }

    updateFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
        });
    }

    getFilteredExtensions() {
        if (this.currentFilter === 'all') {
            return this.extensions;
        }
        return this.extensions.filter(ext => ext.status === this.currentFilter);
    }

    renderExtensions() {
        const grid = document.getElementById('extensionsGrid');
        const filteredExtensions = this.getFilteredExtensions();

        if (filteredExtensions.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>No extensions found</h3>
                    <p>Try changing your filter or add some extensions.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filteredExtensions.map(extension => this.createExtensionCard(extension)).join('');
        
        // Add event listeners to action buttons
        this.setupCardEventListeners();
    }

    createExtensionCard(extension) {
        const statusClass = extension.status === 'active' ? 'status-active' : 'status-inactive';
        const statusText = extension.status === 'active' ? 'Active' : 'Inactive';
        const toggleText = extension.status === 'active' ? 'Disable' : 'Enable';
        const toggleClass = extension.status === 'active' ? '' : 'primary';

        return `
            <div class="extension-card" data-id="${extension.id}">
                <div class="extension-header">
                    <div class="extension-icon">${extension.icon}</div>
                    <div class="extension-info">
                        <h3>${extension.name}</h3>
                        <p>v${extension.version} • ${extension.category}</p>
                    </div>
                </div>
                
                <p class="extension-description">${extension.description}</p>
                
                <div class="extension-meta">
                    <div class="extension-status">
                        <span class="status-indicator ${statusClass}"></span>
                        <span>${statusText}</span>
                    </div>
                    <div class="extension-actions">
                        <button class="action-btn toggle-btn ${toggleClass}" data-id="${extension.id}">
                            ${toggleText}
                        </button>
                        <button class="action-btn settings-btn" data-id="${extension.id}">
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupCardEventListeners() {
        // Toggle extension status
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.toggleExtension(id);
            });
        });

        // Settings button
        document.querySelectorAll('.settings-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.openSettings(id);
            });
        });
    }

    toggleExtension(id) {
        const extension = this.extensions.find(ext => ext.id === id);
        if (extension) {
            extension.status = extension.status === 'active' ? 'inactive' : 'active';
            this.renderExtensions();
            this.showNotification(`${extension.name} has been ${extension.status === 'active' ? 'enabled' : 'disabled'}`);
        }
    }

    openSettings(id) {
        const extension = this.extensions.find(ext => ext.id === id);
        if (extension) {
            this.showNotification(`Opening settings for ${extension.name}...`);
            // In a real application, this would open the extension's settings page
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Search functionality
    searchExtensions(query) {
        const filtered = this.extensions.filter(extension => 
            extension.name.toLowerCase().includes(query.toLowerCase()) ||
            extension.description.toLowerCase().includes(query.toLowerCase()) ||
            extension.category.toLowerCase().includes(query.toLowerCase())
        );
        return filtered;
    }

    // Sort extensions
    sortExtensions(criteria) {
        const sorted = [...this.extensions];
        switch (criteria) {
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'status':
                sorted.sort((a, b) => a.status.localeCompare(b.status));
                break;
            case 'category':
                sorted.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
        }
        return sorted;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExtensionsManager();
});

// Add some additional utility functions
const utils = {
    // Format file size
    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
};
