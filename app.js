// ========================================
// CALCULADORA SLPRO V2 - APP.JS
// El Seguro de Vida de tu Evento
// ========================================

// Estado global
let state = {
    evento: 'bodas',
    horas: 4,
    cams: 1,
    addonDrone: false,
    addonStreamingIphone: false,
    addonStreamingAtem: false,
    addon2cam: false,
    addonUsb: true,
    addonMaquillaje: false,
    addonFlyers: false,
    addonViaticos: false,
    sesionItems: [],
    video: 0,
    videoHoras: 4,
    frames: [],
    canvases: [],
    portarretratos: [],
    fotos: [],
    bulk: [],
    custom: [],
    customAddons: [],
    margen: 3,
    tax: 0,
    discount: 0,
    viaticos: { km: 50, casetas: 200 },
    cliente: { nombre: '', evento: '', fecha: '', email: '' },
    extra_base_x_ch: false,
    extra_base_x_gr: false,
    extra_escaneo_norm: false,
    extra_escaneo_neg: false
};

// Costos base (se leen de config)
let costos = {
    crewBase: 800,
    crewHora: 50,
    asistente: 800,
    camarografo: 800,
    drone: 800,
    streamingIphone: 800,
    streamingAtem: 2500,
    maquillaje: 500,
    cam2: 800,
    usb: 150,
    sesion: { 1: 500, 2: 800, 3: 1200 },
    videoHighlight: 500,
    videoHora: 50,
    frames: {
        'A1_11x14': 817, 'A1_16x20': 1310, 'A1_16x24': 1465, 'A1_20x24': 1687, 'A1_20x30': 2025, 'A1_24x30': 2269, 'A1_24x36': 2587,
        'B2_8x10': 581, 'B2_11x14': 771, 'B2_11x16': 845, 'B2_16x20': 1283, 'B2_16x24': 1444, 'B2_20x24': 1653, 'B2_20x30': 1989, 'B2_24x30': 2186, 'B2_24x36': 2527,
        'C1_8x10': 324, 'C1_8x12': 368, 'C1_11x14': 487, 'C1_11x16': 530, 'C1_12x16': 572, 'C1_12x18': 620, 'C1_16x20': 886, 'C1_16x24': 997, 'C1_20x24': 1174, 'C1_20x30': 1442
    },
    canvases: {
        '16x20': 459, '20x24': 555, '24x30': 671, '30x40': 852
    },
    fotos: {
        '8x10': 103
    },
    bulk: {
        '4x6': 3.5, '5x7': 5.5, '6x8': 7, '8x10': 23, '10x12': 34, '11x14': 44
    },
    extras: {
        base_x_ch: 22,
        base_x_gr: 66,
        escaneo_norm: 10,
        escaneo_neg: 20
    },
    flyers: { boda: 400, jaripeo: 500, gallos: 350, cumple: 250 },
    viaticosGas: 5,
    videoCam1Hora: 100,
    videoCam2Hora: 180,
    videoCam3Hora: 250
};

// Opciones para dropdowns
const frameOptions = [
    { value: 'A1_11x14', label: 'A1 11x14 (Elite)' },
    { value: 'A1_16x20', label: 'A1 16x20 (Elite)' },
    { value: 'A1_16x24', label: 'A1 16x24 (Elite)' },
    { value: 'A1_20x24', label: 'A1 20x24 (Elite)' },
    { value: 'A1_20x30', label: 'A1 20x30 (Elite)' },
    { value: 'A1_24x30', label: 'A1 24x30 (Elite)' },
    { value: 'A1_24x36', label: 'A1 24x36 (Elite)' },
    { value: 'B2_8x10', label: 'B2 8x10 (Volumen)' },
    { value: 'B2_11x14', label: 'B2 11x14 (Volumen)' },
    { value: 'B2_11x16', label: 'B2 11x16 (Volumen)' },
    { value: 'B2_16x20', label: 'B2 16x20 (Volumen)' },
    { value: 'B2_16x24', label: 'B2 16x24 (Volumen)' },
    { value: 'B2_20x24', label: 'B2 20x24 (Volumen)' },
    { value: 'B2_20x30', label: 'B2 20x30 (Volumen)' },
    { value: 'B2_24x30', label: 'B2 24x30 (Volumen)' },
    { value: 'B2_24x36', label: 'B2 24x36 (Volumen)' },
    { value: 'C1_8x10', label: 'C1 8x10 (Aesthetic)' },
    { value: 'C1_8x12', label: 'C1 8x12 (Aesthetic)' },
    { value: 'C1_11x14', label: 'C1 11x14 (Aesthetic)' },
    { value: 'C1_11x16', label: 'C1 11x16 (Aesthetic)' },
    { value: 'C1_12x16', label: 'C1 12x16 (Aesthetic)' },
    { value: 'C1_12x18', label: 'C1 12x18 (Aesthetic)' },
    { value: 'C1_16x20', label: 'C1 16x20 (Aesthetic)' },
    { value: 'C1_16x24', label: 'C1 16x24 (Aesthetic)' },
    { value: 'C1_20x24', label: 'C1 20x24 (Aesthetic)' },
    { value: 'C1_20x30', label: 'C1 20x30 (Aesthetic)' }
];

const canvasOptions = [
    { value: '16x20', label: '16x20"' },
    { value: '20x24', label: '20x24"' },
    { value: '24x30', label: '24x30"' },
    { value: '30x40', label: '30x40"' }
];

const fotoOptions = [
    { value: '8x10', label: '8x10" (Base/Textura)' }
];

const fotoBulkOptions = [
    { value: '4x6', label: '4x6" Lab' },
    { value: '5x7', label: '5x7" Lab' },
    { value: '6x8', label: '6x8" Lab' },
    { value: '8x10', label: '8x10" Lab' },
    { value: '10x12', label: '10x12" Lab' },
    { value: '11x14', label: '11x14" Lab' }
];

// ========================================
// INIT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos persistentes
    loadFromStorage();
    
    // Si no hay filas, agregar iniciales
    if (state.frames.length === 0) addFrameRow();
    if (state.canvases.length === 0) addCanvasRow();
    if (state.fotos.length === 0) addFotoRow();
    if (state.bulk.length === 0) addBulkRow();
    
    // Renderizar filas guardadas
    renderDynamicRows();
    
    // Sync UI with state
    syncUIWithState();
    
    // Primera carga de costos
    updateBaseCosts();
    
    // Calcular
    calculate();
    
    // Config sidebar
    document.querySelector('.sidebar .close-btn').style.display = 'none';
});

// ========================================
// PERSISTENCE
// ========================================

function saveToStorage() {
    localStorage.setItem('slpro_calc_state', JSON.stringify(state));
    localStorage.setItem('slpro_calc_costos', JSON.stringify(costos));
}

function loadFromStorage() {
    const savedState = localStorage.getItem('slpro_calc_state');
    const savedCostos = localStorage.getItem('slpro_calc_costos');
    
    if (savedState) {
        state = { ...state, ...JSON.parse(savedState) };
        // Actualizar UI con el estado
        document.getElementById('cliente_nombre').value = state.cliente?.nombre || '';
        document.getElementById('cliente_evento').value = state.cliente?.evento || '';
        document.getElementById('cliente_fecha').value = state.cliente?.fecha || '';
        document.getElementById('cliente_email').value = state.cliente?.email || '';
    }
    
    if (savedCostos) {
        costos = JSON.parse(savedCostos);
        // Actualizar inputs de config
        syncConfigInputs();
    }
}

