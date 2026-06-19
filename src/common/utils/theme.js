const STORAGE_KEY = "furniro-theme";

export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function getTheme() {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function setTheme(theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function toggleTheme() {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function initTheme() {
  applyTheme(getTheme());

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}
