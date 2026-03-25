// Data links statis
const linksData = [
    { id: 1, title: 'Discord', url: 'https://discord.gg/cSfmphXvEF', category: 'Sosial Media' },
    { id: 2, title: 'TikTok', url: 'https://www.tiktok.com/@jacksrack_45', category: 'Hiburan' },
    { id: 3, title: 'SosialBuzz', url: 'https://sociabuzz.com/jacksrack45/tribe', category: 'Donasi' },
    { id: 5, title: 'YouTube', url: 'https://www.youtube.com/@mariyo_2837', category: 'Sosial Media' },
]

const linksList = document.getElementById('linksList');

// Render links
function renderLinks() {
    if (linksData.length === 0) {
        linksList.innerHTML = '<p class="empty-message">Tidak ada link yang tersedia</p>';
        return;
    }

    linksList.innerHTML = linksData.map(link => `
        <div class="link-card">
            <span class="link-category">${link.category}</span>
            <div class="link-title">${escapeHtml(link.title)}</div>
            <a href="${link.url}" target="_blank" class="link-url" title="${link.url}">
                ${link.url}
            </a>
            <div class="link-actions">
                <button class="btn-small btn-open" onclick="openLink('${escapeHtml(link.url)}')">
                    Buka
                </button>
                <button class="btn-small btn-copy" onclick="copyToClipboard('${escapeHtml(link.url)}')">
                    Salin
                </button>
            </div>
        </div>
    `).join('');
}

// Open link
function openLink(url) {
    window.open(url, '_blank');
}

// Copy to clipboard
function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
        showToast('Link disalin ke clipboard! 📋');
    }).catch(() => {
        showToast('Gagal menyalin link', 'error');
    });
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderLinks();
});
