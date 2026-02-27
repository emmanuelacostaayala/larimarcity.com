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
            let modified = false;

            if (content.includes('import Link from "next/link";')) {
                content = content.replace(/import Link from "next\/link";/g, 'import { Link } from "@/i18n/routing";');
                modified = true;
            }
            if (content.includes("import Link from 'next/link';")) {
                content = content.replace(/import Link from 'next\/link';/g, 'import { Link } from "@/i18n/routing";');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated', fullPath);
            }
        }
    }
}

console.log('Processing src/app/[locale]...');
processDir(path.join(__dirname, 'app', '[locale]'));
console.log('Processing src/components...');
processDir(path.join(__dirname, 'components'));
console.log('Done!');
