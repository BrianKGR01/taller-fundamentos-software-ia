# Taller Fundamentos de Software con IA
## Lo que necesitas saber antes de entrar a Spec-Driven Development

- **Marca / Comunidad:** Google Developer Group (GDG) Santa Cruz
- **Expositor:** Kevin Brayan Gómez Rocha
- **Público objetivo:** Personas sin formación en programación ni ingeniería de software (emprendedores, diseñadores, PMs, profesionales de otras áreas, creadores) que quieren construir software con IA al 100%.
- **Siguiente paso recomendado:** [Taller Spec-Driven Development — El proceso de desarrollo en la era agéntica](https://taller-ttw-ia-empresas.vercel.app/)

---

## 1. Tesis central del taller

> **Si vas a construir software con IA sin escribir código, tu trabajo no es programar: tu trabajo es dirigir.**
> Y nadie puede dirigir lo que no entiende que existe.

Cuando alguien sin base técnica le pide un sistema a la IA, el problema casi nunca es que la IA "no sepa programar". El problema es que el humano **no sabe qué piezas necesita su sistema, qué esperar de cada una, cómo distinguir si quedó bien hecho o frágil, ni qué instrucciones darle**.

**Antes** de entrar a *Spec-Driven Development* (escribir especificaciones rigurosas para que la IA construya), necesitas el **mapa mental del software**: entender qué hay debajo del capó sin tener que ser mecánico.

---

## 2. Hilo conductor transversal (propuesta)

Para que ningún concepto quede en abstracto, todo el taller recorre un mismo ejemplo cotidiano de principio a fin:

> **Ejemplo propuesto:** *Una plataforma simple para un negocio de reservas/pedidos locales (por ejemplo, una cafetería o estudio de clases/citas): catálogo, carrito o reserva, confirmación, pagos, panel del dueño y avisos por WhatsApp/correo.*

*(Nota editable: si prefieres otro rubro cotidiano como clínica, tienda o eventos, lo cambiamos en todo el guion.)*

En cada bloque respondemos siempre las mismas **4 preguntas prácticas**:
1. **¿Qué es en palabras simples?** (analogía de la vida real)
2. **¿Qué pasa si falta o queda mal?** (el riesgo real para tu proyecto)
3. **¿Cómo sabes que está bien hecho?** (criterio de revisión sin leer código)
4. **¿Qué instrucción darle a la IA?** (qué exigir y qué preguntar)

---

## 3. Mapa general de bloques

| # | Bloque | Qué resuelve en la cabeza del asistente |
|---|---|---|
| 0 | **Portada y el problema real** | Por qué "hazme una app" no alcanza y qué necesitas saber antes de SDD. |
| 1 | **El mapa completo del software** | Ver las piezas del sistema como un todo conectado (dejar de verlo como "una caja mágica"). |
| 2 | **UX/UI y Frontend** | Lo que el usuario ve, toca y siente vs. la ingeniería visual detrás. |
| 3 | **Backend y Servidores** | El cerebro oculto, las reglas del negocio y dónde corre todo 24/7. |
| 4 | **Bases de Datos** | La memoria ordenada del sistema: por qué los datos no pueden improvisarse. |
| 5 | **APIs e Integraciones externas** | Cómo hablan las piezas entre sí y con servicios externos (pagos, WhatsApp, mapas, IA). |
| 6 | **Autenticación y Permisos** | Quién eres (identidad) y qué puedes hacer (roles y límites). |
| 7 | **Ciberseguridad desde el inicio** | Cómo evitar fugas de datos, llaves expuestas y errores caros antes de lanzar. |
| 8 | **Git y Control de Versiones** | La máquina del tiempo obligatoria cuando la IA edita o rompe cosas. |
| 9 | **Entornos (Dev, Pruebas, Producción)** | Por qué nunca se prueba en vivo con clientes reales (+ breve nota final de dominio/costos). |
| 10 | **Puente a Spec-Driven Development** | Checklist previo para pasar al siguiente taller y dirigir a la IA con especificaciones claras. |

---

## 4. Desarrollo detallado por bloque

### Bloque 0 · Portada, propósito y la trampa del "todo en un prompt"
- **Quién soy / GDG Santa Cruz:** Presentación breve y propósito de comunidad.
- **El punto de partida:** Hoy cualquiera puede pedirle una app a la IA y ver una pantalla en 2 minutos.
- **El choque con la realidad:** Cuando quieres cobrar, guardar clientes, dar permisos distintos o corregir un error sin dañar lo demás, el proyecto se cae.
- **Dónde encaja este taller:**
  - **Este taller:** *¿Qué piezas existen en un software y qué debo exigirle a la IA?*
  - **Siguiente paso ([taller SDD](https://taller-ttw-ia-empresas.vercel.app/)):** *¿Cómo documento y orquesto esas decisiones para que la IA construya de forma profesional?*

---

### Bloque 1 · ¿Qué es un software por dentro? (Visión general)
- **Analogía del restaurante:**
  - El **salón y el menú** → UX/UI y Frontend.
  - El **mesero** que lleva pedidos y trae respuestas → API.
  - La **cocina** donde se ejecutan las reglas y recetas → Backend y Servidor.
  - La **despensa y libro contable** → Base de Datos.
  - Los **proveedores externos** (delivery, datáfono, mensajería) → Integraciones.
  - El **guardia y las llaves de acceso** → Autenticación, Permisos y Ciberseguridad.
  - Las **cámaras / copias del recetario** → Git y Control de Versiones.
  - La **cocina de pruebas vs. el restaurante abierto al público** → Entornos.
- **Idea clave:** Cuando le pides a la IA "una app", en realidad le estás pidiendo coordinar **todas** estas capas.

---

### Bloque 2 · UX/UI y Frontend (lo que ve y siente el usuario)
- **Conceptos sin jerga:**
  - **UI (Interfaz):** colores, tipografías, botones, espaciados, jerarquía visual.
  - **UX (Experiencia):** qué tan fácil es completar una tarea sin confundirse, qué pasa si el usuario se equivoca o no hay datos.
  - **Frontend:** el código real que dibuja esa interfaz en el navegador o celular (HTML/CSS/JS, frameworks) y reacciona al usuario.
- **Responsive y accesibilidad básica:** Si solo se ve bien en tu computadora, pierdes a la mayoría (móvil primero). Contraste, tamaños legibles, estados claros (cargando, vacío, error, éxito).
- **Qué pasa cuando la IA improvisa:** Cada pantalla sale de un color o estilo distinto, botones sin acción, mensajes de error en blanco, layouts rotos en celular.
- **Cómo está bien hecho:** Hay consistencia visual (una mini guía o *design system*), todos los flujos contemplan el "camino feliz" y los errores, y funciona igual de claro en celular y computadora.
- **Qué instruirle a la IA:**
  - Define la paleta, tipografía y estilo antes de pedir pantallas.
  - Pide diseñar pensando primero en celular y validar todos los estados: *cargando, vacío, éxito y error*.
  - Pide que no invente estilos sueltos por pantalla.

---

### Bloque 3 · Backend y Servidores (el cerebro detrás del telón)
- **Conceptos sin jerga:**
  - **Backend:** la lógica que decide las reglas del negocio (calcular precios reales, verificar cupos disponibles, enviar notificaciones, procesar pagos).
  - **Servidor:** la computadora en la nube (siempre encendida y conectada) donde corre el backend.
- **Regla de oro para no-programadores:** *Lo que ocurre en el navegador del usuario (Frontend) el usuario lo puede alterar. Las reglas importantes y secretas SIEMPRE viven en el Backend.*
- **Qué pasa si falta o queda mal:** La IA a veces resuelve todo en el frontend (por ejemplo, calcula descuentos o valida permisos solo ocultando un botón). Cualquiera con conocimientos básicos puede saltárselo.
- **Cómo está bien hecho:** Separación clara entre lo que se muestra (Frontend) y lo que decide/valida/guarda (Backend); el servidor responde con mensajes claros ante fallos.
- **Qué instruirle a la IA:**
  - *"Todas las reglas críticas de negocio, cálculos de precios, validaciones y permisos deben ejecutarse en el backend, nunca solo en el frontend."*
  - Pregúntale: *"¿Qué parte de esto corre en el navegador y qué parte en el servidor?"*

---

### Bloque 4 · Bases de Datos (la memoria del sistema)
- **Conceptos sin jerga:**
  - Qué es persistir datos vs. guardarlos solo en pantalla o en memoria temporal.
  - **Entidades / Tablas** (Clientes, Productos, Reservas, Pagos), **Campos**, **Identificadores únicos (ID)** y **Relaciones** (una reserva pertenece a un cliente y a un horario).
  - **Estados** (ej. reserva: `pendiente` → `confirmada` → `cancelada`), **Migraciones** (cambios ordenados a la estructura) y **Backups** (respaldos automáticos).
- **Qué pasa si falta o queda mal:** Recargas la página y los datos desaparecen; dos clientes reservan el mismo horario; borras un usuario y se rompen sus pedidos; no hay respaldos si algo se corrompe.
- **Cómo está bien hecho:** Modelo de datos definido antes de generar pantallas; cada dato tiene su tipo y relación clara; historial o auditoría en acciones críticas; respaldos periódicos.
- **Qué instruirle a la IA:**
  - *"Antes de programar pantallas, explícame qué tablas o entidades vas a crear, qué campos tiene cada una y cómo se relacionan."*
  - *"Evita duplicar datos, protege operaciones críticas contra reservas simultáneas y explícame cómo se hacen los respaldos."*

---

### Bloque 5 · APIs e Integraciones con Servicios Externos
- **Conceptos sin jerga:**
  - **API:** el contrato formal de comunicación ("qué pido y qué me respondes") entre tu Frontend y tu Backend, o entre tu app y otro sistema.
  - **Integraciones externas:** no reinventar la rueda — conectar pasarelas de pago, WhatsApp/email, mapas, almacenamiento de archivos, login con Google o APIs de IA.
  - **Webhooks:** cuando el servicio externo te avisa a ti que algo pasó (ej. *"el pago acaba de confirmarse"*).
- **Qué pasa si falta o queda mal:** La app asume que un pago fue exitoso solo porque el usuario cerró una ventana; si el proveedor externo está lento o cae, tu sistema entero se congela o cobra doble.
- **Cómo está bien hecho:** Cada integración tiene manejo de errores, tiempos de espera (*timeouts*), verificación real (webhooks firmados) y no depende ciegamente de un tercero sin plan B.
- **Qué instruirle a la IA:**
  - *"¿Qué servicios externos necesitamos conectar, qué pasa si uno falla temporalmente y cómo verificamos que un pago o evento es real?"*

---

### Bloque 6 · Autenticación y Permisos (Identidad y Control de Acceso)
- **Conceptos sin jerga:**
  - **Autenticación (AuthN):** *¿Quién eres?* (correo y contraseña, código OTP, "Continuar con Google", sesión activa).
  - **Autorización / Permisos (AuthZ):** *¿Qué puedes hacer?* (cliente ve solo sus pedidos; cajero registra ventas; administrador ve reportes y edita precios).
- **Principio de mínimo privilegio:** cada usuario solo ve y modifica lo estrictamente necesario para su rol.
- **Qué pasa si falta o queda mal:** Un usuario cambia el número en la URL (`/pedido/102` → `/pedido/103`) y ve los datos de otro cliente; contraseñas guardadas sin encriptar; cuentas sin recuperación segura.
- **Cómo está bien hecho:** Las contraseñas nunca se guardan en texto plano; las sesiones tienen vencimiento; **el backend verifica identidad y rol en cada acción**, no solo la pantalla.
- **Qué instruirle a la IA:**
  - *"Define los roles del sistema y qué puede ver, crear, editar o borrar cada uno. Verifica estos permisos en el servidor en cada operación."*

---

### Bloque 7 · Ciberseguridad desde el inicio (sin entrar en pánico técnico)
- **Idea clave:** La seguridad no es un barniz al final; es un criterio mínimo desde el primer día.
- **Los 5 riesgos más frecuentes cuando construyes con IA:**
  1. **Secretos expuestos:** llaves de API, contraseñas de base de datos o tokens pegados en el código o visibles en el navegador (uso obligatorio de **variables de entorno**).
  2. **Confiar en lo que envía el usuario:** no validar formularios ni archivos en el servidor.
  3. **Exposición de datos sensibles:** devolver información privada en respuestas que nadie debería ver.
  4. **Conexiones sin cifrar:** exigir **HTTPS** siempre en línea.
  5. **Librerías o código desactualizado/inseguro** que la IA copia por costumbre.
- **Qué instruirle a la IA (hábito obligatorio):**
  - *"Nunca pongas secretos ni llaves en el código ni en el frontend; usa variables de entorno."*
  - *"Haz una revisión de seguridad de lo que construiste como si fueras un atacante: dime qué datos están expuestos o qué validación falta."*

---

### Bloque 8 · Git y Control de Versiones (la red de seguridad de tu proyecto)
- **Por qué es indispensable aunque no programes:**
  - La IA comete errores, cambia cosas que no le pediste o toma un mal camino. Sin historial, pierdes horas o días de trabajo.
- **Conceptos mínimos en lenguaje humano:**
  - **Repositorio:** la carpeta oficial del proyecto con toda su historia.
  - **Commit:** un punto de guardado con nombre claro (*"foto de cuando el login ya funcionaba"*).
  - **Rama (Branch):** una copia paralela para probar algo nuevo sin romper la versión estable.
  - **Rollback / Volver atrás:** regresar al último punto sano en segundos.
  - **`.gitignore`:** la lista de cosas que **jamás** se suben a la nube (como tus archivos `.env` con claves secretas).
- **Cómo está bien hecho:** Cambios pequeños y frecuentes con descripción clara; nada de claves subidas a GitHub; el proyecto avanza por pasos verificables.
- **Qué instruirle a la IA:**
  - *"Trabaja por cambios pequeños, guarda avances claros en Git y asegúrate de que los secretos queden fuera del repositorio."*

---

### Bloque 9 · Entornos: Desarrollo, Pruebas y Producción
- **Conceptos sin jerga:**
  - **Local / Desarrollo:** tu taller privado donde construyes y rompes cosas sin que nadie lo vea.
  - **Pruebas / Staging / Preview:** una copia casi idéntica a la real donde tú (y tu equipo o testers) prueban cada avance con datos de prueba.
  - **Producción:** el sistema real abierto a tus clientes, con datos reales y dinero real.
- **Regla de oro:** *Nunca pruebes cambios nuevos directo en Producción.*
- **Breve nota de cierre práctico (opcional, 1–2 min):**
  - **Dominio y hosting:** la "dirección" (tu marca `.com`) vs. el "terreno/edificio" donde vive la app.
  - **Costos:** distinguir entre planes gratuitos para validar (prototipo) y costos reales al crecer (servidor, base de datos, servicios externos y consumo de tokens de IA).

---

### Bloque 10 · El puente hacia Spec-Driven Development
- **Cómo se conecta todo lo que acabamos de ver:**
  - Ahora sabes qué piezas existen y qué debes exigir en cada una.
  - El siguiente paso ya no es improvisar prompts sueltos (*vibe coding*), sino escribir **especificaciones claras** que ordenen estas piezas antes de generar código.
- **Mini-checklist antes de empezar tu Spec:**
  1. ¿Qué problema resuelvo y qué flujos tiene el usuario? *(UX/UI y Frontend)*
  2. ¿Qué reglas críticas nunca debe decidir el navegador? *(Backend)*
  3. ¿Qué datos necesito guardar y cómo se relacionan? *(Base de Datos)*
  4. ¿Con qué servicios externos me voy a conectar? *(APIs e Integraciones)*
  5. ¿Qué roles existen y qué puede hacer cada uno? *(Auth y Permisos)*
  6. ¿Qué secretos y datos debo proteger desde el día 1? *(Ciberseguridad)*
  7. ¿Dónde guardo el historial y cómo pruebo antes de publicar? *(Git y Entornos)*
- **Invitación al siguiente nivel:**
  - Enlace / QR al taller de Spec-Driven Development: `https://taller-ttw-ia-empresas.vercel.app/`
  - Contacto del expositor y comunidad **GDG Santa Cruz**.

---

## 5. Notas para revisión y siguientes iteraciones

Puntos abiertos que podemos afinar antes de pasar a crear la presentación web:
- [ ] **Duración objetivo del taller:** definir tiempos exactos por bloque (ej. formato 45 min, 60 min o 90 min) y qué bloques tendrían demo o ejercicio rápido.
- [ ] **Hilo conductor:** confirmar si usamos el ejemplo de *cafetería/negocio de pedidos y reservas* u otro rubro más cercano al evento.
- [ ] **Profundidad del cierre opcional:** decidir si mantenemos la mención breve de *dominio + costos* en el Bloque 9 o la dejamos fuera para no alargar.
- [ ] **Dinámica con la audiencia:** definir si habrá prompts listos para copiar (como en el taller de SDD) o mini-preguntas interactivas en vivo durante la charla.
