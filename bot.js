const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'rgmc.pl',
  username: 'ZlosliwiecAFK1', // Twój nick na serwerze
  auth: 'offline' // Non-premium konto
});

// 🔐 LOGOWANIE po wejściu
bot.on('spawn', () => {
  console.log('✅ Zalogowano na serwer');

  // Wysyłamy komendę logowania – wpisz tu swoje hasło
  bot.chat('/login AFKZLOSLIWY1');

  // Poczekajmy chwilę, żeby serwer przetworzył logowanie
  setTimeout(() => {
    // Kliknij kompas z hotbara (slot 9 → index 8)
    bot.setQuickBarSlot(8);
    bot.activateItem(); // Prawy klik
  }, 5000);
});

// 🎯 Kliknięcie kompasu EarthSMP w GUI
bot.on('windowOpen', (window) => {
  if (window.title.includes('Wybierz tryb')) {
    console.log('📦 GUI trybów otwarte');

    const slotIndex = 31; // Kompas od trybu EarthSMP
    const slot = window.slots[slotIndex];

    if (slot && slot.name === 'minecraft:compass') {
      bot.clickWindow(slotIndex, 0, 0);
      console.log('🧭 Kliknięto EarthSMP');
    } else {
      console.log('❌ Nie znaleziono kompasu w slocie 31');
    }
  }

  // 🎯 Kliknięcie działki po komendzie /dzialka praca
  if (window.title.includes('Oferty pracy')) {
    console.log('📄 GUI ofert pracy otwarte');

    const target = window.slots.find((slot) => {
      if (!slot) return false;

      const displayName = slot.customName?.text || '';
      const lore = slot?.nbt?.value?.display?.value?.Lore?.value?.value || [];

      return (
        slot.name === 'minecraft:green_concrete' &&
        displayName.includes('173 zalozyciela zlosliwy') &&
        lore.some(l => l.includes('Wynagrodzenie: 15000')) &&
        lore.some(l => l.toLowerCase().includes('status: wolny'))
      );
    });

    if (target) {
      const index = window.slots.indexOf(target);
      bot.clickWindow(index, 0, 0);
      console.log('✅ Kliknięto ofertę działki');
    } else {
      console.log('❌ Nie znaleziono odpowiedniego bloku');
    }
  }
});

// ⏱️ Po przejściu na EarthSMP – wpisujemy komendę
bot.on('spawn', () => {
  setTimeout(() => {
    bot.chat('/dzialka praca');
    console.log('💬 Wysłano komendę /dzialka praca');
  }, 8000);
});

bot.on('error', (err) => console.error('❌ Błąd:', err));
bot.on('end', () => console.log('🔁 Bot rozłączony'));
