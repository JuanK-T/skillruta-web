import { http } from '@/lib/api/client';
import {
  Media,
  PresignedUploadResponse,
  ConfirmUploadResponse,
  PresignedDownloadResponse,
  MediaListResponse,
} from '../types/media';

export const mediaApi = {
  // Solicitar URL presignada para subir un archivo
  getPresignedUploadUrl: async (data: {
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    chapterId: string;
  }): Promise<PresignedUploadResponse> => {
    return http<PresignedUploadResponse>('/media/presign-upload', {
      method: 'POST',
      body: data, // ← Envía el objeto completo con la estructura correcta
    });
  },

  // Confirmar subida y registrar metadatos
  confirmUpload: async (data: {
    chapterId: string;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    fileName: string;
    sha256?: string;
  }): Promise<ConfirmUploadResponse> => {
    return http<ConfirmUploadResponse>('/media/confirm', {
      method: 'POST',
      body: data,
    });
  },

  // Listar archivos de un capítulo
  getChapterMedia: async (chapterId: string): Promise<MediaListResponse> => {
    return http<MediaListResponse>(`/chapters/${chapterId}/media`);
  },

  // Solicitar URL presignada de descarga
  getPresignedDownloadUrl: async (mediaId: string): Promise<PresignedDownloadResponse> => {
    return http<PresignedDownloadResponse>(`/media/${mediaId}/presign-download`, {
      method: 'POST',
    });
  },

  // Eliminar un media (objeto + registro)
  deleteMedia: async (mediaId: string): Promise<void> => {
    return http<void>(`/media/${mediaId}`, {
      method: 'DELETE',
    });
  },

  // Obtener información de un media específico
  getMedia: async (mediaId: string): Promise<Media> => {
    return http<Media>(`/media/${mediaId}`);
  },

  // Actualizar metadatos de un media
  updateMedia: async (mediaId: string, data: Partial<Media>): Promise<Media> => {
    return http<Media>(`/media/${mediaId}`, {
      method: 'PATCH',
      body: data,
    });
  },

  getPresignedUploadUrlForCourseThumbnail: async (data: {
    fileName: string;
    mimeType: string;
    sizeBytes: number;
  }): Promise<PresignedUploadResponse> => {
    return http<PresignedUploadResponse>('/media/presign-upload/course-thumbnail', {
      method: 'POST',
      body: data,
    });
  },
};
