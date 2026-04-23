# ⚜️ CALCULADORA SLPRO V2 — Cockpit de Cotización 33X

> **Motor Táctico de Rentabilidad B2B** — Cotizador Profesional Blindado  
> San Luis PRO · Ponciano Arriaga / Ébano, SLP · Huasteca Potosina  
> Última actualización: **17 Abril 2026** · Motor IA: GLM-5.1 vía NVIDIA NIM

---

## 🏗️ STACK TECNOLÓGICO

| Capa | Tecnología | Razón |
|:-----|:-----------|:------|
| Estructura | HTML5 semántico | Cero dependencias, cero build |
| Estilos | CSS3 nativo (Variables + Grid + Flex) | Responsive, Dark/Light mode (Tactical Red) |
| Lógica | JavaScript vanilla ES6+ | ~1,618 líneas, cero frameworks |
| PDF | html2pdf.js (CDN) | Exportación Noir & Red |
| Gráficas | ApexCharts (CDN) | Visualización AI con gradientes |
| IA | NVIDIA NIM API (GLM-5.1) | Optimización de márgenes en tiempo real |
| Persistencia | localStorage | Soberanía total, cero servidores |

**Filosofía: LOCAL-FIRST.** Funciona sin internet, sin servidores, sin suscripciones. Un archivo HTML que abre en cualquier navegador y cotiza al instante.

---

## 📂 ESTRUCTURA DE ARCHIVOS

```text
CALCULADORA_V2/
├── index.html          ← UI completa: sidebar config + calculadora + resumen (681 líneas)
├── styles.css          ← Tema Noir & Tactical Red + Dark/Light mode (17KB)
├── app.js              ← Motor central: state, costos, calculate(), AI engine (1,618 líneas)
├── README.md           ← ESTE ARCHIVO — mapa completo del proyecto
├── secrets.txt         ← Notas de estrategia de negocio (NO exponer)
├── config/             ← Reservado para futuras inyecciones
├── output/             ← Caché y dump files de exportación
├── Catálogo de Costos...  ← Referencia de precios netos PhotoPro Victoria
├── 01-08_PECADOS.md    ← Documentación estratégica de negocio
└── 📝 Checklist...     ← Guía de armado de paquetes rentables
```

---

## 🧠 ARQUITECTURA DEL MOTOR (app.js)

### Objeto `state` (línea 7)
Estado global mutable que contiene TODA la configuración del evento actual.

```javascript
state = {
    evento: 'bodas',           // Tipo de evento (9 opciones)
    horas: 4,                  // Horas de cobertura fotográfica
    cams: 1,                   // Número de cámaras foto
    video: 0,                  // 0=sin, 1=highlight, 2=1cam, 3=2cam, 4=3cam
    videoHoras: 4,             // Horas de video (independiente de foto)
    addonDrone: false,         // Add-on: Drone
    addonStreamingIphone: false,  // Add-on: Streaming iPhone ($800)
    addonStreamingAtem: false,    // Add-on: Streaming ATEM ($2,500)
    addonMaquillaje: false,       // Add-on: Maquillaje ($500)
    addon2cam: false,          // Add-on: 2ª cámara
    addonUsb: true,            // Add-on: USB (default ON)
    addonFlyers: false,        // Add-on: Flyers
    addonViaticos: false,      // Add-on: Viáticos (km + casetas)
    sesionItems: [],           // Elementos dinámicos de sesión previa
    customAddons: [],          // Add-ons personalizados (nombre + precio)
    frames: [],                // Marcos seleccionados [{id, value, qty}]
    canvases: [],              // Canvas seleccionados
    portarretratos: [],        // Portarretratos [{id, name, price, qty}]
    fotos: [],                 // Fotos impresas
    bulk: [],                  // Mayoreo / Solo impresión
    custom: [],                // Líneas custom genéricas
    margen: 3,                 // Multiplicador de margen (1x-10x)
    tax: 0,                    // IVA % (0-30)
    discount: 0,               // Descuento % (0-100)
    viaticos: { km: 50, casetas: 200 },
    cliente: { nombre, evento, fecha, email }
}
```

### Objeto `costos` (línea 41)
Diccionario de precios base (lo que a TI te cuesta). Se editan desde la sidebar ⚙️.

