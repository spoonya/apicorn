export interface LanguageGroup {
  key: string;
  label: string;
  syntax_mode: string;
  variants: Array<{
    key: string;
  }>;
}
