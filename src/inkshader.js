// WebGL ink-smoke: domain-warped fbm noise, drawn at low resolution behind the page (dark theme,
// desktop, motion allowed). Pauses when the tab is hidden; ~30 fps.
const ok = matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
if (ok) {
  const c = document.createElement('canvas');
  c.className = 'ink-smoke'; c.setAttribute('aria-hidden', 'true');
  const gl = c.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false });
  if (gl) {
    document.body.prepend(c);
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision mediump float;uniform vec2 R;uniform float T;uniform vec2 M;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int k=0;k<5;k++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){vec2 uv=gl_FragCoord.xy/R;vec2 p=uv*vec2(R.x/R.y,1.)*2.2;
 float t=T*.035;vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
 vec2 r=vec2(fbm(p+3.*q+vec2(1.7,9.2)+t*.6),fbm(p+3.*q+vec2(8.3,2.8)-t*.4));
 float f=fbm(p+3.5*r+ (M-.5)*.6);
 float ink=smoothstep(.45,.95,f);float ember=smoothstep(.72,1.,f)*smoothstep(.3,.9,length(r));
 vec3 col=mix(vec3(.91,.89,.83),vec3(.85,.27,.17),ember);
 gl_FragColor=vec4(col,ink*.07+ember*.05);}`;
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(pr, 'R'), uT = gl.getUniformLocation(pr, 'T'), uM = gl.getUniformLocation(pr, 'M');
    let mx = 0.5, my = 0.5, raf = 0, last = 0;
    addEventListener('pointermove', e => { mx += (e.clientX / innerWidth - mx) * 0.05; my += (1 - e.clientY / innerHeight - my) * 0.05; }, { passive: true });
    const size = () => { c.width = Math.ceil(innerWidth / 3); c.height = Math.ceil(innerHeight / 3); gl.viewport(0, 0, c.width, c.height); };
    size(); addEventListener('resize', size);
    const frame = now => {
      raf = requestAnimationFrame(frame);
      if (now - last < 33 || document.documentElement.dataset.theme === 'light') return; last = now;
      gl.uniform2f(uR, c.width, c.height); gl.uniform1f(uT, now / 1000); gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(frame); });
  }
}
