export function CourseFeatures() {
  const features = [
    {
      emoji: '⏱️',
      title: 'Duración flexible',
      description: 'Aprende a tu propio ritmo',
    },
    {
      emoji: '📋',
      title: 'Proyectos prácticos',
      description: 'Aplica lo aprendido',
    },
    {
      emoji: '🏆',
      title: 'Certificado',
      description: 'Al completar el curso',
    },
  ];

  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-card rounded-xl p-6 text-center shadow-md">
          <div className="text-3xl mb-2">{feature.emoji}</div>
          <h3 className="font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
