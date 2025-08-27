// types/media.ts
export interface Media {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  key: string;
  chapterId: string;
  createdAt: string;
  updatedAt: string;
  duration?: number; // Para videos/audio
}

export interface PresignedUploadResponse {
  uploadUrl: string;
  storageKey: string;
  requiredHeaders?: Record<string, string>;
  expiresInSec?: number;
}

export interface ConfirmUploadData {
  chapterId: string; // ← Requerido
  storageKey: string; // ← Nombre correcto
  mimeType: string; // ← Nombre correcto
  sizeBytes: number; // ← Nombre correcto
  fileName: string; // ← Requerido
  sha256?: string; // ← Opcional
}

export interface ConfirmUploadResponse {
  url: string;
  id: string;
  media: Media;
}

export interface PresignedDownloadResponse {
  url: string;
  expiresAt: string;
}

export interface MediaListResponse {
  data: Media[];
  total: number;
}
