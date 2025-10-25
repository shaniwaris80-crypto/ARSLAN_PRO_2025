// --- ARSLAN PRO 2025 — Carga de clientes ---
let CLIENTES = [];

async function cargarClientes() {
  try {
    const resp = await fetch('../data/clientes.json', { cache: 'no-store' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    CLIENTES = await resp.json();
    CLIENTES = CLIENTES.map(c => ({
      name: (c.name || c.nombre || '').toUpperCase(),
      vat: (c.vat || c.nif || '').toUpperCase(),
      addr: c.addr || c.dir || '',
      pay: c.pay || 'Efectivo'
    }));
    localStorage.setItem('clientes', JSON.stringify(CLIENTES));
    console.log('Clientes cargados:', CLIENTES.length);
  } catch (e) {
    console.error('Fallo al cargar clientes:', e);
    CLIENTES = JSON.parse(localStorage.getItem('clientes') || '[]');
  }
}
cargarClientes();
