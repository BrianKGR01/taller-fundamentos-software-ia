import type { BlockAccent } from '@/lib/deck';

export type SlideLayout =
  | 'cover'
  | 'speaker'
  | 'problem'
  | 'anatomy-interactive'
  | 'pillars'
  | 'ux-trio'
  | 'ux-states-interactive'
  | 'prompt-compare'
  | 'backend-concept'
  | 'backend-trap-interactive'
  | 'db-concept'
  | 'db-visualizer-interactive'
  | 'api-concept'
  | 'api-integrations'
  | 'auth-split'
  | 'auth-trap'
  | 'security-sins'
  | 'security-audit'
  | 'git-why'
  | 'git-timemachine-interactive'
  | 'environments'
  | 'checklist-interactive'
  | 'bridge-sdd'
  | 'contact-qr';

export interface SlideComparison {
  badTitle: string;
  badItems: string[];
  goodTitle: string;
  goodItems: string[];
}

export interface SlideCardItem {
  tag?: string;
  title: string;
  description: string;
  accent?: BlockAccent;
}

export interface WorkshopSlide {
  id: string;
  blockId: number;
  indexInBlock: number;
  accent: BlockAccent;
  eyebrow: string;
  title: string;
  subtitle?: string;
  layout: SlideLayout;
  presenterNote: string;
  cards?: SlideCardItem[];
  comparison?: SlideComparison;
  promptLabel?: string;
  promptText?: string;
  highlightQuote?: string;
  optionalNote?: {
    title: string;
    items: string[];
  };
}

