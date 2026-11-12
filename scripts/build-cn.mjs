#!/usr/bin/env node
/**
 * Build dist-cn/ from public/ for a mainland-reachable static site.
 * Does not modify public/. No npm dependencies.
 *
 * Chinese is the default language. French, German, Spanish and Italian
 * UI strings are removed. d3 is copied from scripts/vendor (d3 7.9.0, ISC).
 * The page does not use topojson. Fonts are system stacks, not Google Fonts.
 * In Chinese, encyclopedia links go to Baidu Baike search. English keeps
 * English Wikipedia.
 */
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist-cn');
const d3src = join(root, 'scripts/vendor/d3.min.js');

const DROP = ['fr', 'de', 'es', 'it'];

function stripObjectProps(src, keys) {
  const re = new RegExp(`\\b(${keys.join('|')})\\s*:\\s*\\{`, 'g');
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(src))) {
    const braceAt = m.index + m[0].length - 1;
    let j = braceAt;
    let depth = 0;
    let inStr = null;
    for (; j < src.length; j++) {
      const c = src[j];
      if (inStr) {
        if (c === '\\') { j++; continue; }
        if (c === inStr) inStr = null;
        continue;
      }
      if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
      if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) { j++; break; }
      }
    }
    let start = m.index;
    let end = j;
    let t = end;
    while (t < src.length && /\s/.test(src[t])) t++;
    if (src[t] === ',') end = t + 1;
    else {
      let k = start - 1;
      while (k >= last && /\s/.test(src[k])) k--;
      if (src[k] === ',') start = k;
    }
    out += src.slice(last, start);
    last = end;
    re.lastIndex = end;
  }
  out += src.slice(last);
  return out;
}

function stripQuotedProps(src, keys) {
  const key = keys.join('|');
  const re = new RegExp(`,\\s*(?:${key})\\s*:\\s*'(?:\\\\'|[^'])*'|,\\s*(?:${key})\\s*:\\s*"(?:\\\\"|[^"])*"`, 'g');
  return src.replace(re, '');
}

function transformHtml(html) {
  let s = html.replace(
    /\s*<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/[^"]+">\s*/,
    '\n'
  );
  s = s.replace(
    'https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js',
    'vendor/d3.min.js'
  );
  s = s.replace('<html lang="en">', '<html lang="zh-CN">');
  s = s.replace(
    '--display:"Cormorant Garamond","Noto Serif SC",Georgia,serif; --zh:"Noto Serif SC","Cormorant Garamond",serif; --mono:"IBM Plex Mono",ui-monospace,monospace;',
    '--display:"Iowan Old Style","Palatino Linotype",Palatino,"Songti SC","Source Han Serif SC","Noto Serif CJK SC",Georgia,serif; --zh:"Songti SC","Source Han Serif SC","Noto Serif CJK SC","PingFang SC","Microsoft YaHei",serif; --mono:ui-monospace,"Sarasa Mono SC","Noto Sans Mono CJK SC","Source Han Mono SC","PingFang SC",monospace;'
  );
  s = s.replace(
    '<select id="lang" aria-label="language"><option value="en">English</option><option value="zh">中文</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="es">Español</option><option value="it">Italiano</option></select>',
    '<select id="lang" aria-label="language"><option value="zh">中文</option><option value="en">English</option></select>'
  );
  s = s.replace("const LANGS=['en','zh','fr','de','es','it'];", "const LANGS=['zh','en'];");
  s = s.replace(",lang='en',", ",lang='zh',");

  const wikiFn = `const wiki=(w,wz)=>{const t=T[lang];if(lang==='zh'){const q=wz||w;return q?\`<div class="ex">\${t.wiki}: <a href="https://baike.baidu.com/search?word=\${encodeURIComponent(q)}" target="_blank" rel="noopener">百度百科 ↗</a></div>\`:''}const en=w?\`<a href="https://en.wikipedia.org/wiki/\${encodeURIComponent(w.replace(/ /g,'_'))}" target="_blank" rel="noopener">en</a>\`:'';return en?\`<div class="ex">\${t.wiki}: \${en}</div>\`:''};`;
  const wikiBtnsFn = `function wikiBtns(w,wz){const t=T[lang];const a=[];if(lang==='zh'){const q=wz||w;if(q)a.push(\`<a href="https://baike.baidu.com/search?word=\${encodeURIComponent(q)}" target="_blank" rel="noopener">\${t.wiki==='维基百科'?'百度百科':t.wiki} ↗</a>\`);}else if(w)a.push(\`<a href="https://en.wikipedia.org/wiki/\${encodeURIComponent(w.replace(/ /g,'_'))}" target="_blank" rel="noopener">\${t.wiki} · EN ↗</a>\`);return a.length?\`<div class="wk">\${a.join('')}</div>\`:''}`;

  const oldWiki = s.match(/const wiki=\(w,wz\)=>\{[\s\S]*?\};/);
  const oldBtns = s.match(/function wikiBtns\(w,wz\)\{[\s\S]*?return a\.length\?`<div class="wk">\$\{a\.join\(''\)\}<\/div>`:''\}/);
  if (!oldWiki || !oldBtns) throw new Error('could not find wikipedia helpers to rewrite');
  s = s.replace(oldWiki[0], wikiFn).replace(oldBtns[0], wikiBtnsFn);

  s = stripObjectProps(s, DROP);
  s = stripQuotedProps(s, DROP);
  return s;
}

rmSync(dist, { recursive: true, force: true });
cpSync(join(root, 'public'), dist, { recursive: true });
mkdirSync(join(dist, 'vendor'), { recursive: true });
cpSync(d3src, join(dist, 'vendor/d3.min.js'));

const htmlPath = join(dist, 'index.html');
const html = transformHtml(readFileSync(htmlPath, 'utf8'));
writeFileSync(htmlPath, html);

const banned = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'unpkg.com',
  'zh.wikipedia.org',
  'value="fr"',
  'value="de"',
  'value="es"',
  'value="it"'
];
for (const b of banned) {
  if (html.includes(b)) throw new Error('CN build still contains ' + b);
}
if (!html.includes('vendor/d3.min.js')) throw new Error('d3 was not vendored into index.html');
if (!html.includes('baike.baidu.com/search?word=')) throw new Error('Baidu Baike link missing');
if (!html.includes('en.wikipedia.org')) throw new Error('English Wikipedia link missing');
if (!html.includes("lang='zh'")) throw new Error('default language is not Chinese');
console.log('dist-cn ready:', dist);
