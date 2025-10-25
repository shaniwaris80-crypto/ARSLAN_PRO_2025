// --- ARSLAN PRO 2025 — Carga catálogo profesional ---
let CATALOGO = [];

async function cargarCatalogo() {
  try {
    const resp = await fetch('data/catalogo.json', { cache: 'no-store' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    CATALOGO = await resp.json();
    CATALOGO = CATALOGO.map(p => ({
      name: (p.name || '').toUpperCase(),
      unit: p.unit || 'kg',
      peso: p.peso ?? 0,
      tara: p.tara ?? 0,
      iva: p.iva ?? 4,
      precio: p.precio ?? 0
    }));
    localStorage.setItem('catalogo', JSON.stringify(CATALOGO));
    console.log('Catálogo cargado:', CATALOGO.length);
  } catch (e) {
    console.error('Fallo al cargar catálogo:', e);
    CATALOGO = JSON.parse(localStorage.getItem('catalogo') || '[]');
  }
}
cargarCatalogo();
