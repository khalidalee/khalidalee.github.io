/**
 * ==========================================================================
 * EXECUTIVE PORTFOLIO CORE ENGINE
 * Includes: Light/Dark Theme Toggle & High-Fidelity PDF CV Export
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize both application core components
    initThemeEngine();
    // initPdfEngine();
    initPdfDownloadEngine();
});

/**
 * 1. THEME ENGINE 
 * Manages Light/Dark mode state switching and localStorage persistence.
 */
function initThemeEngine() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // Check localStorage or system preference for existing theme selection
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    // Set initial state based on past preference or default system setting
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.body.classList.add('light-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    // Register click event listener for the toggle switch
    themeToggleBtn.addEventListener('click', () => {
        const isLightModeNow = document.body.classList.toggle('light-mode');
        
        // Persist the user's configuration preference
        localStorage.setItem('portfolio-theme', isLightModeNow ? 'light' : 'dark');
        updateThemeIcon(isLightModeNow);
    });
}

/**
 * Helper to dynamically swap the FontAwesome class inside the theme button.
 * @param {boolean} isLightMode 
 */
function updateThemeIcon(isLightMode) {
    const icon = document.querySelector('#theme-toggle i');
    if (!icon) return;
    
    if (isLightMode) {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

/**
 * 2. PDF ENGINE
 * Handles standard-compliant vector compilation of the executive CV blueprint.
 */
// function initPdfEngine() {
//     const downloadBtn = document.getElementById('download-pdf');
//     if (!downloadBtn) return;

//     downloadBtn.addEventListener('click', () => {
//         const pdfTemplate = document.getElementById('cv-pdf-template');
//         if (!pdfTemplate) return;

//         // Display the hidden element so the rendering engine can compute heights
//         pdfTemplate.style.display = 'block';

//         const configurationOptions = {
//             margin:       0, 
//             filename:     'Khalid_Ali_Executive_CV.pdf',
//             image:        { type: 'jpeg', quality: 1.0 },
//             html2canvas:  { 
//                 scale: 2, 
//                 useCORS: true, 
//                 logging: false,
//                 scrollY: 0, 
//                 scrollX: 0
//             },
//             jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
//             // ADVANCED FIX: Forces layout elements to stick together and break strictly on CSS divs
//             pagebreak:    { mode: ['avoid-all', 'css'] } 
//         };

//         html2pdf()
//             .set(configurationOptions)
//             .from(pdfTemplate)
//             .save()
//             .catch(error => {
//                 console.error('PDF Generation Failure:', error);
//             })
//             .finally(() => {
//                 // Return template back to its hidden state
//                 pdfTemplate.style.display = 'none';
//             });
//     });
// }

function initPdfDownloadEngine() {
    const downloadBtn = document.getElementById('download-pdf');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', (event) => {
        // Stop default form behaviors or event bubbles
        event.preventDefault();

        // Path configuration pointing to your original document asset
        const pdfFilePath = 'KhalidAli.pdf'; 
        const downloadFileName = 'Khalid_Ali_Executive_CV.pdf';

        // Instantiate an isolated virtual anchor element to trigger an implicit filesystem download
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = pdfFilePath;
        downloadAnchor.download = downloadFileName;
        downloadAnchor.target = '_blank';

        // Append to layout DOM context tree to enable click action execution in restricted browsers
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();

        // Garbage collection removal to clean up layout DOM reference memory space
        document.body.removeChild(downloadAnchor);
    });
}