function syncUIWithState() {
    document.getElementById('addon_drone').checked = state.addonDrone;
    document.getElementById('addon_streaming').checked = state.addonStreaming;
    document.getElementById('addon_2cam').checked = state.addon2cam;
    document.getElementById('addon_usb').checked = state.addonUsb;
    document.getElementById('addon_flyers').checked = state.addonFlyers;
    document.getElementById('addon_viaticos').checked = state.addonViaticos;
    
    document.getElementById('extra_base_x_ch').checked = state.extra_base_x_ch;
    document.getElementById('extra_base_x_gr').checked = state.extra_base_x_gr;
    document.getElementById('extra_escaneo_norm').checked = state.extra_escaneo_norm;
    document.getElementById('extra_escaneo_neg').checked = state.extra_escaneo_neg;
    
    document.getElementById('viaticos_km').value = state.viaticos.km;
    document.getElementById('viaticos_casetas').value = state.viaticos.casetas;
    
    document.querySelectorAll('.event-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.event === state.evento));
    document.querySelectorAll('.hour-btn').forEach(btn => btn.classList.toggle('active', parseInt(btn.dataset.h) === state.horas));
    document.querySelectorAll('.cam-btn').forEach(btn => btn.classList.toggle('active', parseInt(btn.dataset.c) === state.cams));
    
    if (state.sesion !== undefined) document.querySelector(`input[name="sesion"][value="${state.sesion}"]`).checked = true;
    if (state.video !== undefined) document.querySelector(`input[name="video"][value="${state.video}"]`).checked = true;
}

function syncConfigInputs() {
    document.getElementById('cfg_crew_base').value = costos.crewBase;
    document.getElementById('cfg_crew_hora').value = costos.crewHora;
    document.getElementById('cfg_crew_asistente').value = costos.asistente;
    document.getElementById('cfg_crew_camarografo').value = costos.camarografo;
    document.getElementById('cfg_addon_drone').value = costos.drone;
    document.getElementById('cfg_addon_streaming').value = costos.streaming;
    document.getElementById('cfg_addon_2cam').value = costos.cam2;
    document.getElementById('cfg_addon_usb').value = costos.usb;
    document.getElementById('cfg_sesion_1').value = costos.sesion[1];
    document.getElementById('cfg_sesion_2').value = costos.sesion[2];
    document.getElementById('cfg_sesion_3').value = costos.sesion[3];
    document.getElementById('cfg_video_highlight').value = costos.videoHighlight;
    document.getElementById('cfg_video_hora').value = costos.videoHora;
    document.getElementById('cfg_viaticos_gas').value = costos.viaticosGas;
    
    // A1
    document.getElementById('cfg_a1_11x14').value = costos.frames['A1_11x14'];
    document.getElementById('cfg_a1_16x20').value = costos.frames['A1_16x20'];
    document.getElementById('cfg_a1_20x30').value = costos.frames['A1_20x30'];
    document.getElementById('cfg_a1_24x36').value = costos.frames['A1_24x36'];
    
    // B2
    document.getElementById('cfg_b2_8x10').value = costos.frames['B2_8x10'];
    document.getElementById('cfg_b2_11x14').value = costos.frames['B2_11x14'];
    document.getElementById('cfg_b2_16x20').value = costos.frames['B2_16x20'];
    document.getElementById('cfg_b2_20x30').value = costos.frames['B2_20x30'];
    document.getElementById('cfg_b2_24x36').value = costos.frames['B2_24x36'];
    
    // C1
    document.getElementById('cfg_c1_8x10').value = costos.frames['C1_8x10'];
    document.getElementById('cfg_c1_11x14').value = costos.frames['C1_11x14'];
    document.getElementById('cfg_c1_16x20').value = costos.frames['C1_16x20'];
    document.getElementById('cfg_c1_20x30').value = costos.frames['C1_20x30'];
    
    // Canvas
    document.getElementById('cfg_canvas_16x20').value = costos.canvases['16x20'];
    document.getElementById('cfg_canvas_20x24').value = costos.canvases['20x24'];
    document.getElementById('cfg_canvas_24x30').value = costos.canvases['24x30'];
    document.getElementById('cfg_canvas_30x40').value = costos.canvases['30x40'];
    
    // Fotos
    document.getElementById('cfg_foto_8x10').value = costos.fotos['8x10'];
    
    // Flyers
    document.getElementById('cfg_flyer_boda').value = costos.flyers.boda;
    document.getElementById('cfg_flyer_jaripeo').value = costos.flyers.jaripeo;
    document.getElementById('cfg_flyer_gallos').value = costos.flyers.gallos;
    document.getElementById('cfg_flyer_cumple').value = costos.flyers.cumple;
    
    // Bulk
    document.getElementById('cfg_bulk_4x6').value = costos.bulk['4x6'];
    document.getElementById('cfg_bulk_5x7').value = costos.bulk['5x7'];
    document.getElementById('cfg_bulk_6x8').value = costos.bulk['6x8'];
    document.getElementById('cfg_bulk_8x10').value = costos.bulk['8x10'];
    document.getElementById('cfg_bulk_10x12').value = costos.bulk['10x12'];
    document.getElementById('cfg_bulk_11x14').value = costos.bulk['11x14'];
    
    // Extras
    document.getElementById('cfg_extra_base_x_ch').value = costos.extras.base_x_ch;
    document.getElementById('cfg_extra_base_x_gr').value = costos.extras.base_x_gr;
    document.getElementById('cfg_extra_escaneo_norm').value = costos.extras.escaneo_norm;
    document.getElementById('cfg_extra_escaneo_neg').value = costos.extras.escaneo_neg;
    
    // Margen/Tax
    document.getElementById('cfg_margen_default').value = state.margen;
    document.getElementById('marginSlider').value = state.margen;
    document.getElementById('marginLabel').textContent = state.margen.toFixed(1) + 'x';
    document.getElementById('cfg_tax').value = state.tax;
    document.getElementById('cfg_discount').value = state.discount;
}

function renderDynamicRows() {
    document.getElementById('framesContainer').innerHTML = '';
    document.getElementById('canvasContainer').innerHTML = '';
    document.getElementById('fotoContainer').innerHTML = '';
    document.getElementById('bulkContainer').innerHTML = '';
    document.getElementById('customContainer').innerHTML = '';
    
    state.frames.forEach(f => renderFrameRow(f));
    state.canvases.forEach(c => renderCanvasRow(c));
    state.fotos.forEach(f => renderFotoRow(f));
    state.bulk.forEach(b => renderBulkRow(b));
    state.custom.forEach(cu => renderCustomRow(cu));
}

// ========================================
// SIDEBAR
// ========================================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// ========================================
// UPDATE COSTS FROM CONFIG
// ========================================

function updateBaseCosts() {
    costos.crewBase = parseFloat(document.getElementById('cfg_crew_base').value) || 0;
    costos.crewHora = parseFloat(document.getElementById('cfg_crew_hora').value) || 0;
    costos.asistente = parseFloat(document.getElementById('cfg_crew_asistente').value) || 0;
    costos.camarografo = parseFloat(document.getElementById('cfg_crew_camarografo').value) || 0;
    costos.drone = parseFloat(document.getElementById('cfg_addon_drone').value) || 0;
    costos.streamingIphone = parseFloat(document.getElementById('cfg_addon_streaming_iphone').value) || 0;
    costos.streamingAtem = parseFloat(document.getElementById('cfg_addon_streaming_atem').value) || 0;
    costos.cam2 = parseFloat(document.getElementById('cfg_addon_2cam').value) || 0;
    costos.usb = parseFloat(document.getElementById('cfg_addon_usb').value) || 0;
    costos.maquillaje = parseFloat(document.getElementById('cfg_addon_maquillaje').value) || 0;
    costos.sesion[1] = parseFloat(document.getElementById('cfg_sesion_1').value) || 0;
    costos.sesion[2] = parseFloat(document.getElementById('cfg_sesion_2').value) || 0;
    costos.sesion[3] = parseFloat(document.getElementById('cfg_sesion_3').value) || 0;
    costos.videoHighlight = parseFloat(document.getElementById('cfg_video_highlight').value) || 0;
    costos.videoCam1Hora = parseFloat(document.getElementById('cfg_video_cam1_hora').value) || 0;
    costos.videoCam2Hora = parseFloat(document.getElementById('cfg_video_cam2_hora').value) || 0;
    costos.videoCam3Hora = parseFloat(document.getElementById('cfg_video_cam3_hora').value) || 0;
    costos.viaticosGas = parseFloat(document.getElementById('cfg_viaticos_gas').value) || 0;
    
    // Frames A1
    costos.frames['A1_11x14'] = parseFloat(document.getElementById('cfg_a1_11x14').value) || 0;
    costos.frames['A1_16x20'] = parseFloat(document.getElementById('cfg_a1_16x20').value) || 0;
    costos.frames['A1_20x30'] = parseFloat(document.getElementById('cfg_a1_20x30').value) || 0;
    costos.frames['A1_24x36'] = parseFloat(document.getElementById('cfg_a1_24x36').value) || 0;
    
    // Frames B2
    costos.frames['B2_8x10'] = parseFloat(document.getElementById('cfg_b2_8x10').value) || 0;
    costos.frames['B2_11x14'] = parseFloat(document.getElementById('cfg_b2_11x14').value) || 0;
    costos.frames['B2_16x20'] = parseFloat(document.getElementById('cfg_b2_16x20').value) || 0;
    costos.frames['B2_20x30'] = parseFloat(document.getElementById('cfg_b2_20x30').value) || 0;
    costos.frames['B2_24x36'] = parseFloat(document.getElementById('cfg_b2_24x36').value) || 0;
    
    // Frames C1
    costos.frames['C1_8x10'] = parseFloat(document.getElementById('cfg_c1_8x10').value) || 0;
    costos.frames['C1_11x14'] = parseFloat(document.getElementById('cfg_c1_11x14').value) || 0;
    costos.frames['C1_16x20'] = parseFloat(document.getElementById('cfg_c1_16x20').value) || 0;
    costos.frames['C1_20x30'] = parseFloat(document.getElementById('cfg_c1_20x30').value) || 0;
    
    // Canvas
    costos.canvases['16x20'] = parseFloat(document.getElementById('cfg_canvas_16x20').value) || 0;
    costos.canvases['20x24'] = parseFloat(document.getElementById('cfg_canvas_20x24').value) || 0;
    costos.canvases['24x30'] = parseFloat(document.getElementById('cfg_canvas_24x30').value) || 0;
    costos.canvases['30x40'] = parseFloat(document.getElementById('cfg_canvas_30x40').value) || 0;
    
    // Fotos
    costos.fotos['8x10'] = parseFloat(document.getElementById('cfg_foto_8x10').value) || 0;
    
    // Flyers
    costos.flyers.boda = parseFloat(document.getElementById('cfg_flyer_boda').value) || 0;
    costos.flyers.jaripeo = parseFloat(document.getElementById('cfg_flyer_jaripeo').value) || 0;
    costos.flyers.gallos = parseFloat(document.getElementById('cfg_flyer_gallos').value) || 0;
    costos.flyers.cumple = parseFloat(document.getElementById('cfg_flyer_cumple').value) || 0;
    
    // Bulk
    costos.bulk['4x6'] = parseFloat(document.getElementById('cfg_bulk_4x6').value) || 0;
    costos.bulk['5x7'] = parseFloat(document.getElementById('cfg_bulk_5x7').value) || 0;
    costos.bulk['6x8'] = parseFloat(document.getElementById('cfg_bulk_6x8').value) || 0;
    costos.bulk['8x10'] = parseFloat(document.getElementById('cfg_bulk_8x10').value) || 0;
    costos.bulk['10x12'] = parseFloat(document.getElementById('cfg_bulk_10x12').value) || 0;
    costos.bulk['11x14'] = parseFloat(document.getElementById('cfg_bulk_11x14').value) || 0;
    
    // Extras
    costos.extras.base_x_ch = parseFloat(document.getElementById('cfg_extra_base_x_ch').value) || 0;
    costos.extras.base_x_gr = parseFloat(document.getElementById('cfg_extra_base_x_gr').value) || 0;
    costos.extras.escaneo_norm = parseFloat(document.getElementById('cfg_extra_escaneo_norm').value) || 0;
    costos.extras.escaneo_neg = parseFloat(document.getElementById('cfg_extra_escaneo_neg').value) || 0;
    
    // Update price displays
    document.getElementById('price_drone').textContent = '$' + costos.drone;
    document.getElementById('price_streaming').textContent = '$' + costos.streaming;
    document.getElementById('price_2cam').textContent = '$' + costos.cam2;
    document.getElementById('price_usb').textContent = '$' + costos.usb;
    document.getElementById('viaticos_gas_rate').textContent = costos.viaticosGas;
    
    calculate();
}

function updateMargin(isSlider) {
    const sidebarMargen = document.getElementById('cfg_margen_default');
    const slider = document.getElementById('marginSlider');
    
    if (isSlider) {
        state.margen = parseFloat(slider.value) || 3;
        sidebarMargen.value = state.margen;
    } else {
        state.margen = parseFloat(sidebarMargen.value) || 3;
        slider.value = state.margen;
    }
    
    state.tax = parseFloat(document.getElementById('cfg_tax').value) || 0;
    state.discount = parseFloat(document.getElementById('cfg_discount').value) || 0;
    
    document.getElementById('marginLabel').textContent = state.margen.toFixed(1) + 'x';
    calculate();
}

function resetConfig() {
    document.querySelectorAll('.sidebar input[type="number"]').forEach(input => {
        input.value = input.defaultValue;
    });
    updateBaseCosts();
}

// ========================================
// SELECTORS
// ========================================

function selectEvent(evento) {
    state.evento = evento;
    document.querySelectorAll('.event-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.event === evento);
        if (btn.dataset.event === 'otro') {
            btn.textContent = '➕ OTRO'; // reset button text when unselected
        }
    });
    calculate();
}

