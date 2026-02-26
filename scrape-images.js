const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const TARGET_URL = 'https://larimarcity.com/';
const OUTPUT_DIR = path.join(__dirname, 'public', 'images', 'original');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;

        // Some basic headers which might help if there are simple anti-hotlinking rules
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://larimarcity.com/',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        };

        const req = client.get(url, options, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(filepath);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });

            fileStream.on('error', (err) => {
                reject(err);
            });
        });

        req.on('error', (err) => {
            reject(err);
        });
    });
}

function getFilenameFromUrl(imageUrl) {
    try {
        const parsed = new URL(imageUrl);
        const basename = path.basename(parsed.pathname);
        // basic sanitization
        return basename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    } catch (e) {
        return `image_${Date.now()}.png`;
    }
}

async function scrapeImages() {
    console.log(`Starting to scrape images from ${TARGET_URL}...`);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set a standard user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
        console.log('Navigating to the website...');
        await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        console.log('Scrolling to lazy load images...');
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });

        // Extract Image URLs from img tags and explicitly formatted background-images
        console.log('Extracting image URLs...');
        const imageUrls = await page.evaluate(() => {
            const urls = new Set();

            // Get all img tags
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.src && img.src.startsWith('http')) {
                    urls.add(img.src);
                }
                // Check for srcset as well
                if (img.srcset) {
                    const sources = img.srcset.split(',');
                    sources.forEach(source => {
                        const url = source.trim().split(' ')[0];
                        if (url.startsWith('http')) urls.add(url);
                    });
                }
            });

            // Get all elements that might have a background image
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                const bg = window.getComputedStyle(el).backgroundImage;
                if (bg && bg !== 'none' && bg.includes('url(')) {
                    // Extract the URL from url("...")
                    const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
                    if (match && match[1] && match[1].startsWith('http')) {
                        urls.add(match[1]);
                    }
                }
            });

            return Array.from(urls);
        });

        console.log(`Found ${imageUrls.length} unique image URLs.`);

        // Download phase
        let downloadedCount = 0;
        let errorCount = 0;

        for (const url of imageUrls) {
            // Filter out some common non-image or tracking URLs if needed
            if (url.includes('google-analytics') || url.includes('facebook.com')) continue;

            const filename = getFilenameFromUrl(url);
            if (!filename || filename === '_' || filename === '') continue;

            const filepath = path.join(OUTPUT_DIR, filename);

            try {
                console.log(`Downloading: ${filename}`);
                await downloadImage(url, filepath);
                downloadedCount++;
            } catch (err) {
                console.error(`Error downloading ${url}:`, err.message);
                errorCount++;
            }
        }

        console.log(`\nFinished! Downloaded ${downloadedCount} images successfully. (${errorCount} errors).`);
        console.log(`Images saved to: ${OUTPUT_DIR}`);

    } catch (error) {
        console.error('An error occurred during scraping:', error);
    } finally {
        await browser.close();
    }
}

scrapeImages();
