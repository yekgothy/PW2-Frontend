# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Página de Perfil (User Profile)

Se implementó una página de perfil enriquecida (`src/pages/userProfile.tsx`) con las siguientes características:

- Resumen del usuario: nombre, correo, teléfono, edad, dirección y estado de newsletter.
- Indicadores rápidos: número de órdenes, tamaño de wishlist y estado de newsletter.
- Pestañas dinámicas: Órdenes recientes, Wishlist y sección de Información.
- Wishlist gestionada localmente con opción de agregar/eliminar productos usando datos de `data.ts`.
- Generación de órdenes demo para mostrar estructura (simulación de backend futura).
- Formulario de edición del perfil en componente modular reutilizable (`ProfileEditForm`).
- Contexto global de usuario (`UserContext`) con persistencia en `localStorage`.

### Archivos Clave
- `src/context/UserContext.tsx`: Manejo de estado del usuario (perfil, wishlist, órdenes) y persistencia.
- `src/components/profile/*`: Componentes modulares (info, edición, órdenes, wishlist).
- `src/pages/userProfile.tsx`: Orquestación y layout con diseño consistente al resto de la app.

### Próximas Mejoras Sugeridas
- Conexión real a backend (fetch de órdenes, wishlist persistente por usuario auth).
- Autenticación y protección de ruta de perfil.
- Soporte para dirección múltiple y facturación.
- Descarga de facturas / historial completo.
- Seguridad: 2FA, recuperación de cuenta.

## Flujo de Checkout y Pedidos

Se añadió un flujo completo de compra desde el carrito hasta la confirmación del pedido:

- Ruta nueva: `/checkout` controlada por `CheckoutPage`.
- Pasos: Envío → Pago → Revisión → Confirmación.
- Generación de pedido real usando `createOrderFromCart` en `UserContext` (persistencia en `localStorage`).
- Limpieza automática del carrito tras confirmar.
- Redirección a `/cart` si se intenta acceder con carrito vacío.
- Botón para ver órdenes en el perfil y seguir comprando tras confirmar.

### Archivos Clave Checkout
- `src/pages/CheckoutPage.tsx`: Página orquestadora de pasos y confirmación.
- `src/context/UserContext.tsx`: Agregado método `createOrderFromCart`.
- `src/components/ShoppingCart.tsx`: Botón actualizado para navegar a checkout.
- `src/App.tsx`: Envuelve la app con `UserProvider` y agrega ruta `/checkout`.

### Validaciones y Lógica
- Envío: requiere nombre completo, dirección, ciudad y código postal para avanzar.
- Pago: si se elige tarjeta, requiere titular, número, expiración y CVV (solo validación de presencia).
- Revisión: muestra resumen consolidado y permite confirmar (simulación de procesamiento con timeout).

### Mejoras Futuras Sugeridas (Checkout)
- Integrar pasarela de pago real (Stripe, MercadoPago, etc.).
- Validación avanzada de tarjeta y formatos (Luhn, fecha válida).
- Selección de métodos de envío con costos dinámicos y tiempo estimado.
- Cupones / códigos promocionales.
- Estado de pedido: procesando, enviado, entregado, cancelado.
- Tracking de envío y notificaciones push/email.
- Soporte multi-dirección y facturación fiscal.