function promptCustomEvent() {
    let customName = prompt("¿Qué tipo de evento es?");
    if (customName && customName.trim() !== '') {
        state.evento = customName.trim().toUpperCase();
        document.querySelectorAll('.event-btn').forEach(btn => btn.classList.remove('active'));
        let btnOtro = document.querySelector('.event-btn[data-event="otro"]');
        btnOtro.classList.add('active');
        btnOtro.textContent = '✨ ' + state.evento.substring(0, 15) + (state.evento.length > 15 ? '...' : '');
        calculate();
    }
}

function setHours(horas) {
    state.horas = horas;
    document.querySelectorAll('.hour-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.h) === horas);
    });
    calculate();
}

function setCams(cams) {
    state.cams = cams;
    document.querySelectorAll('.cam-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.c) === cams);
    });
    calculate();
}

function toggleFlyers() {
    state.addonFlyers = document.getElementById('addon_flyers').checked;
    document.getElementById('flyers_tipo').classList.toggle('hidden', !state.addonFlyers);
    calculate();
}

function toggleViaticos() {
    state.addonViaticos = document.getElementById('addon_viaticos').checked;
    document.getElementById('viaticosInputs').classList.toggle('hidden', !state.addonViaticos);
    calculate();
}

// ========================================
// DYNAMIC ROWS
// ========================================

function addFrameRow() {
    const id = Date.now();
    const item = { id: id, value: 'B2_16x20', qty: 1 };
    state.frames.push(item);
    renderFrameRow(item);
    calculate();
}

function renderFrameRow(item) {
    const container = document.getElementById('framesContainer');
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.id = 'frame-' + item.id;
    row.innerHTML = `
        <select onchange="updateFrame('${item.id}', this.value, qty_${item.id}.value)">
            ${frameOptions.map(o => `<option value="${o.value}" ${o.value === item.value ? 'selected' : ''}>${o.label}</option>`).join('')}
        </select>
        <span>×</span>
        <input type="number" id="qty_${item.id}" value="${item.qty}" min="1" onchange="updateFrame('${item.id}', this.previousElementSibling.previousElementSibling.value, this.value)">
        <span class="row-price" id="price_${item.id}">$0</span>
        <button class="row-remove" onclick="removeFrame('${item.id}')">✕</button>
    `;
    container.appendChild(row);
    updateFrame(item.id, item.value, item.qty);
}

function updateFrame(id, value, qty) {
    const item = state.frames.find(f => f.id == id);
    if (item) {
        item.value = value;
        item.qty = parseInt(qty) || 1;
    }
    
    const cost = (costos.frames[value] || 0) * (parseInt(qty) || 1);
    const priceEl = document.getElementById('price_' + id);
    if (priceEl) priceEl.textContent = '$' + cost.toLocaleString('es-MX');
    calculate();
}

function removeFrame(id) {
    document.getElementById('frame-' + id).remove();
    state.frames = state.frames.filter(f => f.id != id);
    calculate();
}

function addCanvasRow() {
    const id = Date.now();
    const item = { id: id, value: '16x20', qty: 1 };
    state.canvases.push(item);
    renderCanvasRow(item);
    calculate();
}

