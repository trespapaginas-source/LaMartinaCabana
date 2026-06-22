

/* ============================================
   STATE ENGINE
============================================ */
const reservationState = {
  currentStep: 1,
  plan: null,
  guestName: '',
  phone: '',
  guestCount: 8, // Default state starts at 8
  maxGuests: 0,
  price: 0,
  deposit: 0,
  dateCheckIn: null,
  dateCheckOut: null,
  calMonth: new Date().getMonth(),
  calYear: new Date().getFullYear(),
};

const PLANS = {
  daypass: { name: 'Pasadía Diurno (Day Pass)', price: 1200000, deposit: 360000, maxGuests: 20, overnight: false },
  overnight: { name: 'Alojamiento Completo (Overnight)', price: 3000000, deposit: 1000000, maxGuests: 14, overnight: true },
};

/* ============================================
   NOTIFICATION SYSTEM
============================================ */
function showNotification(message) {
  const notif = document.getElementById('notification');
  const text = document.getElementById('notif-text');
  text.textContent = message;
  notif.classList.remove('notif-hidden');
  notif.classList.add('notif-visible');
  clearTimeout(window._notifTimer);
  window._notifTimer = setTimeout(() => {
    notif.classList.add('notif-hidden');
    notif.classList.remove('notif-visible');
  }, 4000);
}

/* ============================================
   NAVIGATION SCROLL
============================================ */
const nav = document.getElementById('nav');
const navCta = document.querySelector('.nav-cta');
const navLinks = document.querySelectorAll('.nav-link');

function updateNav() {
  if (window.scrollY > 60) {
    nav.classList.remove('nav-top');
    nav.classList.add('nav-scrolled');
    navLinks.forEach(l => { l.classList.remove('text-white/90'); l.classList.add('text-sand/85'); });
    if (navCta) { navCta.classList.remove('text-carbon', 'bg-sand'); navCta.classList.add('text-sand', 'bg-gold'); }
  } else {
    nav.classList.add('nav-top');
    nav.classList.remove('nav-scrolled');
    navLinks.forEach(l => { l.classList.add('text-white/90'); l.classList.remove('text-sand/85'); });
    if (navCta) { navCta.classList.add('text-carbon', 'bg-sand'); navCta.classList.remove('text-sand', 'bg-gold'); }
  }
}
window.addEventListener('scroll', updateNav);
updateNav();

/* Mobile menu */
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu-hidden');
  });
}
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.add('mobile-menu-hidden')));

/* ============================================
   SCROLL REVEAL — IntersectionObserver
============================================ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ============================================
   ROOMS TABS
============================================ */
const ROOMS = {
  1: { title: 'Habitación Familiar 01', eyebrow: 'Habitación 01 · Familiar', desc: 'Dos camas litera cómodas, capacidad para cuatro huéspedes. Aire acondicionado, baño privado y televisión. Ropa de cama suave y limpia.', img: 'IMG/h1.jpg' },
  2: { title: 'Habitación Familiar 02', eyebrow: 'Habitación 02 · Familiar', desc: 'Dos camas litera adicionales con la misma distribución cómoda. Cuatro huéspedes más, baño privado independiente and aire acondicionado.', img: 'IMG/h2.jpg' },
  3: { title: 'Habitación Matrimonial 03', eyebrow: 'Habitación 03 · Matrimonial', desc: 'Una cama principal con configuraciones modulares que admiten de dos a seis huéspedes. Baño privado, aire acondicionado y televisión.', img: 'IMG/h3.jpg' },
};
document.querySelectorAll('.room-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('active')) return;
    document.querySelectorAll('.room-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const id = tab.dataset.room;
    const room = ROOMS[id];
    const img = document.getElementById('room-image');
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = room.img;
      document.getElementById('room-title').textContent = room.title;
      document.getElementById('room-eyebrow').textContent = room.eyebrow;
      document.getElementById('room-desc').textContent = room.desc;
      img.style.opacity = '1';
    }, 300);
  });
});

