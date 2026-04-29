# Proyecto: Inyecciones SQL
## IS093A — Desarrollo de Aplicaciones Web
### Universidad Nacional del Centro del Perú — Facultad de Ingeniería de Sistemas

---

## Estructura del Proyecto

```
proyecto-sql/
├── index.html          ← Archivo principal
├── styles.css          ← Estilos personalizados
├── main.js             ← Lógica de validación e interactividad
└── assets/             ← (Para imágenes/recursos futuros)
```

---

## Pasos Implementados (según Guía Práctica)

### Paso 1 — Setup de Frameworks (10 min)
- `index.html` con `lang="es"`, `viewport`, meta SEO
- CDN Bootstrap 5.3.3
- CDN Tailwind CSS (Play CDN)
- **Nota técnica:** No se usa `@import` en CSS local. CDN priorizado para agilidad en laboratorio.

### Paso 2 — Navbar Responsive (20 min)
- `navbar-expand-lg`, `collapse`, `toggler` de Bootstrap
- Utilidades Tailwind: `tw-shadow-2xl`, `tw-sticky`, `tw-gap-*`
- Dropdown con Bootstrap JS (sin JS adicional)
- **Validado:** botón toggle funciona solo con Bootstrap JS incluido

### Paso 3 — Hero Section (20 min)
- Tipografía Bootstrap: `display-2`, `lead`, `gap`, `d-flex`
- Tipografía Tailwind: `tw-text-balance`, `tw-max-w-xl`, `tw-bg-gradient-to-r`
- **Conflictos de especificidad documentados en `main.js` (console.group)**
- Solución: prefijo `tw-` + scope manual en `styles.css`

### Paso 4 — Grid de Tarjetas (20 min)
- Bootstrap: `row`, `col-md-4`, `g-4`
- Tailwind: `tw-rounded-xl`, `tw-shadow-lg`, `hover:tw-scale-105`
- 6 tarjetas: In-Band, Blind, Out-of-Band, Stored, Second-Order, NoSQL
- **Sin `@media` manuales** — breakpoints nativos de ambos frameworks

### Paso 5 — Formulario con Validación UI (20 min)
- Bootstrap: `form-control`, `is-invalid`, `is-valid`, `was-validated`
- Tailwind: estado `peer` pattern (validación tiempo real en blur)
- Accesibilidad:
  - `aria-describedby` en todos los campos
  - `label` vinculado con `for`/`id`
  - `role="radiogroup"` en grupo de radios
  - `aria-live="polite"` en mensaje de éxito
  - Contraste ≥ 4.5:1 verificado (rojo `#f87171` y verde `#4ade80` sobre `#1e293b`)

---

## Recursos Utilizados
- Bootstrap 5.3.3 (CDN)
- Tailwind CSS Play CDN
- Bootstrap Icons 1.11.3
- Google Fonts: Share Tech Mono, Exo 2, Rajdhani

## Herramientas de Auditoría
- **Lighthouse:** Performance, Accessibility, Best Practices, SEO
- **WAVE:** Contraste, estructura semántica, aria labels
- **Can I Use:** Compatibilidad de features CSS

---

*Guía Práctica — Semana 3 | Tema: Inyecciones SQL*
