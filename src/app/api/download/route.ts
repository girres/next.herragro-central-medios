// app/api/download/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'nodejs'; // recomendado para streaming estable

function safeFilename(name: string) {
  return name.replace(/[/\\?%*:|"<>]/g, '-').trim() || 'file';
}

function contentDisposition(filename: string) {
  const fallback = safeFilename(filename);
  const encoded = encodeURIComponent(fallback);
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

/**
 * Allowlist de hosts válidos (evita que tu endpoint sea un proxy abierto).
 * Ejemplo:
 * S3_ALLOWED_HOSTS=herragro.s3.sa-east-1.amazonaws.com,otro-bucket.s3.eu-west-1.amazonaws.com
 */
function isAllowedHost(host: string) {
  const allowed = (process.env.S3_ALLOWED_HOSTS || '')
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean);

  return allowed.includes(host);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const fileUrl = searchParams.get('url');
  if (!fileUrl) return new Response('Missing ?url=', { status: 400 });

  let u: URL;
  try {
    u = new URL(fileUrl);
  } catch {
    return new Response('Invalid url', { status: 400 });
  }

  if (u.protocol !== 'https:') {
    return new Response('Only https is allowed', { status: 400 });
  }

  // 🔒 Seguridad: solo permitir hosts específicos
  if (!isAllowedHost(u.host)) {
    return new Response('Forbidden host', { status: 403 });
  }

  // Nombre de archivo: del query (?filename=) o de la URL
  const forcedName = searchParams.get('filename');
  const urlName = decodeURIComponent(u.pathname.split('/').pop() || 'file');
  const filename = forcedName ? forcedName : urlName;

  // Opcional: Range para archivos grandes
  const range = req.headers.get('range') ?? undefined;

  // Fetch server-side al S3 público
  const upstream = await fetch(u.toString(), {
    headers: range ? { range } : undefined,
    // cache en server (ajusta según uso)
    cache: 'force-cache',
  });

  if (!upstream.ok || !upstream.body) {
    return new Response('File not found', { status: 404 });
  }

  const headers = new Headers();
  headers.set('Content-Disposition', contentDisposition(filename));

  // Mantén el content-type original si viene
  const ct = upstream.headers.get('content-type') || 'application/octet-stream';
  headers.set('Content-Type', ct);

  // Copia headers útiles si existen
  const cl = upstream.headers.get('content-length');
  if (cl) headers.set('Content-Length', cl);

  const cr = upstream.headers.get('content-range');
  if (cr) headers.set('Content-Range', cr);

  const ar = upstream.headers.get('accept-ranges');
  if (ar) headers.set('Accept-Ranges', ar);

  // Cache (si son públicos y cambian poco)
  headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');

  const status = cr ? 206 : 200;
  return new Response(upstream.body, { status, headers });
}