/* ============================================
   WILDLIFE SANCTUARY
============================================ */
const WILDLIFE = [
  { name: 'Avestruces', en: 'Ostriches', img: 'IMG/avestruz.JPG', w: 800, h: 600, feed: true, desc: 'Nuestras imponentes avestruces son una de las atracciones preferidas. Puedes verlas de cerca y alimentarlas de forma segura con el kit de comida balanceada provisto por la administración.' },
  { name: 'Llamas', en: 'Llamas', img: 'IMG/llamas.jpg', w: 960, h: 629, feed: true, desc: 'Curiosas, amigables y muy mansas. Les encanta interactuar con las familias y recibir alimento directamente de la mano de los visitantes. Una experiencia hermosa para los niños.' },
  { name: 'Venados', en: 'Deer', img: 'IMG/venado.JPG', w: 1200, h: 1600, feed: false, desc: 'Especies esbeltas y tímidas que aportan paz al paisaje. Se encuentran en su zona reservada para garantizar su tranquilidad; se observan en silencio para no asustarlos.' },
  { name: 'Caballos', en: 'Horses', img: 'IMG/caballos.JPG', w: 1600, h: 1200, feed: false, desc: 'Ejemplares dóciles y majestuosos que representan el alma campestre de La Martina. Excelentes para contemplar y tomar fotografías con el atardecer de fondo.' },
  { name: 'Capybaras', en: 'Capybaras', img: 'IMG/capibara.jpg', w: 1600, h: 2193, feed: false, desc: 'Nuestros capibaras son animales tranquilos y pacíficos que disfrutan de las zonas húmedas y pastizales. Son sumamente dóciles y una de las sorpresas naturales del santuario.' },
  { name: 'Guacamayas', en: 'Macaws', img: 'IMG/guacamayas.jpg', w: 1600, h: 1067, feed: true, desc: 'Aves de colores vibrantes y gran inteligencia. Llenan la cabaña de vida y canto. Puedes interactuar con ellas respetando las indicaciones de su cuidador.' },
];

const wlScroll = document.getElementById('wildlife-scroll');
if (wlScroll) {
  WILDLIFE.forEach(a => {
    const card = document.createElement('div');
    card.className = 'wildlife-card border border-carbon/10 bg-sand cursor-pointer hover:shadow-lg transition-all duration-300';
    card.innerHTML = `
      <div class="img-wrap h-56 overflow-hidden">
        <img src="${a.img}" alt="${a.name} en Cabaña La Martina Sabanagrande" width="${a.w}" height="${a.h}" loading="lazy" class="w-full h-full object-cover"/>
      </div>
      <div class="p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="font-serif text-xl">${a.name}</div>
          <span class="text-[10px] tracking-[0.2em] uppercase text-carbon/45">${a.en}</span>
        </div>
        ${a.feed
          ? '<div class="text-[11px] text-olive flex items-center gap-1.5 mt-2"><iconify-icon icon="ph:leaf-light" width="13"></iconify-icon> Alimentación permitida</div>'
          : '<div class="text-[11px] text-carbon/50 flex items-center gap-1.5 mt-2"><iconify-icon icon="ph:eye-light" width="13"></iconify-icon> Solo contemplación</div>'}
      </div>
    `;
    card.addEventListener('click', () => {
      openAnimalDialog(a);
    });
    wlScroll.appendChild(card);
  });
}

function scrollWildlife(dir) {
  if (wlScroll) {
    wlScroll.scrollBy({ left: dir * 300, behavior: 'smooth' });
  }
}

/* ============================================
   ANIMAL DIALOG LIGHTBOX
============================================ */
const animalDialog = document.getElementById('animal-dialog');

