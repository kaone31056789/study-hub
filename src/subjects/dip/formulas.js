// The exam formula sheet: only the formulas worth memorising, unit by unit (Gonzalez & Woods notation).
// Tiny helpers so the strings stay readable: fr = stacked fraction, rt = square root with a bar.
const fr = (n, d) => `<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const rt = x => `<span class="rt">√<span>${x}</span></span>`;

export default [
  { unit: 1, title: 'Fundamentals, Transforms & Enhancement', items: [
    ['Gray levels · storage', `L = 2<sup>k</sup>, &nbsp; b = M × N × k bits`],
    ['Distances', `D<sub>e</sub> = ${rt('(x−s)² + (y−t)²')}, &nbsp; D<sub>4</sub> = |x−s| + |y−t|, &nbsp; D<sub>8</sub> = max(|x−s|, |y−t|)`],
    ['2-D DFT', `F(u,v) = ${fr('1', 'MN')} ΣΣ f(x,y) e<sup>−j2π(ux/M + vy/N)</sup>`, true],
    ['DC term', `F(0,0) = ${fr('1', 'MN')} ΣΣ f(x,y) &nbsp;(average gray level)`],
    ['DCT', `C(u) = α(u) Σ f(x) cos ${fr('(2x+1)uπ', '2N')}, &nbsp; α(0) = ${rt(fr('1', 'N'))}, α(u) = ${rt(fr('2', 'N'))}`],
    ['Hadamard', `H<sub>2N</sub> = [ H<sub>N</sub> &nbsp;H<sub>N</sub> ; H<sub>N</sub> &nbsp;−H<sub>N</sub> ], &nbsp; T = ${fr('1', 'N')} H f H`],
    ['Haar (one level)', `avg = ${fr('a + b', '2')}, &nbsp; det = ${fr('a − b', '2')}`],
    ['KL / Hotelling', `m<sub>x</sub> = ${fr('1', 'K')} Σ x<sub>k</sub>, &nbsp; C<sub>x</sub> = ${fr('1', 'K')} Σ x<sub>k</sub>x<sub>k</sub><sup>T</sup> − m<sub>x</sub>m<sub>x</sub><sup>T</sup>, &nbsp; y = A(x − m<sub>x</sub>)`],
    ['Point operations', `s = (L−1) − r <i>(neg)</i>, &nbsp; s = c log(1 + r), &nbsp; s = c r<sup>γ</sup> <i>(gamma)</i>`],
    ['Contrast stretching', `s = ${fr('s₂ − s₁', 'r₂ − r₁')} (r − r₁) + s₁`],
    ['Histogram equalisation', `s<sub>k</sub> = round( (L−1) Σ<sub>j=0</sub><sup>k</sup> ${fr('n<sub>j</sub>', 'n')} )`, true],
    ['Low-pass filters', `ILPF H = 1 if D ≤ D₀, &nbsp; BLPF H = ${fr('1', `1 + (D/D₀)<sup>2n</sup>`)}, &nbsp; GLPF H = e<sup>−D²/2D₀²</sup>`],
    ['High-pass · distance', `H<sub>HP</sub> = 1 − H<sub>LP</sub>, &nbsp; D(u,v) = ${rt('(u − M/2)² + (v − N/2)²')}`],
    ['Laplacian', `∇²f = f(x+1,y) + f(x−1,y) + f(x,y+1) + f(x,y−1) − 4f(x,y)`],
  ] },
  { unit: 2, title: 'Restoration, Colour, Wavelets & Morphology', items: [
    ['Degradation model', `g(x,y) = h(x,y) ∗ f(x,y) + η(x,y) &nbsp;⟶&nbsp; G(u,v) = H(u,v)F(u,v) + N(u,v)`, true],
    ['Gaussian noise', `p(z) = ${fr('1', `${rt('2π')} σ`)} e<sup>−(z−μ)²/2σ²</sup>`],
    ['Rayleigh · Erlang', `p(z) = ${fr('2', 'b')}(z−a) e<sup>−(z−a)²/b</sup>, z ≥ a; &nbsp; p(z) = ${fr('a<sup>b</sup> z<sup>b−1</sup>', '(b−1)!')} e<sup>−az</sup>`],
    ['Exponential · uniform', `p(z) = a e<sup>−az</sup>; &nbsp; p(z) = ${fr('1', 'b − a')}, a ≤ z ≤ b`],
    ['Mean filters', `geometric [Π g]<sup>1/mn</sup>, &nbsp; harmonic ${fr('mn', 'Σ 1/g')}, &nbsp; contraharmonic ${fr('Σ g<sup>Q+1</sup>', 'Σ g<sup>Q</sup>')}`],
    ['Inverse filter', `F̂(u,v) = ${fr('G(u,v)', 'H(u,v)')}`],
    ['Wiener filter', `F̂(u,v) = [ ${fr('H*(u,v)', `|H(u,v)|² + S<sub>η</sub>/S<sub>f</sub>`)} ] G(u,v)`, true],
    ['Constrained LS', `F̂ = [ ${fr('H*', '|H|² + γ|P|²')} ] G`, true],
    ['RGB → CMY', `C = 1 − R, &nbsp; M = 1 − G, &nbsp; Y = 1 − B`],
    ['RGB → HSI', `I = ${fr('R + G + B', '3')}, &nbsp; S = 1 − ${fr('3', 'R + G + B')} min(R,G,B), &nbsp; H = θ if B ≤ G else 360° − θ`],
    ['Hue angle', `θ = cos<sup>−1</sup> ${fr('½[(R−G) + (R−B)]', rt('(R−G)² + (R−B)(G−B)'))}`],
    ['Wavelet spaces', `V<sub>j+1</sub> = V<sub>j</sub> ⊕ W<sub>j</sub>, &nbsp; φ<sub>j,k</sub>(x) = 2<sup>j/2</sup> φ(2<sup>j</sup>x − k)`],
    ['Morphology', `dilation A⊕B, erosion A⊖B, &nbsp; opening A∘B = (A⊖B)⊕B, &nbsp; closing A•B = (A⊕B)⊖B`],
    ['Boundary · hit-or-miss', `β(A) = A − (A⊖B), &nbsp; A⊛B = (A⊖B₁) ∩ (A<sup>c</sup>⊖B₂)`],
  ] },
  { unit: 3, title: 'Compression & Segmentation', items: [
    ['Compression ratio', `C<sub>R</sub> = ${fr('n₁', 'n₂')}, &nbsp; R<sub>D</sub> = 1 − ${fr('1', 'C<sub>R</sub>')}`],
    ['Entropy · code length', `H = −Σ p<sub>k</sub> log₂ p<sub>k</sub>, &nbsp; L<sub>avg</sub> = Σ l<sub>k</sub> p<sub>k</sub>, &nbsp; η = ${fr('H', 'L<sub>avg</sub>')}`, true],
    ['Error · PSNR', `MSE = ${fr('1', 'MN')} ΣΣ (f̂ − f)², &nbsp; PSNR = 10 log<sub>10</sub> ${fr('(L−1)²', 'MSE')}`],
    ['Predictive coding', `e(n) = f(n) − f̂(n)`],
    ['Derivatives', `1st: f(x+1) − f(x), &nbsp; 2nd: f(x+1) + f(x−1) − 2f(x)`],
    ['Gradient', `M = ${rt('g<sub>x</sub>² + g<sub>y</sub>²')} ≈ |g<sub>x</sub>| + |g<sub>y</sub>|, &nbsp; α = tan<sup>−1</sup>${fr('g<sub>y</sub>', 'g<sub>x</sub>')}`],
    ['Hough line', `ρ = x cos θ + y sin θ`, true],
    ['Global threshold', `T<sub>new</sub> = ½ (m₁ + m₂)`],
    ['Otsu', `σ<sub>B</sub>² = P₁P₂ (m₁ − m₂)²`, true],
  ] },
];