function renderCanvasRow(item) {
    const container = document.getElementById('canvasContainer');
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.id = 'canvas-' + item.id;
    row.innerHTML = `
        <select onchange="updateCanvas('${item.id}', this.value, qty_canvas_${item.id}.value)">
            ${canvasOptions.map(o => `<option value="${o.value}" ${o.value === item.value ? 'selected' : ''}>${o.label}</option>`).join('')}
        </select>
        <span>×</span>
        <input type="number" id="qty_canvas_${item.id}" value="${item.qty}" min="1" onchange="updateCanvas('${item.id}', this.previousElementSibling.previousElementSibling.value, this.value)">
        <span class="row-price" id="price_canvas_${item.id}">$0</span>
        <button class="row-remove" onclick="removeCanvas('${item.id}')">✕</button>
    `;
    container.appendChild(row);
    updateCanvas(item.id, item.value, item.qty);
}

function updateCanvas(id, value, qty) {
    const item = state.canvases.find(c => c.id == id);
    if (item) {
        item.value = value;
        item.qty = parseInt(qty) || 1;
    }
    
    const cost = (costos.canvases[value] || 0) * (parseInt(qty) || 1);
    const priceEl = document.getElementById('price_canvas_' + id);
    if (priceEl) priceEl.textContent = '$' + cost.toLocaleString('es-MX');
    calculate();
}

function removeCanvas(id) {
    document.getElementById('canvas-' + id).remove();
    state.canvases = state.canvases.filter(c => c.id != id);
    calculate();
}

// ========================================
// PORTARRETRATOS
// ========================================

function addPortarretratoRow() {
    const id = Date.now();
    const item = { id: id, name: 'Portarretrato', price: 150, qty: 1 };
    state.portarretratos.push(item);
    renderPortarretratoRow(item);
    calculate();
}

function renderPortarretratoRow(item) {
    const container = document.getElementById('portarretratosContainer');
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.id = 'porta-' + item.id;
    row.innerHTML = `
        <input type="text" value="${item.name}" placeholder="Nombre" style="flex:2; background:var(--bg-card); border:1px solid var(--border); border-radius:4px; color:var(--text); padding:4px 8px;" onchange="updatePortarretrato('${item.id}', 'name', this.value)">
        <span>$</span>
        <input type="number" value="${item.price}" min="0" style="width:70px;" onchange="updatePortarretrato('${item.id}', 'price', this.value)">
        <span>×</span>
        <input type="number" value="${item.qty}" min="1" style="width:50px;" onchange="updatePortarretrato('${item.id}', 'qty', this.value)">
        <span class="row-price" id="price_porta_${item.id}">$${(item.price * item.qty).toLocaleString('es-MX')}</span>
        <button class="row-remove" onclick="removePortarretrato('${item.id}')">✕</button>
    `;
    container.appendChild(row);
}

function updatePortarretrato(id, field, value) {
    const item = state.portarretratos.find(p => p.id == id);
    if (!item) return;
    if (field === 'name') item.name = value;
    else if (field === 'price') item.price = parseFloat(value) || 0;
    else if (field === 'qty') item.qty = parseInt(value) || 1;
    
    const priceEl = document.getElementById('price_porta_' + id);
    if (priceEl) priceEl.textContent = '$' + (item.price * item.qty).toLocaleString('es-MX');
    calculate();
}

function removePortarretrato(id) {
    document.getElementById('porta-' + id).remove();
    state.portarretratos = state.portarretratos.filter(p => p.id != id);
    calculate();
}

function addFotoRow() {
    const id = Date.now();
    const item = { id: id, value: '5x7', qty: 50 };
    state.fotos.push(item);
    renderFotoRow(item);
    calculate();
}

function renderFotoRow(item) {
    const container = document.getElementById('fotoContainer');
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.id = 'foto-' + item.id;
    row.innerHTML = `
        <select onchange="updateFoto('${item.id}', this.value, qty_foto_${item.id}.value)">
            ${fotoOptions.map(o => `<option value="${o.value}" ${o.value === item.value ? 'selected' : ''}>${o.label}</option>`).join('')}
        </select>
        <span>×</span>
        <input type="number" id="qty_foto_${item.id}" value="${item.qty}" min="1" onchange="updateFoto('${item.id}', this.previousElementSibling.previousElementSibling.value, this.value)">
        <span class="row-price" id="price_foto_${item.id}">$0</span>
        <button class="row-remove" onclick="removeFoto('${item.id}')">✕</button>
    `;
    container.appendChild(row);
    updateFoto(item.id, item.value, item.qty);
}

function updateFoto(id, value, qty) {
    const item = state.fotos.find(f => f.id == id);
    if (item) {
        item.value = value;
        item.qty = parseInt(qty) || 1;
    }
    
    const cost = (costos.fotos[value] || 0) * (parseInt(qty) || 1);
    document.getElementById('price_foto_' + id).textContent = '$' + cost.toLocaleString();
    calculate();
}

function removeFoto(id) {
    document.getElementById('foto-' + id).remove();
    state.fotos = state.fotos.filter(f => f.id != id);
    calculate();
}

// BULK / SOLO IMPRESION
function addBulkRow() {
    const id = Date.now();
    const item = { id: id, value: '5x7', qty: 50 };
    state.bulk.push(item);
    renderBulkRow(item);
    calculate();
}

function renderBulkRow(item) {
    const container = document.getElementById('bulkContainer');
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.id = 'bulk-' + item.id;
    row.innerHTML = `
        <select onchange="updateBulk('${item.id}', this.value, qty_bulk_${item.id}.value)">
            ${fotoBulkOptions.map(o => `<option value="${o.value}" ${o.value === item.value ? 'selected' : ''}>${o.label}</option>`).join('')}
        </select>
        <span>×</span>
        <input type="number" id="qty_bulk_${item.id}" value="${item.qty}" min="1" onchange="updateBulk('${item.id}', this.previousElementSibling.previousElementSibling.value, this.value)">
        <span class="row-price" id="price_bulk_${item.id}">$0</span>
        <button class="row-remove" onclick="removeBulk('${item.id}')">✕</button>
    `;
    container.appendChild(row);
    updateBulk(item.id, item.value, item.qty);
}

function updateBulk(id, value, qty) {
    const item = state.bulk.find(b => b.id == id);
    if (item) {
        item.value = value;
        item.qty = parseInt(qty) || 1;
    }
    const cost = (costos.bulk[value] || 0) * (parseInt(qty) || 1);
    document.getElementById('price_bulk_' + id).textContent = '$' + cost.toLocaleString();
    calculate();
}

function removeBulk(id) {
    document.getElementById('bulk-' + id).remove();
    state.bulk = state.bulk.filter(b => b.id != id);
    calculate();
}

function addCustomRow() {
    const id = Date.now();
    const item = { id: id, desc: '', qty: 1, price: 0 };
    state.custom.push(item);
    renderCustomRow(item);
    calculate();
}

function renderCustomRow(item) {
    const container = document.getElementById('customContainer');
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.id = 'custom-' + item.id;
    row.innerHTML = `
        <input type="text" id="desc_custom_${item.id}" value="${item.desc}" placeholder="Descripción" style="flex:2" onchange="updateCustom('${item.id}')">
        <span>×</span>
        <input type="number" id="qty_custom_${item.id}" value="${item.qty}" min="1" onchange="updateCustom('${item.id}')">
        <span>$</span>
        <input type="number" id="price_custom_${item.id}" value="${item.price}" min="0" onchange="updateCustom('${item.id}')">
        <button class="row-remove" onclick="removeCustom('${item.id}')">✕</button>
    `;
    container.appendChild(row);
}

function updateCustom(id) {
    const item = state.custom.find(c => c.id == id);
    if (item) {
        item.desc = document.getElementById('desc_custom_' + id).value;
        item.qty = parseInt(document.getElementById('qty_custom_' + id).value) || 1;
        item.price = parseFloat(document.getElementById('price_custom_' + id).value) || 0;
    }
    calculate();
}

function removeCustom(id) {
    document.getElementById('custom-' + id).remove();
    state.custom = state.custom.filter(c => c.id != id);
    calculate();
}

function toggleFlyers() {
    const selector = document.getElementById('flyers_tipo');
    if (selector) selector.classList.toggle('hidden', !document.getElementById('addon_flyers').checked);
    calculate();
}

function toggleViaticos() {
    const inputs = document.getElementById('viaticosInputs');
    if (inputs) inputs.classList.toggle('hidden', !document.getElementById('addon_viaticos').checked);
    calculate();
}