function openAnimalDialog(animal) {
  if (!animalDialog) return;
  document.getElementById('dialog-animal-img').src = animal.img;
  document.getElementById('dialog-animal-img').alt = `${animal.name} en Cabaña La Martina`;
  document.getElementById('dialog-animal-en').textContent = animal.en;
  document.getElementById('dialog-animal-name').textContent = animal.name;
  document.getElementById('dialog-animal-desc').textContent = animal.desc;

  const badgeContainer = document.getElementById('dialog-animal-feed-badge');
  if (badgeContainer) {
    if (animal.feed) {
      badgeContainer.innerHTML = `<div class="text-[11px] text-olive font-medium flex items-center gap-1.5"><iconify-icon icon="ph:leaf-fill" width="14"></iconify-icon> Alimentación permitida (balanceado de la cabaña)</div>`;
    } else {
      badgeContainer.innerHTML = `<div class="text-[11px] text-carbon/60 font-medium flex items-center gap-1.5"><iconify-icon icon="ph:eye-fill" width="14"></iconify-icon> Solo contemplación (no alimentar)</div>`;
    }
  }
  animalDialog.showModal();
}

function closeAnimalDialog() {
  if (animalDialog) {
    animalDialog.close();
  }
}

if (animalDialog) {
  animalDialog.addEventListener('click', (e) => {
    if (e.target === animalDialog) {
      animalDialog.close();
    }
  });
}


