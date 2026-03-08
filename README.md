# Entrenador de Baloncesto 🏀

Entrenador de Baloncesto es una aplicación móvil desarrollada con **React Native** y **Expo** diseñada para ayudar a los jugadores a mejorar su técnica, mantenerse motivados y cuidar su salud física. 

La aplicación permite a los jugadores acceder a una rutina rápida generada aleatoriamente desde una base de datos propia, que empareja prevención de lesiones, trabajo en pista y preparación mental.

## 🌟 Características Principales

- **Perfil de Jugador Personalizado**: Ingreso de datos (sexo y edad) guardados en el dispositivo para brindar una experiencia de usuario sin fricciones.
- **Generador de Rutinas Dinámicas**:
  - 🧘 **Prevención y Salud**: Ejercicios de movilidad y estiramientos fundamentales (isquiotibiales, gemelos, psoas, etc.) para evitar lesiones.
  - 💪 **Ejercicio de Pista (Drills)**: Entrenamientos técnicos que cubren manejo de balón, tiro, pase y trabajo defensivo.
- **Motivación Diaria**: Citas inspiradoras de grandes leyendas del baloncesto y del deporte (Michael Jordan, Kobe Bryant, John Wooden, etc.).
- **Diseño Moderno ("Glassmorphism")**: Interfaz de usuario muy atractiva construida con fondos de gradiente y componentes tipo cristal translúcido.
- **Persistencia de Sesión**: Integración con `AsyncStorage` para recordar automáticamente el login del usuario.

## 🛠️ Tecnologías y Librerías

- **Framework**: [React Native](https://reactnative.dev/) montado sobre [Expo](https://expo.dev/)
- **Lenguaje**: TypeScript (`.tsx` / `.ts`) para un código escalable y sin errores de tipado.
- **Dependencias Destacadas**:
  - `expo-linear-gradient`: Para los fondos dinámicos y estilizados.
  - `@expo/vector-icons`: Iconografía integrada (`Feather`, `FontAwesome5`).
  - `@react-native-async-storage/async-storage`: Para la base de datos de clave-valor asíncrona no cifrada.

## 📂 Estructura del Proyecto

El grueso del desarrollo móvil se encuentra dentro del directorio `BasketballApp/`:

- `App.tsx`: Contiene todo el enrutamiento de vistas (Login y Dashboard principal), gestión de estado (React Hooks) y el diseño (StyleSheet) general de la aplicación.
- `data/basketballTips.ts`: Actúa como la fuente de verdad (base de datos local), exportando los arreglos de datos para estiramientos, ejercicios en cancha y citas motivacionales con tipado genérico estricto para TS.

## 🚀 Instalación y Ejecución Local

Para probar el proyecto en tu entorno local:

1. **Clonar este repositorio**:
   ```bash
   git clone https://github.com/jropero/basketball-app.git
   ```

2. **Ingresar al directorio de la aplicación Expo**:
   ```bash
   cd basketball-app/BasketballApp
   ```

3. **Instalar las dependencias de NPM**:
   ```bash
   npm install
   ```

4. **Levantar el servidor de desarrollo de Expo**:
   ```bash
   npm run start
   # o alternativamente: npx expo start
   ```

5. **Visualización**:
   Abre la aplicación [Expo Go](https://expo.dev/client) en tu dispositivo iOS o Android y escanea el código QR que se muestre en tu terminal, o presiona `a` para abrirlo en el Emulador de Android o `i` para el Simulador de iOS.

---
*Proyecto creado para acercar a cualquier amante del deporte a una mejora física y técnica continuada.*
