"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var google_ads_api_1 = require("google-ads-api");
require("dotenv/config");
function runTests() {
    return __awaiter(this, void 0, void 0, function () {
        var dbUrl, prisma, dealCount, e_1, bitrixUrl, res, data, e_2, client, managerId, larimarId, inforgesId, larimarCustomer, inforgesCustomer, e_3;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("=========================================");
                    console.log("🧪 INICIANDO PRUEBAS DE ENTORNO (ENV) 🧪");
                    console.log("=========================================\n");
                    // 1. Prisma (Base de Datos Neon)
                    console.log("[1/3] Probando Base de Datos (Neon PostgreSQL)...");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 5, , 6]);
                    dbUrl = (_a = process.env.DATABASE_URL) === null || _a === void 0 ? void 0 : _a.trim();
                    prisma = new client_1.PrismaClient({
                        datasources: { db: { url: dbUrl } }
                    });
                    return [4 /*yield*/, prisma.$connect()
                        // Quick test query
                    ];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, prisma.deal.count()];
                case 3:
                    dealCount = _d.sent();
                    console.log("\u2705 Conexi\u00F3n exitosa a Base de Datos. Deals en BD local: ".concat(dealCount));
                    return [4 /*yield*/, prisma.$disconnect()];
                case 4:
                    _d.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _d.sent();
                    console.log("❌ Falló la conexión a la Base de Datos:", e_1.message);
                    return [3 /*break*/, 6];
                case 6:
                    // 2. Bitrix24
                    console.log("\n[2/3] Probando Conexión a Bitrix24 (Webhook)...");
                    _d.label = 7;
                case 7:
                    _d.trys.push([7, 12, , 13]);
                    bitrixUrl = process.env.BITRIX_BASE_URL || 'https://clerhp.bitrix24.es/rest/17138/uffopruff8sqx8i9';
                    return [4 /*yield*/, fetch("".concat(bitrixUrl, "/crm.deal.list.json?start=0"))];
                case 8:
                    res = _d.sent();
                    if (!res.ok) return [3 /*break*/, 10];
                    return [4 /*yield*/, res.json()];
                case 9:
                    data = _d.sent();
                    if (data.result !== undefined) {
                        console.log("\u2705 Conexi\u00F3n a Bitrix exitosa. (Se leyeron correctamente los primeros ".concat(data.result.length, " deals)"));
                    }
                    else {
                        console.log("⚠️ Conexión a Bitrix exitosa, pero el formato de respuesta fue inesperado.");
                    }
                    return [3 /*break*/, 11];
                case 10:
                    console.log("\u274C La solicitud a Bitrix fall\u00F3 con el c\u00F3digo HTTP: ".concat(res.status));
                    _d.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    e_2 = _d.sent();
                    console.log("❌ Falló la conexión a Bitrix:", e_2.message);
                    return [3 /*break*/, 13];
                case 13:
                    // 3. Google Ads
                    console.log("\n[3/3] Probando Conexión a Google Ads API...");
                    _d.label = 14;
                case 14:
                    _d.trys.push([14, 17, , 18]);
                    if (!process.env.GOOGLE_ADS_DEVELOPER_TOKEN || !process.env.GOOGLE_ADS_CLIENT_ID || !process.env.GOOGLE_ADS_CLIENT_SECRET || !process.env.GOOGLE_ADS_REFRESH_TOKEN) {
                        throw new Error("Faltan credenciales base de Google Ads en el archivo .env");
                    }
                    client = new google_ads_api_1.GoogleAdsApi({
                        client_id: process.env.GOOGLE_ADS_CLIENT_ID,
                        client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
                        developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
                    });
                    managerId = process.env.GOOGLE_ADS_MANAGER_ID ? process.env.GOOGLE_ADS_MANAGER_ID.replace(/-/g, '') : undefined;
                    larimarId = ((_b = process.env.GOOGLE_ADS_LARIMAR_ID) === null || _b === void 0 ? void 0 : _b.replace(/-/g, '')) || '';
                    inforgesId = ((_c = process.env.GOOGLE_ADS_INFORGES_ID) === null || _c === void 0 ? void 0 : _c.replace(/-/g, '')) || '';
                    if (!larimarId || !inforgesId) {
                        throw new Error("Faltan los IDs (Larimar o Inforges) en el archivo .env");
                    }
                    // Probar cuenta Larimar
                    console.log("  -> Consultando Cuenta Larimar (".concat(larimarId, ") v\u00EDa Manager (").concat(managerId, ")..."));
                    larimarCustomer = client.Customer({
                        customer_id: larimarId,
                        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
                        login_customer_id: managerId
                    });
                    return [4 /*yield*/, larimarCustomer.query("SELECT customer.id FROM customer LIMIT 1")];
                case 15:
                    _d.sent();
                    console.log("  ✅ Cuenta Larimar consultada correctamente. Token y permisos válidos.");
                    // Probar cuenta Inforges
                    console.log("  -> Consultando Cuenta Inforges (".concat(inforgesId, ") v\u00EDa Manager (").concat(managerId, ")..."));
                    inforgesCustomer = client.Customer({
                        customer_id: inforgesId,
                        refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
                        login_customer_id: managerId
                    });
                    return [4 /*yield*/, inforgesCustomer.query("SELECT customer.id FROM customer LIMIT 1")];
                case 16:
                    _d.sent();
                    console.log("  ✅ Cuenta Inforges consultada correctamente. Token y permisos válidos.");
                    return [3 /*break*/, 18];
                case 17:
                    e_3 = _d.sent();
                    console.log("❌ Falló la conexión a Google Ads:", e_3.message || e_3);
                    return [3 /*break*/, 18];
                case 18:
                    console.log("\n=========================================");
                    console.log("🏁 PRUEBAS FINALIZADAS");
                    console.log("=========================================\n");
                    return [2 /*return*/];
            }
        });
    });
}
runTests();