/* ============================================
   INLINE 360 TOUR FUNCTIONALITY
============================================ */
function loadTour360() {
  const iframe = document.getElementById('tour-iframe');
  if (iframe) {
    const src = iframe.getAttribute('data-src');
    if (src && (iframe.src === '' || iframe.src === 'about:blank' || iframe.getAttribute('src') === 'about:blank')) {
      iframe.setAttribute('src', src);
    }
  }
  const cover = document.getElementById('tour-cover');
  if (cover) {
    cover.style.opacity = '0';
    setTimeout(() => {
      cover.style.display = 'none';
    }, 700);
  }
  const tourSection = document.getElementById('tour-360');
  if (tourSection) {
    tourSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ============================================
   WHATSAPP CHATBOT
============================================ */
const waChatbox = document.getElementById('wa-chatbox');
let waAutoOpened = false;

function toggleChatbox() {
  if (waChatbox) {
    waChatbox.classList.toggle('wa-hidden');
    waChatbox.classList.toggle('wa-visible');
  }
}

function sendWaMessage() {
  const input = document.getElementById('wa-input');
  const text = input ? input.value.trim() : '';
  if (text) {
    const url = `https://wa.me/573015780509?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    input.value = '';
  }
}

// Auto-open after 7 seconds
setTimeout(() => {
  if (waChatbox && waChatbox.classList.contains('wa-hidden')) {
    toggleChatbox();
    waAutoOpened = true;
  }
}, 7000);

/* ============================================
   BOOKING WIZARD
============================================ */
function selectPlan(planKey) {
  reservationState.plan = planKey;
  document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.plan-card[data-plan="${planKey}"]`).classList.add('selected');
  const plan = PLANS[planKey];
  reservationState.maxGuests = plan.maxGuests;
  reservationState.price = plan.price;
  reservationState.deposit = plan.deposit;

  // Ensure default 8 guests doesn't exceed max limits (safe check, though 8 is below 14 and 20)
  if (reservationState.guestCount > plan.maxGuests) reservationState.guestCount = plan.maxGuests;

  document.getElementById('guest-count').value = reservationState.guestCount;
  document.getElementById('guest-capacity-info').textContent = `Máx. ${plan.maxGuests} huéspedes`;
  document.getElementById('capacity-helper').textContent = `Capacidad máxima: ${plan.maxGuests} huéspedes · ${plan.overnight ? 'Estancia nocturna' : 'Pasadía 9AM–5PM'}`;
  document.getElementById('capacity-helper').textContent = `Capacidad máxima: ${plan.maxGuests} huéspedes · ${plan.overnight ? 'Estancia nocturna' : 'Pasadía 9AM–5PM'}`;
}

function adjustGuests(delta) {
  if (!reservationState.plan) { showNotification('Selecciona primero una modalidad en el paso 1.'); return; }
  let n = reservationState.guestCount + delta;
  n = Math.max(1, Math.min(reservationState.maxGuests, n));
  reservationState.guestCount = n;
  document.getElementById('guest-count').value = n;
}

function goToStep(step) {
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`.step-panel[data-panel="${step}"]`).classList.add('active');
  document.querySelectorAll('.step-dot').forEach(d => { d.classList.remove('active', 'done'); });
  for (let i = 1; i <= 4; i++) {
    const dot = document.querySelector(`.step-item[data-step="${i}"] .step-dot`);
    if (dot) {
      if (i < step) dot.classList.add('done');
      if (i === step) dot.classList.add('active');
    }
  }
  reservationState.currentStep = step;
  if (step === 3) renderCalendar();
  if (step === 4) renderSummary();
  document.getElementById('reserva').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function nextStep() {
  const s = reservationState.currentStep;
  if (s === 1) {
    if (!reservationState.plan) { showNotification('Selecciona una modalidad para continuar.'); return; }
    goToStep(2);
  } else if (s === 2) {
    const name = document.getElementById('guest-name').value.trim();
    const phone = document.getElementById('guest-phone').value.trim();
    if (!name) { showNotification('Ingresa el nombre del huésped titular.'); return; }
    // Validation changed: Phone is now optional
    reservationState.guestName = name;
    reservationState.phone = phone;
    goToStep(3);
  } else if (s === 3) {
    if (!reservationState.dateCheckIn) { showNotification('Selecciona una fecha de inicio.'); return; }
    if (PLANS[reservationState.plan].overnight && !reservationState.dateCheckOut) {
      showNotification('Selecciona también la fecha de check-out.'); return;
    }
    goToStep(4);
  }
}

function prevStep() {
  if (reservationState.currentStep > 1) goToStep(reservationState.currentStep - 1);
}

/* Make step indicators interactive and clickable */
document.querySelectorAll('.step-item').forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    const targetStep = parseInt(item.dataset.step);
    if (!targetStep) return;
    
    let maxAllowedStep = 1;
    if (reservationState.plan) {
      maxAllowedStep = 2;
      const name = document.getElementById('guest-name').value.trim();
      if (name) {
        maxAllowedStep = 3;
        if (reservationState.dateCheckIn && (!PLANS[reservationState.plan].overnight || reservationState.dateCheckOut)) {
          maxAllowedStep = 4;
        }
      }
    }
    
    if (targetStep <= maxAllowedStep) {
      goToStep(targetStep);
    } else {
      if (maxAllowedStep === 1) {
        showNotification('Selecciona una modalidad para continuar.');
      } else if (maxAllowedStep === 2) {
        showNotification('Ingresa el nombre del huésped titular.');
      } else if (maxAllowedStep === 3) {
        showNotification('Selecciona las fechas de tu estadía.');
      }
    }
  });
});