```javascript
costos = {
    crewBase: 800,             // Fotógrafo base
    crewHora: 50,              // Por hora adicional
    asistente: 800,            // Se activa con 2+ cámaras
    camarografo: 800,          // Se activa con 3+ cámaras
    drone: 800,                // Costo del drone
    streamingIphone: 800,      // Streaming básico
    streamingAtem: 2500,       // Streaming profesional
    maquillaje: 500,           // Servicio de maquillaje
    videoCam1Hora: 100,        // Video 1 cámara por hora
    videoCam2Hora: 180,        // Video 2 cámaras por hora
    videoCam3Hora: 250,        // Video 3 cámaras por hora
    videoHighlight: 500,       // Highlight reel (precio fijo)
    frames: { ... },           // 24 tamaños en 3 categorías (A1, B2, C1)
    canvases: { ... },         // 4 tamaños
    fotos: { '8x10': 103 },   // Retratos con acabado
    bulk: { ... },             // 6 tamaños mayoreo
    extras: { ... },           // Bases y escaneos
    flyers: { ... },           // 4 tipos de flyer
    viaticosGas: 5             // Costo por km
}
```

### FÓRMULA DE CÁLCULO (función `calculate()`, ~línea 781)

```
subtotalServicios = foto + video + drone + streaming + sesión + 
                    marcos + canvas + fotos + bulk + flyers + 
                    custom + usb + extras + maquillaje + 
                    customAddons + portarretratos

conMargen = subtotalServicios × state.margen     ← AQUÍ ESTÁ LA LANA
subtotalFinal = conMargen + viáticos             ← Viáticos SIN margen
impuestos = subtotalFinal × (tax / 100)
descuento = (subtotalFinal + impuestos) × (discount / 100)
TOTAL = subtotalFinal + impuestos - descuento
```

> ⚠️ **SECRETO CLAVE**: Los viáticos se suman DESPUÉS del margen. No se les aplica multiplicador porque el cliente sabe cuánto cuesta la gasolina. Todo lo demás sí lleva margen.

---

## 🎯 MÓDULOS DE LA INTERFAZ (index.html)

### 1. SIDEBAR CONFIG (⚙️)
Panel deslizable derecho con TODOS los precios base editables.

| Sección | IDs de los inputs | Qué controla |
|:--------|:------------------|:-------------|
| 👤 CREW | `cfg_crew_base`, `cfg_crew_hora`, `cfg_crew_asistente`, `cfg_crew_camarografo`, `cfg_crew_drone`, `cfg_crew_streaming` | Nómina del equipo |
| ⚡ ADD-ONS | `cfg_addon_drone`, `cfg_addon_streaming_iphone`, `cfg_addon_streaming_atem`, `cfg_addon_2cam`, `cfg_addon_usb`, `cfg_addon_maquillaje` | Precios de complementos |
| 📸 SESIÓN | `cfg_sesion_1`, `cfg_sesion_2`, `cfg_sesion_3` | Precios 1/2/3 fondos |
| 🎬 VIDEO | `cfg_video_highlight`, `cfg_video_cam1_hora`, `cfg_video_cam2_hora`, `cfg_video_cam3_hora` | Precios video por cámara/hora |
| 🖼️ MARCOS | `cfg_a1_*`, `cfg_b2_*`, `cfg_c1_*` | 24 precios de marcos |
| 🎨 CANVAS | `cfg_canvas_*` | 4 tamaños canvas |
| 📦 MAYOREO | `cfg_bulk_*` | 6 tamaños impresión masiva |
| 🛠️ EXTRAS | `cfg_extra_*` | Bases y escaneos |
| 🧠 AI CONFIG | `cfg_ai_key`, `cfg_ai_prompt` | API Key NVIDIA + Prompt maestro |
| 📈 MÁRGENES | `cfg_margen_default`, `cfg_tax`, `cfg_discount` | Multiplicador + IVA + Descuento |

> Cada input tiene `onchange="updateBaseCosts()"` que actualiza `costos` en tiempo real.

### 2. TIPOS DE EVENTO (9 opciones)
```
bodas | xv | 50+ | bautizo | jaripeo | sesion | video_musical | evento_privado | otro
```
Selector de radio buttons. El "Otro" activa un prompt de texto libre.

