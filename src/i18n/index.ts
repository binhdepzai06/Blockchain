import { en } from "./en";

export type Language = "vi" | "en";

// Ngôn ngữ hiện tại cho code NGOÀI React (lib, logic mô phỏng). Component React
// nên dùng useLanguage().tr để tự render lại khi người dùng đổi ngôn ngữ.
let currentLanguage: Language = "vi";

export function setCurrentLanguage(language: Language) {
  currentLanguage = language;
}

export function getCurrentLanguage(): Language {
  return currentLanguage;
}

export type TranslateArg = string | number | boolean | null | undefined;

// Khóa dịch chính là câu tiếng Việt gốc. Tiếng Việt: trả nguyên văn.
// Tiếng Anh: tra trong từ điển en.ts; thiếu thì quay về tiếng Việt (không bao giờ crash).
// Tham số {0}, {1}... được thay bằng args theo thứ tự.
export function translate(
  language: Language,
  key: string,
  args: readonly TranslateArg[] = []
): string {
  const text = language === "en" ? (en[key] ?? key) : key;

  if (args.length === 0) return text;

  return text.replace(/\{(\d+)\}/g, (match, index: string) => {
    const value = args[Number(index)];
    return value === undefined || value === null ? match : String(value);
  });
}

export function tr(key: string, ...args: TranslateArg[]): string {
  return translate(currentLanguage, key, args);
}
