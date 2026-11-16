import { gunzipSync } from 'node:zlib';

/** Adapt the supplied self-contained Claude export without changing its source.
 * Keep its model code and pinned Three.js imports; remove only presentation
 * chrome, tighten initial framing, and enable the existing autorotation option.
 */
export function presentationGeometry(bundle: string): string {
  const extract = (type: string) => {
    const match = bundle.match(new RegExp(`<script type="__bundler/${type}">([\\s\\S]*?)<\\/script>`));
    if (!match) throw new Error(`Aircraft export is missing its ${type} section.`);
    return JSON.parse(match[1]);
  };
  let html: string = extract('template');
  const manifest: Record<string, { data: string; compressed: boolean }> = extract('manifest');
  for (const [id, resource] of Object.entries(manifest)) {
    if (!resource.compressed) throw new Error(`Aircraft export resource ${id} must be gzip-compressed.`);
    let script = gunzipSync(Buffer.from(resource.data, 'base64')).toString('utf8');
    script = script.replace('const stylesheet = `', 'const stylesheet = `\n.toolbar, .note { display: none !important; }');
    // Triple the deck's previous 0.35 rotation speed and bring the camera
    // 20% closer (1.08 / 1.35), making the models appear 25% larger.
    script = script.replace('controls.autoRotateSpeed = 1.2;', 'controls.autoRotateSpeed = 1.05;');
    script = script.replace(
      '(sphere.radius / Math.tan((this._camera.fov * Math.PI) / 360)) * 1.35;',
      '(sphere.radius / Math.tan((this._camera.fov * Math.PI) / 360)) * 1.08;',
    );
    script = script.replace('controls.autoRotate = this._autorotate;', "controls.autoRotate = this._autorotate && !matchMedia('(prefers-reduced-motion: reduce)').matches;");
    html = html.replace(`<script src="${id}"></script>`, () => `<script>${script.replace(/<\/script/gi, '<\\/script')}</script>`);
  }
  html = html.replace('<three-d-stage ', '<three-d-stage autorotate ').replace(/background="#[a-f\d]+"/gi, 'background="#ffffff"');
  html = html.replace('</head>', '<style>html,body{background:#fff!important}#hud{display:none!important}</style></head>');
  // Forward navigation after a viewer interaction gives keyboard focus to the
  // iframe. The parent validates the sending frame before handling these keys.
  html = html.replace('</body>', `<script>addEventListener('keydown', e => {
    if (['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','f','F'].includes(e.key)) {
      e.preventDefault(); parent.postMessage({type:'deck:navigate',key:e.key}, '*');
    }
  });</script></body>`);
  return html;
}