### 3. COBERTURA FOTOGRÁFICA
- **Horas**: Botones 1-10 horas (`setHours()`)
- **Cámaras**: Botones 1-4 cámaras (`setCams()`)

### 4. VIDEO (5 opciones)
```
value=0: Sin Video
value=1: Highlight Reel (precio fijo)
value=2: 1 Cámara × horas de video
value=3: 2 Cámaras × horas de video
value=4: 3 Cámaras × horas de video
```
Las opciones 2-4 muestran un panel `#videoConfigPanel` con selector de horas de video (1-10).

### 5. ADD-ONS
Checkboxes individuales + sección dinámica:
- 🚁 Drone (`addon_drone`)
- 📱 Streaming iPhone (`addon_streaming_iphone`)
- 📺 Streaming ATEM (`addon_streaming_atem`)
- 📷 2ª Cámara (`addon_2cam`)
- 💾 USB (`addon_usb`)
- 💄 Maquillaje (`addon_maquillaje`)
- 📋 Flyers (`addon_flyers`)
- 🚗 Viáticos (`addon_viaticos`) — revela inputs de km + casetas
- ➕ **AGREGAR ADD-ON**: Botón que crea fila dinámica con nombre + precio custom

### 6. SESIÓN PREVIA (Dinámico)
Dropdown + precio editable por cada elemento:
```
Opciones: Fondos | Estudio | Exterior | Drone | Maquillaje | Custom
```
Botón ➕ agrega filas. Cada fila tiene: selector + precio inline + botón ✕.
Los items viven en `state.sesionItems[]`.

### 7. CUADROS / MARCOS
Filas dinámicas con dropdown (24 opciones de 3 categorías A1/B2/C1) + cantidad.

### 8. CANVAS
Filas dinámicas con 4 tamaños + cantidad.

### 9. PORTARRETRATOS 🪞
Filas dinámicas con: **nombre editable** + **precio editable** + cantidad.
Default: "Portarretrato" a $150. Ideal para variantes: madera, acrílico, metal.
Los items viven en `state.portarretratos[]`.

### 10. RETRATOS / FINISHED
Fotos impresas con base y textura. Formato 8x10 actualmente.

### 11. MAYOREO / SOLO IMPRESIÓN
6 tamaños (4x6 a 11x14) con precios de laboratorio.

### 12. EXTRAS LAB
Checkboxes: Base Chica, Base Grande, Escaneo Normal, Escaneo Negativo.

### 13. CUSTOM / CONCEPTO LIBRE
Filas genéricas con: nombre + precio + cantidad. Para cobrar lo que se te ocurra.

---

## 🧠 MOTOR DE IA (NVIDIA NIM / GLM-5.1)

### Flujo de Optimización
```
1. Usuario clica 💎 "OPTIMIZAR CON IA"
2. Se construye JSON con la cotización actual
3. Se envía a NVIDIA NIM (GLM-5.1) con el Master Prompt
4. La IA analiza y responde con:
   - strategy: texto de la estrategia sugerida
   - suggestedMargin: nuevo multiplicador
   - changes: lista de cambios recomendados
   - potentialIncrease: factor de incremento
5. Se renderiza en modal con ApexChart (barras rojas tácticas)
6. Botón ✅ APLICAR actualiza el margen real
```

### Fallback Local
Si la API Key no está o falla la red, el sistema usa `simulateAI()`:
- Genera estrategia basada en reglas locales
- Sugiere +10-25% según el tipo de evento
- Funciona 100% offline

### Configuración
- **API Key**: Se guarda en `localStorage` con key `slpro_nvidia_key`
- **Prompt**: Se guarda en `localStorage` con key `slpro_ai_prompt`
- **Endpoint**: `https://integrate.api.nvidia.com/v1/chat/completions`
- **Modelo**: `nvidia/llama-3.3-nemotron-super-49b-v1` (o el que se configure)

---

## 🎨 SISTEMA DE TEMAS (styles.css)

### Dark Mode / Light Mode
- Toggle en header (☀️/🌙)
- Persistencia via `localStorage` key `slpro_theme`
- Detecta `prefers-color-scheme` del sistema
- Se implementa con `[data-theme="light"]` en CSS Variables
- **NO AFECTA** cálculos, precios ni lógica

