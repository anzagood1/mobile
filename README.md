# 📱 Aplicación Móvil de Repaso Académico

## 📖 Descripción

Esta es una aplicación móvil diseñada para **repasar y reforzar conocimientos** sobre temas vistos en clase. Permite a los estudiantes revisar conceptos, practicar ejercicios y consolidar su aprendizaje de manera interactiva y accesible desde cualquier dispositivo móvil.

## 🎯 Objetivo

Facilitar el aprendizaje continuo proporcionando una herramienta práctica para:
- ✅ Repasar contenidos académicos de forma organizada
- ✅ Reforzar conceptos clave vistos en clase
- ✅ Practicar de manera autónoma y a tu propio ritmo
- ✅ Mejorar la retención de conocimientos mediante la repetición espaciada

## 🛠️ Tecnologías Utilizadas

- **[Ionic Framework](https://ionicframework.com/)** - Framework para desarrollo de aplicaciones móviles híbridas
- **[React](https://react.dev/)** - Biblioteca de JavaScript para construir interfaces de usuario
- **[Capacitor](https://capacitorjs.com/)** - Runtime nativo para aplicaciones web en iOS y Android
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Vite](https://vitejs.dev/)** - Herramienta de compilación rápida

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Android Studio (para desarrollo Android)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/anzagood1/mobile.git
   cd mobile
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Compilar para producción**
   ```bash
   npm run build
   ```

## 📱 Compilación para Dispositivos Móviles

### Android

```bash
npm run build
npx cap sync android
npx cap open android
```

Luego compila y ejecuta desde Android Studio.
