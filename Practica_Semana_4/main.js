'use strict';

const form = document.getElementById('formReporte');
const mensajeExito = document.getElementById('mensajeExito');
const descripcionEl = document.getElementById('descripcionVuln');
const contadorEl = document.getElementById('descContador');

if (descripcionEl && contadorEl) {
  descripcionEl.addEventListener('input', () => {
    const len = descripcionEl.value.length;
    contadorEl.textContent = `${len} / 1000`;
    contadorEl.style.color = len > 900 ? '#f87171' : len > 700 ? '#fbbf24' : '#64748b';
  });
}

function validarCampo(campo) {
  if (!campo) return;
  if (campo.checkValidity()) {
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
  } else {
    campo.classList.remove('is-valid');
    campo.classList.add('is-invalid');
  }
}

['nombreReportador', 'emailReportador', 'tipoVuln', 'descripcionVuln', 'urlAfectada'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('blur', () => validarCampo(el));
    el.addEventListener('input', () => {
      if (el.classList.contains('is-invalid') || el.classList.contains('is-valid')) {
        validarCampo(el);
      }
    });
  }
});

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    const severidadChecked = form.querySelector('input[name="severidad"]:checked');
    const sevFeedback = document.getElementById('sevFeedback');

    if (!severidadChecked) {
      if (sevFeedback) {
        sevFeedback.textContent = 'Selecciona un nivel de severidad.';
        sevFeedback.style.display = 'block';
        sevFeedback.classList.add('invalid-feedback');
      }
    } else {
      if (sevFeedback) {
        sevFeedback.style.display = 'none';
      }
    }

    const esValido = form.checkValidity() && severidadChecked;

    form.classList.add('was-validated');

    if (esValido) {
      if (mensajeExito) {
        mensajeExito.style.removeProperty('display');
        mensajeExito.classList.remove('tw-hidden');
        mensajeExito.style.display = 'block';
        mensajeExito.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
          form.reset();
          form.classList.remove('was-validated');
          mensajeExito.style.display = 'none';
          if (sevFeedback) sevFeedback.style.display = 'none';
          if (contadorEl) contadorEl.textContent = '0 / 1000';
          form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
          });
        }, 5000);
      }
    }
  });

  form.addEventListener('reset', function () {
    setTimeout(() => {
      form.classList.remove('was-validated');
      form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
      });
      const sevFeedback = document.getElementById('sevFeedback');
      if (sevFeedback) sevFeedback.style.display = 'none';
      if (contadorEl) contadorEl.textContent = '0 / 1000';
      if (mensajeExito) mensajeExito.style.display = 'none';
    }, 0);
  });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('navbarPrincipal');

if (navbarToggler && navbarCollapse && !window.bootstrap?.Collapse) {
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    const expanded = navbarToggler.getAttribute('aria-expanded') === 'true';
    navbarToggler.setAttribute('aria-expanded', String(!expanded));
  });
}
function initTypingEffect() {
  const codeEl = document.querySelector('#hero pre code');
  if (!codeEl) return;

  const originalHTML = codeEl.innerHTML;
  codeEl.innerHTML = '';
  codeEl.style.opacity = '1';

  let i = 0;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = originalHTML;
  const plainText = tempDiv.textContent;

  codeEl.innerHTML = originalHTML;
  codeEl.style.animation = 'codeFadeIn 1.5s ease both';
}

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();

  // Activar navbar link según sección visible
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
});
console.group('📋 Conflictos de especificidad Bootstrap vs Tailwind');
console.log('- bg-white (Tailwind tw-bg-white) puede sobreescribir .card (Bootstrap)');
console.log('  Solución: Prefijo tw- + !important en .card en CSS manual');
console.log('- text-* de Bootstrap vs tw-text-* de Tailwind: sin conflicto con prefijo tw-');
console.log('- .form-control de Bootstrap vs tw-bg-* de Tailwind:');
console.log('  Solución: !important en CSS styles.css para form-control dark theme');
console.log('- display-* de Bootstrap vs tw-text-* de Tailwind: coexisten sin conflicto');
console.groupEnd();