function updateMargin(isSlider) {
    const sidebarMargen = document.getElementById('cfg_margen_default');
    const slider = document.getElementById('marginSlider');
    
    if (isSlider) {
        state.margen = parseFloat(slider.value) || 3;
        if (sidebarMargen) sidebarMargen.value = state.margen;
    } else {
        state.margen = parseFloat(sidebarMargen.value) || 3;
        if (slider) slider.value = state.margen;
    }
    
    const taxInput = document.getElementById('cfg_tax');
    const discInput = document.getElementById('cfg_discount');
    state.tax = taxInput ? parseFloat(taxInput.value) : 0;
    state.discount = discInput ? parseFloat(discInput.value) : 0;
    
    const marginLabel = document.getElementById('marginLabel');
    if (marginLabel) marginLabel.textContent = state.margen.toFixed(1) + 'x';
    calculate();
}

// ========================================
// CALCULATE
// ========================================

function calculate() {
    // Read add-ons
    state.addonDrone = document.getElementById('addon_drone').checked;
    state.addonStreamingIphone = document.getElementById('addon_streaming_iphone').checked;
    state.addonStreamingAtem = document.getElementById('addon_streaming_atem').checked;
    state.addon2cam = document.getElementById('addon_2cam').checked;
    state.addonUsb = document.getElementById('addon_usb').checked;
    state.addonMaquillaje = document.getElementById('addon_maquillaje').checked;
    state.addonFlyers = document.getElementById('addon_flyers').checked;
    state.addonViaticos = document.getElementById('addon_viaticos').checked;
    
    state.extra_base_x_ch = document.getElementById('extra_base_x_ch').checked;
    state.extra_base_x_gr = document.getElementById('extra_base_x_gr').checked;
    state.extra_escaneo_norm = document.getElementById('extra_escaneo_norm').checked;
    state.extra_escaneo_neg = document.getElementById('extra_escaneo_neg').checked;
    
    // Read video
    const videoRadios = document.querySelectorAll('input[name="video"]');
    videoRadios.forEach(r => {
        if (r.checked) state.video = parseInt(r.value);
    });
    
    // Read viaticos
    state.viaticos.km = parseInt(document.getElementById('viaticos_km').value) || 0;
    state.viaticos.casetas = parseInt(document.getElementById('viaticos_casetas').value) || 0;
    
    // Calc Photography
    let costFoto = costos.crewBase + (state.horas * costos.crewHora);
    if (state.cams >= 2) costFoto += costos.asistente;
    if (state.cams >= 3) costFoto += costos.camarografo;
    if (state.cams >= 4) costFoto += costos.cam2;
    
    // Calc Video
    let costVideo = 0;
    if (state.video === 1) costVideo = costos.videoHighlight;
    else if (state.video === 2) costVideo = costos.videoCam1Hora * state.videoHoras;
    else if (state.video === 3) costVideo = costos.videoCam2Hora * state.videoHoras;
    else if (state.video === 4) costVideo = costos.videoCam3Hora * state.videoHoras;
    
    // Calc Drone
    let costDrone = state.addonDrone ? costos.drone : 0;
    
    // Calc Streaming
    let costStreaming = 0;
    if (state.addonStreamingIphone) costStreaming += costos.streamingIphone;
    if (state.addonStreamingAtem) costStreaming += costos.streamingAtem;
    
    // Calc Maquillaje
    let costMaquillaje = state.addonMaquillaje ? costos.maquillaje : 0;
    
    // Calc Sesion (Dynamic Items)
    let costSesion = 0;
    state.sesionItems.forEach(item => {
        costSesion += item.price || 0;
    });
    
    // Calc Custom Addons
    let costCustomAddons = 0;
    state.customAddons.forEach(a => {
        costCustomAddons += a.price || 0;
    });
    
    // Calc Frames
    let costMarcos = 0;
    state.frames.forEach(f => {
        costMarcos += (costos.frames[f.value] || 0) * f.qty;
    });
    
    // Calc Canvas
    let costCanvas = 0;
    state.canvases.forEach(c => {
        costCanvas += (costos.canvases[c.value] || 0) * c.qty;
    });
    
    // Calc Fotos
    let costFotos = 0;
    state.fotos.forEach(f => {
        costFotos += (costos.fotos[f.value] || 0) * f.qty;
    });

    // Calc Bulk
    let costBulk = 0;
    state.bulk.forEach(b => {
        costBulk += (costos.bulk[b.value] || 0) * b.qty;
    });
    
    // Calc Flyers
    let costFlyers = 0;
    if (state.addonFlyers) {
        const tipo = document.getElementById('flyers_tipo').value;
        costFlyers = costos.flyers[tipo] || 0;
    }
    
    // Calc Viaticos
    let costViaticos = 0;
    if (state.addonViaticos) {
        costViaticos = (state.viaticos.km * costos.viaticosGas) + state.viaticos.casetas;
    }
    
    // Calc Custom
    let costCustom = 0;
    state.custom.forEach(c => {
        costCustom += c.price * c.qty;
    });
    
    // Calc Extras
    let costExtras = 0;
    if (state.extra_base_x_ch) costExtras += costos.extras.base_x_ch;
    if (state.extra_base_x_gr) costExtras += costos.extras.base_x_gr;
    if (state.extra_escaneo_norm) costExtras += costos.extras.escaneo_norm;
    if (state.extra_escaneo_neg) costExtras += costos.extras.escaneo_neg;
    
    // Calc USB
    let costUsb = state.addonUsb ? costos.usb : 0;
    
    // Calc Portarretratos
    let costPortarretratos = 0;
    state.portarretratos.forEach(p => {
        costPortarretratos += (p.price || 0) * (p.qty || 1);
    });
    
    // Subtotal (Servicios base)
    let subtotalServicios = costFoto + costVideo + costDrone + costStreaming + 
                           costSesion + costMarcos + costCanvas + costFotos + 
                           costBulk + costFlyers + costCustom + costUsb + costExtras +
                           costMaquillaje + costCustomAddons + costPortarretratos;
    
    // With margin (Sólo a servicios)
    let conMargen = subtotalServicios * state.margen;
    
    // Agregar viáticos al final (SIN margen)
    let subtotalFinal = conMargen + costViaticos;
    
    // Tax (IVA)
    let taxAmount = 0;
    if (state.tax > 0) {
        taxAmount = subtotalFinal * (state.tax / 100);
        document.getElementById('taxLine').style.display = 'flex';
        document.getElementById('taxPct').textContent = state.tax;
    } else {
        document.getElementById('taxLine').style.display = 'none';
    }
    
    // Discount
    let discountAmount = 0;
    if (state.discount > 0) {
        discountAmount = (subtotalFinal + taxAmount) * (state.discount / 100);
        document.getElementById('discountLine').style.display = 'flex';
        document.getElementById('discountPct').textContent = state.discount;
    } else {
        document.getElementById('discountLine').style.display = 'none';
    }
    
    // Total
    let total = subtotalFinal + taxAmount - discountAmount;
    
    // Update summary
    document.getElementById('sum_foto').textContent = '$' + costFoto.toLocaleString('es-MX');
    document.getElementById('sum_video').textContent = '$' + costVideo.toLocaleString('es-MX');
    document.getElementById('sum_drone').textContent = '$' + costDrone.toLocaleString('es-MX');
    document.getElementById('sum_streaming').textContent = '$' + costStreaming.toLocaleString('es-MX');
    document.getElementById('sum_sesion').textContent = '$' + costSesion.toLocaleString('es-MX');
    document.getElementById('sum_marcos').textContent = '$' + costMarcos.toLocaleString('es-MX');
    document.getElementById('sum_canvas').textContent = '$' + costCanvas.toLocaleString('es-MX');
    document.getElementById('sum_fotos').textContent = '$' + costFotos.toLocaleString('es-MX');
    document.getElementById('sum_flyers').textContent = '$' + costFlyers.toLocaleString('es-MX');
    document.getElementById('sum_viaticos').textContent = '$' + costViaticos.toLocaleString('es-MX');
    document.getElementById('sum_custom').textContent = '$' + costCustom.toLocaleString('es-MX');
    
    document.getElementById('sum_subtotal').textContent = '$' + subtotalServicios.toLocaleString('es-MX');
    document.getElementById('calcMargin').textContent = state.margen;
    document.getElementById('sum_margin').textContent = '$' + conMargen.toLocaleString('es-MX');
    document.getElementById('sum_tax').textContent = '$' + taxAmount.toLocaleString('es-MX');
    document.getElementById('sum_discount').textContent = '-$' + discountAmount.toLocaleString('es-MX');
    document.getElementById('sum_total').textContent = '$' + total.toLocaleString('es-MX');

    // Auto-save state
    state.cliente = {
        nombre: document.getElementById('cliente_nombre').value,
        evento: document.getElementById('cliente_evento').value,
        fecha: document.getElementById('cliente_fecha').value,
        email: document.getElementById('cliente_email').value
    };
    saveToStorage();
}