### Paleta Noir & Tactical Red
```css
--gold: #D32F2F          /* Rojo Táctico (antes oro) */
--gold-soft: #FF5252     /* Rojo brillante (hovers) */
--bg: #0D0D0D            /* Fondo oscuro */
--bg-card: #1A1A1A       /* Tarjetas */
--text: #E8E8E8          /* Texto principal */
--green: #4CAF50         /* Positivos */
--red: #8B0000           /* Alertas/Remover */
```

---

## 🔐 SECRETOS Y BLINDAJE

### Blindaje Anti-Regateo (PDF)
La exportación PDF **NO expone**:
- El multiplicador de margen
- Los costos base/netos
- La estructura de cálculo interna

El PDF muestra precios ya multiplicados como "precio unitario". El cliente ve el número final, no la fórmula.

### localStorage Keys
| Key | Contenido | Sensible |
|:----|:----------|:---------|
| `slpro_state` | Estado completo de la calculadora | No |
| `slpro_theme` | `'dark'` o `'light'` | No |
| `slpro_nvidia_key` | API Key de NVIDIA NIM | ⚠️ SÍ |
| `slpro_ai_prompt` | Prompt maestro para la IA | No |

---

## 🗺️ MAPA DE FUNCIONES PRINCIPALES (app.js)

### Inicialización
| Función | Línea ~aprox | Qué hace |
|:--------|:-------------|:---------|
| `loadFromStorage()` | ~130 | Carga estado guardado |
| `initApp()` | ~150 | Renderiza filas iniciales |

### UI Dinámica
| Función | Qué hace |
|:--------|:---------|
| `setHours(n)` | Establece horas de foto |
| `setCams(n)` | Establece cámaras de foto |
| `setVideoHours(n)` | Establece horas de video |
| `toggleVideoConfig()` | Muestra/oculta panel de horas video |
| `addFrameRow()` | Agrega fila de marco |
| `addCanvasRow()` | Agrega fila de canvas |
| `addPortarretratoRow()` | Agrega fila de portarretrato |
| `addFotoRow()` | Agrega fila de foto impresa |
| `addBulkRow()` | Agrega fila de mayoreo |
| `addCustomRow()` | Agrega fila custom libre |
| `addSesionItem()` | Agrega elemento de sesión previa |
| `addCustomAddon()` | Agrega add-on personalizado |

### Cálculo y Config
| Función | Qué hace |
|:--------|:---------|
| `calculate()` | 🔴 **FUNCIÓN CENTRAL** — Lee TODO, suma TODO, actualiza UI |
| `updateBaseCosts()` | Sincroniza sidebar → `costos` |
| `updateMargin()` | Actualiza margen/tax/discount |
| `toggleSidebar()` | Abre/cierra sidebar config |
| `saveToStorage()` | Persiste estado en localStorage |
| `resetAll()` | Limpia todo, regresa a defaults |

### IA y Exportación
| Función | Qué hace |
|:--------|:---------|
| `triggerAI()` | Dispara optimización IA |
| `simulateAI()` | Fallback local sin API |
| `renderAIChart()` | Gráfica ApexCharts red |
| `applyAISuggestion()` | Aplica recomendación al state |
| `closeAI()` | Cierra modal IA |
| `generarCotizacion()` | Exporta PDF |

---

## ⚠️ GOTCHAS PARA MODELOS CHICOS

> **Lee esto si eres un modelo IA trabajando en este proyecto.**

### 1. Los IDs de checkbox CAMBIARON
```
VIEJO: addon_streaming    → YA NO EXISTE
NUEVO: addon_streaming_iphone + addon_streaming_atem
```
Si agregas algo al cálculo, recuerda que streaming son DOS checkboxes ahora.

### 2. La sesión previa ya NO es radio buttons
Era `input[name="sesion"]` con values 0/1/2/3. Ahora es `state.sesionItems[]` array dinámico. NO busques radios de sesión.

### 3. Video tiene 5 opciones, no 3
```
0 = Sin Video
1 = Highlight (precio fijo, sin horas)
2 = 1 Cámara × videoHoras
3 = 2 Cámaras × videoHoras
4 = 3 Cámaras × videoHoras
```
Las horas de video (`state.videoHoras`) son INDEPENDIENTES de las horas de foto (`state.horas`).

### 4. Portarretratos NO tienen dropdown de tamaños
A diferencia de marcos/canvas, los portarretratos usan **nombre libre + precio libre**. No hay `costos.portarretratos`. El precio vive directo en el item: `{ name, price, qty }`.

