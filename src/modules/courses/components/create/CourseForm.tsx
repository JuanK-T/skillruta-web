import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { coursesApi } from '../../api/coursesApi';
import { CourseCategory } from '../../types/index';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'Máximo 100 caracteres'),
  description: z.string().min(1, 'La descripción es requerida').max(500, 'Máximo 500 caracteres'),
  // z.nativeEnum necesita un enum real
  category: z.nativeEnum(CourseCategory),
  thumbnailUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

export function CourseForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: undefined,
      thumbnailUrl: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const course = await coursesApi.createCourse({
        title: values.title,
        description: values.description,
        category: values.category,
        thumbnailUrl: values.thumbnailUrl || undefined,
      });

      toast.success('Curso creado exitosamente');
      navigate(`/courses/${course.slug}/edit`);
    } catch (error) {
      toast.error('Error al crear el curso');
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: 'PROGRAMMING', label: 'Programación' },
    { value: 'DESIGN', label: 'Diseño' },
    { value: 'BUSINESS', label: 'Negocios' },
    { value: 'MARKETING', label: 'Marketing' },
    { value: 'LIFESTYLE', label: 'Estilo de Vida' },
    { value: 'OTHER', label: 'Otro' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Crear Nuevo Curso</h1>
        <p className="text-muted-foreground mt-2">
          Completa la información básica de tu curso. Podrás añadir capítulos después.
        </p>
      </div>

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

          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de la miniatura (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creando...' : 'Crear Curso'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
