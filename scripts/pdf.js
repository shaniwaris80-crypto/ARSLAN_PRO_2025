// --- ARSLAN PRO 2025 — Generador de PDF Profesional ---
function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const fecha = new Date().toLocaleDateString('es-ES');

  doc.setFontSize(16);
  doc.text('🥝 ARSLAN PRO 2025', 14, 20);
  doc.setFontSize(10);
  doc.text(`Fecha: ${fecha}`, 150, 20);

  doc.setDrawColor(0, 128, 0);
  doc.line(10, 25, 200, 25);

  doc.setFontSize(12);
  doc.text('Factura', 14, 35);

  let y = 45;
  doc.setFontSize(10);
  doc.text('Producto', 14, y);
  doc.text('Cant.', 80, y);
  doc.text('Precio', 110, y);
  doc.text('Total', 160, y);
  y += 5;

  const tabla = document.querySelectorAll('#output tr');
  let subtotal = 0;
  tabla.forEach(row => {
    const cols = row.querySelectorAll('td');
    if (cols.length >= 6) {
      const nombre = cols[1].innerText;
      const cant = cols[2].innerText;
      const precio = cols[4].innerText;
      const total = cols[5].innerText;
      subtotal += parseFloat(total);
      doc.text(nombre, 14, y);
      doc.text(cant, 85, y);
      doc.text(precio, 115, y);
      doc.text(total, 165, y);
      y += 5;
    }
  });

  y += 10;
  doc.setFontSize(11);
  doc.text(`Subtotal:  ${subtotal.toFixed(2)} €`, 14, y); y += 6;

  const iva = document.getElementById('iva').checked ? subtotal * 0.04 : 0;
  const recargo = document.getElementById('recargo').checked ? subtotal * 0.014 : 0;
  const transporte = document.getElementById('transporte').checked ? subtotal * 0.10 : 0;
  const desc = parseFloat(document.getElementById('desc').value || 0);
  const descuento = subtotal * (desc / 100);
  const total = subtotal + iva + recargo + transporte - descuento;

  doc.text(`IVA 4 %: ${iva.toFixed(2)} €`, 14, y); y += 6;
  doc.text(`Recargo 1,4 %: ${recargo.toFixed(2)} €`, 14, y); y += 6;
  doc.text(`Transporte 10 %: ${transporte.toFixed(2)} €`, 14, y); y += 6;
  doc.text(`Descuento ${desc}%: -${descuento.toFixed(2)} €`, 14, y); y += 6;
  doc.setFontSize(13);
  doc.text(`TOTAL FINAL: ${total.toFixed(2)} €`, 14, y);

  y += 10;
  doc.setFontSize(9);
  doc.text('Emitido por Mohammad Arslan Waris · NIF X6389988J · C/ San Pablo 17 · Burgos', 14, y);

  doc.save(`Factura_ARSLANPRO_${fecha.replace(/\//g, '-')}.pdf`);
}