### 5. Los viáticos no llevan margen
El subtotal se calcula → se multiplica por margen → LUEGO se suman viáticos. Los viáticos son transparentes porque el cliente sabe cuánto cuesta la gasolina.

### 6. `calculate()` es la función más importante
TODA edición de precio, TODA adición de fila, TODO cambio de checkbox termina llamando `calculate()`. Si algo no se suma, revisa que `calculate()` lo incluya en `subtotalServicios`.

### 7. La sidebar usa IDs con prefijo `cfg_`
Los inputs de configuración usan `cfg_addon_*`, `cfg_video_*`, etc. Los checkboxes de la calculadora principal usan `addon_*` sin prefijo `cfg_`. NO confundir.

### 8. El cfg_ai_prompt listener está en DOMContentLoaded
Se movió dentro de `window.addEventListener('DOMContentLoaded', ...)` porque ejecutarlo al cargar el script mataba todo el JS si el DOM no estaba listo.

### 9. Balance de `<div>` tags
El HTML tiene **146 `<div>` abiertos y 146 cerrados**. Si editas la sidebar o el body, cuenta tus divs. Un `</div>` extra destruye todo el layout.

---

## 📝 CHANGELOG COMPLETO

### v2.5 — 17 Abril 2026 (Rediseño Noir & Tactical Red)
- **[UI/UX]** Refactorización completa de la paleta de colores. Se eliminó la dependencia visual del color oro/amarillo (`#D4AF37`) en favor de una paleta "Tactical Red" (`#D32F2F` en dark mode, `#B71C1C` en light mode) alineada a la doctrina 33X.
- **[UI/UX]** Actualizado el subtítulo del encabezado para reflejar la naturaleza de la herramienta como backoffice: *"Motor Táctico de Rentabilidad B2B"*.
- **[JS]** Actualizada la paleta de colores de las gráficas 3D de la IA para usar gradientes carmesí.

### v2.4 — 17 Abril 2026 (Sincronización Total Catálogo B2B)
- **[CONFIG]** Se inyectaron 13 campos faltantes en la barra lateral de configuración (Sidebar) para los marcos fotográficos.
  - **Línea A1:** 16x24, 20x24, 24x30.
  - **Línea B2:** 11x16, 16x24, 20x24, 24x30.
  - **Línea C1:** 8x12, 11x16, 12x16, 12x18, 16x24, 20x24.
- **[DOCS]** La calculadora ahora está mapeada al 100% con el archivo maestro de precios: `Catálogo de Costos Netos de Producción - Abril 2026 PHOTOPRO VICTORIA.md`. Cero precios "duros" ocultos en el código; todo es editable desde la UI.

### v2.3 — 17 Abril 2026 (Sesión Opus 4.5 — Estabilidad Suprema y UX)
- **[STABLE]** Purga anti-corrupción (Ghost Purge V33X_FINAL_3) resuelve permanentemente la propagación de valores `NaN`.
- **[STABLE]** Carga de datos con *deep merge* estructural (previene pérdida de keys nuevas en configuraciones viejas de localStorage).
- **[UI]** Override Manual en precios de fotografía — El usuario puede ahora forzar una métrica ignorando por completo el cálculo automático sin que el motor colapse con "NaN".
- **[UI]** Inyectados botones de "0" en paneles de horas y cámaras (Foto y Video) permitiendo **quitar** selecciones activas fluidamente.
- **[FIX]** Add-ons personalizados (customAddons) ahora multiplican correctamente el `qty × price` en vez de ignorar la cantidad.
- **[FIX]** Independencia de Horas: `setHours()` ya no limpia accidentalmente la selección de horas de video y se activó `setVideoHours()` nativamente en el motor JS.
- **[AI]** Motor de optimización NVIDIA NIM (GLM-5.1) con ApexCharts
- **[AI]** Fallback local `simulateAI()` cuando no hay API / red
- **[AI]** Configuración de API Key + Master Prompt en sidebar (persistencia localStorage)
- **[UI]** +3 tipos de evento: Sesión, Video Musical, Evento Privado
- **[UI]** Video refactorizado: 5 opciones (Sin/Highlight/1Cam/2Cam/3Cam) + horas independientes
- **[UI]** Streaming dividido: iPhone ($800) + ATEM ($2,500) en vez de uno genérico
- **[UI]** Sesión Previa: sistema dinámico con dropdown de elementos + precio editable
- **[UI]** Add-ons: botón ➕ para crear add-ons personalizados
- **[UI]** Maquillaje como add-on independiente
- **[UI]** Portarretratos: nueva sección con nombre + precio + cantidad custom
- **[CONFIG]** Sidebar actualizada con: streaming split, maquillaje, video 3 cáms/hora
- **[FIX]** Balance de divs: 146/146 verificado
- **[FIX]** cfg_ai_prompt movido a DOMContentLoaded (evita crash al cargar)
- **[FIX]** Eliminación de IDs huérfanos (cfg_addon_streaming, cfg_video_hora)
- **[FIX]** Sanitización estricta mediante isNaN() en todos los text inputs.

