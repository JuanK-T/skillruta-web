export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (fileName: string): string => {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
};

export const isImageFile = (fileType: string): boolean => {
  return fileType.startsWith('image/');
};

export const isVideoFile = (fileType: string): boolean => {
  return fileType.startsWith('video/');
};

export const isAudioFile = (fileType: string): boolean => {
  return fileType.startsWith('audio/');
};

export const isValidFileType = (file: File, acceptedTypes: string[]): boolean => {
  return acceptedTypes.some((type) => {
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.replace('/*', '/'));
    }
    return file.type === type;
  });
};
