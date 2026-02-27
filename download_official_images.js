const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { url: 'https://larimarcity.com/wp-content/uploads/2024/04/horizon-view-Exterior_Nivel-1_Viv-esquina.webp', name: 'horizon-view-main.webp' },
    { url: 'https://larimarcity.com/wp-content/uploads/2024/04/prime-towers-exterior-12.webp', name: 'prime-towers-main.webp' },
    { url: 'https://larimarcity.com/wp-content/uploads/2024/08/Brezze-Towers_1.webp', name: 'breeze-towers-main.webp' },
    { url: 'https://larimarcity.com/wp-content/uploads/2024/04/Paradise-towers_8.webp', name: 'paradise-towers-main.webp' },
    { url: 'https://larimarcity.com/wp-content/uploads/2024/04/villas-golf-portada.webp', name: 'villas-golf-main.webp' },
    { url: 'https://larimarcity.com/wp-content/uploads/2024/09/TownHauses_4.webp', name: 'townhouses-main.webp' },
    { url: 'https://larimarcity.com/wp-content/uploads/2025/07/LAR_SUN_20250226_Render_3.webp', name: 'sunset-residences-main.webp' },
    { url: 'https://larimarcity.com/wp-content/uploads/2025/01/Maraluna_Beach_Club_larimar_city_resort_1.webp', name: 'beach-club-main.webp' },
    { url: 'https://larimarcity.com/wp-content/uploads/2025/01/Campo-de-Golf_1.jpg', name: 'golf-course-main.jpg' },
    { url: 'https://larimarcity.com/wp-content/uploads/2024/09/LARIMAR_MASTER_2024-V2.webp', name: 'boardwalk-main.webp' }
];

const dir = path.join(__dirname, 'public', 'images', 'original');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

function download(image) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(dir, image.name);
        const file = fs.createWriteStream(filePath);
        https.get(image.url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${image.url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✅ Downloaded: ${image.name}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => { });
            reject(err);
        });
    });
}

(async () => {
    for (const image of images) {
        try {
            await download(image);
        } catch (err) {
            console.error(`❌ Error downloading ${image.name}: ${err.message}`);
        }
    }
    console.log('\n--- ALL DOWNLOADS COMPLETED ---');
})();