### v2.2 — 15 Abril 2026 (Sincronización Catálogo)
- Actualización de precios marcos A1, B2, C1 al Catálogo Abril 2026
- Módulo Mayoreo / Solo Impresión con 6 tamaños
- Sección Extras LAB (bases + escaneos)
- Slider de margen extendido a 10x con step 0.1

### v2.1 — Abril 2026 (Dark Mode + UX)
- Dark/Light mode toggle con persistencia
- Detección automática de preferencia del sistema
- Purga de inputs duplicados
- Botón "Otro" para eventos custom

### v2.0 — Marzo 2026 (Fundación)
- Arquitectura Vanilla Stack (HTML + CSS + JS)
- Sistema de cotización con margen dinámico
- Exportación PDF con blindaje anti-regateo
- Auto-save en localStorage

---

## 🧠 DECISIONES DE ARQUITECTURA (ADR)

### ADR 001: Soberanía Tecnológica (Vanilla Stack)
Despreciamos React/Node/AWS. El cotizador necesitaba latencia cero y despliegue instantáneo offline. Ganamos inmunidad a WiFi, servidores, npm y pagos recurrentes.

### ADR 002: Desacoplamiento DOM ↔ Pricing Data
Variables de costos extraídas de JS a campos editables en sidebar. El operador cambia precios en la UI sin tocar código.

### ADR 003: Blindaje Anti-Regateo en PDF
El PDF multiplica `unitario × margen` y muestra el resultado fusionado. Nunca expone el multiplicador ni los costos base.

### ADR 004: Dark Mode = Solo CSS
El toggle modifica `data-theme` en `<html>`. No toca state, costos ni localStorage de datos. Separación total de capas visuales y funcionales.

### ADR 005: IA Híbrida (Real + Simulación)
Si hay API Key y red → dispara NVIDIA NIM real. Si no → simulación local con reglas heurísticas. El usuario siempre tiene una respuesta, nunca un error.

### ADR 006: Arrays Dinámicos > Radio Buttons
Sesión previa y add-ons migraron de opciones fijas (radio) a arrays dinámicos (`sesionItems[]`, `customAddons[]`). Escalabilidad infinita sin modificar código.

---

## 🚀 DEPLOYMENT (GitHub Pages)

### Datos del Repositorio

| Campo | Valor |
|:------|:------|
| **GitHub Username** | `sanluispropublicidad-ai` |
| **Repo** | `calculadora-slpro` |
| **URL del repo** | https://github.com/sanluispropublicidad-ai/calculadora-slpro |
| **URL pública (live)** | https://sanluispropublicidad-ai.github.io/calculadora-slpro/ |
| **Branch** | `main` |
| **GitHub Pages** | ✅ Activo (deploy from branch, root /) |
| **Hosting** | GitHub Pages (gratis, HTTPS automático) |
| **Primer deploy** | 16 Abril 2026 |

### Archivos que se suben al repo

| Archivo | Se sube | Razón |
|:--------|:--------|:------|
| `index.html` | ✅ | UI principal |
| `styles.css` | ✅ | Estilos |
| `app.js` | ✅ | Motor de cálculo |
| `README.md` | ✅ | Documentación |
| `.gitignore` | ✅ | Protección |
| `secrets.txt` | ❌ **NUNCA** | Estrategia de negocio privada |
| `config/` | ❌ | Carpeta reservada local |
| `output/` | ❌ | Caché local |
| `*.md` (pecados, catálogo, checklist) | ❌ | Docs internos de negocio |