export const SLIDES: WorkshopSlide[] = [
  // BLOQUE 0 · PORTADA Y CONTEXTO
  {
    id: '0-1',
    blockId: 0,
    indexInBlock: 1,
    accent: 'blue',
    eyebrow: 'GDG Santa Cruz · Taller práctico conceptual',
    title: 'Fundamentos de Software con IA',
    subtitle: 'Lo que necesitas saber antes de entrar a Spec-Driven Development',
    layout: 'cover',
    highlightQuote:
      'No vas a aprender a programar. Vas a aprender a dirigir la construcción de software con IA sin quedarte a ciegas.',
    presenterNote:
      'Arranca con energía: este taller es la pieza previa al de Spec-Driven Development. Hoy casi cualquiera genera una pantalla con IA en 2 minutos, pero dirigir un producto real exige entender qué piezas existen por dentro.',
  },
  {
    id: '0-2',
    blockId: 0,
    indexInBlock: 2,
    accent: 'blue',
    eyebrow: 'Expositor · GDG Santa Cruz',
    title: 'Kevin Brayan Gómez Rocha',
    subtitle: 'Arquitecto de Software · Mentor de Startups · Fundador Tecnológico',
    layout: 'speaker',
    presenterNote:
      'No leas todo el CV: resume en 20 segundos que llevas más de 7 años construyendo software entre EE. UU., Europa y LATAM, que fundaste Drinks on Chain y DevBro Solutions, y que acompañas a startups y equipos con IA y Spec-Driven Development.',
  },
  {
    id: '0-3',
    blockId: 0,
    indexInBlock: 3,
    accent: 'blue',
    eyebrow: 'El problema real',
    title: 'La trampa de «hazme una app para mi negocio»',
    subtitle:
      'La IA te entrega algo visual en minutos. El choque llega cuando necesitas usuarios reales, pagos, datos seguros y cambios sin romper todo.',
    layout: 'problem',
    cards: [
      {
        tag: 'Minuto 2',
        title: '«¡Ya funciona!»',
        description: 'La pantalla se ve bonita, los botones responden con datos falsos y parece magia.',
        accent: 'green',
      },
      {
        tag: 'Día 3',
        title: '«Recargué y se borró todo»',
        description: 'No había base de datos real, ni reglas en el servidor, ni permisos por usuario.',
        accent: 'yellow',
      },
      {
        tag: 'Semana 2',
        title: '«La IA arregló algo y rompió el resto»',
        description: 'Sin historial en Git ni separación de entornos, cada cambio nuevo genera miedo.',
        accent: 'red',
      },
    ],
    highlightQuote:
      'Nadie puede dirigir a un equipo —ni a una IA— si no sabe qué piezas existen ni qué exigirle a cada una.',
    presenterNote:
      'Conecta directo con el taller de Spec-Driven Development: allá enseñas el método de especificar; aquí damos el vocabulario y el criterio para saber qué estás especificando.',
  },

  // BLOQUE 1 · MAPA COMPLETO
  {
    id: '1-1',
    blockId: 1,
    indexInBlock: 1,
    accent: 'green',
    eyebrow: 'Bloque 1 · Visión general',
    title: '¿Qué es un software por dentro?',
    subtitle: 'Piensa en tu sistema como un restaurante: el cliente solo ve el salón, pero atrás operan 8 estaciones.',
    layout: 'anatomy-interactive',
    presenterNote:
      'Haz clic en las estaciones del diagrama interactivo. Explica que cuando pides "una app" sin aclarar estas capas, la IA adivina qué cocina, qué despensa y qué candados poner.',
  },
  {
    id: '1-2',
    blockId: 1,
    indexInBlock: 2,
    accent: 'green',
    eyebrow: 'Método del taller',
    title: 'Tu brújula para cualquier proyecto con IA',
    subtitle: 'Recorreremos un ejemplo concreto —una plataforma de pedidos y reservas para un negocio local— haciéndole 4 preguntas a cada capa.',
    layout: 'pillars',
    cards: [
      {
        tag: '01 · Qué es',
        title: 'En palabras simples',
        description: 'Sin jerga académica: para qué sirve esa pieza en un negocio real.',
        accent: 'blue',
      },
      {
        tag: '02 · Riesgo',
        title: 'Qué pasa si falta',
        description: 'Qué falla, se pierde o queda expuesto cuando la IA improvisa.',
        accent: 'red',
      },
      {
        tag: '03 · Criterio',
        title: 'Cómo sé que está bien',
        description: 'Señales claras para evaluar el resultado sin leer una línea de código.',
        accent: 'green',
      },
      {
        tag: '04 · Dirección',
        title: 'Qué instruirle a la IA',
        description: 'Las preguntas y exigencias concretas que debes escribir antes de construir.',
        accent: 'yellow',
      },
    ],
    presenterNote:
      'Deja claro que no necesitan memorizar comandos. Necesitan llevarse estas 4 lentes para dirigir a la IA en cualquier rubro.',
  },

  // BLOQUE 2 · UX/UI Y FRONTEND
  {
    id: '2-1',
    blockId: 2,
    indexInBlock: 1,
    accent: 'red',
    eyebrow: 'Bloque 2 · La cara visible',
    title: 'UX, UI y Frontend no son lo mismo',
    subtitle: 'Aunque todo vive en la pantalla del usuario, cada disciplina resuelve un problema distinto.',
    layout: 'ux-trio',
    cards: [
      {
        tag: 'UX · Experiencia',
        title: '¿El usuario entiende qué hacer?',
        description:
          'Orden de los pasos, claridad de los mensajes, menos clics innecesarios y salidas claras cuando algo sale mal.',
        accent: 'blue',
      },
      {
        tag: 'UI · Interfaz visual',
        title: '¿Se ve coherente y legible?',
        description:
          'Colores, tipografías, jerarquía, contraste, espaciados y botones consistentes en todas las pantallas.',
        accent: 'red',
      },
      {
        tag: 'Frontend · Código en pantalla',
        title: '¿Funciona en navegador y celular?',
        description:
          'El código que dibuja la interfaz, adapta el diseño a móvil (responsive) y conversa con el servidor.',
        accent: 'green',
      },
    ],
    presenterNote:
      'Recalca que decirle a la IA "hazlo moderno y bonito" es vago. Si no defines experiencia (UX) y consistencia visual (UI), cada pantalla parece de una app distinta.',
  },
  {
    id: '2-2',
    blockId: 2,
    indexInBlock: 2,
    accent: 'red',
    eyebrow: 'Demo interactiva · UX real',
    title: 'Los 4 estados que la IA suele olvidar',
    subtitle:
      'Las apps improvisadas solo diseñan el «camino feliz». Haz clic en cada estado para ver lo que debes exigirle a la IA.',
    layout: 'ux-states-interactive',
    presenterNote:
      'Cambia entre Cargando, Vacío, Error y Éxito en la demo. Explica que cuando la audiencia escanea desde el celular, también verá por qué el diseño móvil (mobile-first) importa tanto.',
  },
  {
    id: '2-3',
    blockId: 2,
    indexInBlock: 3,
    accent: 'red',
    eyebrow: 'Criterio e instrucción · Bloque 2',
    title: 'Cómo dirigir UX/UI y Frontend a la IA',
    layout: 'prompt-compare',
    comparison: {
      badTitle: 'Señal de alarma (improvisado)',
      badItems: [
        'Cada pantalla inventa colores, fuentes o botones distintos.',
        'En computadora se ve bien, pero en celular se corta o superpone.',
        'Si algo falla o no hay datos, la pantalla queda en blanco.',
      ],
      goodTitle: 'Bien hecho (dirigido)',
      goodItems: [
        'Usa una guía visual única (paleta, tipografía y componentes consistentes).',
        'Pensado primero para celular (mobile-first) y legible en escritorio.',
        'Contempla estados de carga, vacío, error humano y confirmación.',
      ],
    },
    promptLabel: 'Instrucción base para darle a la IA',
    promptText:
      'Antes de crear pantallas, define una guía visual única (colores, tipografías, botones y espaciados). Diseña primero para celular (mobile-first) y asegúrate de incluir en cada flujo los estados de carga, vacío, error claro y confirmación.',
    presenterNote:
      'Invita a copiar el prompt desde el celular al escanear el QR al final, o probándolo en vivo.',
  },

  // BLOQUE 3 · BACKEND Y SERVIDORES
  {
    id: '3-1',
    blockId: 3,
    indexInBlock: 1,
    accent: 'yellow',
    eyebrow: 'Bloque 3 · Detrás del telón',
    title: 'Backend y Servidores: el cerebro del negocio',
    subtitle: 'El navegador del usuario es territorio público. Las reglas reales y sensibles viven en el servidor.',
    layout: 'backend-concept',
    cards: [
      {
        tag: 'Backend',
        title: 'La lógica y las reglas reales',
        description:
          'Calcula montos, verifica cupos disponibles, aplica descuentos válidos, valida permisos y coordina pagos.',
        accent: 'yellow',
      },
      {
        tag: 'Servidor',
        title: 'La máquina encendida 24/7',
        description:
          'Donde corre tu backend en la nube para atender pedidos desde cualquier celular aunque tu laptop esté apagada.',
        accent: 'blue',
      },
    ],
    highlightQuote:
      'Regla de oro: todo lo que ocurre dentro del navegador del usuario (Frontend) el usuario lo puede inspeccionar y alterar.',
    presenterNote:
      'Usa palabras simples: el Frontend es el folleto interactivo en manos del cliente; el Backend es tu oficina cerrada con llave en la nube.',
  },
  {
    id: '3-2',
    blockId: 3,
    indexInBlock: 2,
    accent: 'yellow',
    eyebrow: 'Simulador en vivo · Regla crítica',
    title: '¿Qué pasa si la IA pone el precio en el Frontend?',
    subtitle:
      'Prueba qué ocurre cuando un cliente manipula el precio en su navegador según dónde viva la validación.',
    layout: 'backend-trap-interactive',
    presenterNote:
      'Activa el botón para simular que alguien cambió el precio de Bs. 120 a Bs. 1 en el navegador, y luego alterna entre "Sin validación en Backend" vs "Con validación en Backend". Este ejemplo hace clic inmediato en no-programadores.',
  },
  {
    id: '3-3',
    blockId: 3,
    indexInBlock: 3,
    accent: 'yellow',
    eyebrow: 'Criterio e instrucción · Bloque 3',
    title: 'Qué exigirle a la IA sobre Backend',
    layout: 'prompt-compare',
    comparison: {
      badTitle: 'Señal de alarma',
      badItems: [
        'La IA resuelve toda la app solo con archivos del navegador sin servidor real.',
        'Precios, descuentos o roles se calculan o validan únicamente en pantalla.',
        'Cuando algo falla en el servidor, el usuario ve un código críptico o silencio.',
      ],
      goodTitle: 'Bien hecho',
      goodItems: [
        'Separación clara entre interfaz (Frontend) y reglas críticas (Backend).',
        'El servidor recalcula montos, valida cupos y verifica permisos siempre.',
        'Maneja errores ordenadamente y registra qué ocurrió para poder diagnosticar.',
      ],
    },
    promptLabel: 'Instrucción base para darle a la IA',
    promptText:
      'Separa claramente frontend y backend. Todas las reglas críticas de negocio (precios, stock o cupos, pagos, permisos y validaciones) deben ejecutarse en el backend, nunca solo en el navegador. Explícame en lenguaje simple qué parte corre en el navegador y qué parte en el servidor.',
    presenterNote:
      'La pregunta mágica para cualquier no-dev: "¿Qué parte de esto corre en el navegador y qué parte en el servidor?"',
  },

  // BLOQUE 4 · BASES DE DATOS
  {
    id: '4-1',
    blockId: 4,
    indexInBlock: 1,
    accent: 'blue',
    eyebrow: 'Bloque 4 · La memoria del sistema',
    title: 'Bases de Datos: que la información no se evapore',
    subtitle: 'Sin base de datos real, tu sistema tiene amnesia cada vez que cierras la pestaña o reinicias el servidor.',
    layout: 'db-concept',
    cards: [
      {
        tag: 'Entidades y campos',
        title: 'Qué cosas guardamos',
        description:
          'Listas ordenadas con nombre, tipo y regla: Clientes (nombre, teléfono), Reservas (fecha, estado), Pagos (monto, método).',
        accent: 'blue',
      },
      {
        tag: 'Relaciones e IDs',
        title: 'Cómo se conectan sin duplicarse',
        description:
          'Cada registro tiene un identificador único (ID). Una reserva apunta al cliente; si cambia su teléfono, se actualiza en un solo lugar.',
        accent: 'green',
      },
      {
        tag: 'Estados y respaldos',
        title: 'Ciclo de vida y copias',
        description:
          'Un pedido cambia de estado con reglas claras (`pendiente → pagado → entregado`), y existen backups automáticos por si algo falla.',
        accent: 'yellow',
      },
    ],
    presenterNote:
      'Aclara que muchas demos generadas por IA guardan los datos en `localStorage` o en memoria RAM del proceso: funciona en la demo, pero al desplegar o cambiar de dispositivo no existe nada.',
  },
  {
    id: '4-2',
    blockId: 4,
    indexInBlock: 2,
    accent: 'blue',
    eyebrow: 'Visualizador interactivo · Modelo de datos',
    title: 'Así se conectan tus datos en la vida real',
    subtitle: 'Explora cómo se relacionan Cliente, Reserva y Pago y qué pasa cuando el flujo avanza por estados.',
    layout: 'db-visualizer-interactive',
    presenterNote:
      'Haz clic en las entidades Cliente, Reserva y Pago, y prueba cambiar el estado de la reserva para mostrar cómo un dato mal modelado rompe reportes, cobros o cupos.',
  },
  {
    id: '4-3',
    blockId: 4,
    indexInBlock: 3,
    accent: 'blue',
    eyebrow: 'Criterio e instrucción · Bloque 4',
    title: 'Antes de hacer pantallas, diseña los datos',
    layout: 'prompt-compare',
    comparison: {
      badTitle: 'Señal de alarma',
      badItems: [
        'Los datos se pierden al recargar o solo existen en tu computadora.',
        'Dos personas pueden reservar exactamente el mismo cupo al mismo tiempo.',
        'La IA cambia columnas sin control y borra datos existentes.',
      ],
      goodTitle: 'Bien hecho',
      goodItems: [
        'Modelo de entidades y relaciones definido antes de generar pantallas.',
        'Protección contra reservas duplicadas y estados válidos bien definidos.',
        'Cambios de estructura ordenados (migraciones) y respaldos automáticos.',
      ],
    },
    promptLabel: 'Instrucción base para darle a la IA',
    promptText:
      'Antes de crear pantallas, muéstrame en lenguaje simple qué entidades o tablas tendrá la base de datos, sus campos, cómo se relacionan y qué estados posibles existen. Incluye cómo evitaremos reservas o cobros duplicados y cómo se respaldan los datos.',
    presenterNote:
      'Si entiendes tus datos antes de generar código, el 70% de los problemas de arquitectura desaparecen.',
  },

  // BLOQUE 5 · APIS E INTEGRACIONES
  {
    id: '5-1',
    blockId: 5,
    indexInBlock: 1,
    accent: 'green',
    eyebrow: 'Bloque 5 · Cómo hablan las piezas',
    title: 'APIs: el mesero y el contrato entre sistemas',
    subtitle:
      'Tu pantalla no entra directo a la cocina ni a la base de datos. Le pide cosas a una API con un formato claro.',
    layout: 'api-concept',
    cards: [
      {
        tag: '1 · Petición (Request)',
        title: 'El Frontend pide algo concreto',
        description: '«Quiero reservar la mesa 4 para mañana a las 19:00 con este usuario autenticado».',
        accent: 'blue',
      },
      {
        tag: '2 · Contrato API',
        title: 'El Backend valida y responde',
        description: 'Revisa disponibilidad, permisos y reglas. Nunca expone la base de datos abierta al público.',
        accent: 'green',
      },
      {
        tag: '3 · Respuesta (Response)',
        title: 'Resultado predecible',
        description: '«Confirmada (código 201)» o «Ese horario ya está ocupado (código 409)» para mostrarlo claro en pantalla.',
        accent: 'yellow',
      },
    ],
    presenterNote:
      'Vuelve a la analogía del restaurante: el cliente no entra a mover ollas ni a abrir la caja fuerte; habla con el mesero (API) usando el menú.',
  },
  {
    id: '5-2',
    blockId: 5,
    indexInBlock: 2,
    accent: 'green',
    eyebrow: 'Conectar con el mundo',
    title: 'Integraciones externas y Webhooks',
    subtitle: 'No programes desde cero lo que ya existe mejor hecho. Conecta servicios probados y verifica sus avisos.',
    layout: 'api-integrations',
    cards: [
      {
        tag: 'Pagos',
        title: 'QR, tarjetas y pasarelas',
        description: 'Nunca confíes en que el cliente «dice que pagó»; espera la confirmación real del proveedor.',
        accent: 'green',
      },
      {
        tag: 'Mensajería',
        title: 'WhatsApp y correo transaccional',
        description: 'Confirmaciones automáticas, recordatorios y códigos de verificación sin enviar a mano.',
        accent: 'blue',
      },
      {
        tag: 'Identidad y archivos',
        title: 'Login con Google, mapas, storage',
        description: 'Evita guardar fotos pesadas dentro de la base de datos o inventar mapas propios.',
        accent: 'yellow',
      },
      {
        tag: 'Webhooks',
        title: '«El proveedor te avisa a ti»',
        description:
          'Cuando un pago se aprueba 30 segundos después, la pasarela llama a tu Backend con una firma secreta para confirmarlo.',
        accent: 'red',
      },
    ],
    promptLabel: 'Instrucción base para darle a la IA',
    promptText:
      'Para cada integración externa (pagos, WhatsApp, correo, almacenamiento o IA), indícame qué servicio usaremos, qué credenciales necesita, cómo verificamos webhooks de forma segura y qué debe mostrar la app si ese proveedor falla temporalmente.',
    presenterNote:
      'Haz énfasis en los webhooks y en los fallos de terceros: ¿qué pasa si WhatsApp o la pasarela de pago tarda 10 segundos o se cae hoy?',
  },

  // BLOQUE 6 · AUTENTICACIÓN Y PERMISOS
  {
    id: '6-1',
    blockId: 6,
    indexInBlock: 1,
    accent: 'red',
    eyebrow: 'Bloque 6 · Identidad y control',
    title: 'Autenticación ≠ Permisos',
    subtitle: 'Que alguien tenga llave para entrar al edificio no significa que pueda abrir la caja fuerte del gerente.',
    layout: 'auth-split',
    cards: [
      {
        tag: 'Autenticación (AuthN)',
        title: '¿Quién eres?',
        description:
          'Demostrar identidad: correo + contraseña cifrada, código OTP al correo/WhatsApp o botón «Continuar con Google».',
        accent: 'blue',
      },
      {
        tag: 'Autorización / Permisos (AuthZ)',
        title: '¿Qué puedes hacer?',
        description:
          'Reglas por rol: el cliente solo ve sus reservas; el operador hace check-in; solo el administrador cambia precios.',
        accent: 'red',
      },
    ],
    highlightQuote:
      'Principio de mínimo privilegio: cada usuario y cada parte del sistema recibe solo el permiso mínimo necesario para su tarea.',
    presenterNote:
      'Diferenciar AuthN y AuthZ ahorra los peores sustos legales y operativos de cualquier plataforma.',
  },
  {
    id: '6-2',
    blockId: 6,
    indexInBlock: 2,
    accent: 'red',
    eyebrow: 'El error clásico de la IA',
    title: 'Esconder un botón en pantalla NO es seguridad',
    subtitle: 'Si el Backend no verifica quién hace la petición, cualquiera puede pedir datos ajenos cambiando un número.',
    layout: 'auth-trap',
    comparison: {
      badTitle: 'Falsa seguridad (solo Frontend)',
      badItems: [
        'Ocultas el botón «Panel Admin» si el usuario no es admin.',
        'Pero la ruta `/api/ventas` responde igual si alguien la llama directo.',
        'Cambias `/pedido/102` por `/pedido/103` y ves el pedido de otro cliente.',
      ],
      goodTitle: 'Seguridad real (en el Backend)',
      goodItems: [
        'Cada petición verifica la sesión válida en el servidor.',
        'El servidor confirma que el usuario sea dueño del recurso o tenga el rol.',
        'Las contraseñas siempre se guardan encriptadas (hash), nunca legibles.',
      ],
    },
    promptLabel: 'Instrucción base para darle a la IA',
    promptText:
      'Define una tabla de roles y permisos (qué puede ver, crear, editar o eliminar cada rol). Verifica identidad y permisos en el backend en cada endpoint y acción, nunca solo ocultando botones en la interfaz.',
    presenterNote:
      'El ejemplo `/pedido/102` → `/pedido/103` (IDOR) lo entiende absolutamente todo el mundo en 5 segundos.',
  },

  // BLOQUE 7 · CIBERSEGURIDAD DESDE EL INICIO
  {
    id: '7-1',
    blockId: 7,
    indexInBlock: 1,
    accent: 'yellow',
    eyebrow: 'Bloque 7 · Protección real',
    title: 'Los 5 pecados frecuentes al construir con IA',
    subtitle: 'La ciberseguridad no se «pega al final» cuando ya tienes clientes. Se exige desde la primera decisión.',
    layout: 'security-sins',
    cards: [
      {
        tag: '01 · Secretos expuestos',
        title: 'Llaves API pegadas en el código o Frontend',
        description: 'Cualquiera abre el inspector del navegador o GitHub y usa tu cuenta pagada o tu base de datos.',
        accent: 'red',
      },
      {
        tag: '02 · Confiar en el usuario',
        title: 'Aceptar datos y archivos sin validar',
        description: 'Formularios sin límites o archivos ejecutables subidos sin filtro abren la puerta a ataques.',
        accent: 'yellow',
      },
      {
        tag: '03 · Datos de más',
        title: 'Devolver información privada oculta en respuestas',
        description: 'La pantalla muestra solo el nombre, pero el Backend envía teléfono, documento o correo de todos.',
        accent: 'blue',
      },
      {
        tag: '04 · Sin cifrado ni límites',
        title: 'Sin HTTPS o sin límite de intentos',
        description: 'Sin candado HTTPS viaja en texto plano; sin rate-limit un bot prueba miles de contraseñas.',
        accent: 'green',
      },
    ],
    presenterNote:
      'Menciona que como Ethical Hacking Expert ves estos 4–5 errores repetidos casi siempre en prototipos creados con IA sin supervisión.',
  },
  {
    id: '7-2',
    blockId: 7,
    indexInBlock: 2,
    accent: 'yellow',
    eyebrow: 'Tu hábito obligatorio',
    title: 'Auditoría express antes de publicar (sin saber código)',
    subtitle: 'Usa a la misma IA como auditora escéptica: pídele que ataque su propio diseño y te explique los riesgos.',
    layout: 'security-audit',
    comparison: {
      badTitle: 'Nunca hagas esto',
      badItems: [
        'Pegar contraseñas reales o llaves de producción en el chat con la IA.',
        'Subir el archivo `.env` con tus secretos a GitHub.',
        'Asumir que «como es un MVP pequeño nadie lo va a atacar».',
      ],
      goodTitle: 'Exige esto siempre',
      goodItems: [
        'Todos los secretos viven en variables de entorno (`.env` local y panel seguro en nube).',
        'Validación estricta de entradas en el servidor y respuestas mínimas.',
        'Revisión explícita de autenticación, pagos y datos personales.',
      ],
    },
    promptLabel: 'Prompt de auditoría de seguridad para la IA',
    promptText:
      'Actúa como especialista en ciberseguridad. Revisa este proyecto como si quisieras atacarlo: verifica si hay secretos expuestos en el frontend o en el repo, rutas sin verificación de permisos, datos sensibles devueltos de más o entradas sin validar en el backend. Dame una lista priorizada en lenguaje simple.',
    presenterNote:
      'Asegúrate de enfatizar: nunca pegues tus API keys reales ni contraseñas en un chat.',
  },

  // BLOQUE 8 · GIT Y CONTROL DE VERSIONES
  {
    id: '8-1',
    blockId: 8,
    indexInBlock: 1,
    accent: 'blue',
    eyebrow: 'Bloque 8 · Tu red de seguridad',
    title: 'Git: obligatorio incluso si no tocas una línea de código',
    subtitle:
      'La IA a veces «arregla» un botón y rompe el login que ya servía. Sin control de versiones, pierdes tu proyecto.',
    layout: 'git-why',
    cards: [
      {
        tag: 'Repositorio',
        title: 'La carpeta oficial con memoria',
        description: 'Guarda cada versión estable de tu proyecto localmente y en la nube (por ejemplo, GitHub).',
        accent: 'blue',
      },
      {
        tag: 'Commit',
        title: 'Un punto de guardado con nombre',
        description: 'Como guardar partida en un videojuego: «login funcionando», «agregado pago QR».',
        accent: 'green',
      },
      {
        tag: 'Rama (Branch)',
        title: 'Probar sin dañar lo que ya sirve',
        description: 'Creas una línea paralela para experimentar; si queda bien, se une a la principal.',
        accent: 'yellow',
      },
      {
        tag: '.gitignore',
        title: 'La lista de lo que NO se sube',
        description: 'Bloquea archivos `.env` con llaves secretas y carpetas pesadas temporales.',
        accent: 'red',
      },
    ],
    presenterNote:
      'Muchos no-programadores evitan Git porque suena técnico, y luego pierden días de trabajo cuando un prompt sale mal. Con IA, Git es tu botón de deshacer profesional.',
  },
  {
    id: '8-2',
    blockId: 8,
    indexInBlock: 2,
    accent: 'blue',
    eyebrow: 'Simulador interactivo · Máquina del tiempo',
    title: 'Así te salva Git cuando la IA rompe algo',
    subtitle: 'Recorre la historia del proyecto y prueba volver a un punto sano con un clic.',
    layout: 'git-timemachine-interactive',
    promptLabel: 'Instrucción de Git para darle a la IA',
    promptText:
      'Trabaja siempre en una rama nueva por cada funcionalidad, haz commits pequeños con mensajes claros cuando algo funcione y verifica que `.gitignore` excluya `.env` y cualquier credencial antes de subir cambios.',
    presenterNote:
      'Haz clic en los commits hasta el Commit 3 ("la IA rompió el catálogo") y pulsa "Volver al Commit 2" para mostrar lo rápido y tranquilo que es trabajar con Git.',
  },

  // BLOQUE 9 · ENTORNOS (+ NOTA BREVE DE DOMINIO Y COSTOS)
  {
    id: '9-1',
    blockId: 9,
    indexInBlock: 1,
    accent: 'green',
    eyebrow: 'Bloque 9 · Dónde vive y cómo se prueba',
    title: 'Los 3 entornos: nunca experimentes sobre clientes reales',
    subtitle: 'Separar dónde construyes, dónde ensayas y dónde operas evita caídas frente a tu público.',
    layout: 'environments',
    cards: [
      {
        tag: '1 · Desarrollo (Local)',
        title: 'Tu taller privado',
        description: 'Corre en tu computadora o entorno aislado. Aquí la IA construye, prueba y rompe sin afectar a nadie.',
        accent: 'blue',
      },
      {
        tag: '2 · Pruebas / Preview (Staging)',
        title: 'El ensayo general',
        description:
          'Una URL privada casi idéntica a la real, pero con datos ficticios. Aquí tú pruebas cada cambio antes de aprobarlo.',
        accent: 'yellow',
      },
      {
        tag: '3 · Producción',
        title: 'Las puertas abiertas al público',
        description:
          'Clientes reales, datos reales, pagos reales y respaldos automáticos. Solo recibe versiones ya probadas.',
        accent: 'green',
      },
    ],
    optionalNote: {
      title: 'Nota final práctica: Dominio, Hosting y Costos',
      items: [
        'Dominio = tu dirección (`tunegocio.com`). Hosting/Nube = el edificio donde viven Frontend, Backend y Base de Datos.',
        'Costos: muchos servicios tienen capa gratuita para validar tu MVP; al crecer considera hosting, base de datos, APIs de pago y consumo de tokens de IA.',
      ],
    },
    presenterNote:
      'Explica cómo plataformas modernas (como Vercel + base de datos separada) te dan URLs de Preview por cada rama de Git para probar desde el celular antes de pasar a Producción.',
  },

  // BLOQUE 10 · PUENTE A SPEC-DRIVEN DEVELOPMENT Y CIERRE
  {
    id: '10-1',
    blockId: 10,
    indexInBlock: 1,
    accent: 'blue',
    eyebrow: 'Bloque 10 · De conceptos a acción',
    title: 'Tu checklist antes de escribir tu primera Spec',
    subtitle:
      'Marca los 8 pilares que debes tener claros antes de pasar a Spec-Driven Development:',
    layout: 'checklist-interactive',
    presenterNote:
      'Ve marcando algunos puntos con la audiencia: si puedes responder estas 8 cosas sobre tu idea, ya no estás haciendo "vibe coding"; estás dirigiendo ingeniería con IA.',
  },
  {
    id: '10-2',
    blockId: 10,
    indexInBlock: 2,
    accent: 'green',
    eyebrow: 'El siguiente paso en tu ruta',
    title: 'Ahora sí: entra a Spec-Driven Development',
    subtitle:
      'Ya conoces las piezas del software y qué exigirle a la IA. El siguiente nivel es documentar estas decisiones como especificaciones vivas para que la IA construya de forma ordenada.',
    layout: 'bridge-sdd',
    highlightQuote:
      'Este taller te dio el mapa del terreno. Spec-Driven Development te da el plan de vuelo.',
    presenterNote:
      'Presenta el enlace al taller de Spec-Driven Development (taller-ttw-ia-empresas.vercel.app) como la continuación natural de hoy.',
  },
  {
    id: '10-3',
    blockId: 10,
    indexInBlock: 3,
    accent: 'blue',
    eyebrow: 'Llévate la guía · GDG Santa Cruz',
    title: 'Escanea, copia los prompts y conversemos',
    subtitle: 'Abre esta presentación en tu celular para repasar cada capa y copiar las instrucciones listas para tu próximo proyecto.',
    layout: 'contact-qr',
    presenterNote:
      'Deja el QR proyectado durante las preguntas. Recuérdales que desde el celular se abre automáticamente en modo guía de lectura con todos los demos y botones para copiar.',
  },
];
