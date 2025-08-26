# SkillRuta Web - Documentación del Proyecto

## 📋 Descripción del Proyecto

SkillRuta Web es una aplicación frontend desarrollada con React (Vite) que proporciona servicios para la gestión de cursos, capítulos, progreso de usuarios e insignias. Esta aplicación está diseñada para ser escalable, mantenible y seguir las mejores prácticas de desarrollo.

## 🚀 Comenzando

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js)

### Instalación

```bash
npm install
```

## 🛠️ Comandos disponibles

| Comando             | Descripción                                 |
| ------------------- | ------------------------------------------- |
| `npm run start:dev` | Inicia el servidor de desarrollo            |
| `npm run build`     | Construye la versión de producción          |
| `npm run lint`      | Ejecuta ESLint para verificar código        |
| `npm run lint:fix`  | Corrige automáticamente problemas de ESLint |
| `npm run format`    | Formatea el código con Prettier             |
| `npm run typecheck` | Verifica los tipos TypeScript               |
| `npm run check`     | Ejecuta todas las verificaciones            |
| `npm run commit`    | **Hacer commits (RECOMENDADO)**             |

## 📝 Flujo de trabajo recomendado

1. **Instalar dependencias**: `npm install`
2. **Desarrollar**: `npm run start:dev`
3. **Hacer commit**: `npm run commit` (¡NUNCA uses `git commit` directamente!)
4. **Si hay errores**: Usa `npm run lint:fix` y `npm run format`

## ⚠️ Importante

- **Siempre** usa `npm run commit` para commits
- Los hooks de git verifican tu código automáticamente
- Si fallan los hooks, corrige los errores antes de commitear

## 🆘 Si tienes problemas

```bash
# Después de un git pull:
npm install
npm run typecheck
npm run lint

# Si fallan los hooks:
npm run check
```

## 🏗️ Estructura del proyecto

```
src/        # Código fuente principal
public/     # Archivos estáticos
dist/       # Build de producción (generado automáticamente)
```

## 🔧 Tecnologías principales

- React 19 + TypeScript
- Vite
- Tailwind CSS
- ESLint + Prettier
- Husky (git hooks)
- Commitizen (commits estandarizados)

**¡Recuerda usar siempre `npm run commit` para mantener consistencia en el proyecto!**
