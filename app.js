// Conversor de Medidas de Cocina y Repostería
// Densidades estándar basadas en 1 taza métrica/americana = 240 ml

const INGREDIENTS = [
  { id: "harina_0000", name: "Harina 0000 / Repostería", cup: 120, tbsp: 7.5, tsp: 2.5, cat: "harinas" },
  { id: "harina_leudante", name: "Harina Leudante", cup: 125, tbsp: 7.8, tsp: 2.6, cat: "harinas" },
  { id: "harina_000", name: "Harina 000 / Panadería", cup: 130, tbsp: 8.1, tsp: 2.7, cat: "harinas" },
  { id: "harina_integral", name: "Harina Integral", cup: 125, tbsp: 7.8, tsp: 2.6, cat: "harinas" },
  { id: "maicena", name: "Almidón de Maíz (Maicena)", cup: 110, tbsp: 6.9, tsp: 2.3, cat: "harinas" },
  { id: "azucar_comun", name: "Azúcar Común / Blanco", cup: 200, tbsp: 12.5, tsp: 4.2, cat: "azucares" },
  { id: "azucar_impalpable", name: "Azúcar Impalpable / Glas", cup: 120, tbsp: 7.5, tsp: 2.5, cat: "azucares" },
  { id: "azucar_mascabo", name: "Azúcar Mascabo / Rubio", cup: 180, tbsp: 11.2, tsp: 3.7, cat: "azucares" },
  { id: "manteca", name: "Manteca / Mantequilla", cup: 225, tbsp: 14.0, tsp: 4.7, cat: "grasas" },
  { id: "aceite", name: "Aceite Vegetal / Girasol / Oliva", cup: 220, tbsp: 13.8, tsp: 4.6, cat: "liquidos" },
  { id: "leche", name: "Leche Líquida / Agua", cup: 240, tbsp: 15.0, tsp: 5.0, cat: "liquidos" },
  { id: "cacao_amargo", name: "Cacao Amargo en Polvo", cup: 100, tbsp: 6.2, tsp: 2.1, cat: "reposteria" },
  { id: "dulce_de_leche", name: "Dulce de Leche", cup: 300, tbsp: 18.8, tsp: 6.2, cat: "reposteria" },
  { id: "miel", name: "Miel de Abejas", cup: 340, tbsp: 21.2, tsp: 7.1, cat: "liquidos" },
  { id: "avena", name: "Avena Arrollada (Copos)", cup: 90, tbsp: 5.6, tsp: 1.9, cat: "cereales" },
  { id: "queso_crema", name: "Queso Crema / Mascarpone", cup: 230, tbsp: 14.4, tsp: 4.8, cat: "lacteos" },
  { id: "polvo_hornear", name: "Polvo de Hornear (Royal)", cup: 190, tbsp: 12.0, tsp: 4.0, cat: "leudantes" },
  { id: "bicarbonato", name: "Bicarbonato de Sodio", cup: 220, tbsp: 14.0, tsp: 4.6, cat: "leudantes" },
  { id: "sal_fina", name: "Sal Fina de Mesa", cup: 270, tbsp: 17.0, tsp: 5.6, cat: "especias" },
  { id: "chips_chocolate", name: "Chips de Chocolate", cup: 160, tbsp: 10.0, tsp: 3.3, cat: "reposteria" },
  { id: "nueces_picadas", name: "Nueces / Almendras Picadas", cup: 120, tbsp: 7.5, tsp: 2.5, cat: "frutos" }
];

let currentMode = "cups_to_grams"; // or "grams_to_cups"

function initIngredientsSelect() {
  const sel = document.getElementById("ingredientSelect");
  if (!sel) return;
  sel.innerHTML = "";
  INGREDIENTS.forEach(ing => {
    const opt = document.createElement("option");
    opt.value = ing.id;
    opt.textContent = `${ing.name} (1 taza = ${ing.cup}g)`;
    if (ing.id === "harina_0000") opt.selected = true;
    sel.appendChild(opt);
  });
}

