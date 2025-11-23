const imageContainer = document.getElementById("img-preview");
const resetBtn = document.getElementById("reset-btn");
const inputAddImage = document.getElementById("added-image-input");
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d', { willReadFrequently: true })
const settings = document.querySelector('.settings-container');
const container = document.querySelector('.frame-container')


let imageWidth = null;
let imageHeight = null;
let originalData = null;

const base64Image = JSON.parse(localStorage.getItem("base64Image"));

// --- UPLOAD IMAGE ---
const reader = new FileReader();
reader.addEventListener('load', () => {
    displayImage(reader.result)
    updateLocalStorage('base64Image', reader.result);
});

inputAddImage.addEventListener('change', () => {
    if (inputAddImage.files[0]) {
        reader.readAsDataURL(inputAddImage.files[0]);
    }
});

function displayImage(src) {
    const image = new Image();
    if (!src) return;
    image.src = src;

    image.onload = function() {
        imageWidth = image.width;
        imageHeight = image.height;
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        context.drawImage(image, 0, 0);

        originalData = context.getImageData(0, 0, imageWidth, imageHeight);
        updateSettingsVisibility();
        applyFilters();

        if (!document.querySelector('.delete-button')) {
            createDeleteButton();
        }
    }
}

// --- GET IMAGE FROM LOCALSTORAGE (base64) ---
window.addEventListener("load", () => {
    updateSettingsVisibility();
    if (base64Image) {
        displayImage(base64Image);
    }
});

// --- DELETE IMAGE ---
function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.style.left = '400px';
    deleteButton.style.width = '60px';
    imageContainer.appendChild(deleteButton);
}

imageContainer.addEventListener("click", (event) => {
    if (event.target.matches(".delete-button")) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            imageWidth = null;
            imageHeight = null;
            originalData = null;
            canvas.width = 0;
            canvas.height = 0;
            event.target.remove();
            inputAddImage.value = '';
            removeLocalStorageItem('base64Image');
            removeLocalStorageItem('filterSettings');
            updateSettingsVisibility();
        }
})

// --- DOWNLOAD IMAGE ---
if(base64Image) {
    const downloadBtn = document.getElementById('download-btn');

    downloadBtn.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = "my-canvas-image.png";
        link.click();
    });
}

//LOCALSTORAGE
function updateLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
}

//ONLY SHOW SETTINGS IF IMAGE LOADED
const placeholder = document.querySelector(".placeholder");

function updateSettingsVisibility() {
    if (!originalData) {
        settings.classList.add("hide");
        settings.classList.remove("show");
        placeholder.classList.add("show");
        container.classList.add("scale");
    } else {
        container.classList.remove("scale");
        settings.classList.remove("hide");
        settings.classList.add("show");
        placeholder.classList.remove("show");
    }
}








