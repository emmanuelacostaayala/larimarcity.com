const fs = require('fs');
const xlsx = require('xlsx');
const pdf = require('pdf-parse');
const path = require('path');

const files = [
    "c:\\Users\\enman\\.gemini\\antigravity\\scratch\\larimarcity.com\\Agrupacion Clusters x Intencion (Reestructuracion WEB).xlsx",
    "c:\\Users\\enman\\.gemini\\antigravity\\scratch\\larimarcity.com\\Keyword.research.arquitectura.web.larimar.xlsx",
    "c:\\Users\\enman\\.gemini\\antigravity\\scratch\\larimarcity.com\\Propuesta Reestructuracion Website Larimar (Estructura Menu-Verticales).xlsx",
    "c:\\Users\\enman\\.gemini\\antigravity\\scratch\\larimarcity.com\\MANUAL DE IDENTIDAD LARIMAR_NOVIEMBRE.pdf",
    "c:\\Users\\enman\\.gemini\\antigravity\\scratch\\larimarcity.com\\Theme-skyview-complex (Plantilla reestructuracion Web Larimar).pdf"
];

async function extract() {
    let output = '';
    for (const file of files) {
        if (!fs.existsSync(file)) {
            output += `\nFILE NO EXISTE: ${file}\n`;
            continue;
        }

        output += `\n\n========================================\nBEGIN FILE: ${path.basename(file)}\n========================================\n`;
        const ext = path.extname(file).toLowerCase();

        try {
            if (ext === '.xlsx') {
                const workbook = xlsx.readFile(file);
                for (const sheetName of workbook.SheetNames) {
                    output += `\n--- Sheet: ${sheetName} ---\n`;
                    const sheet = workbook.Sheets[sheetName];
                    output += xlsx.utils.sheet_to_csv(sheet);
                }
            } else if (ext === '.pdf') {
                const dataBuffer = fs.readFileSync(file);
                const data = await pdf(dataBuffer);
                output += data.text;
            }
        } catch (e) {
            output += `\nError extracting ${file}: ${e.message}\n`;
        }
        output += `\n========================================\nEND FILE: ${path.basename(file)}\n========================================\n`;
    }
    fs.writeFileSync('c:\\Users\\enman\\.gemini\\antigravity\\scratch\\larimarcity.com\\extracted_remaining.txt', output);
    console.log("Done");
}

extract();