function setMode(mode) {
  currentMode = mode;
  document.getElementById("btnModeCups").classList.toggle("active", mode === "cups_to_grams");
  document.getElementById("btnModeGrams").classList.toggle("active", mode === "grams_to_cups");

  const inputLabel = document.getElementById("inputValLabel");
  const inputUnit = document.getElementById("inputValUnit");
  const inputEl = document.getElementById("amountInput");

  if (mode === "cups_to_grams") {
    inputLabel.textContent = "Cantidad en Tazas";
    inputUnit.textContent = "tazas";
    if (parseFloat(inputEl.value) > 10) inputEl.value = "1";
    inputEl.step = "0.25";
  } else {
    inputLabel.textContent = "Cantidad en Gramos";
    inputUnit.textContent = "gramos";
    if (parseFloat(inputEl.value) <= 10) inputEl.value = "100";
    inputEl.step = "10";
  }

  calculate();
}

function calculate() {
  const ingId = document.getElementById("ingredientSelect").value;
  const ing = INGREDIENTS.find(i => i.id === ingId) || INGREDIENTS[0];
  const amount = Math.max(0, parseFloat(document.getElementById("amountInput").value) || 0);

  const resMain = document.getElementById("resMain");
  const resSec = document.getElementById("resSecondary");
  const equivCups = document.getElementById("eqCups");
  const equivGrams = document.getElementById("eqGrams");
  const equivTbsp = document.getElementById("eqTbsp");
  const equivTsp = document.getElementById("eqTsp");
  const equivOz = document.getElementById("eqOz");

  if (currentMode === "cups_to_grams") {
    const grams = Math.round(amount * ing.cup * 10) / 10;
    const tbsp = Math.round((grams / ing.tbsp) * 10) / 10;
    const tsp = Math.round((grams / ing.tsp) * 10) / 10;
    const oz = Math.round((grams / 28.3495) * 10) / 10;

    resMain.textContent = `${grams} g`;
    resSec.innerHTML = `<strong>${amount} taza(s)</strong> de <strong>${ing.name}</strong> equivalen a aproximadamente <strong>${grams} gramos</strong>.`;

    equivCups.textContent = `${amount} tazas`;
    equivGrams.textContent = `${grams} g`;
    equivTbsp.textContent = `~${tbsp} cdas`;
    equivTsp.textContent = `~${tsp} cdtas`;
    equivOz.textContent = `${oz} oz`;
  } else {
    const cups = Math.round((amount / ing.cup) * 100) / 100;
    const tbsp = Math.round((amount / ing.tbsp) * 10) / 10;
    const tsp = Math.round((amount / ing.tsp) * 10) / 10;
    const oz = Math.round((amount / 28.3495) * 10) / 10;

    resMain.textContent = `${cups} tazas`;
    resSec.innerHTML = `<strong>${amount} gramos</strong> de <strong>${ing.name}</strong> equivalen a aproximadamente <strong>${cups} tazas</strong> (${tbsp} cucharadas).`;

    equivCups.textContent = `${cups} tazas`;
    equivGrams.textContent = `${amount} g`;
    equivTbsp.textContent = `~${tbsp} cdas`;
    equivTsp.textContent = `~${tsp} cdtas`;
    equivOz.textContent = `${oz} oz`;
  }
}

// Preset applicator
function applyPreset(ingId, mode, amount) {
  document.getElementById("ingredientSelect").value = ingId;
  setMode(mode);
  document.getElementById("amountInput").value = amount;
  calculate();
}

// Levadura converter
function calcYeast(source) {
  const freshEl = document.getElementById("yeastFreshInput");
  const dryEl = document.getElementById("yeastDryInput");

  if (source === "fresh") {
    const fresh = Math.max(0, parseFloat(freshEl.value) || 0);
    const dry = Math.round((fresh / 3) * 10) / 10;
    dryEl.value = dry;
  } else {
    const dry = Math.max(0, parseFloat(dryEl.value) || 0);
    const fresh = Math.round(dry * 3);
    freshEl.value = fresh;
  }
}

