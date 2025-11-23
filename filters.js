const grayscale = document.getElementById("grayscale-btn");
const sepia = document.getElementById("sepia-btn");
const brightnessSlider = document.getElementById("brightness");
const contrastSlider = document.getElementById("contrast");
const saturateSlider = document.getElementById("saturate");
const blurSlider = document.getElementById("blur");

let filters = JSON.parse(localStorage.getItem("filterSettings")) || {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0
};

canvas.style.filter = `grayscale(${filters.grayscale}) sepia(${filters.sepia})`;


//GRAYSCALE
function applyGrayscale() {
    if (filters.grayscale === 1) {
        filters.grayscale = 0;
    } else {
        filters.grayscale = 1;
    }
    filters.sepia = 0;

    canvas.style.filter = `grayscale(${filters.grayscale}) sepia(${filters.sepia})`;
    updateLocalStorage("filterSettings", filters);
}
grayscale.addEventListener("click", applyGrayscale);


//SEPIA
function applySepia() {
    if (filters.sepia === 1) {
        filters.sepia = 0;
    } else {
        filters.sepia = 1;
    }
    filters.grayscale = 0;
    canvas.style.filter = `grayscale(${filters.grayscale}) sepia(${filters.sepia})`;
    updateLocalStorage("filterSettings", filters);
}
sepia.addEventListener('click', applySepia)

//LOAD FILTERS
function loadFilterSettings() {
    brightnessSlider.value = filters.brightness;
    contrastSlider.value = filters.contrast;
    saturateSlider.value = filters.saturate;
    blurSlider.value = filters.blur;
}

//FILTER APPLICATION TO IMAGE
function applyFilters() {
    context.putImageData(originalData, 0, 0);
    context.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) blur(${filters.blur}px)`;
    context.drawImage(canvas, 0, 0);
    context.filter = 'none';
    canvas.style.filter = `grayscale(${filters.grayscale}) sepia(${filters.sepia})`;
}

brightnessSlider.addEventListener('input', (event) => {
    filters.brightness = event.target.value;
    applyFilters();
    updateLocalStorage('filterSettings', filters);
});


contrastSlider.addEventListener('input', (event) => {
    filters.contrast = event.target.value;
    applyFilters();
    updateLocalStorage('filterSettings', filters);
});


saturateSlider.addEventListener('input', (event) => {
    filters.saturate = event.target.value;
    applyFilters();
    updateLocalStorage('filterSettings', filters);
});


blurSlider.addEventListener('input', (event) => {
    filters.blur = event.target.value;
    applyFilters();
    updateLocalStorage('filterSettings', filters);
});


//RESET FILTERS TO INITIAL VALUE
function resetImage() {
    filters = {
        brightness: 100,
        contrast: 100,
        saturate: 100,
        blur: 0,
        grayscale: 0,
        sepia: 0
    };

    updateLocalStorage('filterSettings', filters);

    brightnessSlider.value = 100;
    contrastSlider.value = 100;
    saturateSlider.value = 100;
    blurSlider.value = 0;

    context.putImageData(originalData, 0, 0);
    canvas.style.filter = `grayscale(0) sepia(0)`;
}
loadFilterSettings();

resetBtn.addEventListener('click', resetImage);