// ===== THEME TOGGLE FUNCTIONALITY =====
let selectedFile = null;

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    body.classList.toggle('dark-mode');
    
    // Change icon based on theme
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }
});

// ===== IMAGE GALLERY MODAL FUNCTIONALITY =====
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    const img = element.querySelector('img');
    const overlay = element.querySelector('.gallery-overlay');
    
    modal.classList.add('active');
    modalImg.src = img.src.replace('w=400', 'w=1200');
    caption.textContent = overlay.textContent;
}

function closeModal(event) {
    const modal = document.getElementById('imageModal');
    
    if (event.target === modal || event.target.classList.contains('close-modal')) {
        modal.classList.remove('active');
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('imageModal').classList.remove('active');
        document.getElementById('uploadModal').classList.remove('active');
    }
});

// Arrow key navigation in modal
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('imageModal');
    
    if (modal.classList.contains('active')) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const currentSrc = document.getElementById('modalImage').src;
        let currentIndex = -1;
        
        galleryItems.forEach((item, index) => {
            const imgSrc = item.querySelector('img').src.replace('w=400', 'w=1200');
            if (currentSrc === imgSrc) {
                currentIndex = index;
            }
        });
        
        if (event.key === 'ArrowRight' && currentIndex < galleryItems.length - 1) {
            openModal(galleryItems[currentIndex + 1]);
        } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
            openModal(galleryItems[currentIndex - 1]);
        }
    }
});

// ===== UPLOAD PHOTO FUNCTIONALITY =====
function openUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.classList.add('active');
    
    // Reset form
    document.getElementById('fileInput').value = '';
    document.getElementById('photoCaption').value = '';
    document.getElementById('previewImage').style.display = 'none';
    document.querySelector('.upload-placeholder').style.display = 'block';
    selectedFile = null;
}

function closeUploadModal(event) {
    const modal = document.getElementById('uploadModal');
    
    if (event.target === modal || event.target.classList.contains('close-modal')) {
        modal.classList.remove('active');
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    
    if (file && file.type.startsWith('image/')) {
        selectedFile = file;
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewImg = document.getElementById('previewImage');
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            document.querySelector('.upload-placeholder').style.display = 'none';
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file (JPG, PNG, GIF)');
    }
}

function addPhotoToGallery() {
    if (!selectedFile) {
        alert('Please select an image first!');
        return;
    }
    
    const caption = document.getElementById('photoCaption').value.trim() || 'My Photo';
    const previewImg = document.getElementById('previewImage');
    
    // Create new gallery item
    const galleryGrid = document.getElementById('galleryGrid');
    const newItem = document.createElement('div');
    newItem.className = 'gallery-item card-small';
    newItem.onclick = function() { openModal(this); };
    
    newItem.innerHTML = `
        <img src="${previewImg.src}" alt="${caption}">
        <div class="gallery-overlay">${caption}</div>
    `;
    
    // Add to gallery with animation
    galleryGrid.appendChild(newItem);
    
    // Animate the new item
    setTimeout(() => {
        newItem.style.animation = 'zoomIn 0.5s ease';
    }, 10);
    
    // Close upload modal
    document.getElementById('uploadModal').classList.remove('active');
    
    // Show success message
    showSuccessMessage('Photo added successfully! 🎉');
}

// Success message function
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-color);
        color: var(--text-color);
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 10px 10px 20px var(--shadow-dark), -10px -10px 20px var(--shadow-light);
        font-weight: 600;
        font-size: 1.1em;
        z-index: 2000;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Add CSS animation for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Drag and drop functionality for upload area
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.style.opacity = '0.7';
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.style.opacity = '1';
        });
    });
    
    uploadArea.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            document.getElementById('fileInput').files = files;
            handleFileSelect({ target: { files: files } });
        }
    });
});