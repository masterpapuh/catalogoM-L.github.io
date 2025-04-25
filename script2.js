// Intersection Observer para animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.producto').forEach(producto => {
  observer.observe(producto);
});

// Ocultar el header al hacer scroll hacia abajo
let lastScrollY = window.pageYOffset;
const headerEl = document.querySelector('.header');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScrollY && currentScroll > 100) {
    headerEl.classList.add('header--hidden');
  } else {
    headerEl.classList.remove('header--hidden');
  }
  lastScrollY = currentScroll;
});

// Funciones del modal de producto
/**
 * @param {string} titulo - Título principal del producto
 * @param {string} imagenInicial - URL de la imagen inicial
 * @param {string} descripcion - Descripción del producto
 * @param {string[]} coloresHex - Array de colores en formato hex
 * @param {string[]} modelos - Array de URLs de miniaturas de modelos
 * @param {string[]} modelosTitulos - Array de títulos para cada modelo (paralelo a 'modelos')
 * @param {string[]} talles - Array de talles disponibles
 */
function mostrarModal(
  titulo,
  imagenInicial,
  descripcion,
  coloresHex,
  modelos = [imagenInicial],
  modelosTitulos = [titulo],
  talles = []
) {
  const modal        = document.getElementById('modalProducto');
  const imgPrincipal = document.getElementById('imagenPrincipal');
  const tituloEl     = document.getElementById('tituloProducto');
  const descEl       = document.getElementById('descripcionProducto');
  const bolitasCont  = document.getElementById('bolitasColoresContainer');
  const miniCont     = document.getElementById('miniaturasContainer');
  const tallesCont   = document.getElementById('tallesContainer');

  // Limpio contenedores
  bolitasCont.innerHTML = '';
  miniCont.innerHTML    = '';
  tallesCont.innerHTML  = '';

  // Seteo datos del producto
  tituloEl.textContent = titulo;
  descEl.textContent   = descripcion;
  imgPrincipal.src     = imagenInicial;

  // — Bolitas de colores (no clickeables) —
  coloresHex.forEach(hex => {
    const bola = document.createElement('div');
    bola.className = 'bolita-color';
    bola.style.backgroundColor = hex;
    bolitasCont.appendChild(bola);
  });

  // — Talles (no clickeables) —
  talles.forEach(talle => {
    const btn = document.createElement('button');
    btn.className = 'talle';
    btn.textContent = talle;
    tallesCont.appendChild(btn);
  });

  // — Miniaturas de modelos —
  modelos.forEach((url, i) => {
    const thumb = document.createElement('img');
    thumb.src = url;
    thumb.alt = modelosTitulos[i] || `Modelo ${i + 1}`;
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.modelos-miniaturas img')
              .forEach(img => img.classList.remove('thumbnail-seleccionada'));
      thumb.classList.add('thumbnail-seleccionada');
      imgPrincipal.src = url;
      tituloEl.textContent = modelosTitulos[i];
    });
    if (i === 0) thumb.classList.add('thumbnail-seleccionada');
    miniCont.appendChild(thumb);
  });

  // Muestro modal con panel más alto
  modal.style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modalProducto').style.display = 'none';
}