// ========================================
// RESET
// ========================================

function resetAll() {
    if (!confirm('¿Seguro que quieres limpiar todo? Se borrará el progreso guardado.')) return;
    
    localStorage.removeItem('slpro_calc_state');
    
    state = {
        evento: 'bodas',
        horas: 4,
        cams: 1,
        addonDrone: false,
        addonStreaming: false,
        addon2cam: false,
        addonUsb: true,
        addonFlyers: false,
        addonViaticos: false,
        sesion: 0,
        video: 0,
        frames: [],
        canvases: [],
        fotos: [],
        bulk: [],
        custom: [],
        margen: 3,
        tax: 0,
        discount: 0,
        viaticos: { km: 50, casetas: 200 },
        extra_base_x_ch: false,
        extra_base_x_gr: false,
        extra_escaneo_norm: false,
        extra_escaneo_neg: false
    };
    
    // Reset UI
    document.querySelectorAll('.event-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.event === 'bodas');
    });
    
    document.querySelectorAll('.hour-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.h) === 4);
    });
    
    document.querySelectorAll('.cam-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.c) === 1);
    });
    
    document.getElementById('addon_drone').checked = false;
    document.getElementById('addon_streaming').checked = false;
    document.getElementById('addon_2cam').checked = false;
    document.getElementById('addon_usb').checked = true;
    document.getElementById('addon_flyers').checked = false;
    document.getElementById('addon_viaticos').checked = false;
    document.getElementById('extra_base_x_ch').checked = false;
    document.getElementById('extra_base_x_gr').checked = false;
    document.getElementById('extra_escaneo_norm').checked = false;
    document.getElementById('extra_escaneo_neg').checked = false;

    document.getElementById('flyers_tipo').classList.add('hidden');
    document.getElementById('viaticosInputs').classList.add('hidden');
    
    document.querySelectorAll('input[name="sesion"]')[0].checked = true;
    document.querySelectorAll('input[name="video"]')[0].checked = true;
    
    document.getElementById('marginSlider').value = 3;
    document.getElementById('marginLabel').textContent = '3.0x';
    document.getElementById('cfg_margen_default').value = 3;
    document.getElementById('cfg_tax').value = 0;
    document.getElementById('cfg_discount').value = 0;
    
    // Clear rows
    document.getElementById('framesContainer').innerHTML = '';
    document.getElementById('canvasContainer').innerHTML = '';
    document.getElementById('fotoContainer').innerHTML = '';
    document.getElementById('bulkContainer').innerHTML = '';
    document.getElementById('customContainer').innerHTML = '';
    
    addFrameRow();
    addCanvasRow();
    addFotoRow();
    addBulkRow();
    
    // Clear client info
    document.getElementById('cliente_nombre').value = '';
    document.getElementById('cliente_evento').value = '';
    document.getElementById('cliente_fecha').value = '';
    document.getElementById('cliente_email').value = '';
    
    calculate();
}

// ========================================
// COTIZACIÓN
// ========================================

function generarCotizacion() {
    const now = new Date();
    const fecha = now.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
    
    const cliente = document.getElementById('cliente_nombre').value || 'Cliente';
    const evento = document.getElementById('cliente_evento').value || state.evento.toUpperCase();
    const fechaEvento = document.getElementById('cliente_fecha').value || 'Por definir';
    const email = document.getElementById('cliente_email').value || '';
    
    // Gather items
    let servicios = [];
    
    const costFoto = getNumberValue('sum_foto');
    servicios.push({ name: '📷 Fotografía (' + state.horas + ' hrs, ' + state.cams + ' cámara(s))', price: costFoto });
    
    if (state.video === 1) servicios.push({ name: '🎬 Highlight Reel', price: costos.videoHighlight });
    else if (state.video === 2) servicios.push({ name: '🎬 Video Completo (' + state.horas + ' hrs)', price: costos.videoHora * state.horas });
    
    if (state.addonDrone) servicios.push({ name: '🚁 Drone', price: costos.drone });
    if (state.addonStreaming) servicios.push({ name: '📺 Streaming', price: costos.streaming });
    if (state.addon2cam) servicios.push({ name: '📷 2ª Cámara', price: costos.cam2 });
    if (state.sesion > 0) servicios.push({ name: '📸 Sesión Previa (Opción ' + state.sesion + ')', price: costos.sesion[state.sesion] });
    if (state.addonUsb) servicios.push({ name: '💾 USB Personalizado', price: costos.usb });
    
    state.frames.forEach(f => {
        servicios.push({ name: '🖼️ Cuadro ' + f.value.replace('_', ' ') + ' (x' + f.qty + ')', price: (costos.frames[f.value] || 0) * f.qty });
    });
    
    state.canvases.forEach(c => {
        servicios.push({ name: '🎨 Canvas ' + c.value + '" (x' + c.qty + ')', price: (costos.canvases[c.value] || 0) * c.qty });
    });
    
    state.fotos.forEach(f => {
        servicios.push({ name: '🖼️ Retrato ' + f.value + '" (Base/Textura) (x' + f.qty + ')', price: (costos.fotos[f.value] || 0) * f.qty });
    });

    state.bulk.forEach(b => {
        servicios.push({ name: '📦 Mayoreo ' + b.qty + 'x ' + b.value + '" (Sólo Impresión)', price: (costos.bulk[b.value] || 0) * b.qty });
    });

    if (state.extra_base_x_ch) servicios.push({ name: '🛠️ Base Chica X', price: costos.extras.base_x_ch });
    if (state.extra_base_x_gr) servicios.push({ name: '🛠️ Base Grande X', price: costos.extras.base_x_gr });
    if (state.extra_escaneo_norm) servicios.push({ name: '🛠️ Escaneo Normal', price: costos.extras.escaneo_norm });
    if (state.extra_escaneo_neg) servicios.push({ name: '🛠️ Escaneo Negativo', price: costos.extras.escaneo_neg });
    
    if (state.addonFlyers) {
        const tipoKey = document.getElementById('flyers_tipo').value;
        servicios.push({ name: '📋 Flyers (' + tipoKey.toUpperCase() + ')', price: costos.flyers[tipoKey] || 0 });
    }
    
    // Extra Custom
    state.custom.forEach(c => {
        if (c.desc && c.price > 0) {
            servicios.push({ name: '➕ ' + c.desc + ' (x' + c.qty + ')', price: c.price * c.qty });
        }
    });

    // Viaticos (Separated from margin)
    const costViaticos = (state.viaticos.km * costos.viaticosGas) + state.viaticos.casetas;

    // Totals logic
    const subtotal = servicios.reduce((sum, s) => sum + s.price, 0);
    const conMargen = subtotal * state.margen;
    const conViaticos = conMargen + (state.addonViaticos ? costViaticos : 0);
    const taxAmount = state.tax > 0 ? conViaticos * (state.tax / 100) : 0;
    const discountAmount = state.discount > 0 ? (conViaticos + taxAmount) * (state.discount / 100) : 0;
    const total = conViaticos + taxAmount - discountAmount;
    
    const cotNum = 'COT-' + now.getFullYear() + '-' + String(Math.floor(Math.random() * 999)).padStart(3, '0');
    
    let serviciosHtml = '';
    servicios.forEach(s => {
        let precioFinal = s.price * state.margen;
        serviciosHtml += '<div class="cot-service"><span>' + s.name + '</span><span>$' + precioFinal.toLocaleString('es-MX') + '</span></div>';
    });
    
    if (state.addonViaticos) {
        serviciosHtml += '<div class="cot-service"><span>🚗 Viáticos (Gas+Casetas)</span><span>$' + costViaticos.toLocaleString('es-MX') + '</span></div>';
    }
    
    let taxHtml = state.tax > 0 ? '<div class="cot-line"><span>IVA (' + state.tax + '%):</span><span>$' + taxAmount.toLocaleString('es-MX') + '</span></div>' : '';
    let discountHtml = state.discount > 0 ? '<div class="cot-line discount"><span>Descuento (' + state.discount + '%):</span><span>-$' + discountAmount.toLocaleString('es-MX') + '</span></div>' : '';
    
    let html = '<div class="cotizacion" id="cotizacion-pdf">';
    html += '<div class="cot-header"><h1>SAN LUIS PRO</h1><p>Diseño, Fotografía y Video mx Estilo San Luis</p>';
    html += '<div class="cot-meta"><span>' + cotNum + '</span><span>Fecha: ' + fecha + '</span><span>Validez: 15 días</span></div></div>';
    html += '<div class="cot-client"><h3>PARA:</h3><p><strong>' + cliente + '</strong></p><p>Evento: ' + evento + '</p><p>Fecha: ' + fechaEvento + '</p>' + (email ? '<p>Email: ' + email + '</p>' : '') + '</div>';
    html += '<div class="cot-services"><h3>DETALLE DE INVERSIÓN</h3>' + serviciosHtml + '</div>';
    html += '<div class="cot-totals"><div class="cot-line"><span>Subtotal Servicios:</span><span>$' + conMargen.toLocaleString('es-MX') + '</span></div>';
    html += taxHtml + discountHtml;
    html += '<div class="cot-total"><span>TOTAL:</span><span>$' + total.toLocaleString('es-MX') + ' MXN</span></div></div>';
    html += '<div class="cot-terms"><h3>TÉRMINOS Y CONDICIONES</h3><p>• Anticipo 50% para confirmar fecha</p><p>• Saldo restante 5 días antes del evento</p><p>• Entrega de material: 30-45 días hábiles</p><p>• Formas de pago: Transferencia / Depósito / Efectivo</p></div>';
    html += '<div class="cot-footer"><p>El Seguro de Vida de tu Evento</p><p>San Luis PRO | Huasteca Potosina | 2026</p></div></div>';
    
    document.getElementById('cotizacionContent').innerHTML = html;
    document.getElementById('modalCotizacion').classList.add('show');
}

