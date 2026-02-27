const fs = require('fs');
const path = require('path');

function findImages(dir) {
    let images = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            images = images.concat(findImages(fullPath));
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Match things like image: "/images/original/xyz.webp",
            // src="/images/original/xyz.webp"
            const regex = /(?:image|src|bgImage|cover|img)[\s|:|="]+(\/[^"\']+\.(webp|jpg|jpeg|png))/gi;

            let match;
            while ((match = regex.exec(content)) !== null) {
                images.push({
                    file: fullPath.replace(path.join(__dirname, 'src'), ''),
                    image: match[1]
                });
            }
        }
    }
    return images;
}

const allImages = findImages(path.join(__dirname, 'src'));

console.log("Found: " + allImages.length + " image references.");

const grouped = {};
for (const item of allImages) {
    const filename = path.basename(item.file);
    if (!grouped[filename]) grouped[filename] = [];
    grouped[filename].push(item.image);
}

for (const file in grouped) {
    console.log(`\n--- ${file} ---`);
    for (const img of [...new Set(grouped[file])]) {
        console.log(`  🔍 ${img}`);
    }
}
