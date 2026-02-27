const fs = require('fs');
const path = require('path');

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Regex to find and replace WordPress resized image strings
            // Example: /images/original/Farallon_Fase-1_larimar-city-1536x864.webp -> /images/original/Farallon_Fase-1_larimar-city.webp
            // We use global replacement within quotes only or template literals.

            const regex = /-(\d{3,4})x(\d{3,4})\.(webp|jpg|jpeg|png|gif)/gi;

            content = content.replace(regex, ".$3");

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed image paths in:', fullPath);
            }
        }
    }
}

console.log('Scanning src directory for low-res image references...');
processDir(path.join(__dirname, 'src'));
console.log('Paths updated successfully.');