/* ============================================
   CALENDAR
============================================ */
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function renderCalendar() {
  const isOvernight = PLANS[reservationState.plan].overnight;
  document.getElementById('cal-title').textContent = isOvernight ? 'Selecciona check-in y check-out' : 'Selecciona tu fecha';
  document.getElementById('cal-subtitle').textContent = isOvernight ? 'Elige primero la fecha de llegada y luego la de salida.' : 'Elige una fecha para tu pasadía diurna.';
  document.getElementById('cal-month-label').textContent = `${MONTH_NAMES[reservationState.calMonth]} ${reservationState.calYear}`;
  const grid = document.getElementById('cal-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const firstDay = new Date(reservationState.calYear, reservationState.calMonth, 1).getDay();
  const daysInMonth = new Date(reservationState.calYear, reservationState.calMonth + 1, 0).getDate();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty h-11';
    grid.appendChild(empty);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day h-11 flex items-center justify-center text-sm border border-transparent';
    const dateObj = new Date(reservationState.calYear, reservationState.calMonth, d);
    dateObj.setHours(0, 0, 0, 0);
    if (dateObj < today) cell.classList.add('disabled');
    if (dateObj.getTime() === today.getTime()) cell.classList.add('today');
    cell.textContent = d;
    cell.dataset.date = dateObj.toISOString();
    if (reservationState.dateCheckIn && sameDay(dateObj, reservationState.dateCheckIn)) cell.classList.add('selected');
    if (reservationState.dateCheckOut && sameDay(dateObj, reservationState.dateCheckOut)) cell.classList.add('selected');
    if (reservationState.dateCheckIn && reservationState.dateCheckOut && dateObj > reservationState.dateCheckIn && dateObj < reservationState.dateCheckOut) cell.classList.add('in-range');
    if (!cell.classList.contains('disabled')) {
      cell.addEventListener('click', () => onDateClick(dateObj));
    }
    grid.appendChild(cell);
  }
  updateDateReadout();
}

function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

function onDateClick(dateObj) {
  const isOvernight = PLANS[reservationState.plan].overnight;
  if (!isOvernight) {
    reservationState.dateCheckIn = dateObj;
    reservationState.dateCheckOut = null;
  } else {
    if (!reservationState.dateCheckIn || reservationState.dateCheckOut || dateObj <= reservationState.dateCheckIn) {
      reservationState.dateCheckIn = dateObj;
      reservationState.dateCheckOut = null;
    } else {
      reservationState.dateCheckOut = dateObj;
    }
  }
  renderCalendar();
}

function changeMonth(delta) {
  let m = reservationState.calMonth + delta;
  let y = reservationState.calYear;
  if (m < 0) { m = 11; y--; }
  if (m > 11) { m = 0; y++; }
  reservationState.calMonth = m;
  reservationState.calYear = y;
  renderCalendar();
}

function updateDateReadout() {
  const readout = document.getElementById('date-readout');
  const ci = document.getElementById('checkin-readout');
  const co = document.getElementById('checkout-readout');
  if (!readout || !ci || !co) return;
  if (reservationState.dateCheckIn) {
    readout.classList.remove('hidden');
    ci.innerHTML = `<span class="eyebrow text-carbon/60 text-[10px]">Check-in</span> <span class="font-serif text-lg ml-2">${formatDate(reservationState.dateCheckIn)}</span>`;
    if (PLANS[reservationState.plan].overnight) {
      co.innerHTML = reservationState.dateCheckOut
        ? `<span class="eyebrow text-carbon/60 text-[10px]">Check-out</span> <span class="font-serif text-lg ml-2">${formatDate(reservationState.dateCheckOut)}</span>`
        : `<span class="text-carbon/50 text-[12px] italic">Ahora selecciona la fecha de check-out</span>`;
    } else {
      co.innerHTML = `<span class="text-carbon/50 text-[12px] italic">Pasadía · 9:00 AM – 5:00 PM</span>`;
    }
  } else {
    readout.classList.add('hidden');
  }
}