// Oven temp converter
function calcOven(source) {
  const cEl = document.getElementById("ovenCInput");
  const fEl = document.getElementById("ovenFInput");
  const termEl = document.getElementById("ovenTermText");

  if (source === "c") {
    const c = parseFloat(cEl.value) || 0;
    const f = Math.round((c * 9/5) + 32);
    fEl.value = f;
    updateOvenTerm(c);
  } else {
    const f = parseFloat(fEl.value) || 0;
    const c = Math.round((f - 32) * 5/9);
    cEl.value = c;
    updateOvenTerm(c);
  }
}

function updateOvenTerm(c) {
  const termEl = document.getElementById("ovenTermText");
  if (!termEl) return;
  if (c <= 145) termEl.textContent = "🔥 Horno muy suave / Mínimo (merengues, secados)";
  else if (c <= 165) termEl.textContent = "🔥 Horno suave / Bajo (budines, cheesecakes)";
  else if (c <= 185) termEl.textContent = "🔥 Horno medio / Moderado (tortas, galletitas, bizcochuelos)";
  else if (c <= 205) termEl.textContent = "🔥 Horno fuerte / Caliente (tartas, carnes, panes)";
  else termEl.textContent = "🔥 Horno muy fuerte / Máximo (pizzas, dorados rápidos)";
}

// Copy & WhatsApp share
function copyResult() {
  const ingId = document.getElementById("ingredientSelect").value;
  const ing = INGREDIENTS.find(i => i.id === ingId) || INGREDIENTS[0];
  const amount = document.getElementById("amountInput").value;
  const res = document.getElementById("resMain").textContent;

  let txt = "";
  if (currentMode === "cups_to_grams") {
    txt = `👩‍🍳 Equivalencia Cocina:\n${amount} taza(s) de ${ing.name} = ${res}\nCalculá en: https://sebiglesias.com.ar/conversor-cocina/`;
  } else {
    txt = `👩‍🍳 Equivalencia Cocina:\n${amount} g de ${ing.name} = ${res}\nCalculá en: https://sebiglesias.com.ar/conversor-cocina/`;
  }

  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.getElementById("btnCopy");
    const orig = btn.textContent;
    btn.textContent = "✅ ¡Copiado al portapapeles!";
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

function shareWa() {
  const ingId = document.getElementById("ingredientSelect").value;
  const ing = INGREDIENTS.find(i => i.id === ingId) || INGREDIENTS[0];
  const amount = document.getElementById("amountInput").value;
  const res = document.getElementById("resMain").textContent;

  const txt = `👩‍🍳 Equivalencia de cocina:\n${amount} ${currentMode === 'cups_to_grams' ? 'taza(s)' : 'g'} de ${ing.name} = ${res}\nhttps://sebiglesias.com.ar/conversor-cocina/`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(txt)}`, '_blank');
}

document.addEventListener("DOMContentLoaded", () => {
  initIngredientsSelect();
  calculate();

  document.getElementById("ingredientSelect").addEventListener("change", calculate);
  document.getElementById("amountInput").addEventListener("input", calculate);
  document.getElementById("btnModeCups").addEventListener("click", () => setMode("cups_to_grams"));
  document.getElementById("btnModeGrams").addEventListener("click", () => setMode("grams_to_cups"));
  document.getElementById("btnCopy").addEventListener("click", copyResult);
  document.getElementById("btnWa").addEventListener("click", shareWa);

  document.getElementById("yeastFreshInput").addEventListener("input", () => calcYeast("fresh"));
  document.getElementById("yeastDryInput").addEventListener("input", () => calcYeast("dry"));

  document.getElementById("ovenCInput").addEventListener("input", () => calcOven("c"));
  document.getElementById("ovenFInput").addEventListener("input", () => calcOven("f"));
});
