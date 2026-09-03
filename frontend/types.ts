export interface Creative {
  id: string;
  theme: string;
  title: string;
  aspectRatio: string;
}

export interface FormData {
  storeName: string;
  email: string;
  logoFile: File | null;
  applyToAll: boolean;
  globalAddress: string;
  globalPhone: string;
  globalJewelryFile: File | null;
  specificDetails: Record<string, { address: string; phone: string; jewelryFile: File | null }>;
}

export enum AppStep {
  LANDING = 'LANDING',
  GALLERY = 'GALLERY',
  FORM = 'FORM',
  SUCCESS = 'SUCCESS',
  HELP = 'HELP',
  TERMS = 'TERMS',
  PRIVACY = 'PRIVACY'
}