### Cómo hacer push de cambios

**Desde terminal (PowerShell):**
```powershell
# 1. Navegar al proyecto
Set-Location "c:\Users\SAN LUIS PRO\SANLUISPROOAZ\2026-2027\CALCULADORA_V2"

# 2. Ver qué cambió
git status

# 3. Agregar archivos modificados
git add index.html styles.css app.js README.md

# 4. Commit con mensaje descriptivo
git commit -m "descripcion del cambio"

# 5. Push a GitHub (se actualiza el sitio en 1-2 min)
git push origin main
```

**Desde Antigravity IDE (con MCP GitHub):**
```
"sube los cambios de la calculadora a GitHub"
→ El agente ejecuta git add + commit + push automáticamente
```

### Cómo verificar que el sitio está vivo
1. Abrir: https://sanluispropublicidad-ai.github.io/calculadora-slpro/
2. Tras cada push, GitHub Pages tarda **1-3 minutos** en actualizar
3. Si dice "Site not found" → esperar y reload

### Git Config del proyecto
```
user.name = San Luis PRO
user.email = sanluispro@slpro.com
remote.origin = https://github.com/sanluispropublicidad-ai/calculadora-slpro.git
```

---

*README forjado por Claude Opus 4.5 bajo doctrina 33X. Cualquier modelo que toque este código: lee los gotchas primero.*
- **[STABLE]** Purga anti-corrupción (Ghost Purge V33X_FINAL_3) resuelve permanentemente la propagación de valores `NaN`.
- **[STABLE]** Carga de datos con *deep merge* estructural (previene pérdida de keys nuevas en configuraciones viejas de localStorage).
- **[UI]** Override Manual en precios de fotografía — El usuario puede ahora forzar una métrica ignorando por completo el cálculo automático sin que el motor colapse con "NaN".
- **[UI]** Inyectados botones de "0" en paneles de horas y cámaras (Foto y Video) permitiendo **quitar** selecciones activas fluidamente.
- **[FIX]** Add-ons personalizados (customAddons) ahora multiplican correctamente el `qty × price` en vez de ignorar la cantidad.
- **[FIX]** Independencia de Horas: `setHours()` ya no limpia accidentalmente la selección de horas de video y se activó `setVideoHours()` nativamente en el motor JS.
- **[AI]** Motor de optimización NVIDIA NIM (GLM-5.1) con ApexCharts
- **[AI]** Fallback local `simulateAI()` cuando no hay API / red
- **[AI]** Configuración de API Key + Master Prompt en sidebar (persistencia localStorage)
- **[UI]** +3 tipos de evento: Sesión, Video Musical, Evento Privado
- **[UI]** Video refactorizado: 5 opciones (Sin/Highlight/1Cam/2Cam/3Cam) + horas independientes
- **[UI]** Streaming dividido: iPhone ($800) + ATEM ($2,500) en vez de uno genérico
- **[UI]** Sesión Previa: sistema dinámico con dropdown de elementos + precio editable
- **[UI]** Add-ons: botón ➕ para crear add-ons personalizados
- **[UI]** Maquillaje como add-on independiente
- **[UI]** Portarretratos: nueva sección con nombre + precio + cantidad custom
- **[CONFIG]** Sidebar actualizada con: streaming split, maquillaje, video 3 cáms/hora
- **[FIX]** Balance de divs: 146/146 verificado
- **[FIX]** cfg_ai_prompt movido a DOMContentLoaded (evita crash al cargar)
- **[FIX]** Eliminación de IDs huérfanos (cfg_addon_streaming, cfg_video_hora)
- **[FIX]** Sanitización estricta mediante isNaN() en todos los text inputs.

### v2.2 — 15 Abril 2026 (Sincronización Catálogo)
- Actualización de precios marcos A1, B2, C1 al Catálogo Abril 2026
- Módulo Mayoreo / Solo Impresión con 6 tamaños
- Sección Extras LAB (bases + escaneos)
- Slider de margen extendido a 10x con step 0.1

### v2.1 — Abril 2026 (Dark Mode + UX)
- Dark/Light mode toggle con persistencia
- Detección automática de preferencia del sistema
- Purga de inputs duplicados
- Botón "Otro" para eventos custom

