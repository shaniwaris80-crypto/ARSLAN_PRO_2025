// --- ARSLAN PRO 2025 — Módulo principal de facturación avanzada ---

// --- ARSLAN PRO 2025 — Facturación avanzada ---
document.addEventListener("DOMContentLoaded", () => {
  const out = document.getElementById("output");
  const addBtn = document.getElementById("btn-add");
  const totalSpan = document.getElementById("total");
  const descInput = document.getElementById("desc");
  const ivaCheck = document.getElementById("iva");
  const recargoCheck = document.getElementById("recargo");
  const transpCheck = document.getElementById("transporte");

  let FACTURA = [];

  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const load = (k) => JSON.parse(localStorage.getItem(k) || "[]");

  let CATALOGO = load("catalogo");
  let CLIENTES = load("clientes");

  addBtn.addEventListener("click", () => {
    const name = prompt("Producto:");
    if (!name) return;
    const base = CATALOGO.find(p => p.name.includes(name.toUpperCase())) || {};
    const qty = parseFloat(prompt("Cantidad:", 1)) || 1;
    const precio = parseFloat(prompt("Precio €/unidad:", base.precio || 0)) || 0;
    const iva = base.iva || 4;
    const unit = base.unit || "kg";

    FACTURA.push({ name, qty, precio, iva, unit });
    render();
  });

  function render() {
    out.innerHTML = "";
    let subtotal = 0;
    FACTURA.forEach((p, i) => {
      const lineTotal = p.qty * p.precio;
      subtotal += lineTotal;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>${p.qty}</td>
        <td>${p.unit}</td>
        <td>${p.precio.toFixed(2)} €</td>
        <td>${(p.qty * p.precio).toFixed(2)} €</td>`;
      out.appendChild(tr);
    });

    let descuento = parseFloat(descInput.value) || 0;
    let total = subtotal * (1 - descuento / 100);

    if (ivaCheck.checked) total *= 1.04;
    if (recargoCheck.checked) total *= 1.014;
    if (transpCheck.checked) total *= 1.10;

    totalSpan.textContent = total.toFixed(2) + " €";
  }

  [descInput, ivaCheck, recargoCheck, transpCheck].forEach(el => {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  document.getElementById("bk-export").addEventListener("click", () => {
    const payload = { facturas: load("facturas"), catalogo: CATALOGO, clientes: CLIENTES };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    a.download = `backup_ARSLANPRO_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  });

  document.getElementById("bk-import").addEventListener("click", () => {
    document.getElementById("bk-file").click();
  });

  document.getElementById("bk-file").addEventListener("change", async e => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      const obj = JSON.parse(await f.text());
      if (obj.facturas) save("facturas", obj.facturas);
      if (obj.catalogo) save("catalogo", obj.catalogo);
      if (obj.clientes) save("clientes", obj.clientes);
      alert("✅ Copia restaurada correctamente.");
    } catch {
      alert("❌ Archivo inválido.");
    }
  });

  document.getElementById("btn-pdf").addEventListener("click", generarPDF);

  render();
});
