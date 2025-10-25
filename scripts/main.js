document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".menu button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".menu button").forEach(b => b.classList.remove("active"));
      document.querySelectorAll("section.tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  const fecha = new Date();
  document.getElementById("fecha").textContent =
    fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });

  const cuerpo = document.getElementById("lineas");
  const subtotal = document.getElementById("subtotal");
  const iva = document.getElementById("iva");
  const total = document.getElementById("total");

  function recalcular() {
    let st = 0;
    cuerpo.querySelectorAll("tr").forEach(tr => {
      const cant = parseFloat(tr.querySelector(".cant").value) || 0;
      const precio = parseFloat(tr.querySelector(".precio").value) || 0;
      const imp = cant * precio;
      tr.querySelector(".importe").textContent = imp.toFixed(2);
      st += imp;
    });
    const ivaCalc = st * 0.04;
    subtotal.textContent = st.toFixed(2);
    iva.textContent = ivaCalc.toFixed(2);
    total.textContent = (st + ivaCalc).toFixed(2);
  }

  document.getElementById("agregar").addEventListener("click", () => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input class="prod" placeholder="Producto"></td>
      <td><select><option>kg</option><option>caja</option><option>ud</option></select></td>
      <td><input class="peso" type="number" min="0" step="0.01" value="0"></td>
      <td><input class="cant" type="number" min="0" step="1" value="0"></td>
      <td><input class="precio" type="number" min="0" step="0.01" value="0"></td>
      <td><input class="iva" type="number" min="0" max="21" step="1" value="4"></td>
      <td class="importe">0.00</td>
      <td><button class="del">❌</button></td>`;
    cuerpo.appendChild(tr);
    tr.querySelectorAll("input").forEach(i => i.addEventListener("input", recalcular));
    tr.querySelector(".del").addEventListener("click", () => { tr.remove(); recalcular(); });
  });

  document.getElementById("limpiar").addEventListener("click", () => {
    cuerpo.innerHTML = "";
    recalcular();
  });

  document.getElementById("guardar").addEventListener("click", () => {
    alert("✅ Factura guardada (modo demostración).");
  });
});