function getNumberValue(id) {
    const text = document.getElementById(id).textContent;
    return parseInt(text.replace(/[$,]/g, '')) || 0;
}

function closeModal() {
    document.getElementById('modalCotizacion').classList.remove('show');
}

function copiarCotizacion() {
    const contenido = document.getElementById('cotizacionContent').innerText;
    navigator.clipboard.writeText(contenido).then(() => {
        alert('✅ Cotización copiada al portapapeles');
    });
}

function descargarPDF() {
const element = document.getElementById('cotizacion-pdf');
const cliente = (document.getElementById('cliente_nombre').value || 'Cliente').replace(/\s+/g, '_');

const opt = {
margin: 0.5,
filename: `Cotizacion_SLPRO_${cliente}.pdf`,
image: { type: 'jpeg', quality: 0.98 },
html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0a0a0a' },
jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
};

html2pdf().set(opt).from(element).save();
}

// ========================================
// DARK MODE TOGGLE
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Cargar tema guardado o detectar preferencia del sistema
const savedTheme = localStorage.getItem('slpro_theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

html.setAttribute('data-theme', initialTheme);

// Función para cambiar tema
function toggleTheme() {
const current = html.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';
html.setAttribute('data-theme', next);
localStorage.setItem('slpro_theme', next);
}

// Event listener
themeToggle.addEventListener('click', toggleTheme);

// ========================================
// VIDEO CONFIG (Horas + Cámaras)
// ========================================

function toggleVideoConfig() {
    const selected = parseInt(document.querySelector('input[name="video"]:checked').value);
    state.video = selected;
    const panel = document.getElementById('videoConfigPanel');
    if (selected > 0) {
        panel.classList.remove('hidden');
    } else {
        panel.classList.add('hidden');
    }
    calculate();
}

function setVideoHours(h) {
    state.videoHoras = h;
    document.querySelectorAll('#videoHourButtons .hour-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.vh) === h);
    });
    calculate();
}

// ========================================
// SESIÓN PREVIA (Dynamic Items)
// ========================================

const sesionOptions = [
    { value: 'fondo_1', label: '1 Fondo', price: 500 },
    { value: 'fondo_2', label: '2 Fondos', price: 800 },
    { value: 'fondo_3', label: '3 Fondos', price: 1200 },
    { value: 'estudio', label: 'Sesión Estudio', price: 1000 },
    { value: 'exterior', label: 'Sesión Exterior', price: 800 },
    { value: 'drone_sesion', label: 'Drone (Sesión)', price: 600 },
    { value: 'maquillaje_sesion', label: 'Maquillaje', price: 500 },
    { value: 'custom', label: '✏️ Personalizado', price: 0 }
];

function addSesionItem() {
    const container = document.getElementById('sesionPreviaContainer');
    const idx = state.sesionItems.length;
    state.sesionItems.push({ value: 'fondo_1', price: 500, customDesc: '' });

    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.id = 'sesionRow_' + idx;

    let selectHtml = '<select onchange="updateSesionItem(' + idx + ', this)">';
    sesionOptions.forEach(opt => {
        selectHtml += '<option value="' + opt.value + '" data-price="' + opt.price + '">' + opt.label + ' ($' + opt.price + ')</option>';
    });
    selectHtml += '</select>';

    row.innerHTML = selectHtml +
        '<input type="text" placeholder="Desc." style="width:80px; display:none;" id="sesionCustomDesc_' + idx + '" onchange="updateSesionCustom(' + idx + ', this)">' +
        '<input type="number" value="500" style="width:70px; text-align:right;" id="sesionPrice_' + idx + '" onchange="updateSesionPrice(' + idx + ', this)">' +
        '<span class="row-price" id="sesionTotal_' + idx + '">$500</span>' +
        '<button class="row-remove" onclick="removeSesionItem(' + idx + ')">✕</button>';

    container.appendChild(row);
    calculate();
}

function updateSesionItem(idx, select) {
    const opt = select.options[select.selectedIndex];
    const price = parseInt(opt.dataset.price) || 0;
    state.sesionItems[idx].value = select.value;
    state.sesionItems[idx].price = price;
    document.getElementById('sesionPrice_' + idx).value = price;
    document.getElementById('sesionTotal_' + idx).textContent = '$' + price.toLocaleString();

    const customInput = document.getElementById('sesionCustomDesc_' + idx);
    customInput.style.display = select.value === 'custom' ? 'block' : 'none';
    calculate();
}

function updateSesionPrice(idx, input) {
    state.sesionItems[idx].price = parseFloat(input.value) || 0;
    document.getElementById('sesionTotal_' + idx).textContent = '$' + state.sesionItems[idx].price.toLocaleString();
    calculate();
}

function updateSesionCustom(idx, input) {
    state.sesionItems[idx].customDesc = input.value;
}

function removeSesionItem(idx) {
    state.sesionItems.splice(idx, 1);
    rebuildSesionRows();
    calculate();
}

function rebuildSesionRows() {
    const container = document.getElementById('sesionPreviaContainer');
    container.innerHTML = '';
    const items = [...state.sesionItems];
    state.sesionItems = [];
    items.forEach(() => addSesionItem());
    // Restore values
    items.forEach((item, i) => {
        state.sesionItems[i] = item;
        const row = document.getElementById('sesionRow_' + i);
        if (row) {
            row.querySelector('select').value = item.value;
            document.getElementById('sesionPrice_' + i).value = item.price;
            document.getElementById('sesionTotal_' + i).textContent = '$' + item.price.toLocaleString();
        }
    });
}

// ========================================
// CUSTOM ADD-ONS (Dynamic)
// ========================================

