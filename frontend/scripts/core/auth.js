// ================================================
// HEALTHNET V2 — AUTH.JS
// Guardar en: frontend/scripts/core/auth.js
// ================================================

const API_URL = "http://localhost:3000/api";

export async function login(email, password) {
  try {
    localStorage.clear();

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      return { ok: false, message: data.message || "Credenciales inválidas" };
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user",  JSON.stringify(data.user));

    return { ok: true, user: data.user };

  } catch (error) {
    return { ok: false, message: "Error de conexión con el servidor" };
  }
}