function formatDate(d) {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/* ============================================
   SUMMARY
============================================ */
function renderSummary() {
  const plan = PLANS[reservationState.plan];
  document.getElementById('sum-plan').textContent = plan.name;
  document.getElementById('sum-name').textContent = reservationState.guestName;
  document.getElementById('sum-phone').textContent = reservationState.phone || 'No proporcionado';
  document.getElementById('sum-guests').textContent = `${reservationState.guestCount} / ${plan.maxGuests} huéspedes`;
  document.getElementById('sum-price').textContent = `$${plan.price.toLocaleString('es-CO')} COP`;
  document.getElementById('sum-deposit').textContent = `$${plan.deposit.toLocaleString('es-CO')} COP`;

  if (plan.overnight) {
    document.getElementById('sum-date-label').textContent = 'Estancia';
    document.getElementById('sum-date').textContent = `${formatDate(reservationState.dateCheckIn)} → ${formatDate(reservationState.dateCheckOut)}`;
  } else {
    document.getElementById('sum-date-label').textContent = 'Fecha';
    document.getElementById('sum-date').textContent = `${formatDate(reservationState.dateCheckIn)} · 9:00 AM – 5:00 PM`;
  }
}

/* ============================================
   WHATSAPP SUBMISSION
============================================ */
function submitReservation() {
  const plan = PLANS[reservationState.plan];
  const phone = '573015780509';

  let dateLine = plan.overnight
    ? `• Check-in: ${formatDate(reservationState.dateCheckIn)}\n• Check-out: ${formatDate(reservationState.dateCheckOut)}`
    : `• Fecha: ${formatDate(reservationState.dateCheckIn)} (9:00 AM – 5:00 PM)`;

  let phoneLine = reservationState.phone ? `*Teléfono:* ${reservationState.phone}\n` : '';

  const message =
    `*RESERVA — CABAÑA LA MARTINA*

¡Hola! Me gustaría solicitar una reserva para mi escapada.

*Modalidad:* ${plan.name}
*Huésped titular:* ${reservationState.guestName}
 ${phoneLine}${dateLine}
*Huéspedes:* ${reservationState.guestCount} / ${plan.maxGuests}

*Tarifa:* $${plan.price.toLocaleString('es-CO')} COP
*Depósito de reserva:* $${plan.deposit.toLocaleString('es-CO')} COP
*Depósito de daños (reembolsable):* $300.000 COP

Quedo atento/a a la confirmación de disponibilidad y a las instrucciones para el pago. ¡Muchas gracias!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/* ============================================
   HERO VIDEO BACKGROUND PRELOADER & TEXT ENTRY
============================================ */
(function initHeroVideo() {
  const video = document.getElementById('hero-video');
  const picture = document.getElementById('hero-picture');
  if (window.innerWidth >= 768 && video && picture) {
    // Slow down video (playbackRate 0.8 converts 8s to 10s duration)
    video.playbackRate = 0.8;

    // Append source to initiate loading dynamically on desktop
    const source = document.createElement('source');
    source.src = 'IMG/cabin_hero_video.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
    video.load();

    // Crossfade once video starts playback
    video.addEventListener('playing', () => {
      video.classList.remove('opacity-0');
      video.classList.add('opacity-100');
      picture.classList.add('opacity-0');
    });
  }
})();

/* ============================================
   MOBILE-ONLY LAZY LOADING OF IFRAMES
============================================ */
(function initLazyIframes() {
  const runInit = () => {
    const isDesktop = window.innerWidth >= 768;

    // Google Maps Iframe Setup
    const mapIframe = document.querySelector('iframe.map-grayscale');
    if (mapIframe) {
      if (isDesktop) {
        // Load immediately on desktop
        const src = mapIframe.getAttribute('data-src');
        if (src) {
          mapIframe.setAttribute('src', src);
          mapIframe.removeAttribute('data-src');
        }
      } else {
        // Lazy load on mobile using IntersectionObserver
        const mapObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const src = mapIframe.getAttribute('data-src');
              if (src) {
                mapIframe.setAttribute('src', src);
                mapIframe.removeAttribute('data-src');
              }
              mapObserver.unobserve(mapIframe);
            }
          });
        }, { rootMargin: '200px' });
        mapObserver.observe(mapIframe);
      }
    }

    // 360 Tour Iframe Setup
    const tourIframe = document.getElementById('tour-iframe');
    if (tourIframe && isDesktop) {
      // Load immediately on desktop to match previous desktop preloaded behavior
      const src = tourIframe.getAttribute('data-src');
      if (src) {
        tourIframe.setAttribute('src', src);
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
  } else {
    runInit();
  }
})();