### v2.0 — Marzo 2026 (Fundación)
- Arquitectura Vanilla Stack (HTML + CSS + JS)
- Sistema de cotización con margen dinámico
- Exportación PDF con blindaje anti-regateo
- Auto-save en localStorage

---

## 🧠 DECISIONES DE ARQUITECTURA (ADR)

### ADR 001: Soberanía Tecnológica (Vanilla Stack)
Despreciamos React/Node/AWS. El cotizador necesitaba latencia cero y despliegue instantáneo offline. Ganamos inmunidad a WiFi, servidores, npm y pagos recurrentes.

### ADR 002: Desacoplamiento DOM ↔ Pricing Data
Variables de costos extraídas de JS a campos editables en sidebar. El operador cambia precios en la UI sin tocar código.

### ADR 003: Blindaje Anti-Regateo en PDF
El PDF multiplica `unitario × margen` y muestra el resultado fusionado. Nunca expone el multiplicador ni los costos base.

### ADR 004: Dark Mode = Solo CSS
El toggle modifica `data-theme` en `<html>`. No toca state, costos ni localStorage de datos. Separación total de capas visuales y funcionales.

### ADR 005: IA Híbrida (Real + Simulación)
Si hay API Key y red → dispara NVIDIA NIM real. Si no → simulación local con reglas heurísticas. El usuario siempre tiene una respuesta, nunca un error.

### ADR 006: Arrays Dinámicos > Radio Buttons
Sesión previa y add-ons migraron de opciones fijas (radio) a arrays dinámicos (`sesionItems[]`, `customAddons[]`). Escalabilidad infinita sin modificar código.

---

## 🚀 DEPLOYMENT (GitHub Pages)

### Datos del Repositorio

| Campo | Valor |
|:------|:------|
| **GitHub Username** | `sanluispropublicidad-ai` |
| **Repo** | `calculadora-slpro` |
| **URL del repo** | https://github.com/sanluispropublicidad-ai/calculadora-slpro |
| **URL pública (live)** | https://sanluispropublicidad-ai.github.io/calculadora-slpro/ |
| **Branch** | `main` |
| **GitHub Pages** | ✅ Activo (deploy from branch, root /) |
| **Hosting** | GitHub Pages (gratis, HTTPS automático) |
| **Primer deploy** | 16 Abril 2026 |

### Archivos que se suben al repo

| Archivo | Se sube | Razón |
|:--------|:--------|:------|
| `index.html` | ✅ | UI principal |
| `styles.css` | ✅ | Estilos |
| `app.js` | ✅ | Motor de cálculo |
| `README.md` | ✅ | Documentación |
| `.gitignore` | ✅ | Protección |
| `secrets.txt` | ❌ **NUNCA** | Estrategia de negocio privada |
| `config/` | ❌ | Carpeta reservada local |
| `output/` | ❌ | Caché local |
| `*.md` (pecados, catálogo, checklist) | ❌ | Docs internos de negocio |

### Cómo hacer push de cambios

**Desde terminal (PowerShell):**
```powershell
# 1. Navegar al proyecto
Set-Location "c:\Users\SAN LUIS PRO\SANLUISPROOAZ\2026-2027\CALCULADORA_V2"

# 2. Ver qué cambió
git status

# 3. Agregar archivos modificados
git add index.html styles.css app.js README.md

# 4. Commit con mensaje descriptivo
git commit -m "descripcion del cambio"

# 5. Push a GitHub (se actualiza el sitio en 1-2 min)
git push origin main
```

**Desde Antigravity IDE (con MCP GitHub):**
```
"sube los cambios de la calculadora a GitHub"
→ El agente ejecuta git add + commit + push automáticamente
```

### Cómo verificar que el sitio está vivo
1. Abrir: https://sanluispropublicidad-ai.github.io/calculadora-slpro/
2. Tras cada push, GitHub Pages tarda **1-3 minutos** en actualizar
3. Si dice "Site not found" → esperar y reload

### Git Config del proyecto
```
user.name = San Luis PRO
user.email = sanluispro@slpro.com
remote.origin = https://github.com/sanluispropublicidad-ai/calculadora-slpro.git
```

---

*README forjado por Claude Opus 4.5 bajo doctrina 33X. Cualquier modelo que toque este código: lee los gotchas primero.*
