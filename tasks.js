// ── MIGRACIÓN AUTOMÁTICA: limpia HOY de tareas viejas ──────────────────────
(function migrarTareasViejas() {
  try {
    var STORE_KEY = 'forit-kanban-v1';
    var CUTOFF = '2026-06-20T00:00:00'; // tareas anteriores al 20/06 salen de HOY
    var d = JSON.parse(localStorage.getItem(STORE_KEY) || '{"tareas":[]}');
    var changed = false;
    d.tareas.forEach(function(t) {
      if (t.col === 'hoy' && t.createdAt && t.createdAt < CUTOFF) {
        t.col = 'seguimiento';
        changed = true;
      }
    });
    if (changed) {
      localStorage.setItem(STORE_KEY, JSON.stringify(d));
    }
  } catch(e) {}
})();

// ── ESTADO GLOBAL ────────────────────────────────────────────────────────────
var STORE_KEY = 'forit-kanban-v1';
var TEAM_KEY  = 'forit-team-v1';
// Carga post-migración (la migración ya actualizó localStorage arriba)
var data      = JSON.parse(localStorage.getItem(STORE_KEY)  || '{"tareas":[]}');
var teamData  = JSON.parse(localStorage.getItem(TEAM_KEY)   || '{"tareas":[]}');
function saveData(d)  { try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch(e) {} data = d; }
function saveTeam(d)  { try { localStorage.setItem(TEAM_KEY,  JSON.stringify(d)); } catch(e) {} teamData = d; }
var HOY = (function(){ var d = new Date(); d.setHours(0,0,0,0); return d; })();


