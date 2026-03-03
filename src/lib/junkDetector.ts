/**
 * Lead Quality Validation — detects junk submissions before saving to DB
 */

const DISPOSABLE_DOMAINS = [
    "mailinator.com", "tempmail.com", "guerrillamail.com", "throwam.com",
    "sharklasers.com", "yopmail.com", "10minutemail.com", "trashmail.com",
    "fakeinbox.com", "dispostable.com", "spamgourmet.com"
];

const JUNK_NAME_PATTERNS = [
    /^(test|asdf|qwerty|aaaaa|xxxxx|admin|user|demo|foo|bar|a+|f+|s+|d+|g+)$/i,
    /(.)\1{4,}/, // 5+ repeated chars
    /^[^a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s'-]+$/, // no letters at all
];

export interface ValidationResult {
    isValid: boolean;
    isJunk: boolean;
    junkReason?: string;
}

export function validateLead(data: {
    name: string;
    email: string;
    phone?: string;
}): ValidationResult {
    const { name, email, phone } = data;

    // --- Name validation ---
    if (!name || name.trim().length < 2) {
        return { isValid: false, isJunk: true, junkReason: "Name too short" };
    }
    for (const pattern of JUNK_NAME_PATTERNS) {
        if (pattern.test(name.trim())) {
            return { isValid: false, isJunk: true, junkReason: "Suspicious name pattern" };
        }
    }

    // --- Email validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, isJunk: false, junkReason: "Invalid email format" };
    }
    const emailDomain = email.split("@")[1]?.toLowerCase();
    if (DISPOSABLE_DOMAINS.includes(emailDomain)) {
        return { isValid: false, isJunk: true, junkReason: "Disposable/temporary email provider" };
    }
    // Catch obviously fake emails in CSV like "h@gmail.com" (single char local)
    const localPart = email.split("@")[0];
    if (localPart.length < 2) {
        return { isValid: false, isJunk: true, junkReason: "Email local part too short" };
    }

    // --- Phone validation (optional field) ---
    if (phone) {
        const phoneClean = phone.replace(/[\s\-().]/g, "");
        const phoneRegex = /^\+?[1-9]\d{6,14}$/;
        if (!phoneRegex.test(phoneClean)) {
            return { isValid: true, isJunk: true, junkReason: "Invalid international phone format" };
        }
    }

    return { isValid: true, isJunk: false };
}
