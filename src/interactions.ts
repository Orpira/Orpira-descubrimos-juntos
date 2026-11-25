import { availableOffline, canDownloadOffline, load, offlineSetupMessage, save, setOffline } from './local';

export function bindAdventure() {
  const article = document.querySelector<HTMLElement>('#adventure');
  const slug = article?.dataset.slug;
  if (!article || !slug) return;
  const key = slug + ':' + article.dataset.version;
  const status = document.querySelector<HTMLElement>('#status');
  const inputs = Array.from(article.querySelectorAll<HTMLInputElement>('[data-step]'));
  let storeSteps = Object.hasOwn(load().progress, key);
  const say = (message: string) => { if (status) status.textContent = message; };

  function bind(id: string, handler: (button: HTMLButtonElement) => unknown) {
    const button = document.querySelector<HTMLButtonElement>('#' + id);
    if (!button) return;
    button.addEventListener('click', async () => {
      button.disabled = true;
      try {
        await handler(button);
      } catch {
        say('No se pudo completar la acción. Comprueba la conexión o el almacenamiento del navegador.');
      } finally {
        button.disabled = false;
      }
    });
    return button;
  }

  function persistSteps() {
    save(data => {
      if (storeSteps) data.progress[key] = inputs.flatMap((input, index) => input.checked ? [index] : []);
      else delete data.progress[key];
    });
  }

  inputs.forEach((input, index) => {
    input.checked = (load().progress[key] ?? []).includes(index);
    input.addEventListener('change', () => {
      try {
        if (storeSteps) persistSteps();
      } catch {
        say('El navegador no pudo guardar los pasos.');
      }
    });
  });
  const progressButton = bind('save-progress', button => {
    storeSteps = !storeSteps;
    try { persistSteps(); } catch (error) { storeSteps = !storeSteps; throw error; }
    button.setAttribute('aria-pressed', String(storeSteps));
    say(storeSteps ? 'Los pasos se guardarán en este dispositivo.' : 'Se eliminó el registro de pasos.');
  });
  progressButton?.setAttribute('aria-pressed', String(storeSteps));
  bind('reset-steps', () => {
    inputs.forEach(input => { input.checked = false; });
    if (storeSteps) persistSteps();
    say('Pasos reiniciados.');
  });

  for (const [id, field, add, remove] of [
    ['favorite', 'favorites', 'Guardar favorito', 'Quitar favorito'],
    ['completed', 'completed', 'Añadir sello al pasaporte', 'Quitar sello del pasaporte'],
  ] as const) {
    function render(button?: HTMLButtonElement) {
      const exists = load()[field].includes(slug!);
      button?.setAttribute('aria-pressed', String(exists));
      if (button) button.textContent = exists ? remove : add;
    }
    const button = bind(id, current => {
      save(data => {
        data[field] = data[field].includes(slug) ? data[field].filter(value => value !== slug) : [...data[field], slug];
      });
      render(current);
      say('Pasaporte actualizado.');
    });
    render(button);
  }

  const download = bind('download', async button => {
    if (!canDownloadOffline()) {
      say(offlineSetupMessage);
      return;
    }
    const desired = !(await availableOffline(location.pathname));
    await setOffline(location.pathname, desired);
    button.setAttribute('aria-pressed', String(desired));
    button.textContent = desired ? 'Eliminar descarga' : 'Guardar sin conexión';
    say(desired ? 'Ficha disponible sin conexión.' : 'Descarga eliminada.');
  });
  availableOffline(location.pathname).then(exists => {
    if (exists && download) {
      download.textContent = 'Eliminar descarga';
      download.setAttribute('aria-pressed', 'true');
    }
  }).catch(() => {});

  bind('print', () => window.print());
  bind('share', async () => {
    const url = location.origin + location.pathname;
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url }); return; }
      catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return; }
    }
    if (navigator.clipboard) {
      try { await navigator.clipboard.writeText(url); say('Enlace copiado.'); return; } catch {}
    }
    say(url);
  });
  const listen = bind('listen', button => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      button.textContent = 'Escuchar pasos';
      return;
    }
    const voice = speechSynthesis.getVoices().find(item => item.localService && item.lang.startsWith('es'));
    if (!voice) return;
    const narration = new SpeechSynthesisUtterance(inputs.map(input => input.closest('label')?.textContent?.trim()).join(' '));
    narration.voice = voice;
    narration.lang = voice.lang;
    button.textContent = 'Detener narración';
    narration.onend = narration.onerror = () => { button.textContent = 'Escuchar pasos'; };
    speechSynthesis.speak(narration);
  });
  if (listen && 'speechSynthesis' in window) {
    const update = () => { listen.hidden = !speechSynthesis.getVoices().some(item => item.localService && item.lang.startsWith('es')); };
    speechSynthesis.addEventListener('voiceschanged', update);
    update();
  }
}
