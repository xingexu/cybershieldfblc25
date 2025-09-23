export interface CsRoutes {
  moderatorSubmit: string;
  csrfToken?: string;
}

declare global {
  interface Window {
    __CS_ROUTES__?: CsRoutes;
  }
}

function getCsrfTokenFromCookie() {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

export async function postModeratorApplication(payload: FormData) {
  const routes = window.__CS_ROUTES__;
  if (!routes) {
    throw new Error('CyberShield routes missing. Ensure __CS_ROUTES__ is defined on the page.');
  }

  const headers: Record<string, string> = {
    Accept: 'application/json'
  };

  const csrf = getCsrfTokenFromCookie() || routes.csrfToken;
  if (csrf) {
    headers['X-CSRFToken'] = csrf;
  }

  const response = await fetch(routes.moderatorSubmit, {
    method: 'POST',
    body: payload,
    headers,
    credentials: 'include'
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json().catch(() => response.text());
}
