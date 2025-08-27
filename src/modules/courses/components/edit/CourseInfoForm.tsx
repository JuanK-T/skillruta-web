import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCategory } from '../../types';
import { useState, useEffect } from 'react'; // Agregar useEffect
import { Upload, X } from 'lucide-react';
import { mediaApi } from '@/modules/media/api/mediaApi';

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(1, 'La descripción es requerida').max(500, 'Máximo 500 caracteres'),
  category: z.nativeEnum(CourseCategory),
  thumbnailUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

interface CourseInfoFormProps {
  initialData?: Partial<FormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}

const categories = [
  { value: 'PROGRAMMING', label: 'Programación' },
  { value: 'DESIGN', label: 'Diseño' },
  { value: 'BUSINESS', label: 'Negocios' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'OTHER', label: 'Otro' },
];

export function CourseInfoForm({
  initialData,
  onSubmit,
  isSubmitting,
  onCancel,
}: CourseInfoFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.thumbnailUrl || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || undefined,
      thumbnailUrl: initialData?.thumbnailUrl || '',
    },
  });

  // Limpiar URLs de objeto cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      form.setError('thumbnailUrl', { message: 'Solo se permiten archivos de imagen' });
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      form.setError('thumbnailUrl', { message: 'La imagen no debe superar los 5MB' });
      return;
    }

    // Crear preview local
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Subir el archivo
    await uploadFile(file);
  };

  // En CourseInfoForm - CORREGIR
  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);

      // UUID fijo para thumbnails de curso
      const COURSE_THUMBNAIL_CHAPTER_ID = '00000000-0000-0000-0000-000000000001';

      // 1. Obtener URL presignada para THUMBNAIL DE CURSO
      const presignedResponse = await mediaApi.getPresignedUploadUrlForCourseThumbnail({
        fileName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
      });

      // 2. Subir el archivo directamente al storage
      const uploadResponse = await fetch(presignedResponse.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
          ...(presignedResponse.requiredHeaders || {}),
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Error al subir el archivo');
      }

      // 3. Confirmar la subida y obtener la URL permanente - CORREGIR ESTO
      const confirmResponse = await mediaApi.confirmUpload({
        chapterId: COURSE_THUMBNAIL_CHAPTER_ID, // ← UUID fijo requerido
        storageKey: presignedResponse.storageKey, // ← Nombre correcto
        mimeType: file.type, // ← Nombre correcto
        sizeBytes: file.size, // ← Nombre correcto
        fileName: file.name, // ← Campo requerido
        // sha256: opcional - puedes omitirlo
      });

      // 4. Actualizar el formulario con la nueva URL
      form.setValue('thumbnailUrl', confirmResponse.url);
      form.clearErrors('thumbnailUrl');
    } catch (error) {
      console.error('Error uploading file:', error);
      form.setError('thumbnailUrl', {
        message: 'Error al subir la imagen. Intenta nuevamente.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    // Limpiar la URL de objeto si existe
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    form.setValue('thumbnailUrl', '');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del curso</CardTitle>
        <CardDescription>Completa la información básica de tu curso.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del curso</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Programación JavaScript Avanzada" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe qué aprenderán los estudiantes en este curso..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Miniatura del curso</FormLabel>
              <div className="space-y-4">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Arrastra una imagen o haz clic para seleccionar
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="thumbnail-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('thumbnail-upload')?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? 'Subiendo...' : 'Seleccionar imagen'}
                    </Button>
                  </div>
                )}

                {/* Campo oculto para almacenar la URL */}
                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <>
                      <Input type="hidden" {...field} />
                      <FormMessage />
                    </>
                  )}
                />

                {isUploading && <p className="text-sm text-blue-600">Subiendo imagen...</p>}
              </div>
            </FormItem>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting || isUploading}>
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
