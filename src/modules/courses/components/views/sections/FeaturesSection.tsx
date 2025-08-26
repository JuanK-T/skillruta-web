import { BookOpen, Users, CheckCircle } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Contenido Actualizado',
      description: 'Cursos creados por expertos del CoE con las últimas tecnologías',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Comunidad Activa',
      description: 'Conecta con otros desarrolladores y mentores especializados',
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Certificación',
      description: 'Obtén certificados reconocidos al completar tus cursos',
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegir SkillRuta?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia de aprendizaje con herramientas modernas y contenido de
            calidad del CoE
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
