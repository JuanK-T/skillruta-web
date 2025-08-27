import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { mediaApi } from '../api/mediaApi';
import { Media } from '../types/media';

export const useMedia = (chapterId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File, onProgress?: (progress: number) => void) => {
      try {
        setIsLoading(true);
        setError(null);

        // Validar que chapterId esté presente
        if (!chapterId) {
          throw new Error('chapterId es requerido para subir archivos');
        }

        // 1. Obtener URL presignada
        const presignedResponse = await mediaApi.getPresignedUploadUrl({
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          chapterId: chapterId,
        });

        // 2. Subir archivo directamente al storage
        const xhr = new XMLHttpRequest();

        if (onProgress) {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const progress = (event.loaded / event.total) * 100;
              onProgress(progress);
            }
          });
        }

        await new Promise<void>((resolve, reject) => {
          xhr.open('PUT', presignedResponse.uploadUrl);
          xhr.setRequestHeader('Content-Type', file.type);

          // Agregar headers requeridos si existen
          if (presignedResponse.requiredHeaders) {
            Object.entries(presignedResponse.requiredHeaders).forEach(([key, value]) => {
              xhr.setRequestHeader(key, value);
            });
          }

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve();
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error('Upload failed'));
          xhr.send(file);
        });

        // 3. Obtener duración si es video/audio
        let duration: number | undefined;
        if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
          duration = await getMediaDuration(file);
        }

        // 4. Confirmar upload y registrar en BD - CORREGIR ESTO
        const confirmData = {
          chapterId: chapterId, // ← Campo requerido
          storageKey: presignedResponse.storageKey, // ← Nombre correcto
          mimeType: file.type, // ← Nombre correcto
          sizeBytes: file.size, // ← Nombre correcto
          fileName: file.name, // ← Campo requerido
          duration, // ← Mantener duration
        };

        const confirmResponse = await mediaApi.confirmUpload(confirmData);

        toast.success('Archivo subido exitosamente');
        return confirmResponse.media;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al subir el archivo';
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [chapterId]
  );

  const getMediaDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const media = file.type.startsWith('video/')
        ? document.createElement('video')
        : document.createElement('audio');

      media.src = url;
      media.onloadedmetadata = () => {
        resolve(media.duration);
        URL.revokeObjectURL(url);
      };
      media.onerror = () => {
        resolve(0);
        URL.revokeObjectURL(url);
      };
    });
  };

  const deleteMedia = useCallback(async (mediaId: string): Promise<void> => {
    try {
      setIsLoading(true);
      await mediaApi.deleteMedia(mediaId);
      toast.success('Archivo eliminado exitosamente');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el archivo';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getDownloadUrl = useCallback(async (mediaId: string): Promise<string> => {
    try {
      const response = await mediaApi.getPresignedDownloadUrl(mediaId);
      return response.url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener URL de descarga';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const getChapterMediaList = useCallback(async (): Promise<Media[]> => {
    if (!chapterId) return [];

    try {
      const response = await mediaApi.getChapterMedia(chapterId);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar archivos';
      setError(errorMessage);
      throw err;
    }
  }, [chapterId]);

  return {
    isLoading,
    error,
    uploadFile,
    deleteMedia,
    getDownloadUrl,
    getChapterMediaList,
    clearError: () => setError(null),
  };
};