(function importarNuevas() {
    var ahora = new Date().toISOString();
    var nuevas = [
      { id:'imp01', texto:'Hablar con Emilio Basa', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp02', texto:'Escribirle a todos los hubs de emprendedores', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp03', texto:'Jardín Montessori — mandar mail a todos', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp04', texto:'Juntarse con el Negro para buscar clientes', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp05', texto:'Escribirle a los participantes de NAVES', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp06', texto:'Contactar a María Eugenia Mata (Comisión 6) por WhatsApp — recursos humanos', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp07', texto:'Mandarle mensaje a Cristian Cores por LinkedIn', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp08', texto:'Revisar el mercado de cada producto para revenderlo', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp09', texto:'Brief de FORIT para la AAT', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp10', texto:'Pedirle ayuda a los egresados para conseguir clientes', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp11', texto:'Presupuesto para BDA Notificaciones', col:'hoy', proyecto:'bda', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'imp12', texto:'Hablar con jefe de Tami España', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp13', texto:'Seguir a Juli (amiga del Negro) por LinkedIn — ayuda para FORIT', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Cargada manualmente 07/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'imp14', texto:'Enviar presupuesto web El Turístologo a Salvador Dell\'Acqua — cambios "Ver más" → "Reservar"', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-08', origen:'Gmail ⭐ salvador@utriper.com 03/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'imp15', texto:'Empower informe 2 — vence plazo (alerta Airtable)', col:'hoy', proyecto:'power', resp:'vicky', fecha:'2026-06-08', origen:'Gmail ⭐ Airtable 02/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'imp16', texto:'Historias que inspiran: de FORIT a su primer empleo tech — vence plazo (alerta Airtable)', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-08', origen:'Gmail ⭐ Airtable 02/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'imp17', texto:'Publicar certificado Claude 101 en LinkedIn', col:'hoy', proyecto:'personal', resp:'vicky', fecha:'', origen:'Gmail ⭐ Anthropic 08/06', imp:false, addedDate:ahora, createdAt:ahora },
    ];
    var idsExistentes = new Set(data.tareas.map(function(t){ return t.id; }));
    var agregadas = 0;
    nuevas.forEach(function(t) { if (!idsExistentes.has(t.id)) { data.tareas.push(t); agregadas++; } });
    if (agregadas > 0) saveData(data);
  })();

  (function importarDailyTL08062026() {
    var ahora = new Date().toISOString();
    // Tareas de Vicky surgidas del Daily TL 2026-06-08 09:36
    var nuevasVicky = [
      { id:'d0806v1', texto:'Crear grupo de comunicación con Alex Lucero para gestionar las credenciales productivas del proyecto BDA (necesarias para que Alex avance con la app)', col:'hoy', proyecto:'bda', resp:'vicky', fecha:'2026-06-08', origen:'Daily TL 08/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'d0806v2', texto:'Insistir a Alfred para que libere las funcionalidades de las páginas restantes del diseño Power — Agus pide específicamente desbloquear secciones "Nosotros" y "Enfoque" en HTML incluso sin aprobación final del cliente, para que el equipo pueda avanzar', col:'hoy', proyecto:'power', resp:'vicky', fecha:'2026-06-08', origen:'Daily TL 08/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'d0806v3', texto:'Seguimiento autoevaluaciones de desempeño — Bruno recordó que Lucio, Agus y Seba tienen autoevaluaciones pendientes en la plataforma; chequear con Vic F estado de las evaluaciones del resto del equipo', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-09', origen:'Daily TL 08/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'d0806v4', texto:'Mayira deja el proyecto: consiguió empleo formal — definir redistribución de tareas con Bruno y comunicarlo al equipo', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-08', origen:'Daily TL 08/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'d0806v5', texto:'Coordinar con Lucio creación de entorno de pruebas ZLO para gestionar modificaciones y bugs tras la última demo — Lucio enviará los detalles por Discord', col:'hoy', proyecto:'zlo', resp:'vicky', fecha:'2026-06-09', origen:'Daily TL 08/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'d0806v6', texto:'Hacer feedback a Martina sobre rol protagónico en reuniones con cliente Liga — alineado con devolución de Bruno tras la última demo con Javier', col:'hoy', proyecto:'liga', resp:'vicky', fecha:'2026-06-09', origen:'Daily TL 08/06', imp:false, addedDate:ahora, createdAt:ahora },
    ];
    var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
    var agV = 0;
    nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
    if (agV > 0) saveData(data);

    // Tareas del Equipo TL surgidas del Daily TL 2026-06-08 09:36
    var nuevasTeam = [
      { id:'d0806t1', texto:'Ordenar componentes de la tabla de tareas del proyecto Accomodation/Reconocimiento y asignar tarea específica a cada integrante del equipo, manteniendo el flujo de revisión de pares (code reviews) para asegurar control de cambios', resp:'alex', proyecto:'power', fecha:'2026-06-09', imp:true, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t2', texto:'Coordinar reunión con Victoria Fornieles para evaluar cambios de Reconocimiento y rendimiento — generar tareas adicionales según corresponda', resp:'alex', proyecto:'power', fecha:'2026-06-10', imp:false, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t3', texto:'Solicitar al equipo la lista de pruebas unitarias completadas y las pendientes — dividir el trabajo para asignar 1 o 2 pruebas por persona (prioridad según pidió Bruno)', resp:'alex', proyecto:'power', fecha:'2026-06-09', imp:true, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t4', texto:'Capacitar al coordinador general sobre las directivas del proyecto Reconocimiento, asegurando que pueda apoyar al equipo y mantener los estándares cuando Alex no esté presente', resp:'alex', proyecto:'power', fecha:'2026-06-12', imp:false, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t5', texto:'Insistir al equipo ZL Store para que envíen el feedback pendiente sobre el desempeño de Bruno Mentasti', resp:'lucio', proyecto:'coordi', fecha:'2026-06-09', imp:false, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t6', texto:'Enviar por Discord las especificaciones de las tareas adicionales de testeo tras la demo ZLO (incluye crear entorno de pruebas con apoyo de Vicky)', resp:'lucio', proyecto:'zlo', fecha:'2026-06-09', imp:true, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t7', texto:'Solicitar a Agustín Kassargian o Alex Lucero las variables de entorno productivas necesarias para realizar el despliegue a producción de Reconocimiento', resp:'seba', proyecto:'power', fecha:'2026-06-09', imp:true, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t8', texto:'Borrar la base de datos actual del ambiente de Reconocimiento antes de ejecutar la migración — cuidando no perder las evaluaciones previas almacenadas (despliegue local ya configurado, espera confirmación de estabilidad)', resp:'seba', proyecto:'power', fecha:'2026-06-09', imp:true, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t9', texto:'Asumir rol protagónico y activo durante las reuniones con cliente Liga — expresar opiniones propias, apoyar al equipo y mantener flujo comunicativo constante (devolución de Bruno tras última demo con Javier)', resp:'martina', proyecto:'liga', fecha:'2026-06-12', imp:true, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t10', texto:'Completar autoevaluación de desempeño TL pendiente en la plataforma (recordatorio Bruno 08/06)', resp:'seba', proyecto:'coordi', fecha:'2026-06-09', imp:true, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t11', texto:'Continuar revisión de documentación en Drive y pruebas manuales en producción de AMIA/Cuidamia — documentar diferencias con texto e imágenes para su posterior unificación. Recordatorio: migración cargó 100k postulantes (de 1.3M) en RDS; falta migrar empresas, postulaciones y matches (no estaban en origen)', resp:'nahuel', proyecto:'amia', fecha:'2026-06-10', imp:false, done:false, origen:'Daily TL 08/06', createdAt:ahora },
      { id:'d0806t12', texto:'Avanzar con ajustes de frontend y navbar de Power apenas Alfred libere los diseños — implementar primero en Storybook para asegurar consistencia (app ya desplegada, link compartido en canal)', resp:'agus', proyecto:'power', fecha:'2026-06-10', imp:false, done:false, origen:'Daily TL 08/06', createdAt:ahora },
    ];
    var idsT = new Set(teamData.tareas.map(function(t){ return t.id; }));
    var agT = 0;
    nuevasTeam.forEach(function(t){ if (!idsT.has(t.id)) { teamData.tareas.push(t); agT++; } });
    if (agT > 0) saveTeam(teamData);
  })();

  (function importarAgenda09062026() {
    var ahora = new Date().toISOString();
    var nuevas = [
      { id:'ag0906v1', texto:'Seguimiento Daily equipo TL 09/06 — cargar pendientes del equipo surgidos de la reunión de hoy', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-09', origen:'Daily TL 09/06 09:45hs', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'ag0906v2', texto:'Seguimiento reunión AMIA con Vic L (10:15hs) — documentar acuerdos y próximas acciones con Nahuel/Fede', col:'hoy', proyecto:'amia', resp:'vicky', fecha:'2026-06-09', origen:'Agenda 09/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'ag0906v3', texto:'Revisión reu consejo (10:30hs) — revisar minuta previamente y tomar nota de próximos pasos acordados', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-09', origen:'Agenda 09/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'ag0906v4', texto:'Seguimiento reunión con Victoria Lacroze / Juan Vieyra (11:15hs) — documentar acuerdos y definir si hay propuesta a presentar', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-09', origen:'Agenda 09/06 — nueva reunión', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'ag0906v5', texto:'ZL Daily con VL (16:30hs) — preparar temas a tratar con Lucio sobre ZLO: entorno de pruebas y estado del sprint', col:'hoy', proyecto:'zlo', resp:'vicky', fecha:'2026-06-09', origen:'Agenda 09/06', imp:false, addedDate:ahora, createdAt:ahora },
    ];
    var idsExistentes = new Set(data.tareas.map(function(t){ return t.id; }));
    var agregadas = 0;
    nuevas.forEach(function(t) { if (!idsExistentes.has(t.id)) { data.tareas.push(t); agregadas++; } });
    if (agregadas > 0) saveData(data);
  })();

  function autoPromote() {
    var ahora = new Date();
    ahora.setHours(0,0,0,0);
    var cambiaron = false;
    data.tareas.forEach(function(t) {
      if (t.done || t.col === 'hoy' || t.col === 'terminadas') return;
      // CUALQUIER COLUMNA → HOY: si la fecha de vencimiento llegó o pasó
      if (t.fecha) {
        var venc = new Date(t.fecha); venc.setHours(0,0,0,0);
        if (venc <= ahora) {
          var colOrigen = t.col;
          t.col = 'hoy';
          t.lastMovedToHoy = new Date().toISOString();
          t.promoBadge = '⏰ Venció (' + colOrigen + ')';
          cambiaron = true;
          return;
        }
      }
      // SEGUIMIENTO → HOY: cada 5 días
      if (t.col === 'seguimiento') {
        var last = t.lastMovedToHoy ? new Date(t.lastMovedToHoy) : (t.addedDate ? new Date(t.addedDate) : new Date(t.createdAt));
        last.setHours(0,0,0,0);
        var diff = Math.round((ahora - last) / (1000*60*60*24));
        if (diff >= 5) {
          t.col = 'hoy'; t.lastMovedToHoy = new Date().toISOString();
          t.promoBadge = '🔄 Seguimiento ' + diff + 'd';
          cambiaron = true;
        }
      }
      // MENSUAL → HOY: cada 30 días
      if (t.col === 'mensual') {
        var last2 = t.lastMovedToHoy ? new Date(t.lastMovedToHoy) : (t.addedDate ? new Date(t.addedDate) : new Date(t.createdAt));
        last2.setHours(0,0,0,0);
        var diff2 = Math.round((ahora - last2) / (1000*60*60*24));
        if (diff2 >= 30) {
          t.col = 'hoy'; t.lastMovedToHoy = new Date().toISOString();
          t.promoBadge = '📅 Mensual ' + diff2 + 'd';
          cambiaron = true;
        }
      }
    });
    if (cambiaron) saveData(data);
  }

  autoPromote();

  function diffDias(fechaStr) {
    if (!fechaStr) return null;
    var d = new Date(fechaStr); d.setHours(0,0,0,0);
    return Math.round((d - HOY) / (1000*60*60*24));
  }
  function formatFecha(fechaStr) {
    if (!fechaStr) return '';
    var parts = fechaStr.split('-');
    return parts[2] + '/' + parts[1];
  }
  function fechaDisplay(fechaStr) {
    if (!fechaStr) return { text:'', cls:'' };
    var diff = diffDias(fechaStr);
    if (diff < 0) return { text:'Venció ' + formatFecha(fechaStr) + ' (hace ' + Math.abs(diff) + 'd)', cls:'red' };
    if (diff === 0) return { text:'Hoy ' + formatFecha(fechaStr), cls:'red' };
    if (diff === 1) return { text:'Mañana ' + formatFecha(fechaStr), cls:'amber' };
    if (diff <= 7) return { text:'📅 ' + formatFecha(fechaStr) + ' (' + diff + 'd)', cls:'' };
    return { text:'📅 ' + formatFecha(fechaStr), cls:'' };
  }
  var RESP_EMOJI = { vicky:'🌸', lucio:'🚦', martina:'⚽', nahuel:'🎯', agus:'✂️', seba:'🚀', alex:'🏅', '':'—' };
  var PROJ_NAMES = { coordi:'Coordi', liga:'Liga', zlo:'ZLO', zl:'ZL Store', amia:'AMIA', power:'Empower', bda:'BDA', elclick:'El Click', personal:'Personal', santander:'Santander', muni:'Municipio', quality:'Quality' };

  function renderBoard() {
    var filtProj = document.getElementById('filtro-proyecto').value;
    var busq = document.getElementById('busqueda').value.toLowerCase();
    var tareas = data.tareas.filter(function(t){ return t.col !== 'terminadas'; });
    if (filtProj) tareas = tareas.filter(function(t){ return t.proyecto === filtProj; });
    if (busq) tareas = tareas.filter(function(t){ return t.texto.toLowerCase().indexOf(busq) >= 0; });
    var terminadas = data.tareas.filter(function(t){ return t.col === 'terminadas'; });
    var cols = [
      { id:'todo', label:'TO DO', icon:'📋', dot:'dot-todo', hint:'Tareas planificadas para hacer.' },
      { id:'hoy', label:'HOY', icon:'📌', dot:'dot-hoy', hint:'Tareas de hoy y vencidas.' },
      { id:'seguimiento', label:'SEGUIMIENTO', icon:'🔄', dot:'dot-seg', hint:'Se mueve a HOY cada 5 días.' },
      { id:'mensual', label:'MENSUAL', icon:'📅', dot:'dot-men', hint:'Aparece en HOY una vez por mes.' },
      { id:'terminadas', label:'TERMINADAS', icon:'✅', dot:'dot-done', hint:terminadas.length + ' tareas completadas.' },
    ];
    // Guardar scroll de cada columna antes de redibujar
    var scrollPos = {};
    document.querySelectorAll('.col-cards').forEach(function(el){ scrollPos[el.id] = el.scrollTop; });

    var board = document.getElementById('board');
    board.innerHTML = '';
    cols.forEach(function(col) {
      var colTareas = col.id === 'terminadas' ? terminadas : tareas.filter(function(t){ return t.col === col.id; });
      var pending = colTareas.filter(function(t){ return !t.done; }).length;
      var colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.innerHTML = '<div class="col-head"><div class="col-title"><div class="dot ' + col.dot + '"></div>' + col.icon + ' ' + col.label + '</div><span class="col-count">' + pending + '</span></div><div class="col-hint">' + col.hint + '</div><div class="col-cards" id="cards-' + col.id + '"></div>' + (col.id !== 'terminadas' ? '<button class="btn-add" onclick="abrirModal(\'' + col.id + '\')">&#10133; Agregar tarea</button>' : '');
      board.appendChild(colEl);
      var cardsEl = document.getElementById('cards-' + col.id);
      if (colTareas.length === 0) { cardsEl.innerHTML = '<div class="empty-col">' + (col.id === 'terminadas' ? '🎉 No hay terminadas aún' : 'Sin tareas') + '</div>'; return; }
      colTareas.forEach(function(t) {
        var fd = fechaDisplay(t.fecha);
        var card = document.createElement('div');
        card.className = 'card ' + (t.col==='todo'?'todo-card':t.col==='hoy'?'hoy-card':t.col==='seguimiento'?'seg-card':t.col==='mensual'?'men-card':'') + (t.imp?' imp-card':'') + (t.done?' terminada':'');
        card.draggable = true;
        card.dataset.id = t.id;
        card.addEventListener('dragstart', onDragStart);
        setupTouchDrag(card);
        var chips = '';
        if (t.proyecto) chips += '<span class="chip chip-' + t.proyecto + '">' + (PROJ_NAMES[t.proyecto]||t.proyecto) + '</span>';
        if (t.imp) chips += '<span class="chip chip-imp">Importante</span>';
        if (t.promoBadge) chips += '<span class="promo-badge">' + t.promoBadge + '</span>';
        if (t.recurrente) chips += '<span class="chip chip-recurrente">🔁 Semanal</span>';
        var moveBtns = '';
        if (t.col !== 'todo') moveBtns += '<button class="card-btn" onclick="moverCol(\'' + t.id + '\',\'todo\')">📋 TO DO</button>';
        if (t.col !== 'hoy') moveBtns += '<button class="card-btn" onclick="moverCol(\'' + t.id + '\',\'hoy\')">📌 HOY</button>';
        if (t.col !== 'seguimiento' && t.col !== 'terminadas') moveBtns += '<button class="card-btn" onclick="moverCol(\'' + t.id + '\',\'seguimiento\')">🔄</button>';
        if (t.col !== 'mensual' && t.col !== 'terminadas') moveBtns += '<button class="card-btn" onclick="moverCol(\'' + t.id + '\',\'mensual\')">📅</button>';
        if (t.col === 'terminadas') moveBtns += '<button class="card-btn" onclick="moverCol(\'' + t.id + '\',\'hoy\')">↩</button>';
        moveBtns += '<button class="card-btn" onclick="editarTarea(\'' + t.id + '\')">✏️</button>';
        moveBtns += '<button class="card-btn" onclick="toggleDone(\'' + t.id + '\',true)">✅</button>';
        card.innerHTML = '<div class="card-top"><div class="card-check"><input type="checkbox" ' + (t.done?'checked':'') + ' onchange="toggleDone(\'' + t.id + '\',this.checked)"></div><div class="card-body"><div class="card-title">' + t.texto + '</div><div class="card-chips">' + chips + '</div></div></div><div class="card-actions">' + moveBtns + '</div><div class="card-footer"><div class="card-meta">' + (fd.text?'<span class="card-date ' + fd.cls + '">' + fd.text + '</span>':'') + (t.resp && t.resp!=='vicky'?'<span class="card-resp">' + (RESP_EMOJI[t.resp]||'') + ' ' + t.resp + '</span>':'') + '</div><div style="font-size:9px;color:var(--muted);font-style:italic;text-align:right;">' + (t.origen||'') + '</div></div>';
        cardsEl.appendChild(card);
      });
    });
    // Restaurar scroll después de redibujar
    Object.keys(scrollPos).forEach(function(id){ var el=document.getElementById(id); if(el) el.scrollTop=scrollPos[id]; });

    renderStats();
  }

  function renderStats() {
    var todo = data.tareas.filter(function(t){ return t.col==='todo' && !t.done; }).length;
    var hoy = data.tareas.filter(function(t){ return t.col==='hoy' && !t.done; }).length;
    var seg = data.tareas.filter(function(t){ return t.col==='seguimiento' && !t.done; }).length;
    var men = data.tareas.filter(function(t){ return t.col==='mensual' && !t.done; }).length;
    var done = data.tareas.filter(function(t){ return t.done || t.col==='terminadas'; }).length;
    var imp = data.tareas.filter(function(t){ return t.imp && !t.done && t.col!=='terminadas'; }).length;
    document.getElementById('stats-bar').innerHTML = '<span class="stat-chip" style="background:#ffe4e6;color:#be123c">📋 TO DO: ' + todo + '</span><span class="stat-chip hoy">📌 HOY: ' + hoy + '</span><span class="stat-chip seg">🔄 Seguimiento: ' + seg + '</span><span class="stat-chip men">📅 Mensual: ' + men + '</span><span class="stat-chip done">✅ Terminadas: ' + done + '</span>' + (imp>0?'<span class="stat-chip imp">🔴 Importantes: ' + imp + '</span>':'');
  }

  function renderTeam() {
    var personas = [
      { id:'lucio', nombre:'🚦 Lucio · TL ZL Store', color:'#7c3aed' },
      { id:'martina', nombre:'⚽ Martina · TL Liga', color:'#d97706' },
      { id:'agus', nombre:'✂️ Agus · TL Empower', color:'#2563eb' },
      { id:'seba', nombre:'🚀 Seba · DevOps', color:'#0891b2' },
      { id:'nahuel', nombre:'🎯 Nahuel/Fede · TL AMIA', color:'#059669' },
      { id:'alex', nombre:'🏅 Alex · TL Reconocimiento + BDA', color:'#ea580c' },
    ];
    var done = teamData.tareas.filter(function(t){ return t.done; }).length;
    var pend = teamData.tareas.filter(function(t){ return !t.done; }).length;
    document.getElementById('stats-equipo').innerHTML = '<span class="stat-chip hoy">📋 Total: ' + teamData.tareas.length + '</span><span class="stat-chip seg">⏳ Pendientes: ' + pend + '</span><span class="stat-chip done">✅ Terminadas: ' + done + '</span>';
    var tv = document.getElementById('team-view');
    tv.innerHTML = '';
    personas.forEach(function(p) {
      var tareas = teamData.tareas.filter(function(t){ return t.resp === p.id; });
      if (tareas.length === 0) return;
      var pendCount = tareas.filter(function(t){ return !t.done; }).length;
      var div = document.createElement('div');
      div.className = 'team-persona';
      div.style.borderLeft = '4px solid ' + p.color;
      var rows = tareas.map(function(t) {
        var fd = fechaDisplay(t.fecha);
        return '<div class="team-task ' + (t.done?'terminada':'') + '"><input type="checkbox" ' + (t.done?'checked':'') + ' onchange="toggleTeamDone(\'' + t.id + '\',this.checked)"><span class="team-task-text">' + (t.imp?'🔴 ':'') + t.texto + (t.proyecto?(' <span class="chip chip-' + t.proyecto + '" style="font-size:9px">' + (PROJ_NAMES[t.proyecto]||t.proyecto) + '</span>'):'') + '</span>' + (fd.text?'<span class="team-task-date ' + fd.cls + '">' + fd.text + '</span>':'') + '</div>';
      }).join('');
      div.innerHTML = '<div class="team-persona-head" onclick="this.nextElementSibling.classList.toggle(\'open\')"><span class="team-persona-name" style="color:' + p.color + '">' + p.nombre + '</span><span class="team-persona-badge">' + pendCount + ' pendientes</span></div><div class="team-tasks open" id="team-' + p.id + '">' + rows + '<button class="btn-add" onclick="abrirModalTeam(\'' + p.id + '\')" style="margin:6px 0 0">&#10133; Agregar</button></div>';
      tv.appendChild(div);
    });
    var addDiv = document.createElement('div');
    addDiv.innerHTML = '<button class="btn-add" style="width:100%;justify-content:center;" onclick="abrirModalTeam(\'\')">&#10133; Nueva tarea de equipo</button>';
    tv.appendChild(addDiv);
  }

  var currentCol = 'seguimiento';

  function abrirModal(col) {
    currentCol = col || 'seguimiento';
    document.getElementById('f-col').value = currentCol;
    document.getElementById('f-texto').value = '';
    document.getElementById('f-fecha').value = '';
    document.getElementById('f-origen').value = '';
    document.getElementById('f-resp').value = 'vicky';
    document.getElementById('modal-title').textContent = 'Nueva tarea en ' + currentCol.toUpperCase();
    document.getElementById('modal-add').classList.add('visible');
    setTimeout(function(){ document.getElementById('f-texto').focus(); }, 100);
  }

  function abrirModalTeam(resp) {
    document.getElementById('f-col').value = 'hoy';
    document.getElementById('f-texto').value = '';
    document.getElementById('f-fecha').value = '';
    document.getElementById('f-origen').value = '';
    document.getElementById('f-resp').value = resp || 'vicky';
    document.getElementById('modal-title').textContent = 'Nueva tarea del equipo';
    document.getElementById('modal-add').dataset.mode = 'team';
    document.getElementById('modal-add').classList.add('visible');
    setTimeout(function(){ document.getElementById('f-texto').focus(); }, 100);
  }

  function cerrarModal() {
    document.getElementById('modal-add').classList.remove('visible');
    document.getElementById('modal-add').dataset.mode = '';
    delete document.getElementById('modal-add').dataset.editId;
  }

  function editarTarea(id) {
    var t = data.tareas.find(function(x){ return x.id === id; });
    if (!t) return;
    document.getElementById('f-texto').value = t.texto || '';
    document.getElementById('f-col').value = t.col || 'hoy';
    document.getElementById('f-proyecto').value = t.proyecto || 'coordi';
    document.getElementById('f-resp').value = t.resp || 'vicky';
    document.getElementById('f-fecha').value = t.fecha || '';
    document.getElementById('f-origen').value = t.origen || '';
    document.getElementById('modal-title').textContent = '✏️ Editar tarea';
    var m = document.getElementById('modal-add');
    m.dataset.mode = 'edit';
    m.dataset.editId = id;
    m.classList.add('visible');
    setTimeout(function(){ document.getElementById('f-texto').focus(); }, 100);
  }

  function guardarTarea() {
    var texto = document.getElementById('f-texto').value.trim();
    if (!texto) { alert('Escribí qué hay que hacer'); return; }
    var mode = document.getElementById('modal-add').dataset.mode;
    var isTeam = mode === 'team';
    var isEdit = mode === 'edit';
    var ahora = new Date().toISOString();
    if (isEdit) {
      var editId = document.getElementById('modal-add').dataset.editId;
      var t = data.tareas.find(function(x){ return x.id === editId; });
      if (t) {
        t.texto = texto;
        t.col = document.getElementById('f-col').value;
        t.proyecto = document.getElementById('f-proyecto').value;
        t.resp = document.getElementById('f-resp').value;
        t.fecha = document.getElementById('f-fecha').value;
        t.origen = document.getElementById('f-origen').value;
        t.imp = false;
        t.editedAt = ahora;
        saveData(data); renderBoard();
      }
      cerrarModal();
      return;
    }
    if (isTeam) {
      teamData.tareas.push({ id:'team-'+Date.now(), texto:texto, resp:document.getElementById('f-resp').value, proyecto:document.getElementById('f-proyecto').value, fecha:document.getElementById('f-fecha').value, origen:document.getElementById('f-origen').value, imp:false, done:false, createdAt:ahora });
      saveTeam(teamData); renderTeam();
    } else {
      data.tareas.push({ id:'k-'+Date.now(), texto:texto, col:document.getElementById('f-col').value, proyecto:document.getElementById('f-proyecto').value, resp:document.getElementById('f-resp').value, fecha:document.getElementById('f-fecha').value, origen:document.getElementById('f-origen').value, imp:false, done:false, addedDate:ahora, createdAt:ahora });
      saveData(data); renderBoard();
    }
    cerrarModal();
  }

  function toggleDone(id, checked) {
    var t = data.tareas.find(function(x){ return x.id === id; });
    if (!t) return;
    t.done = checked; t.col = checked ? 'terminadas' : 'hoy';
    if (checked) t.completedAt = new Date().toISOString();
    saveData(data); renderBoard();
  }

  function toggleTeamDone(id, checked) {
    var t = teamData.tareas.find(function(x){ return x.id === id; });
    if (!t) return;
    t.done = checked;
    if (checked) t.completedAt = new Date().toISOString();
    saveTeam(teamData); renderTeam();
  }

  function moverCol(id, col) {
    var t = data.tareas.find(function(x){ return x.id === id; });
    if (!t) return;
    t.col = col; t.done = false;
    if (col === 'hoy') t.lastMovedToHoy = new Date().toISOString();
    delete t.promoBadge;
    saveData(data); renderBoard();
  }

  function cambiarTab(el) {
    document.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('activo'); });
    el.classList.add('activo');
    var tab = el.dataset.tab;
    document.getElementById('view-kanban').style.display = tab === 'kanban' ? '' : 'none';
    document.getElementById('view-equipo').style.display = tab === 'equipo' ? '' : 'none';
    if (tab === 'equipo') renderTeam();
  }

  function quickAdd() {
    var input = document.getElementById('quick-texto');
    var texto = input.value.trim();
    if (!texto) return;
    var ahora = new Date().toISOString();
    data.tareas.unshift({ id:'qa-'+Date.now(), texto:texto, col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Carga rápida', imp:false, addedDate:ahora, createdAt:ahora });
    saveData(data);
    input.value = '';
    renderBoard();
    // flash feedback
    input.style.borderColor = 'var(--done)';
    setTimeout(function(){ input.style.borderColor = ''; }, 800);
  }

  function copiarLink() {
    var url = window.location.href;
    navigator.clipboard.writeText(url).then(function(){
      var el = document.getElementById('link-copiado');
      el.style.display = 'inline';
      setTimeout(function(){ el.style.display = 'none'; }, 2000);
    }).catch(function(){
      prompt('Copiá este link:', url);
    });
  }

  window.quickAdd = quickAdd;
  window.abrirModal = abrirModal;
  window.abrirModalTeam = abrirModalTeam;
  window.cerrarModal = cerrarModal;
  window.guardarTarea = guardarTarea;
  window.toggleDone = toggleDone;
  window.toggleTeamDone = toggleTeamDone;
  window.moverCol = moverCol;
  window.cambiarTab = cambiarTab;
  window.renderBoard = renderBoard;

  // ── DRAG & DROP (desktop) ──────────────────────────────
  var dragId = null;
  function onDragStart(e) { dragId = e.currentTarget.dataset.id; e.dataTransfer.effectAllowed = 'move'; }
  function setupColDrop() {
    document.querySelectorAll('.col').forEach(function(col){
      col.addEventListener('dragover', function(e){ e.preventDefault(); col.classList.add('drag-over'); });
      col.addEventListener('dragleave', function(e){ if (!col.contains(e.relatedTarget)) col.classList.remove('drag-over'); });
      col.addEventListener('drop', function(e){
        e.preventDefault(); col.classList.remove('drag-over');
        var colId = col.querySelector('.col-cards').id.replace('cards-','');
        if (dragId && colId) { moverCol(dragId, colId); dragId = null; }
      });
    });
  }

  // ── TOUCH DRAG (mobile) ────────────────────────────────
  var touchDragId = null, touchClone = null, touchTimer = null;
  var touchOriginCard = null;

  function setupTouchDrag(card) {
    var startX, startY, didMove;
    card.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX; startY = e.touches[0].clientY; didMove = false;
      touchTimer = setTimeout(function() {
        if (didMove) return;
        touchInitDrag(card, e.touches[0]);
      }, 350);
    }, { passive: true });
    card.addEventListener('touchmove', function(e) {
      var dx = e.touches[0].clientX - startX, dy = e.touches[0].clientY - startY;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) didMove = true;
      if (!touchDragId) return;
      e.preventDefault();
      touchMoveDrag(e.touches[0]);
    }, { passive: false });
    card.addEventListener('touchend', function(e) {
      clearTimeout(touchTimer);
      if (touchDragId) touchEndDrag(e.changedTouches[0]);
    });
    card.addEventListener('touchcancel', function() {
      clearTimeout(touchTimer); touchCleanup();
    });
  }

  function touchInitDrag(card, touch) {
    touchDragId = card.dataset.id;
    touchOriginCard = card;
    var r = card.getBoundingClientRect();
    touchClone = card.cloneNode(true);
    touchClone.style.cssText = 'position:fixed;z-index:9999;width:'+r.width+'px;left:'+r.left+'px;top:'+r.top+'px;opacity:0.88;pointer-events:none;box-shadow:0 10px 30px rgba(0,0,0,0.22);border-radius:8px;transform:scale(1.04);transition:transform .1s;';
    document.body.appendChild(touchClone);
    card.classList.add('touch-dragging');
    if (navigator.vibrate) navigator.vibrate(40);
  }

  function touchMoveDrag(touch) {
    if (!touchClone) return;
    var w = touchClone.offsetWidth;
    touchClone.style.left = (touch.clientX - w/2) + 'px';
    touchClone.style.top  = (touch.clientY - 40) + 'px';
    document.querySelectorAll('.col').forEach(function(c){ c.classList.remove('drag-over'); });
    var el = document.elementFromPoint(touch.clientX, touch.clientY);
    var col = el && el.closest && el.closest('.col');
    if (col) col.classList.add('drag-over');
  }

  function touchEndDrag(touch) {
    var el = document.elementFromPoint(touch.clientX, touch.clientY);
    var col = el && el.closest && el.closest('.col');
    if (col) {
      var cards = col.querySelector('.col-cards');
      if (cards) { var colId = cards.id.replace('cards-',''); if (colId && touchDragId) moverCol(touchDragId, colId); }
    }
    touchCleanup();
  }

  function touchCleanup() {
    if (touchClone) { touchClone.remove(); touchClone = null; }
    if (touchOriginCard) { touchOriginCard.classList.remove('touch-dragging'); touchOriginCard = null; }
    document.querySelectorAll('.col').forEach(function(c){ c.classList.remove('drag-over'); });
    touchDragId = null;
  }

  async function cargarGmail() {
    var btn = document.getElementById('btn-gmail');
    btn.textContent = '⏳ Cargando…'; btn.disabled = true;
    try {
      var result = await window.cowork.callMcpTool('mcp__edd0bb6e-8680-4493-8ada-4c142d2a6419__search_threads', { query:'is:starred', pageSize:30 });
      var threads = (result && result.threads) || [];
      var ahora = new Date().toISOString();
      var idsExistentes = new Set(data.tareas.map(function(t){ return t.gmailThreadId; }).filter(Boolean));
      var nuevas = 0;
      threads.forEach(function(thread){
        if (idsExistentes.has(thread.id)) return;
        var msg = thread.messages && thread.messages[0];
        if (!msg) return;
        var asunto = msg.subject || '(Sin asunto)';
        var remitente = msg.sender ? msg.sender.replace(/<.*>/,'').trim() : 'Desconocido';
        var proyecto = 'coordi';
        var txt = (asunto + ' ' + remitente).toLowerCase();
        if (txt.indexOf('liga')>=0||txt.indexOf('javier')>=0) proyecto='liga';
        else if (txt.indexOf('bda')>=0) proyecto='bda';
        else if (txt.indexOf('amia')>=0||txt.indexOf('cuidamia')>=0) proyecto='amia';
        else if (txt.indexOf('empower')>=0||txt.indexOf('power')>=0) proyecto='power';
        else if (txt.indexOf('zlo')>=0) proyecto='zlo';
        else if (txt.indexOf('click')>=0) proyecto='elclick';
        else if (txt.indexOf('santander')>=0) proyecto='santander';
        data.tareas.push({ id:'gmail-'+thread.id, gmailThreadId:thread.id, texto:asunto+' — '+remitente, col:'hoy', proyecto:proyecto, resp:'vicky', fecha:'', origen:'Gmail ⭐ '+(msg.date?new Date(msg.date).toLocaleDateString('es-AR'):''), imp:false, addedDate:ahora, createdAt:ahora });
        nuevas++;
      });
      if (nuevas > 0) { saveData(data); renderBoard(); btn.textContent = '✅ '+nuevas+' tareas de Gmail ⭐'; }
      else { btn.textContent = '✅ Sin nuevos destacados'; }
    } catch(e) { btn.textContent = '❌ Error al cargar Gmail'; console.error(e); }
    setTimeout(function(){ btn.textContent = '⭐ Cargar Gmail destacados'; btn.disabled = false; }, 3000);
  }
  window.editarTarea = editarTarea;
  window.cargarGmail = cargarGmail;

  // Auto-sync Gmail destacados al abrir el tablero (solo en Cowork)
  if (window.cowork) { setTimeout(cargarGmail, 1500); }


  (function importarDailyTL12062026() {
    var ahora = new Date().toISOString();
    var nuevasVicky = [
      { id:'d1206v1', texto:'Revisar mail del cliente Empower: evaluar cambios de alcance y definir costos adicionales (todo lo fuera de presupuesto se cobra)', col:'hoy', proyecto:'power', resp:'vicky', fecha:'2026-06-12', origen:'Daily TL 12/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'d1206v2', texto:'Reunirse con Nahuel para revisar diferencias AMIA (doc de Alex) y definir tickets y correcciones técnicas', col:'hoy', proyecto:'amia', resp:'vicky', fecha:'2026-06-12', origen:'Daily TL 12/06', imp:true, addedDate:ahora, createdAt:ahora },
    ];
    var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
    var agV = 0;
    nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
    if (agV > 0) saveData(data);
    var nuevasTeam = [
      { id:'d1206t1', texto:'Analizar doc de Alex sobre diferencias AMIA/Cuidamia y coordinar reunión con Vicky', resp:'nahuel', proyecto:'amia', fecha:'2026-06-12', imp:true, done:false, origen:'Daily TL 12/06', createdAt:ahora },
      { id:'d1206t2', texto:'Presentar Demo Reconocimiento "las Vikis" — 14hs (equipo listo, batches redefinidos documentados)', resp:'alex', proyecto:'power', fecha:'2026-06-12', imp:true, done:false, origen:'Daily TL 12/06', createdAt:ahora },
      { id:'d1206t3', texto:'Finalizar deploy Empower con Seba — demo 11hs lista, cerrar últimas tareas del sprint', resp:'agus', proyecto:'power', fecha:'2026-06-12', imp:false, done:false, origen:'Daily TL 12/06', createdAt:ahora },
    ];
    var idsT = new Set(teamData.tareas.map(function(t){ return t.id; }));
    var agT = 0;
    nuevasTeam.forEach(function(t){ if (!idsT.has(t.id)) { teamData.tareas.push(t); agT++; } });
    if (agT > 0) saveTeam(teamData);
  })();

  (function importarGmailStarred12062026() {
    var ahora = new Date().toISOString();
    var nuevas = [
      { id:'gmail-ghl-turistologo', gmailThreadId:'19e8f1f52f44551b', texto:'El Turistólogo — evaluar y presupuestar integración Go High Level en la web (solicitud Salvador Dell\'Acqua, 10/06)', col:'hoy', proyecto:'elclick', resp:'vicky', fecha:'2026-06-15', origen:'Gmail ⭐ salvador@utriper.com 10/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'gmail-amia-focusxlsx', gmailThreadId:'19ead9f2e806f680', texto:'AMIA Correcciones focus.xlsx — Javier Ciccarelli realizó cambios (08-09/06): revisar con Nahuel si requieren acción', col:'hoy', proyecto:'amia', resp:'vicky', fecha:'2026-06-13', origen:'Gmail ⭐ jciccarelli@amia 09/06', imp:false, addedDate:ahora, createdAt:ahora },
    ];
    var idsExistentes = new Set(data.tareas.map(function(t){ return t.id; }));
    var agregadas = 0;
    nuevas.forEach(function(t) { if (!idsExistentes.has(t.id)) { data.tareas.push(t); agregadas++; } });
    if (agregadas > 0) saveData(data);
  })();

  (function importarBarrido13062026() {
    var ahora = new Date().toISOString();
    var nuevas = [
      { id:'gmail-amia-daniela1206', gmailThreadId:'19eb730d0e3fefe9', texto:'AMIA — Revisar y responder a Daniela Maero: confirmó errores sin resolver (filtros de edad no migrados). Coordinar con Nahuel próximos pasos', col:'hoy', proyecto:'amia', resp:'vicky', fecha:'2026-06-13', origen:'Gmail ⭐ dmaero@amia.org.ar 12/06', imp:true, addedDate:ahora, createdAt:ahora },
    ];
    var idsExistentes = new Set(data.tareas.map(function(t){ return t.id; }));
    var agregadas = 0;
    nuevas.forEach(function(t) { if (!idsExistentes.has(t.id)) { data.tareas.push(t); agregadas++; } });
    if (agregadas > 0) saveData(data);
  })();

  (function importarBarrido14062026() {
    var ahora = new Date().toISOString();
    var nuevasVicky = [
      { id:'gmail-zlo-propuesta1306', gmailThreadId:'19eb89e8b97aa956', texto:'ZLO — Enviar datos de cuenta bancaria a feraduriz@gmail.com: confirmaron propuesta de 4 cambios y aguardan transferencia del pago', col:'hoy', proyecto:'zlo', resp:'vicky', fecha:'2026-06-16', origen:'Gmail ⭐ feraduriz@gmail.com 13/06', imp:true, addedDate:ahora, createdAt:ahora },
    ];
    var nuevasTeam = [
      { id:'gmail-zlo-cloudflare1306', texto:'Actualizar nameservers de zlestore.com para activar protección Cloudflare', resp:'seba', proyecto:'zlo', fecha:'2026-06-16', imp:true, done:false, origen:'Gmail ⭐ Cloudflare 13/06', createdAt:ahora },
    ];
    var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
    var agV = 0;
    nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
    if (agV > 0) saveData(data);
    var idsT = new Set(teamData.tareas.map(function(t){ return t.id; }));
    var agT = 0;
    nuevasTeam.forEach(function(t){ if (!idsT.has(t.id)) { teamData.tareas.push(t); agT++; } });
    if (agT > 0) saveTeam(teamData);
  })();

  // ── BARRIDO 15/06/2026 ──────────────────────────────────
  (function importarBarrido15062026() {
    // Lunes 15/06. Reuniones del día:
    // 08:00hs Empower Informe de avance 2 (con Victoria Fornieles) — doc "informe empower jun 2026" modificado a las 21:36
    // 09:45hs Daily equipo TL — sin doc Gemini en Drive
    // 12:01hs BDA Reunión con Vicky — DECLINADA por Vicky
    // Sin nuevos Gmail destacados desde el 14/06. Drive inbox vacío.
    var ahora = new Date().toISOString();
    var nuevasVicky = [
      { id:'b1506v1', texto:'Confirmar envío formal del Informe de Progreso Empower (Grant G-202503-02829) a Ingrid Abanto (iabanto@empowerweb.org) y Daniel Parnetti — doc editado el 15/06, vencía ese día', col:'hoy', proyecto:'power', resp:'vicky', fecha:'2026-06-16', origen:'Empower Informe de avance 2 — 08:00hs 15/06', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'b1506v2', texto:'Revisar si hay doc Gemini de la Daily TL 15/06 en Drive y cargar los pendientes del equipo', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-16', origen:'Daily TL 15/06', imp:false, addedDate:ahora, createdAt:ahora },
    ];
    var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
    var agV = 0;
    nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
    if (agV > 0) saveData(data);
  })();


  // ── BARRIDO 16/06/2026 ──────────────────────────────────
  (function importarBarrido16062026() {
    // Reuniones 16/06 con minuta Gemini:
    // 09:30 Reu con Pau (Vistas) — doc OK
    // 11:15 Feedback Conectados (Empower / Alfredo Kohan + Ingrid) — doc OK
    // 14:30 Reu con VF y VL / Martina Renzi (BDA → Finnegans) — doc OK
    // Sin minuta: Daily TL 16/06, AMIA Reunion 10:15, ZL Daily 16:30
    var ahora = new Date().toISOString();
    var nuevasVicky = [
      { id:'b1606v1', texto:'Consultar con Daniel Feinman condiciones de Vistas: cómo participar con dos unidades distintas bajo un mismo paraguas jurídico, y si pueden asistir las dos (VL y VF)', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-20', origen:'Reu con Pau 16/06 09:30hs — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'b1606v2', texto:'Enviar a Ingrid Abanto (Empower) las dos alternativas para organizar la arquitectura del sitio con múltiples idiomas', col:'hoy', proyecto:'power', resp:'vicky', fecha:'2026-06-20', origen:'Feedback Conectados 16/06 11:15hs — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'b1606v3', texto:'BDA — Evaluar internamente con VF la viabilidad de traspasar la continuidad del proyecto al equipo Finnegans (Ulises Stortini). Definir pasos y comunicarlos', col:'hoy', proyecto:'bda', resp:'vicky', fecha:'2026-06-19', origen:'Reu Martina Renzi (Finnegans) 16/06 14:30hs — Gemini', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'b1606v4', texto:'BDA — Gestionar cobro del 50% de deuda pendiente antes de confirmar el cierre del contrato', col:'hoy', proyecto:'bda', resp:'vicky', fecha:'2026-06-19', origen:'Reu Martina Renzi (Finnegans) 16/06 14:30hs — Gemini', imp:true, addedDate:ahora, createdAt:ahora },
      { id:'b1606v5', texto:'BDA — Si se decide la transición: coordinar charla técnica entre equipo FORIT y Ulises/Dani (Finnegans) para revisión de código y transferencia de accesos', col:'seguimiento', proyecto:'bda', resp:'vicky', fecha:'', origen:'Reu Martina Renzi (Finnegans) 16/06 14:30hs — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
    ];
    var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
    var agV = 0;
    nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
    if (agV > 0) saveData(data);
    var nuevasTeam = [
      { id:'b1606t1', texto:'Enviar por escrito los detalles sobre la implementación de métricas y el funcionamiento del contador de descargas en la plataforma Empower', resp:'agus', proyecto:'power', fecha:'2026-06-20', imp:false, done:false, origen:'Feedback Conectados 16/06 11:15hs — Gemini', createdAt:ahora },
      { id:'b1606t2', texto:'Estudiar e implementar la búsqueda por tipo de recurso usando el sistema de etiquetas actual en Empower', resp:'agus', proyecto:'power', fecha:'2026-06-20', imp:false, done:false, origen:'Feedback Conectados 16/06 11:15hs — Gemini', createdAt:ahora },
    ];
    var idsT = new Set(teamData.tareas.map(function(t){ return t.id; }));
    var agT = 0;
    nuevasTeam.forEach(function(t){ if (!idsT.has(t.id)) { teamData.tareas.push(t); agT++; } });
    if (agT > 0) saveTeam(teamData);
  })();

  // ── BARRIDO 17/06/2026 ──────────────────────────────────
  (function importarBarrido17062026() {
    // Gmail ⭐ nuevo hoy: AMIA Familias Cuidamia (Claudia Flores)
    // Drive: "Etapa 5 La Liga.docx" creada 16/06 21:17 — lista para presentar hoy
    // Agenda hoy: Daily TL 09:45 | ForIT-Acn 12:00 | Empower 12:45 | La Liga 16:30
    var ahora = new Date().toISOString();
    var nuevasVicky = [
      { id:'b1706v1', texto:'AMIA — Revisar y procesar base de datos de familias Cuidamia enviada por Claudia Flores (cflores@amia.org.ar). Coordinar con Nahuel próximos pasos', col:'hoy', proyecto:'amia', resp:'vicky', fecha:'2026-06-18', origen:'Gmail ⭐ cflores@amia.org.ar 17/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'b1706v2', texto:'Reunión ForIT-Acn (Accenture) 12:00hs Teams — con Melina Casabene, Celina Davola y Florencia Val', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-17', origen:'Agenda 17/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'b1706v3', texto:'Reunión Empower con Vicky L 12:45hs — revisar opciones de arquitectura multiidioma para presentar a Ingrid', col:'hoy', proyecto:'power', resp:'vicky', fecha:'2026-06-17', origen:'Agenda 17/06', imp:false, addedDate:ahora, createdAt:ahora },
      { id:'b1706v4', texto:'Reunión La Liga con Vic 16:30hs — presentar propuesta Etapa 5 (USD 2.360, 2 meses). Doc "Etapa 5 La Liga.docx" listo en Drive', col:'hoy', proyecto:'liga', resp:'vicky', fecha:'2026-06-17', origen:'Agenda 17/06 + Drive 16/06', imp:true, addedDate:ahora, createdAt:ahora },
    ];
    var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
    var agV = 0;
    nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
    if (agV > 0) saveData(data);
  })();



  (function importarBarrido18062026() {
      // Fuentes procesadas:
      // - Daily TL 17/06 09:44 (doc Gemini encontrado en Drive sharedWithMe)
      // - Montessori: Reu con Vic L 17/06 14:00 (doc Gemini encontrado en Drive)
      // - Gmail ⭐ nuevos 16-17/06: pago Alex Pumari, Soledad Info ForIT, recibo ZLO Sprint3, alerta presupuesto ZLO etapa5
      // - Empower: factura 2do pago creada 17/06 (Invoice $6,550)
      // - Agenda hoy 18/06: Daily TL 09:45 | Revisión web FORIT 10:15 | Montessori Reu 14:00
      var ahora = new Date().toISOString();
  
      // — Tareas Vicky surgidas de Daily TL 17/06 —
      var nuevasVicky = [
        { id:'d1706v1', texto:'Confirmar cierre oficial de BDA y comunicar reasignación de Alex Lucero a La Liga — informar al equipo y actualizar Airtable', col:'hoy', proyecto:'bda', resp:'vicky', fecha:'2026-06-19', origen:'Daily TL 17/06 09:44 — Gemini', imp:true, addedDate:ahora, createdAt:ahora },
        { id:'d1706v2', texto:'Mantener abiertos los canales de comunicación con el equipo AMIA en standby — animar a los miembros a practicar y mantener el ritmo durante la pausa', col:'seguimiento', proyecto:'amia', resp:'vicky', fecha:'', origen:'Daily TL 17/06 09:44 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        // — Tareas Vicky surgidas de Montessori Reu 17/06 —
        { id:'mont1706v1', texto:'Montessori — Enviar Excel con propuesta original del proyecto y listado de tareas técnicas al equipo (Josué, Pilar, Lucas)', col:'hoy', proyecto:'montessori', resp:'vicky', fecha:'2026-06-19', origen:'Montessori Reu 17/06 14:00 — Gemini', imp:true, addedDate:ahora, createdAt:ahora },
        { id:'mont1706v2', texto:'Montessori — Crear sección en Airtable para seguimiento de actividades del equipo (tabla de tareas y bugs)', col:'hoy', proyecto:'montessori', resp:'vicky', fecha:'2026-06-19', origen:'Montessori Reu 17/06 14:00 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'mont1706v3', texto:'Montessori — Verificar consumo de tráfico del sitio en AWS', col:'hoy', proyecto:'montessori', resp:'vicky', fecha:'2026-06-20', origen:'Montessori Reu 17/06 14:00 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'mont1706v4', texto:'Montessori — Solicitar a Seba acceso a la base de datos para armar entorno de pruebas separado de producción', col:'hoy', proyecto:'montessori', resp:'vicky', fecha:'2026-06-19', origen:'Montessori Reu 17/06 14:00 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'mont1706v5', texto:'Montessori — Crear carpeta de Drive con documentación, propuestas y referencias de apps competidoras; compartir acceso vía Discord al equipo', col:'hoy', proyecto:'montessori', resp:'vicky', fecha:'2026-06-20', origen:'Montessori Reu 17/06 14:00 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        // — Gmail ⭐ 16-17/06 —
        { id:'gmail-pago-alexpumari', gmailThreadId:'19ed604e7e7ce211', texto:'Pago pendiente FORIT — gestionar pago a Alex Pumari (alerta Airtable 17/06)', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-19', origen:'Gmail ⭐ Airtable 17/06', imp:true, addedDate:ahora, createdAt:ahora },
        { id:'gmail-soledad-forit', gmailThreadId:'19ebd3d395f7e449', texto:'Soledad (sole8a@gmail.com) — Leer y responder propuesta de estrategia de ventas y posicionamiento de ForIT', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-20', origen:'Gmail ⭐ sole8a@gmail.com 17/06', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'gmail-recibo-zlo-s3', gmailThreadId:'19ed6376bd6e9387', texto:'ZLO Sprint 3 — Verificar y registrar recibo por $446.290 (Desarrollo Web) en planilla contable', col:'hoy', proyecto:'zlo', resp:'vicky', fecha:'2026-06-19', origen:'Gmail ⭐ Airtable recibo 17/06', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'gmail-alerta-presupuesto-zlo5', gmailThreadId:'19ed2c88006b69c5', texto:'ALERTA: revisar y ajustar presupuesto de JR de ZLO Store Etapa 5 — se está excediendo el límite previsto', col:'hoy', proyecto:'zlo', resp:'vicky', fecha:'2026-06-19', origen:'Gmail ⭐ Airtable alerta 16/06', imp:true, addedDate:ahora, createdAt:ahora },
        // — Empower segundo pago —
        { id:'empower-2dopago-1706', texto:'Empower — Gestionar envío de factura de 2do pago ($6.550 USD) a pbravo@empowerweb.org y dparnetti@empowerweb.org. Invoice template creado en Drive el 17/06', col:'hoy', proyecto:'power', resp:'vicky', fecha:'2026-06-20', origen:'Drive Invoice Empower 2do pago 17/06', imp:true, addedDate:ahora, createdAt:ahora },
        // — Agenda 18/06 —
        { id:'ag1806v1', texto:'Revisión web FORIT 10:15hs — reunión con Victoria Fornieles (programacion@)', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'2026-06-18', origen:'Agenda 18/06', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'ag1806v2', texto:'Montessori: Reu con Vic L 14:00hs — segunda sesión de revisión técnica con Josué, Pilar, Lucas', col:'hoy', proyecto:'montessori', resp:'vicky', fecha:'2026-06-18', origen:'Agenda 18/06', imp:false, addedDate:ahora, createdAt:ahora },
      ];
      var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
      var agV = 0;
      nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
      if (agV > 0) saveData(data);
  
      // — Tareas equipo surgidas de Daily TL 17/06 —
      var nuevasTeam = [
        { id:'d1706t1', texto:'Actualizar script: ajustar código para contemplar el contador de incidencias y eliminar instancias repetidas de partidos', resp:'martina', proyecto:'liga', fecha:'2026-06-19', imp:true, done:false, origen:'Daily TL 17/06 — Gemini', createdAt:ahora },
        { id:'d1706t2', texto:'Fomentar colaboración: incentivar a los miembros del equipo a mantener ritmo de trabajo mientras AMIA está en pausa', resp:'nahuel', proyecto:'amia', fecha:'2026-06-20', imp:false, done:false, origen:'Daily TL 17/06 — Gemini', createdAt:ahora },
        { id:'d1706t3', texto:'Pulir documentación técnica pendiente en archivos del proyecto AMIA', resp:'nahuel', proyecto:'amia', fecha:'2026-06-20', imp:false, done:false, origen:'Daily TL 17/06 — Gemini', createdAt:ahora },
        { id:'d1706t4', texto:'Dar bienvenida formal a la nueva integrante que se incorpora al equipo', resp:'lucio', proyecto:'coordi', fecha:'2026-06-18', imp:false, done:false, origen:'Daily TL 17/06 — Gemini', createdAt:ahora },
        { id:'d1706t5', texto:'Enviar lista de tareas pendientes al equipo de gestión (Vicky/Bruno)', resp:'alex', proyecto:'liga', fecha:'2026-06-19', imp:true, done:false, origen:'Daily TL 17/06 — Gemini', createdAt:ahora },
        // — Tareas equipo Montessori (juniors asignados al proyecto) —
        { id:'mont1706t1', texto:'Montessori — Identificar y documentar todos los errores/fallos encontrados en la plataforma, con causas y evidencia visual (sin escribir en producción)', resp:'lucio', proyecto:'montessori', fecha:'2026-06-20', imp:true, done:false, origen:'Montessori Reu 17/06 — Gemini', createdAt:ahora },
        { id:'mont1706t2', texto:'Montessori — Documentar flujos de trabajo, procesos operativos y guía de configuración inicial del entorno', resp:'lucio', proyecto:'montessori', fecha:'2026-06-20', imp:false, done:false, origen:'Montessori Reu 17/06 — Gemini', createdAt:ahora },
      ];
      var idsT = new Set(teamData.tareas.map(function(t){ return t.id; }));
      var agT = 0;
      nuevasTeam.forEach(function(t){ if (!idsT.has(t.id)) { teamData.tareas.push(t); agT++; } });
      if (agT > 0) saveTeam(teamData);
    })();
  
  
    // ── RELEVE COMPLETO TRANSCRIPCIONES GEMINI (hasta 18/06/2026) ────────────────
    (function importarReleveCompleto() {
      // Reuniones: Demo Empower 12/06 | Daniel Feinmann 12/06 | Demo Reconoc 12/06
      // Juan Vieyra 09/06 + 10/06 | Revision consejo 09/06 | Reunión técnica Liga AWS 10/06
      // Damián Perez 01/06 | Reu Liga 11/05 | Demo AMIA 08/05 | Validación ZL Store 08/05
      // Demo Empower 13/05 | Hernan Kohan (El Click) 01/05
      var ahora = new Date().toISOString();
      var nuevasVicky = [
        { id:'relv-1206e1', texto:'Empower — Informar a Alfredo Kohan sobre las carencias detectadas en demo (menú mobile, navegación Enfoques/Ejes, filtros de recursos) y solicitar actualizaciones de diseño', col:'seguimiento', proyecto:'power', resp:'vicky', fecha:'', origen:'Demo Empower 12/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-1206vt1', texto:'Vistage — Analizar propuesta de Daniel Feinmann: revisar los números de la fundación y evaluar viabilidad membresía grupo Triple Impacto ($150.000/mes)', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Reu Daniel Feinmann 12/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-1206vt2', texto:'Vistage — Contactar a Daniel Feinmann para comunicar decisión sobre la membresía (danielfeinmann@gmail.com)', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Reu Daniel Feinmann 12/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-0906rc1', texto:'Transferir datos de egresados comisión 25 a la planilla violeta y asegurar que la info de estudiantes esté actualizada en el reporte', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Revision reu consejo 09/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-0906rc2', texto:'Enviar respuesta a personas entrevistadas para el puesto semisenior y finalizar el proceso de evaluación de candidatos', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Revision reu consejo 09/06 — Gemini', imp:true, addedDate:ahora, createdAt:ahora },
        { id:'relv-0906rc3', texto:'Solicitar a Bruno o Flor lista de términos y condiciones para respaldar documentación comercial — elaborar cláusulas que definan límites profesionales con clientes', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Revision reu consejo 09/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-0906rc4', texto:'Notificar a Sol que el proceso de búsqueda y entrenamiento de estudiantes requiere 1 mes de anticipación mínimo', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Revision reu consejo 09/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-0906rc5', texto:'Contactar a Ailu o fundaciones para solicitar lista de egresados de San Miguel — iniciar convocatoria de candidatos', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Revision reu consejo 09/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-0906jv1', texto:'Comercial — Contactar candidata de LinkedIn con perfil de ventas en IBM para ofrecerle rol comercial con comisión en ForIT', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Reu Juan Vieyra 09/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-0906jv2', texto:'Montessori — Enviar brief y modelo actual del producto a Juan Vieyra (juanmartinvieyra@gmail.com) para que evalúe y dé feedback', col:'seguimiento', proyecto:'montessori', resp:'vicky', fecha:'', origen:'Reu Juan Vieyra 09/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-0906jv3', texto:'Montessori — Consultar con Bruno el esfuerzo técnico necesario para neutralizar/replicar la plataforma Montessori', col:'seguimiento', proyecto:'montessori', resp:'vicky', fecha:'', origen:'Reu Juan Vieyra 09/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-1006jv1', texto:'Reconocimiento/RRHH — Analizar modelos de negocio para comercializar el sistema de evaluaciones; preparar presentación con funcionalidades del sistema', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Reu Juan Vieyra 10/06 10:21 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-1006jv2', texto:'Reconocimiento/RRHH — Elaborar video promocional del producto con colaboradores del equipo', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Reu Juan Vieyra 10/06 10:21 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-1006jv3', texto:'Reconocimiento/RRHH — Coordinar con Bruno la estructura del equipo encargado de analizar el desarrollo del proyecto', col:'seguimiento', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Reu Juan Vieyra 10/06 10:21 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-1006aws1', texto:'Liga — Subir a Drive la grabación de la reunión técnica del 10/06 y el archivo de configuración de acceso seguro SSH que compartió Seba', col:'seguimiento', proyecto:'liga', resp:'vicky', fecha:'', origen:'Reunión técnica Liga AWS 10/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-0106dp1', texto:'Somos Pymes / Damián Pérez — Enviar maqueta o demo de la plataforma de inserción laboral para agendar reunión de seguimiento', col:'mensual', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Reu Damián Perez 01/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-1105l1', texto:'Liga — Armar Excel con estimación de costo de funcionalidades Etapa 5: gestión de jugadores, persistencia de datos, Google Analytics, notificaciones Tuailo/WhatsApp', col:'mensual', proyecto:'liga', resp:'vicky', fecha:'', origen:'Reu con VL y la Liga 11/05 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-1105l2', texto:'Liga — Buscar en Notion/Drive ejemplo de cómo FD arma tareas técnicas detalladas (estimaciones optimista/pesimista/medio) para compartir con el equipo', col:'mensual', proyecto:'liga', resp:'vicky', fecha:'', origen:'Reu con VL y la Liga 11/05 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'relv-0105hk1', texto:'El Click ZLO — Revisar textos del email de confirmación de delivery + confirmar que productos retornables aparecen al final del pedido', col:'mensual', proyecto:'zlo', resp:'vicky', fecha:'', origen:'Reu Hernan Kohan 01/05 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
      ];
      var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
      var agV = 0;
      nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
      if (agV > 0) saveData(data);
  
      var nuevasTeam = [
        { id:'relv-1206et1', texto:'Corregir menú hamburguesa mobile: ajustar para que ocupe correctamente toda la pantalla en dispositivos móviles', resp:'agus', proyecto:'power', fecha:'', imp:true, done:false, origen:'Demo Empower 12/06 — Gemini', createdAt:ahora },
        { id:'relv-1206et2', texto:'Optimizar flujo de navegación: corregir recorrido entre Enfoques y Ejes para que el usuario acceda de forma lógica sin retroceder constantemente', resp:'agus', proyecto:'power', fecha:'', imp:true, done:false, origen:'Demo Empower 12/06 — Gemini', createdAt:ahora },
        { id:'relv-1206et3', texto:'Sincronizar filtros de recursos: ajustar botones "Ver recursos" para que apliquen correctamente los filtros de categorías seleccionadas', resp:'agus', proyecto:'power', fecha:'', imp:false, done:false, origen:'Demo Empower 12/06 — Gemini', createdAt:ahora },
        { id:'relv-1206et4', texto:'Mejorar búsqueda: optimizar funcionalidad y aplicar lógica de filtrado consistente con opción de limpiar resultados', resp:'agus', proyecto:'power', fecha:'', imp:false, done:false, origen:'Demo Empower 12/06 — Gemini', createdAt:ahora },
        { id:'relv-1206et5', texto:'Agregar botones de navegación (arriba, atrás, adelante) para mejorar flujo de lectura de información', resp:'agus', proyecto:'power', fecha:'', imp:false, done:false, origen:'Demo Empower 12/06 — Gemini', createdAt:ahora },
        { id:'relv-1206et6', texto:'Preparar minuta organizada con correcciones necesarias y preguntas pendientes para el cliente o Alfredo Kohan', resp:'agus', proyecto:'power', fecha:'', imp:false, done:false, origen:'Demo Empower 12/06 — Gemini', createdAt:ahora },
        { id:'relv-1206r1', texto:'Subir archivos de diseño Figma del producto Reconocimiento al canal general del equipo para revisión', resp:'alex', proyecto:'coordi', fecha:'', imp:false, done:false, origen:'Demo reconoc 12/06 — Gemini', createdAt:ahora },
        { id:'relv-1206r2', texto:'Definir nombres finales y colores plenos de insignias (badges): votar entre "Entrega Profesional", "Presentación Efectiva" y otras opciones', resp:'alex', proyecto:'coordi', fecha:'', imp:false, done:false, origen:'Demo reconoc 12/06 — Gemini', createdAt:ahora },
        { id:'relv-1206r3', texto:'Actualizar perfiles en la plataforma de Reconocimiento: fotografías, certificaciones, tecnologías e info académica/profesional completa', resp:'alex', proyecto:'coordi', fecha:'', imp:false, done:false, origen:'Demo reconoc 12/06 — Gemini', createdAt:ahora },
        { id:'relv-1006aws2', texto:'Compartir por Discord el archivo de configuración de acceso seguro SSH + guía de AWS del 10/06', resp:'seba', proyecto:'liga', fecha:'', imp:true, done:false, origen:'Reunión técnica Liga AWS 10/06 — Gemini', createdAt:ahora },
        { id:'relv-1006aws3', texto:'Configurar acceso a la consola de AWS usando la guía proporcionada por Seba', resp:'martina', proyecto:'liga', fecha:'', imp:true, done:false, origen:'Reunión técnica Liga AWS 10/06 — Gemini', createdAt:ahora },
        { id:'relv-1006aws4', texto:'Verificar que los permisos de acceso WBS sean los correctos para trabajar en la consola AWS', resp:'martina', proyecto:'liga', fecha:'', imp:false, done:false, origen:'Reunión técnica Liga AWS 10/06 — Gemini', createdAt:ahora },
        { id:'relv-0805a1', texto:'AMIA — Coordinar con Seba el escalado de infraestructura multi-tenant a nivel productivo: configurar RDS de AWS + Minio', resp:'nahuel', proyecto:'amia', fecha:'', imp:false, done:false, origen:'Demo AMIA interna 08/05 — Gemini', createdAt:ahora },
        { id:'relv-0805a2', texto:'AMIA — Integrar código multi-tenant (white-label) dentro del repositorio principal de AMIA', resp:'nahuel', proyecto:'amia', fecha:'', imp:false, done:false, origen:'Demo AMIA interna 08/05 — Gemini', createdAt:ahora },
        { id:'relv-0805a3', texto:'AMIA — Realizar migración de base de datos al nuevo esquema multi-tenant', resp:'nahuel', proyecto:'amia', fecha:'', imp:false, done:false, origen:'Demo AMIA interna 08/05 — Gemini', createdAt:ahora },
        { id:'relv-0805z1', texto:'ZLO Store — Compartir boceto del módulo de stock analytics con el equipo para revisión en detalle', resp:'lucio', proyecto:'zlo', fecha:'', imp:false, done:false, origen:'Validación plan ZL Store 08/05 — Gemini', createdAt:ahora },
        { id:'relv-0805z2', texto:'ZLO Store — Preparar lista concisa de preguntas para el cliente sobre indicadores y umbrales de stock crítico', resp:'lucio', proyecto:'zlo', fecha:'', imp:false, done:false, origen:'Validación plan ZL Store 08/05 — Gemini', createdAt:ahora },
        { id:'relv-1305p1', texto:'Empower — Poner en limpio documentación APB (entidades, flujos, diagrama) con estética de Alfred para el cliente final', resp:'agus', proyecto:'power', fecha:'', imp:false, done:false, origen:'Demo Empower 13/05 — Gemini', createdAt:ahora },
        { id:'relv-1305p2', texto:'Empower — Realizar evaluaciones de performance del sistema y aplicar mejores prácticas de optimización', resp:'agus', proyecto:'power', fecha:'', imp:false, done:false, origen:'Demo Empower 13/05 — Gemini', createdAt:ahora },
      ];
      var idsT = new Set(teamData.tareas.map(function(t){ return t.id; }));
      var agT = 0;
      nuevasTeam.forEach(function(t){ if (!idsT.has(t.id)) { teamData.tareas.push(t); agT++; } });
      if (agT > 0) saveTeam(teamData);
    })();
  
  
    // ── BARRIDO SEMANA 18-19/06 (reuniones no procesadas) ────────────────────────
    // Daily TL 18/06 09:35 | Montessori 18/06 13:59 | Reu con Alex web 18/06 16:31
    // Daily TL 19/06 09:45 | Reu Lautaro Waisgold 19/06 09:01
    (function importarSemana1819jun() {
      var ahora = new Date().toISOString();
      var nuevasVicky = [
        // ── Daily TL 18/06 ──
        { id:'d1806v1', texto:'Liga — Validar si el partido duplicado persiste en el listado y señalar cuál es exactamente para que Alex pueda corregirlo', col:'hoy', proyecto:'liga', resp:'vicky', fecha:'', origen:'Daily TL 18/06 — Gemini', imp:true, addedDate:ahora, createdAt:ahora },
        { id:'d1806v2', texto:'ZLO — Enviar recordatorio urgente al cliente sobre el vencimiento del dominio para evitar interrupción del servicio', col:'hoy', proyecto:'zlo', resp:'vicky', fecha:'', origen:'Daily TL 18/06 — Gemini', imp:true, addedDate:ahora, createdAt:ahora },
        // ── Montessori 18/06 ──
        { id:'m1806v1', texto:'Montessori Airtable — Agregar campo de selección para categorizar errores como "diseño" o "funcionalidad" (lo pidió Pilar Luna)', col:'hoy', proyecto:'montessori', resp:'vicky', fecha:'', origen:'Montessori Reu 18/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'m1806v2', texto:'Montessori Airtable — Configurar vista tipo Kanban para que el equipo organice el flujo de reporte de errores', col:'hoy', proyecto:'montessori', resp:'vicky', fecha:'', origen:'Montessori Reu 18/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        // ── Reu Lautaro Waisgold 19/06 ──
        { id:'lw1906v1', texto:'Comunicación — Crear canal en Discord para coordinar el trabajo con Lautaro Waisgold (voluntario de comunicación y LinkedIn)', col:'hoy', proyecto:'coordi', resp:'vicky', fecha:'', origen:'Reu Lautaro Waisgold 19/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
      ];
      var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
      var agV = 0;
      nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
      if (agV > 0) saveData(data);
  
      var nuevasTeam = [
        // ── Daily TL 18/06 ──
        { id:'d1806t1', texto:'Coordinar reunión con Vicky para revisar cómo se visualiza la información de equipos y Team Leads en el sistema de Liga', resp:'alex', proyecto:'liga', fecha:'', imp:true, done:false, origen:'Daily TL 18/06 — Gemini', createdAt:ahora },
        // ── Daily TL 19/06 ──
        { id:'d1906t1', texto:'Preparar listado de tareas pendientes sobre Baches para que Vicky pueda revisarlas', resp:'alex', proyecto:'coordi', fecha:'', imp:true, done:false, origen:'Daily TL 19/06 — Gemini', createdAt:ahora },
        { id:'d1906t2', texto:'Confirmar con Vicky la fecha definitiva para la reunión de demo con el cliente', resp:'lucio', proyecto:'zlo', fecha:'', imp:true, done:false, origen:'Daily TL 19/06 — Gemini', createdAt:ahora },
        { id:'d1906t3', texto:'Notificar en el canal Tex Bits los detalles de la reunión y demo con cliente', resp:'lucio', proyecto:'zlo', fecha:'', imp:false, done:false, origen:'Daily TL 19/06 — Gemini', createdAt:ahora },
        { id:'d1906t4', texto:'Monitorear desempeño y nivel de energía de Brisa en sus tareas diarias y reportar novedades', resp:'lucio', proyecto:'coordi', fecha:'', imp:false, done:false, origen:'Daily TL 19/06 — Gemini', createdAt:ahora },
        // ── Reu con Alex web FORIT 18/06 ──
        { id:'rw1806t1', texto:'Web FORIT — Crear documento centralizado para recopilar todas las notas del sitio (enviadas por Vic F por Discord)', resp:'alex', proyecto:'coordi', fecha:'', imp:false, done:false, origen:'Reu con Alex web FORIT 18/06 — Gemini', createdAt:ahora },
        { id:'rw1806t2', texto:'Web FORIT — Implementar modificaciones visuales acordadas: reducir tamaño de tarjetas y ajustar layout discutido', resp:'alex', proyecto:'coordi', fecha:'', imp:false, done:false, origen:'Reu con Alex web FORIT 18/06 — Gemini', createdAt:ahora },
        { id:'rw1806t3', texto:'Web FORIT — Probar combinaciones de colores para el botón de donar y garantizar legibilidad accesible', resp:'alex', proyecto:'coordi', fecha:'', imp:false, done:false, origen:'Reu con Alex web FORIT 18/06 — Gemini', createdAt:ahora },
        // ── Montessori 18/06 ──
        { id:'m1806t1', texto:'Montessori — Migrar toda la documentación de errores y mejoras relevadas en Notion hacia Airtable para centralizar el seguimiento', resp:'lucio', proyecto:'montessori', fecha:'', imp:true, done:false, origen:'Montessori Reu 18/06 — Gemini', createdAt:ahora },
      ];
      var idsT = new Set(teamData.tareas.map(function(t){ return t.id; }));
      var agT = 0;
      nuevasTeam.forEach(function(t){ if (!idsT.has(t.id)) { teamData.tareas.push(t); agT++; } });
      if (agT > 0) saveTeam(teamData);
    })();
    (function importarBarrido22062026() {
      var ahora = new Date().toISOString();
      var data = JSON.parse(localStorage.getItem('forit-kanban-v1') || '{"tareas":[]}');
      var teamData = JSON.parse(localStorage.getItem('forit-team-v1') || '{"tareas":[]}');

      var nuevasVicky = [
        // ── Daily TL 22/06 ──
        { id:'d2206v1', texto:'Montessori — Contactar al equipo para intentar adelantar la reunión (evitar conflicto con horario del partido)', col:'hoy', proyecto:'montessori', resp:'vicky', fecha:'', origen:'Daily TL 22/06 — Gemini', imp:false, addedDate:ahora, createdAt:ahora },
        { id:'d2206v2', texto:'ZLO — Agendar demo con cliente: coordinar fecha y hora de la presentación', col:'hoy', proyecto:'zlo', resp:'vicky', fecha:'', origen:'Daily TL 22/06 — Gemini', imp:true, addedDate:ahora, createdAt:ahora },
      ];
      var idsV = new Set(data.tareas.map(function(t){ return t.id; }));
      var agV = 0;
      nuevasVicky.forEach(function(t){ if (!idsV.has(t.id)) { data.tareas.push(t); agV++; } });
      if (agV > 0) saveData(data);

      var nuevasTeam = [
        // ── Daily TL 22/06 ──
        { id:'d2206t1', texto:'Distribuir las tareas de test pendientes entre los miembros del equipo que no participan en la demo de mañana', resp:'lucio', proyecto:'zlo', fecha:'', imp:true, done:false, origen:'Daily TL 22/06 — Gemini', createdAt:ahora },
        { id:'d2206t2', texto:'Realizar reunión 1 a 1 con Lourdes para revisar su organización entre el trabajo y la universidad', resp:'martina', proyecto:'liga', fecha:'', imp:true, done:false, origen:'Daily TL 22/06 — Gemini', createdAt:ahora },
        { id:'d2206t3', texto:'Iniciar ronda de feedback con el equipo: solicitar y dar feedback a cada integrante (un feedback por día)', resp:'agus', proyecto:'power', fecha:'', imp:false, done:false, origen:'Daily TL 22/06 — Gemini', createdAt:ahora },
        { id:'d2206t4', texto:'Iniciar ronda de feedback con el equipo: solicitar y dar feedback a cada integrante (un feedback por día)', resp:'martina', proyecto:'liga', fecha:'', imp:false, done:false, origen:'Daily TL 22/06 — Gemini', createdAt:ahora },
        { id:'d2206t5', texto:'Iniciar ronda de feedback con el equipo: solicitar y dar feedback a cada integrante (un feedback por día)', resp:'lucio', proyecto:'zlo', fecha:'', imp:false, done:false, origen:'Daily TL 22/06 — Gemini', createdAt:ahora },
        { id:'d2206t6', texto:'Web FORIT — Finalizar correcciones del diseño y entregar el material al equipo de reconocimiento', resp:'alex', proyecto:'coordi', fecha:'', imp:true, done:false, origen:'Daily TL 22/06 — Gemini', createdAt:ahora },
      ];
      var idsT = new Set(teamData.tareas.map(function(t){ return t.id; }));
      var agT = 0;
      nuevasTeam.forEach(function(t){ if (!idsT.has(t.id)) { teamData.tareas.push(t); agT++; } });
      if (agT > 0) saveTeam(teamData);
    })();

// ── RENDER INICIAL ──────────────────────────────────────────────────────────
  renderBoard();
  setTimeout(function(){ if(typeof setupColDrop === "function") setupColDrop(); }, 100);