function addCustomAddon() {
    const container = document.getElementById('customAddonsContainer');
    const idx = state.customAddons.length;
    state.customAddons.push({ desc: '', price: 0, active: true });

    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.id = 'customAddon_' + idx;
    row.innerHTML =
        '<input type="text" placeholder="Nombre del add-on" style="flex:1;" onchange="state.customAddons[' + idx + '].desc=this.value; calculate()">' +
        '<input type="number" placeholder="$" style="width:80px; text-align:right;" onchange="state.customAddons[' + idx + '].price=parseFloat(this.value)||0; calculate()">' +
        '<button class="row-remove" onclick="removeCustomAddon(' + idx + ')">✕</button>';

    container.appendChild(row);
}

function removeCustomAddon(idx) {
    state.customAddons.splice(idx, 1);
    const container = document.getElementById('customAddonsContainer');
    container.innerHTML = '';
    const items = [...state.customAddons];
    state.customAddons = [];
    items.forEach(item => {
        addCustomAddon();
        const i = state.customAddons.length - 1;
        state.customAddons[i] = item;
        const row = document.getElementById('customAddon_' + i);
        if (row) {
            row.querySelector('input[type="text"]').value = item.desc;
            row.querySelector('input[type="number"]').value = item.price;
        }
    });
    calculate();
}



let aiChart = null;
let pendingOptimization = null;

function optimizeWithAI() {
    const modal = document.getElementById('modalAI');
    const insight = document.getElementById('aiInsight');
    const diffContainer = document.getElementById('aiDiff');
    
    modal.classList.add('show');
    insight.textContent = "🧠 GLM-5.1 Analizando balance de estatus vs costo...";
    diffContainer.innerHTML = "";

    const apiKey = localStorage.getItem('slpro_nvidia_key') || '';
    
    if (apiKey && apiKey.startsWith('nvapi-')) {
        // === MODO REAL: NVIDIA NIM ===
        callNvidiaGLM(apiKey, insight, diffContainer);
    } else {
        // === MODO SIMULACIÓN ===
        runSimulation(insight, diffContainer);
    }
}

async function callNvidiaGLM(apiKey, insight, diffContainer) {
    const currentTotal = getNumberValue('sum_total');
    const subtotal = getNumberValue('sum_subtotal');
    const systemPrompt = document.getElementById('cfg_ai_prompt').value;
    
    const cotizacionData = JSON.stringify({
        evento: state.evento,
        horas: state.horas,
        camaras: state.cams,
        margenActual: state.margen,
        subtotalCosto: subtotal,
        totalActual: currentTotal,
        drone: state.addonDrone,
        streaming: state.addonStreaming,
        video: state.video,
        sesion: state.sesion,
        frames: state.frames.length,
        canvases: state.canvases.length
    });

    try {
        const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: 'z-ai/glm-5.1',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: 'Analiza esta cotización y sugiere optimizaciones: ' + cotizacionData }
                ],
                temperature: 0.3,
                max_tokens: 512
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            insight.textContent = "⚠️ Error API (" + response.status + "). Activando simulación...";
            insight.style.borderLeftColor = 'var(--red)';
            setTimeout(() => runSimulation(insight, diffContainer), 1000);
            return;
        }

        const data = await response.json();
        const rawContent = data.choices[0].message.content;
        
        // Intentar parsear JSON de la respuesta
        let aiResult;
        try {
            const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
            aiResult = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
        } catch(e) {
            aiResult = null;
        }

        if (aiResult && aiResult.strategy) {
            insight.textContent = aiResult.strategy;
            insight.style.borderLeftColor = 'var(--gold)';
            
            const suggestedMargin = aiResult.suggestedMargin || state.margen;
            const potentialIncrease = aiResult.potentialIncrease || 1.15;
            const changes = aiResult.changes || [];
            
            changes.forEach(c => {
                const div = document.createElement('div');
                div.textContent = '✦ ' + c;
                div.style.color = "var(--green)";
                diffContainer.appendChild(div);
            });

            const potentialTotal = currentTotal * potentialIncrease;
            renderAIChart(currentTotal, potentialTotal);
            
            pendingOptimization = {
                margen: suggestedMargin,
                drone: aiResult.activateDrone || state.addonDrone
            };
        } else {
            // La IA respondió pero no en JSON limpio
            insight.textContent = rawContent.substring(0, 300);
            insight.style.borderLeftColor = 'var(--blue)';
            
            const potentialTotal = currentTotal * 1.2;
            renderAIChart(currentTotal, potentialTotal);
            pendingOptimization = { margen: state.margen, drone: state.addonDrone };
        }

    } catch (err) {
        insight.textContent = "⚠️ Sin conexión al servidor. Simulación activa.";
        insight.style.borderLeftColor = 'var(--red)';
        runSimulation(insight, diffContainer);
    }
}

function runSimulation(insight, diffContainer) {
    setTimeout(() => {
        const currentTotal = getNumberValue('sum_total');
        const currentMargin = state.margen;
        
        let suggestedMargin = currentMargin;
        let changes = [];
        let strategy = "";

        if (state.evento === 'bodas' && currentMargin < 4) {
            strategy = "SIMULACIÓN — ESTATUS ALTO. Tu margen es bajo para boda. Sube a 4.0x.";
            suggestedMargin = 4.0;
            changes.push("📈 Subir Margen: " + currentMargin + "x → 4.0x");
        } else if (state.evento === 'jaripeos') {
            strategy = "SIMULACIÓN — VOLUMEN REPAROS. Incluye Drone y margen de protección.";
            if (!state.addonDrone) changes.push("🚁 Activar Drone");
        } else {
            strategy = "SIMULACIÓN — Optimiza línea de marcos (A1 → B2) para +$1,200.";
            changes.push("🖼️ Cambiar A1 → B2 en cuadros grandes");
        }

        const potentialTotal = currentTotal * 1.25;
        insight.textContent = strategy;
        
        changes.forEach(c => {
            const div = document.createElement('div');
            div.textContent = c;
            div.style.color = "var(--green)";
            diffContainer.appendChild(div);
        });

        renderAIChart(currentTotal, potentialTotal);
        
        pendingOptimization = {
            margen: suggestedMargin,
            drone: (state.evento === 'jaripeos' ? true : state.addonDrone)
        };
    }, 1500);
}

function renderAIChart(current, optimized) {
    const options = {
        series: [{
            name: 'Inversión Total',
            data: [Math.round(current), Math.round(optimized)]
        }],
        chart: {
            type: 'bar',
            height: 300,
            toolbar: { show: false },
            background: 'transparent'
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '50%',
                distributed: true,
                dataLabels: { position: 'top' }
            }
        },
        colors: ['#444', '#D4AF37'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#666', '#F4D03F'],
                stops: [0, 100]
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => '$' + val.toLocaleString(),
            offsetY: -20,
            style: { colors: ['#fff'], fontSize: '14px', fontWeight: 700 }
        },
        xaxis: {
            categories: ['Actual', 'Potencial 33X'],
            labels: { style: { colors: '#888' } }
        },
        yaxis: { show: false },
        theme: { mode: 'dark' },
        grid: { show: false },
        tooltip: { enabled: false }
    };

    if (aiChart) aiChart.destroy();
    aiChart = new ApexCharts(document.querySelector("#chart_profit"), options);
    aiChart.render();
}

function applyAIOptimization() {
    if (!pendingOptimization) return;
    
    state.margen = pendingOptimization.margen;
    state.addonDrone = pendingOptimization.drone;
    
    document.getElementById('marginSlider').value = state.margen;
    document.getElementById('marginLabel').textContent = state.margen.toFixed(1) + 'x';
    document.getElementById('addon_drone').checked = state.addonDrone;
    
    calculate();
    closeAI();
    alert('✅ Estrategia 33X Aplicada con Éxito.');
}

function closeAI() {
    document.getElementById('modalAI').classList.remove('show');
}

// Persistir Prompt y Key (dentro de DOMContentLoaded para evitar errores)
window.addEventListener('DOMContentLoaded', () => {
    const promptEl = document.getElementById('cfg_ai_prompt');
    if (promptEl) {
        const savedPrompt = localStorage.getItem('slpro_ai_prompt');
        if (savedPrompt) promptEl.value = savedPrompt;
        promptEl.addEventListener('change', (e) => {
            localStorage.setItem('slpro_ai_prompt', e.target.value);
        });
    }
    const keyEl = document.getElementById('cfg_ai_key');
    if (keyEl) {
        const savedKey = localStorage.getItem('slpro_nvidia_key');
        if (savedKey) keyEl.value = savedKey;
    }
});
