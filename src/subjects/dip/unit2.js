// DIP Unit 2 · Restoration, Colour, Wavelets, Morphology (CO2).

const gauss = (x, m, s) => Math.exp(-((x - m) ** 2) / (2 * s * s));

const topics = [
{
  id: 'd2-noise', unit: 2, title: 'Degradation Model & Noise Models', marks: '2 / 5', mins: 15, imp: true, pyq: 'MST-2 · 2M',
  q: 'List the noise models (Gaussian, Rayleigh, Gamma, Exponential, Uniform, Impulse) with their PDFs. Which spatial filter suits each type? <i>(IQ Q13 · 5M)</i>',
  simple: `<p><b>Restoration</b> = undo known damage. Model: <b>g = h * f + η</b> (blur h, then add noise η). In frequency: G = HF + N.</p>
<p>Each noise type is described by its <b>PDF</b> (how likely each noise value is). Know the shape and the matching filter:</p>
<ul><li>Gaussian (bell) → mean filters · Salt & pepper → <b>median</b> · Uniform → midpoint / alpha-trimmed · Periodic → notch filter (frequency).</li></ul>`,
  learn: [
    { title: 'Degradation model', body: `<p>g(x,y) = h(x,y) * f(x,y) + η(x,y) &nbsp;⇔&nbsp; G(u,v) = H(u,v)F(u,v) + N(u,v). Restoration estimates f̂ ≈ f. Unlike enhancement, it is <b>objective</b>.</p>` },
    { title: 'Gaussian & Rayleigh', body: `<p>Gaussian: p(z) = [1/(√(2π)σ)] e<sup>−(z−μ)²/2σ²</sup> (sensor/circuit noise). Rayleigh: p(z) = (2/b)(z−a)e<sup>−(z−a)²/b</sup>, z ≥ a (range imaging, skewed).</p>` },
    { title: 'Gamma & Exponential', body: `<p>Erlang (gamma): p(z) = a<sup>b</sup>z<sup>b−1</sup>e<sup>−az</sup>/(b−1)!, z ≥ 0 (laser imaging). Exponential: p(z) = a e<sup>−az</sup> (gamma with b = 1).</p>` },
    { title: 'Uniform & Impulse', body: `<p>Uniform: p(z) = 1/(b−a) for a ≤ z ≤ b. Impulse (salt & pepper): P<sub>a</sub> at z = a (pepper, 0), P<sub>b</sub> at z = b (salt, 255).</p>` },
    { title: 'Matching filters', body: `<p>Gaussian/uniform → arithmetic or geometric mean, midpoint. Salt → min, harmonic, contraharmonic Q &lt; 0. Pepper → max, contraharmonic Q &gt; 0. Salt & pepper → <b>median</b>, alpha-trimmed. Mixed → alpha-trimmed, adaptive median.</p>` }
  ],
  short: `<p>Degradation model: g = h * f + η (G = HF + N). Noise PDFs: <b>Gaussian</b> [1/(√2πσ)]e<sup>−(z−μ)²/2σ²</sup>; <b>Rayleigh</b> (2/b)(z−a)e<sup>−(z−a)²/b</sup>, z ≥ a; <b>Erlang</b> a<sup>b</sup>z<sup>b−1</sup>e<sup>−az</sup>/(b−1)!; <b>Exponential</b> ae<sup>−az</sup>; <b>Uniform</b> 1/(b−a) on [a,b]; <b>Impulse</b> P<sub>a</sub>, P<sub>b</sub> at a, b. Gaussian/uniform → mean/midpoint filters; impulse → median.</p>`,
  answer: `<h3>Degradation / restoration model</h3><p><b>g(x,y) = h(x,y) * f(x,y) + η(x,y)</b> &nbsp;⇔&nbsp; <b>G(u,v) = H(u,v)F(u,v) + N(u,v)</b>. h = degradation (blur), η = additive noise. Restoration finds f̂(x,y) as close as possible to f(x,y) (an objective process).</p>
<h3>Noise models (PDFs)</h3><table class="tbl"><tr><th>Noise</th><th>PDF p(z)</th><th>Mean / variance</th><th>Source</th></tr>
<tr><td>Gaussian</td><td>[1/(√(2π)σ)] e<sup>−(z−μ)²/2σ²</sup></td><td>μ, σ²</td><td>Sensor, circuit noise, poor light, heat</td></tr>
<tr><td>Rayleigh</td><td>(2/b)(z−a) e<sup>−(z−a)²/b</sup>, z ≥ a; 0 otherwise</td><td>a + √(πb/4), b(4−π)/4</td><td>Range imaging (skewed)</td></tr>
<tr><td>Erlang (Gamma)</td><td>a<sup>b</sup> z<sup>b−1</sup> e<sup>−az</sup> / (b−1)!, z ≥ 0</td><td>b/a, b/a²</td><td>Laser imaging</td></tr>
<tr><td>Exponential</td><td>a e<sup>−az</sup>, z ≥ 0</td><td>1/a, 1/a²</td><td>Laser imaging (gamma, b = 1)</td></tr>
<tr><td>Uniform</td><td>1/(b−a) for a ≤ z ≤ b; 0 otherwise</td><td>(a+b)/2, (b−a)²/12</td><td>Quantization, random generators</td></tr>
<tr><td>Impulse (salt & pepper)</td><td>P<sub>a</sub> at z = a, P<sub>b</sub> at z = b, 0 otherwise</td><td>—</td><td>Faulty switching, transmission errors, dead pixels</td></tr></table>
<p>Periodic noise (electrical interference) shows as spikes in the spectrum.</p>
<h3>Spatial filter for each</h3><table class="tbl"><tr><th>Noise</th><th>Suitable filter</th><th>Why</th></tr>
<tr><td>Gaussian</td><td>Arithmetic / geometric mean</td><td>Averaging cancels zero-mean noise; geometric loses less detail</td></tr>
<tr><td>Rayleigh, Gamma, Exponential</td><td>Mean filters (geometric/harmonic), adaptive local filter</td><td>Continuous noise; adaptive filters adjust to skewed local statistics</td></tr>
<tr><td>Uniform</td><td>Midpoint, alpha-trimmed mean</td><td>Bounded noise; midpoint = ½(max + min)</td></tr>
<tr><td>Salt only</td><td>Min, harmonic, contraharmonic Q &lt; 0</td><td>Removes bright outliers</td></tr>
<tr><td>Pepper only</td><td>Max, contraharmonic Q &gt; 0</td><td>Removes dark outliers</td></tr>
<tr><td>Salt & pepper</td><td><b>Median</b>, adaptive median</td><td>Outliers are discarded, edges kept</td></tr>
<tr><td>Periodic</td><td>Band-reject / notch (frequency domain)</td><td>Remove the spike frequencies</td></tr></table>
<p>Filter formulas: arithmetic (1/mn)Σg; geometric [Πg]<sup>1/mn</sup>; harmonic mn/Σ(1/g); contraharmonic Σg<sup>Q+1</sup>/Σg<sup>Q</sup>.</p>`,
  dg: [
    { h: 'Degradation & restoration model' },
    { flow: [{ t: 'f(x, y)', s: 'original', tone: 'ok' }, { t: 'h(x, y)', s: 'blur' }, { t: '+ η(x, y)', s: 'noise', tone: 'bad' }, { t: 'g(x, y)', s: 'degraded' }, { t: 'Restoration filter', tone: 'a' }, { t: 'f̂(x, y)', s: 'estimate', tone: 'ok' }], labels: ['', '', '', '', ''] },
    { h: 'Noise PDFs' },
    { plot: { xmax: 4, xlabel: 'noise value z', ylabel: 'p(z)', lines: [
      { name: 'Gaussian', tone: 'u1', f: x => gauss(x, 2, 0.5) },
      { name: 'Rayleigh', tone: 'u2', f: x => (x < 0.5 ? 0 : 1.65 * (x - 0.5) * Math.exp(-((x - 0.5) ** 2) / 0.8) / 1) },
      { name: 'Exponential', tone: 'bad', f: x => Math.exp(-1.6 * x) },
      { name: 'Uniform', tone: 'ok', f: x => (x >= 1 && x <= 3 ? 0.45 : 0) }] }, cap: 'Shapes only (not to scale). Erlang/gamma looks like a skewed hump.' },
    { bars: [30, 0, 0, 0, 0, 0, 0, 22], labels: ['0', '', '', '', '', '', '', '255'], cap: 'Impulse: two spikes, pepper at 0 and salt at 255' },
    { grid: [{ t: 'Gaussian', s: 'mean filters', tone: 'u1' }, { t: 'Uniform', s: 'midpoint', tone: 'ok' }, { t: 'Salt & pepper', s: 'median', tone: 'a' }, { t: 'Periodic', s: 'notch (frequency)', tone: 'u3' }] }
  ],
  quiz: [
    { q: 'Which noise has two spikes in its PDF?', o: ['Gaussian', 'Uniform', 'Impulse (salt & pepper)', 'Rayleigh'], a: 2, why: 'Pₐ at 0 (pepper) and P_b at 255 (salt).' },
    { q: 'Exponential noise is a special case of', o: ['Gaussian', 'Erlang (gamma) with b = 1', 'Rayleigh', 'Uniform'], a: 1, why: 'Erlang with b = 1 gives a e^(−az).' },
    { q: 'Contraharmonic filter with Q > 0 removes', o: ['Salt', 'Pepper', 'Gaussian', 'Periodic'], a: 1, why: 'Q > 0 removes pepper; Q < 0 removes salt.' }
  ],
  rev: ['<b>g = h * f + η</b>, G = HF + N; restoration is objective', 'Gaussian [1/√2πσ]e^(−(z−μ)²/2σ²); Rayleigh (2/b)(z−a)e^(−(z−a)²/b)', 'Erlang aᵇzᵇ⁻¹e^(−az)/(b−1)!; exponential ae^(−az); uniform 1/(b−a)', 'Impulse: Pₐ at 0 (pepper), P_b at 255 (salt)', 'Gaussian → mean; uniform → midpoint; S&P → <b>median</b>; periodic → notch; contraharmonic Q>0 pepper, Q<0 salt'],
  trick: '"<b>Good Rays Go Easily Under Impulse</b>": Gaussian, Rayleigh, Gamma, Exponential, Uniform, Impulse.',
  easy: {
    en: { s: 'Restoration undoes blur plus noise; each noise type has a PDF shape and a filter that suits it.', story: 'Like diagnosing a cough: first identify the type (dry, wet, allergy), then pick the medicine. Noise type → filter.', words: [['PDF', 'How likely each noise value is.'], ['Gaussian', 'Bell-shaped sensor noise.'], ['Impulse', 'Random 0/255 dots.'], ['Contraharmonic Q', 'Q>0 kills pepper, Q<0 kills salt.']], how: ['Write g = h*f + η.', 'Identify the noise from its PDF.', 'Pick the matching filter.', 'Justify in one line.'], exam: 'Model, table of 6 PDFs with formulas, table of noise → filter with reasons.', yaad: 'Good Rays Go Easily Under Impulse.' },
    bhai: { s: 'Restoration blur aur noise hatata hai. Har noise ki PDF shape alag, aur uska filter alag.', story: 'Khansi ka ilaaj: pehle type pehchano (sookhi, geeli, allergy), phir dawai. Noise type → filter.', words: [['PDF', 'Kaunsi noise value kitni likely.'], ['Gaussian', 'Bell jaisa sensor noise.'], ['Impulse', 'Random 0/255 dots.'], ['Contraharmonic Q', 'Q>0 pepper hatata, Q<0 salt.']], how: ['g = h*f + η likho.', 'PDF se noise pehchano.', 'Sahi filter chuno.', 'Ek line mein justify.'], exam: 'Model, 6 PDF ki table, noise → filter table.', yaad: 'Good Rays Go Easily Under Impulse.' },
    gaali: { s: 'Restoration blur aur noise ki safai hai. Har noise ki shakal (PDF) alag, filter alag. Ek hi dawai sab pe mat laga, chutiye.', story: 'Khansi ka ilaaj karne se pehle pata kar kaunsi khansi hai, bc. Noise pehchaan, phir filter. Seedha median thok diya har jagah toh gadhe hai tu.', words: [['PDF', 'Noise ki kundli.'], ['Gaussian', 'Bell wala sensor noise.'], ['Impulse', 'Kaale-safed dhabbe.'], ['Contraharmonic', 'Q>0 pepper, Q<0 salt. Ulta mat kar.']], how: ['Model likh.', 'Noise pehchaan.', 'Filter chun.', 'Justify kar. Ho gaya, harami.'], exam: 'Model, 6 PDF formula, filter table. Formula galat toh marks ki maa chud jaayegi.', yaad: 'Good Rays Go Easily Under Impulse. Ratt le, kamine.' }
  }
},
{
  id: 'd2-inverse', unit: 2, title: 'Inverse Filtering & Why Wiener Fixes It', marks: '2 / 10', mins: 15, imp: true, pyq: 'MST-2 · 2M',
  q: 'Explain inverse filtering and its limitation in the presence of noise. Show how Wiener filtering overcomes it. <i>(IQ Q14 · 10M)</i>',
  simple: `<p>If the blur is H, undo it by dividing: <b>F̂ = G / H</b>. Problem: G = HF + N, so <b>F̂ = F + N/H</b>. Where H is tiny (high frequencies), N/H explodes and noise swamps the image.</p>
<p><b>Wiener</b> divides gently: it uses <b>|H|²/(|H|² + K)</b> as a brake. Where H is small, the brake turns the filter down instead of blowing up.</p>`,
  learn: [
    { title: 'Inverse filter', body: `<p>F̂(u,v) = G(u,v)/H(u,v), then inverse DFT.</p>` },
    { title: 'The trap', body: `<p>F̂ = (HF + N)/H = F + N/H. Example: |H| = 0.01, N = 0.5 → N/H = 50: noise ×100.</p>` },
    { title: 'Patch', body: `<p>Apply the division only within a radius D₀ of the origin (where H is large), or skip frequencies with |H| below a threshold. Still poor with noise.</p>` },
    { title: 'Wiener', body: `<p>F̂ = [ (1/H)·|H|²/(|H|² + S<sub>η</sub>/S<sub>f</sub>) ] G. If S<sub>η</sub>/S<sub>f</sub> unknown, use a constant K. When noise = 0 it becomes the inverse filter.</p>` },
    { title: 'Why it works', body: `<p>Where |H|² ≫ K: ≈ 1/H (deblur). Where |H|² ≪ K: ≈ H*/K → 0 (do not amplify noise). It minimises mean square error.</p>` }
  ],
  short: `<p><b>Inverse filtering</b> estimates F̂ = G/H. Since G = HF + N, F̂ = F + N/H: where |H| is small or zero, N/H dominates and noise is hugely amplified; it works only for little or no noise (or with a cut-off radius). <b>Wiener filter</b> F̂ = [H*/(|H|² + S<sub>η</sub>/S<sub>f</sub>)]G uses the noise-to-signal ratio as a regulariser, so the gain stays bounded where |H| is small, minimising mean square error.</p>`,
  answer: `<h3>Inverse filtering</h3><p>Simplest restoration: <b>F̂(u,v) = G(u,v) / H(u,v)</b>, then inverse DFT gives f̂(x,y).</p>
<h3>Limitation in the presence of noise</h3><p>Since G = HF + N:</p><p><b>F̂ = (HF + N)/H = F + N(u,v)/H(u,v)</b></p><ul>
<li>N is unknown and random, so even with the exact H we cannot recover F.</li>
<li>Typically |H| falls to very small values (or zero) at high frequencies. There N/H becomes huge and <b>noise dominates</b> the result. Example: |H| = 0.01, N = 0.5 → N/H = 50 (×100 amplification).</li>
<li>Zeros of H make the division undefined.</li>
<li>Partial fix: apply the inverse only for frequencies near the origin (radius D₀) or where |H| &gt; threshold. Works well only when noise is negligible.</li></ul>
<h3>How Wiener filtering overcomes it</h3><p>The Wiener (MMSE) filter minimises e² = E{(f − f̂)²} and treats image and noise as random processes:</p>
<p><b>F̂(u,v) = [ (1/H) · |H|² / (|H|² + S<sub>η</sub>/S<sub>f</sub>) ] G(u,v) = [ H* / (|H|² + S<sub>η</sub>/S<sub>f</sub>) ] G(u,v)</b></p><ul>
<li>S<sub>η</sub> = noise power spectrum, S<sub>f</sub> = image power spectrum. If unknown, replace S<sub>η</sub>/S<sub>f</sub> by a constant <b>K</b> tuned interactively.</li>
<li><b>Large |H|</b> (|H|² ≫ K): factor → 1, behaves like the inverse filter (removes blur).</li>
<li><b>Small |H|</b> (|H|² ≪ K): F̂ ≈ (H*/K)G → small, so noise is <b>not amplified</b>; division by zero never happens.</li>
<li>With no noise (S<sub>η</sub> = 0) it reduces to the inverse filter.</li></ul>
<table class="tbl"><tr><th></th><th>Inverse</th><th>Wiener</th></tr><tr><td>Formula</td><td>G/H</td><td>[H*/(|H|² + K)] G</td></tr><tr><td>Needs</td><td>H</td><td>H + S<sub>η</sub>/S<sub>f</sub> (or K)</td></tr><tr><td>Noise</td><td>Amplified (N/H)</td><td>Suppressed / balanced</td></tr><tr><td>Criterion</td><td>Exact division</td><td>Minimum mean square error</td></tr></table>`,
  dg: [
    { flow: [{ t: 'G(u, v)', tone: 'u1' }, { t: '÷ H(u, v)', s: 'inverse filter', tone: 'a' }, { t: 'F̂ = F + N/H', s: 'noise blows up where H ≈ 0', tone: 'bad' }], labels: ['', ''] },
    { h: 'Filter gain vs |H| (noise ratio K = 0.01)' },
    { plot: { xmax: 1, xlabel: '|H| (blur strength)', ylabel: 'gain', lines: [
      { name: 'Inverse 1/|H| (scaled)', tone: 'bad', f: h => Math.min(1, 0.08 / Math.max(h, 0.001)) },
      { name: 'Wiener |H|/(|H|²+K) (scaled)', tone: 'ok', f: h => (0.16 * h) / (h * h + 0.01) * 0.62 }] }, cap: 'Inverse gain shoots up as |H| → 0. Wiener peaks then falls back: it refuses to amplify noise.' },
    { flow: [{ t: 'Large |H|', s: '≈ 1/H → deblur', tone: 'u1' }, { t: 'Small |H|', s: '≈ H*/K → 0 → no noise boost', tone: 'ok' }], labels: ['Wiener'] }
  ],
  quiz: [
    { q: 'With noise, inverse filtering gives F̂ =', o: ['F', 'F + N/H', 'F·H', 'N/F'], a: 1, why: 'G = HF + N divided by H.' },
    { q: 'Wiener reduces to the inverse filter when', o: ['K is large', 'There is no noise (Sη = 0)', 'H = 0', 'Always'], a: 1, why: 'Then |H|²/|H|² = 1.' },
    { q: 'If |H| = 0.02 and N = 0.4, the noise term N/H is', o: ['0.008', '2', '20', '0.4'], a: 2, why: '0.4/0.02 = 20.' }
  ],
  rev: ['Inverse: <b>F̂ = G/H</b> → F + N/H', 'Small |H| → N/H huge → noise dominates; zeros of H undefined', 'Fix: limit to radius D₀ / threshold |H|', 'Wiener: <b>[H*/(|H|² + Sη/Sf)]G</b>, K if spectra unknown', 'Large |H| → deblur; small |H| → gain → 0; no noise → inverse'],
  trick: 'Inverse = "divide blindly". Wiener = "divide, but <b>+K</b> in the denominator so you never divide by ~0".',
  easy: {
    en: { s: 'Inverse filtering divides out the blur but explodes noise; Wiener adds a safety term so it does not.', story: 'Turning up the volume to hear a faint voice also turns up the hiss. Inverse = max volume always. Wiener = volume knob that backs off where it is mostly hiss.', words: [['H', 'The blur (degradation) function.'], ['N/H', 'Amplified noise term.'], ['K', 'Noise-to-signal ratio guess.'], ['MMSE', 'Minimum mean square error.']], how: ['Write G = HF + N.', 'Divide by H → F + N/H, show the problem.', 'Write Wiener formula.', 'Explain large-H and small-H behaviour.'], exam: 'Inverse formula, derivation of F + N/H with a numeric example, Wiener formula, two cases, comparison table.', yaad: 'Divide, but +K.' },
    bhai: { s: 'Inverse filter blur ko divide karke hatata hai par noise phat jaata hai. Wiener ek safety term jod deta hai.', story: 'Halki awaaz sunne ke liye volume full karo toh hiss bhi full. Inverse = hamesha full volume. Wiener = jahan sirf hiss hai wahan volume kam.', words: [['H', 'Blur function.'], ['N/H', 'Bada hua noise.'], ['K', 'Noise/signal ka andaaza.'], ['MMSE', 'Kam se kam error.']], how: ['G = HF + N.', 'H se divide → F + N/H, problem dikhao.', 'Wiener formula.', 'Bada H aur chhota H explain.'], exam: 'Inverse formula, F + N/H + example, Wiener formula, dono case, table.', yaad: 'Divide karo, par +K.' },
    gaali: { s: 'Inverse filter andha hoke divide karta hai, noise phat ke mooh pe aata hai. Wiener samajhdaar hai, +K lagata hai. Tu inverse filter hai, bc.', story: 'Halki awaaz ke liye volume full kiya toh hiss bhi full, chutiye. Wiener wahan volume kam karta hai jahan sirf bakwas hai. Teri baaton pe bhi lagana chahiye.', words: [['H', 'Blur.'], ['N/H', 'Phata hua noise.'], ['K', 'Noise ka andaaza.'], ['MMSE', 'Kam error. Tere life choices se ulta.']], how: ['G = HF + N.', 'Divide → F + N/H.', 'Wiener likh.', 'Bada H, chhota H samjha. Ho gaya, gadhe.'], exam: 'Formula, F + N/H example ke saath, Wiener, table. Sirf "Wiener better" likha toh examiner gaand pe laat maarega.', yaad: 'Divide kar, par +K, harami.' }
  }
},
{
  id: 'd2-wiener', unit: 2, title: 'Wiener (MMSE) Filter Derivation & CLS Filter', marks: '10', mins: 20, imp: true, pyq: 'MST-2 · 2M',
  q: 'Derive the Minimum Mean Square Error (Wiener) filter. Compare it with constrained least squares filtering. <i>(IQ Q15 · 10M)</i>',
  simple: `<p>Wiener: find the filter W so that F̂ = W·G is as close as possible to F <b>on average</b> (minimum mean square error). Answer: <b>W = H* / (|H|² + S<sub>η</sub>/S<sub>f</sub>)</b>.</p>
<p><b>CLS</b>: find the <b>smoothest</b> image (least Laplacian) that still matches the noise level: <b>W = H* / (|H|² + γ|P|²)</b>. Needs only the noise mean and variance, not full spectra.</p>`,
  learn: [
    { title: 'Goal', body: `<p>Minimise e² = E{|F − F̂|²} with F̂ = W G. Assume noise and image are uncorrelated, zero-mean noise.</p>` },
    { title: 'Orthogonality', body: `<p>Optimum when the error is orthogonal to the data: E{(F − WG)G*} = 0 → W = E{FG*}/E{|G|²} = S<sub>fg</sub>/S<sub>g</sub>.</p>` },
    { title: 'Substitute G = HF + N', body: `<p>E{FG*} = H* S<sub>f</sub>; E{|G|²} = |H|²S<sub>f</sub> + S<sub>η</sub> (cross terms vanish).</p>` },
    { title: 'Result', body: `<p>W = H*S<sub>f</sub>/(|H|²S<sub>f</sub> + S<sub>η</sub>) = H*/(|H|² + S<sub>η</sub>/S<sub>f</sub>) = (1/H)·|H|²/(|H|² + S<sub>η</sub>/S<sub>f</sub>).</p>` },
    { title: 'CLS', body: `<p>Minimise C = ΣΣ[∇²f̂]² subject to ‖g − Hf̂‖² = ‖η‖². Lagrange → F̂ = [H*/(|H|² + γ|P|²)]G, P = DFT of the Laplacian mask. Tune γ until ‖r‖² = ‖η‖².</p>` }
  ],
  short: `<p>Wiener filter minimises E{(f − f̂)²}. With F̂ = WG and the orthogonality principle E{(F − WG)G*} = 0, W = S<sub>fg</sub>/S<sub>g</sub>. Using G = HF + N with uncorrelated noise, S<sub>fg</sub> = H*S<sub>f</sub>, S<sub>g</sub> = |H|²S<sub>f</sub> + S<sub>η</sub>, so W = H*/(|H|² + S<sub>η</sub>/S<sub>f</sub>). CLS: W = H*/(|H|² + γ|P|²), minimises smoothness (Laplacian) subject to ‖g − Hf̂‖² = ‖η‖²; needs only noise mean/variance.</p>`,
  answer: `<h3>Derivation of the Wiener (MMSE) filter</h3><p><b>Assumptions</b>: degradation G = HF + N; image and noise uncorrelated; noise zero-mean; restored estimate is linear: <b>F̂(u,v) = W(u,v) G(u,v)</b>.</p>
<p><b>Criterion</b>: minimise the mean square error <b>e² = E{|F − F̂|²}</b>.</p>
<p><b>Step 1</b>: e² = E{|F − WG|²}. Differentiate w.r.t. W* and set to zero (orthogonality principle: error ⊥ data):</p><p>E{(F − WG) G*} = 0 &nbsp;⇒&nbsp; <b>W = E{F G*} / E{|G|²} = S<sub>fg</sub> / S<sub>g</sub></b></p>
<p><b>Step 2</b>: substitute G = HF + N:<br>E{F G*} = E{F (H*F* + N*)} = H* E{|F|²} + E{F N*} = <b>H* S<sub>f</sub></b> (since E{FN*} = 0)<br>E{|G|²} = |H|² E{|F|²} + E{|N|²} + cross terms(= 0) = <b>|H|² S<sub>f</sub> + S<sub>η</sub></b></p>
<p><b>Step 3</b>: <b>W(u,v) = H* S<sub>f</sub> / (|H|² S<sub>f</sub> + S<sub>η</sub>) = H* / (|H|² + S<sub>η</sub>/S<sub>f</sub>)</b></p>
<p>Since H* = |H|²/H: <b>F̂ = [ (1/H) · |H|² / (|H|² + S<sub>η</sub>/S<sub>f</sub>) ] G</b>. If spectra are unknown, S<sub>η</sub>/S<sub>f</sub> ≈ K (constant). If S<sub>η</sub> = 0 → inverse filter.</p>
<h3>Constrained least squares (CLS) filter</h3><p>Minimise the roughness C = Σ<sub>x</sub>Σ<sub>y</sub>[∇²f̂(x,y)]² subject to the constraint ‖g − Hf̂‖² = ‖η‖². Using a Lagrange multiplier γ:</p>
<p><b>F̂(u,v) = [ H*(u,v) / (|H(u,v)|² + γ|P(u,v)|²) ] G(u,v)</b>, P = DFT of the Laplacian p(x,y) = [0 −1 0; −1 4 −1; 0 −1 0].</p>
<p>γ is adjusted iteratively until the residual ‖r‖² = ‖g − Hf̂‖² equals ‖η‖² = MN(σ<sub>η</sub>² + m<sub>η</sub>²). γ = 0 → inverse filter.</p>
<h3>Comparison</h3><table class="tbl"><tr><th></th><th>Wiener (MMSE)</th><th>CLS</th></tr>
<tr><td>Criterion</td><td>Minimum mean square error (statistical)</td><td>Maximum smoothness subject to a noise constraint</td></tr>
<tr><td>Formula</td><td>H*/(|H|² + S<sub>η</sub>/S<sub>f</sub>)</td><td>H*/(|H|² + γ|P|²)</td></tr>
<tr><td>Needs</td><td>Power spectra S<sub>η</sub>, S<sub>f</sub> (or guess K)</td><td>Only noise mean and variance</td></tr>
<tr><td>Parameter</td><td>K (manual tuning)</td><td>γ (computed iteratively to meet the constraint)</td></tr>
<tr><td>Optimal</td><td>On average, over all images</td><td>For each given image</td></tr>
<tr><td>Result</td><td>Good; may look noisy if K poor</td><td>Usually better for each image, sharper control</td></tr>
<tr><td>Special case</td><td>No noise → inverse</td><td>γ = 0 → inverse</td></tr></table>`,
  dg: [
    { h: 'Derivation in four moves' },
    { flow: [{ t: 'F̂ = W·G', s: 'linear estimate', tone: 'u1' }, { t: 'min E{|F − F̂|²}', s: 'MSE' }, { t: 'E{(F−WG)G*} = 0', s: 'orthogonality', tone: 'a' }, { t: 'W = S_fg / S_g', tone: 'u2' }], labels: ['', '∂/∂W* = 0', ''] },
    { flow: [{ t: 'S_fg = H*·S_f' }, { t: 'S_g = |H|²S_f + S_η' }, { t: 'W = H* / (|H|² + S_η/S_f)', tone: 'ok' }], labels: ['G = HF + N', 'divide by S_f'] },
    { h: 'Same shape, different brake' },
    { grid: [
      { cap: 'Wiener', t: 'H* / (|H|² + S_η/S_f)', s: 'needs spectra (or K)', tone: 'u1' },
      { cap: 'CLS', t: 'H* / (|H|² + γ|P|²)', s: 'needs noise mean & variance', tone: 'u3' },
      { cap: 'Inverse', t: 'H* / |H|² = 1/H', s: 'K = 0 or γ = 0', tone: 'bad' }
    ] }
  ],
  quiz: [
    { q: 'The orthogonality principle sets', o: ['E{F G*} = 0', 'E{(F − F̂)G*} = 0', 'H = 0', 'S_f = S_η'], a: 1, why: 'Error orthogonal to data gives the MMSE solution.' },
    { q: 'CLS filter needs', o: ['Full power spectra', 'Only noise mean and variance', 'Nothing', 'The original image'], a: 1, why: '‖η‖² = MN(σ² + m²).' },
    { q: 'P(u,v) in the CLS filter is the DFT of', o: ['Gaussian', 'Laplacian mask', 'Sobel mask', 'Noise'], a: 1, why: 'Smoothness measured by the Laplacian.' }
  ],
  rev: ['F̂ = WG, minimise E{|F − F̂|²} → orthogonality → W = S_fg/S_g', 'S_fg = H*S_f, S_g = |H|²S_f + S_η (uncorrelated noise)', '<b>W = H*/(|H|² + S_η/S_f)</b>; K if unknown; no noise → inverse', 'CLS: <b>H*/(|H|² + γ|P|²)</b>, P = DFT(Laplacian); min ∇² s.t. ‖g−Hf̂‖² = ‖η‖²', 'Wiener: spectra, average-optimal; CLS: mean+variance, per-image optimal'],
  trick: 'Both are "<b>H-star over H-square plus a brake</b>": Wiener brake = noise/signal, CLS brake = γ·Laplacian.',
  easy: {
    en: { s: 'Wiener picks the filter with the smallest average error; CLS picks the smoothest image that fits the noise level.', story: 'Guessing a blurred number plate: Wiener uses statistics of many plates (average best); CLS says "pick the smoothest plate consistent with how noisy this photo is".', words: [['MMSE', 'Minimum mean square error.'], ['Orthogonality', 'Best estimate leaves error unrelated to data.'], ['S_f, S_η', 'Power spectra of image and noise.'], ['γ', 'CLS smoothness knob.']], how: ['Assume F̂ = WG.', 'Set E{(F − WG)G*} = 0.', 'Plug in G = HF + N.', 'Simplify to H*/(|H|² + Sη/Sf).', 'Compare with CLS in a table.'], exam: 'Assumptions, 3-step derivation, final formula in both forms, CLS formula + constraint, comparison table.', yaad: 'H-star over H-square plus a brake.' },
    bhai: { s: 'Wiener sabse kam average error wala filter chunta hai. CLS sabse smooth image chunta hai jo noise level se match kare.', story: 'Dhundhli number plate guess karni hai: Wiener bahut saari plates ke statistics use karta hai. CLS bolta hai "is photo ke noise ke hisaab se sabse smooth plate".', words: [['MMSE', 'Kam se kam average error.'], ['Orthogonality', 'Error aur data ka koi rishta nahi.'], ['S_f, S_η', 'Image aur noise ka power spectrum.'], ['γ', 'CLS ka smoothness knob.']], how: ['F̂ = WG maano.', 'E{(F − WG)G*} = 0.', 'G = HF + N daalo.', 'H*/(|H|² + Sη/Sf) aayega.', 'CLS se table mein compare.'], exam: 'Assumptions, 3 step derivation, final formula, CLS formula + constraint, table.', yaad: 'H-star upar, H-square + brake neeche.' },
    gaali: { s: 'Wiener average mein sabse kam galti karta hai. CLS sabse smooth image deta hai jo noise se match kare. Dono tujhse samajhdaar hain, bc.', story: 'Dhundhli number plate padhni hai. Wiener hazaar plates ka data dekhta hai, CLS bolta hai sabse smooth wali le. Tu bolega "dikh nahi raha", chutiye.', words: [['MMSE', 'Kam error.'], ['Orthogonality', 'Error ka data se koi lena-dena nahi. Tera padhai se jaisa.'], ['S_f, S_η', 'Power spectrum.'], ['γ', 'Smoothness ka knob.']], how: ['F̂ = WG.', 'Orthogonality laga.', 'G = HF + N ghusa.', 'Formula nikaal.', 'CLS se compare. Ho gaya, gadhe.'], exam: 'Derivation ke steps, final formula, CLS, table. Derivation mein assumption nahi likha toh marks ki gaand lag jaayegi, harami.', yaad: 'H-star upar, H-square + brake neeche. Ratt le, kamine.' }
  }
},
{
  id: 'd2-color', unit: 2, title: 'Colour Models (RGB, CMY, HSI) & Pseudocolour', marks: '2 / 5 / 10', mins: 20, imp: true, pyq: 'MST-2 · 2M + 5M',
  q: 'Explain the RGB, CMY and HSI color models, with conversion from RGB to HSI. Describe pseudocolor image processing with an application. <i>(IQ Q16 · 10M)</i>',
  simple: `<ul><li><b>RGB</b>: mix red, green, blue <b>light</b> (additive). Screens, cameras. A unit cube; black (0,0,0) to white (1,1,1).</li>
<li><b>CMY(K)</b>: cyan, magenta, yellow <b>inks</b> (subtractive). Printers. C = 1−R, M = 1−G, Y = 1−B.</li>
<li><b>HSI</b>: Hue (which colour), Saturation (how pure), Intensity (how bright). Close to how people describe colour; great for processing.</li>
<li><b>Pseudocolour</b>: paint gray levels with fake colours so small differences pop out (medical scans, thermal).</li></ul>`,
  learn: [
    { title: 'Colour basics', body: `<p>Visible light ≈ 400–700 nm. Cones are sensitive to R, G, B. Attributes: <b>brightness, hue, saturation</b> (hue + saturation = chromaticity).</p>` },
    { title: 'RGB', body: `<p>Unit cube with R, G, B axes; grays on the diagonal. 8 bits per channel = 24-bit = 16,777,216 colours.</p>` },
    { title: 'CMY / CMYK', body: `<p>C = 1−R, M = 1−G, Y = 1−B. (255,128,64) → (0,127,191). K (black ink) added because C+M+Y gives a muddy dark.</p>` },
    { title: 'RGB → HSI', body: `<p>I = (R+G+B)/3; S = 1 − 3·min(R,G,B)/(R+G+B); θ = cos⁻¹{½[(R−G)+(R−B)] / √[(R−G)² + (R−B)(G−B)]}; H = θ if B ≤ G else 360° − θ.</p>` },
    { title: 'Pseudocolour', body: `<p>Intensity (density) slicing: each gray range → one colour. Or gray-to-colour transforms f<sub>R</sub>, f<sub>G</sub>, f<sub>B</sub>. Eye sees ~2 dozen grays but thousands of colours.</p>` }
  ],
  short: `<p><b>RGB</b>: additive model, unit cube, used in displays/cameras. <b>CMY</b>: subtractive, C = 1−R, M = 1−G, Y = 1−B, used in printing (CMYK adds black). <b>HSI</b>: separates intensity I = (R+G+B)/3 from hue H (θ or 360°−θ) and saturation S = 1 − 3min/(R+G+B); suited to processing. <b>Pseudocolour</b> assigns colours to gray levels (intensity slicing or R/G/B transform functions) to make small differences visible, e.g. in X-ray, CT, MRI, PET and thermal images.</p>`,
  answer: `<h3>1. RGB model (additive)</h3><p>Each colour is a point (R, G, B) in a unit cube. Black = (0,0,0), white = (1,1,1), primaries at three corners, secondaries (cyan, magenta, yellow) at three others; the <b>gray scale lies on the diagonal</b>. With 8 bits per channel, a pixel has 24 bits → 2²⁴ = 16,777,216 colours. Used in monitors, cameras, scanners. R+G = yellow, G+B = cyan, R+B = magenta, R+G+B = white.</p>
<h3>2. CMY / CMYK model (subtractive)</h3><p>Pigments absorb (subtract) light. <b>[C M Y] = [1 1 1] − [R G B]</b>. Used in printers. Equal C, M, Y should give black but give muddy brown, so a true black ink <b>K</b> is added (CMYK).</p>
<p>Example: RGB (255, 128, 64) → C = 255 − 255 = 0, M = 255 − 128 = 127, Y = 255 − 64 = 191 → <b>CMY (0, 127, 191)</b> (normalised (0, 0.5, 0.75)).</p>
<h3>3. HSI model</h3><p><b>Hue</b> = dominant colour (angle 0°–360°), <b>Saturation</b> = purity (amount of white mixed), <b>Intensity</b> = brightness. It decouples intensity from colour, matching human description; ideal for enhancement (change I without changing colour) and segmentation by hue.</p>
<p><b>RGB → HSI</b> (R, G, B normalised to [0,1]):</p><ul>
<li><b>I = (R + G + B) / 3</b></li>
<li><b>S = 1 − [3 / (R + G + B)] · min(R, G, B)</b></li>
<li><b>θ = cos⁻¹ { ½[(R − G) + (R − B)] / [(R − G)² + (R − B)(G − B)]<sup>½</sup> }</b></li>
<li><b>H = θ if B ≤ G; H = 360° − θ if B &gt; G</b></li></ul>
<p>Example (255,128,64) → (1, 0.502, 0.251): I = 0.584, S = 1 − 3(0.251)/1.753 = 0.57, θ ≈ 19.2°, B ≤ G so H ≈ 19° (orange).</p>
<table class="tbl"><tr><th>Model</th><th>Type</th><th>Best for</th></tr><tr><td>RGB</td><td>Additive</td><td>Capture, display</td></tr><tr><td>CMY/CMYK</td><td>Subtractive</td><td>Printing</td></tr><tr><td>HSI</td><td>Perceptual</td><td>Processing, segmentation</td></tr></table>
<h3>4. Pseudocolour image processing</h3><p>Assigning colours to gray levels of a monochrome image according to a rule. The colours are artificial; the aim is visibility (the eye distinguishes only ~two dozen gray shades but thousands of colours).</p><ul>
<li><b>Intensity (density) slicing</b>: view the image as a 3-D surface, cut with planes at chosen gray levels; each slab gets a colour (e.g. 0–63 blue, 64–127 green, 128–191 yellow, 192–255 red).</li>
<li><b>Gray-level to colour transformation</b>: three independent functions f<sub>R</sub>(r), f<sub>G</sub>(r), f<sub>B</sub>(r) feed the R, G, B channels.</li></ul>
<p><b>Application (medical imaging)</b>: X-ray, CT, MRI, PET are grayscale; pseudocolour highlights tumours/lesions, bone density, blood flow and PET hot spots, separates tissues → faster, clearer diagnosis. Also thermal imaging, weather radar (rainfall), X-ray baggage scanning. Caution: adds no information; a bad colour map can mislead.</p>`,
  dg: [
    { h: 'Additive (light) vs subtractive (ink)' },
    { grid: [
      { cap: 'RGB cube corners', matrix: [['Black', '(0,0,0)'], ['Red', '(1,0,0)'], ['Green', '(0,1,0)'], ['Blue', '(0,0,1)'], ['Cyan', '(0,1,1)'], ['Magenta', '(1,0,1)'], ['Yellow', '(1,1,0)'], ['White', '(1,1,1)']] },
      { cap: 'RGB → CMY = 1 − RGB', flow: [{ t: 'RGB (255,128,64)', tone: 'a' }, { t: 'CMY (0,127,191)', s: '255 − each', tone: 'u1' }], labels: ['1 −'], col: true }
    ] },
    { h: 'RGB → HSI' },
    { flow: [{ t: 'I = (R+G+B)/3', s: '0.58', tone: 'u1' }, { t: 'S = 1 − 3·min/(R+G+B)', s: '0.57', tone: 'u2' }, { t: 'θ = cos⁻¹(…)', s: '19.2°', tone: 'u3' }, { t: 'H = θ (B ≤ G)', s: '≈ 19° orange', tone: 'a' }], labels: ['', '', ''] },
    { h: 'Pseudocolour by intensity slicing' },
    { bars: [64, 64, 64, 64], labels: ['0–63', '64–127', '128–191', '192–255'], cap: 'Each gray range gets one false colour (e.g. blue, green, yellow, red) → tumours / hot spots stand out', tone: 'u1' }
  ],
  quiz: [
    { q: 'RGB (255, 0, 255) in CMY is', o: ['(0, 255, 0)', '(255, 0, 255)', '(0, 0, 0)', '(255, 255, 0)'], a: 0, why: 'C = 0, M = 255, Y = 0.' },
    { q: 'In HSI, intensity I equals', o: ['max(R,G,B)', '(R+G+B)/3', 'R·G·B', '1 − S'], a: 1, why: 'Average of the three channels.' },
    { q: 'Pseudocolour processing', o: ['Recovers the true colour', 'Assigns false colours to gray levels', 'Compresses colour images', 'Removes noise'], a: 1, why: 'For visibility, not true colour.' }
  ],
  rev: ['RGB additive cube; grays on diagonal; 24-bit = 16,777,216 colours', '<b>CMY = 1 − RGB</b>; K added for true black; (255,128,64) → (0,127,191)', 'HSI: <b>I = (R+G+B)/3</b>, <b>S = 1 − 3min/(R+G+B)</b>, θ = cos⁻¹{½[(R−G)+(R−B)]/√[(R−G)²+(R−B)(G−B)]}, H = θ or 360°−θ', 'HSI decouples intensity → enhance without colour shift, segment by hue', 'Pseudocolour: intensity slicing or f_R, f_G, f_B; medical, thermal, radar'],
  trick: '<b>HSI = "Hue Says Identity, Saturation Says Intensity of colour, Intensity Says brightness"</b>. CMY = "1 minus".',
  easy: {
    en: { s: 'RGB mixes light, CMY mixes ink, HSI describes colour like humans do; pseudocolour paints grays to make them readable.', story: 'A paint shop: RGB is stage lighting (add lights to get white), CMY is mixing paints (mix all to get dark), HSI is how you ask: "a bright, deep orange".', words: [['Additive', 'Adding light → white.'], ['Subtractive', 'Adding ink → black.'], ['Hue', 'Which colour (angle).'], ['Saturation', 'How pure (no white).']], how: ['Normalise R, G, B to 0–1.', 'I = average.', 'S from the minimum.', 'θ from the cos⁻¹ formula; check B ≤ G for H.'], exam: 'Three models with uses, CMY formula + example, full RGB→HSI formulas with example, pseudocolour methods + medical application.', yaad: 'CMY = 1 − RGB; I = average; S = 1 − 3min/sum.' },
    bhai: { s: 'RGB roshni milata hai, CMY syaahi, HSI insaan ki tarah colour batata hai. Pseudocolour grays ko rang deta hai.', story: 'Paint shop: RGB stage lights (sab jodo, safed), CMY paint milana (sab milao, kaala), HSI jaise tum maangte ho "chamakdaar gehra orange".', words: [['Additive', 'Light jodo → safed.'], ['Subtractive', 'Ink jodo → kaala.'], ['Hue', 'Kaunsa rang (angle).'], ['Saturation', 'Kitna shuddh.']], how: ['R, G, B ko 0–1 karo.', 'I = average.', 'S minimum se.', 'θ formula, B ≤ G check karke H.'], exam: 'Teeno models, CMY example, HSI formulas example ke saath, pseudocolour + medical.', yaad: 'CMY = 1 − RGB; I = average; S = 1 − 3min/sum.' },
    gaali: { s: 'RGB roshni milata, CMY syaahi, HSI insaano jaisa bolta hai. Pseudocolour grays pe nakli rang. Teri insta photos jaisa nakli, bc.', story: 'Stage lights jodo toh safed (RGB), paint milao toh kaala keechad (CMY). HSI = "chamkila gehra orange", jaise tu dukaan pe maangta hai, chutiye.', words: [['Additive', 'Light jod, safed.'], ['Subtractive', 'Ink jod, kaala.'], ['Hue', 'Rang ka angle.'], ['Saturation', 'Kitna shuddh. Tere jaisa milawati nahi.']], how: ['0–1 kar.', 'I = average.', 'S = 1 − 3min/sum.', 'θ nikaal, B ≤ G dekh. Ho gaya, gadhe.'], exam: 'Teeno model, CMY example, HSI formula + example, pseudocolour medical. θ ka formula galat toh marks gaye, harami.', yaad: 'CMY = 1 − RGB. I = average. Ratt le, kamine.' }
  }
},
{
  id: 'd2-wavelet', unit: 2, title: 'Wavelets & Multiresolution Expansions', marks: '5', mins: 15, imp: true,
  q: 'Explain multiresolution expansions and the wavelet transform. How is a wavelet different from a Fourier basis? <i>(IQ Q17 · 5M)</i>',
  simple: `<p>Images have big shapes and tiny details. <b>Multiresolution</b> looks at the image at many zoom levels at once, like Google Maps: zoomed out = city (approximation), zoomed in = streets (details).</p>
<ul><li><b>Scaling function φ</b> builds the coarse approximation; <b>wavelet ψ</b> adds the details. V<sub>j+1</sub> = V<sub>j</sub> ⊕ W<sub>j</sub>.</li>
<li>Fourier sines last forever (know <i>what</i> frequency, not <i>where</i>); wavelets are short (know both).</li></ul>`,
  learn: [
    { title: 'Series expansion', body: `<p>f(x) = Σ<sub>k</sub> α<sub>k</sub> φ<sub>k</sub>(x): a signal as a weighted sum of basis functions.</p>` },
    { title: 'Scaling function', body: `<p>φ<sub>j,k</sub>(x) = 2<sup>j/2</sup> φ(2<sup>j</sup>x − k). j = scale, k = shift. They span the approximation space V<sub>j</sub>; nested: V<sub>j</sub> ⊂ V<sub>j+1</sub>.</p>` },
    { title: 'Wavelet function', body: `<p>ψ<sub>j,k</sub>(x) = 2<sup>j/2</sup> ψ(2<sup>j</sup>x − k) spans the detail space W<sub>j</sub>. <b>V<sub>j+1</sub> = V<sub>j</sub> ⊕ W<sub>j</sub></b>.</p>` },
    { title: 'Haar', body: `<p>φ(x) = 1 on [0,1); ψ(x) = +1 on [0, ½), −1 on [½, 1). [4,6,10,12] → [8, −3, −1, −1].</p>` },
    { title: '2-D DWT', body: `<p>Filter rows and columns → LL (approximation), LH, HL, HH (details). Next level splits LL again. Used in JPEG 2000, denoising, edge detection.</p>` }
  ],
  short: `<p><b>Multiresolution analysis</b> represents a signal at several resolutions: f(x) = Σ<sub>k</sub> c<sub>j0</sub>(k)φ<sub>j0,k</sub>(x) + Σ<sub>j≥j0</sub> Σ<sub>k</sub> d<sub>j</sub>(k)ψ<sub>j,k</sub>(x), with scaling functions φ<sub>j,k</sub> = 2<sup>j/2</sup>φ(2<sup>j</sup>x−k) (approximation V<sub>j</sub>) and wavelets ψ<sub>j,k</sub> (details W<sub>j</sub>), V<sub>j+1</sub> = V<sub>j</sub> ⊕ W<sub>j</sub>. Unlike infinite-duration Fourier sinusoids, wavelets are small, localised waves, giving both frequency and position (time–frequency localisation).</p>`,
  answer: `<h3>Background</h3><p>Objects appear at different sizes; small objects need high resolution, large ones only coarse. <b>Multiresolution</b> analysis studies the image at many scales simultaneously (image pyramids, subband coding).</p>
<h3>Multiresolution expansions</h3><ul>
<li><b>Series expansion</b>: f(x) = Σ<sub>k</sub> α<sub>k</sub> φ<sub>k</sub>(x).</li>
<li><b>Scaling functions</b>: φ<sub>j,k</sub>(x) = 2<sup>j/2</sup> φ(2<sup>j</sup>x − k) (j: scale/width, k: position). They span subspace V<sub>j</sub>; spaces are nested: V<sub>−∞</sub> ⊂ … ⊂ V<sub>0</sub> ⊂ V<sub>1</sub> ⊂ … ⊂ V<sub>∞</sub> = L²(R).</li>
<li><b>Wavelet functions</b>: ψ<sub>j,k</sub>(x) = 2<sup>j/2</sup> ψ(2<sup>j</sup>x − k) span W<sub>j</sub>, the <b>difference</b> between adjacent scaling spaces: <b>V<sub>j+1</sub> = V<sub>j</sub> ⊕ W<sub>j</sub></b>.</li>
<li><b>Wavelet series</b>: f(x) = Σ<sub>k</sub> c<sub>j0</sub>(k) φ<sub>j0,k</sub>(x) + Σ<sub>j=j0</sub><sup>∞</sup> Σ<sub>k</sub> d<sub>j</sub>(k) ψ<sub>j,k</sub>(x): approximation + details at every finer scale.</li></ul>
<p><b>Haar example</b>: φ = 1 on [0,1), ψ = +1 on [0,½), −1 on [½,1). Signal [4, 6, 10, 12]: averages (5, 11), details (−1, −1); next level average 8, detail −3 → <b>[8, −3, −1, −1]</b> (perfectly invertible).</p>
<h3>2-D wavelet transform</h3><p>Apply 1-D low-pass/high-pass filtering and downsampling to rows then columns → four subbands: <b>LL</b> (approximation), <b>LH</b> (horizontal edges), <b>HL</b> (vertical edges), <b>HH</b> (diagonal). Level 2 splits LL again. Uses: JPEG 2000, denoising (threshold small detail coefficients), edge detection, pyramids.</p>
<h3>Wavelet vs Fourier basis</h3><table class="tbl"><tr><th></th><th>Fourier</th><th>Wavelet</th></tr>
<tr><td>Basis</td><td>Sines/cosines of infinite duration</td><td>Small waves of finite duration, scaled & shifted</td></tr>
<tr><td>Localisation</td><td>Frequency only (not where)</td><td>Both frequency (scale) and position</td></tr>
<tr><td>Resolution</td><td>Single</td><td>Multiresolution</td></tr>
<tr><td>Transients/edges</td><td>Spread over all coefficients</td><td>Captured by a few coefficients</td></tr>
<tr><td>Use</td><td>Stationary signals, filtering</td><td>Non-stationary signals, compression (JPEG 2000)</td></tr></table>`,
  dg: [
    { h: 'Nested spaces: Vⱼ₊₁ = Vⱼ ⊕ Wⱼ' },
    { t: 'V₂ (fine)', tone: 'u1', kids: [{ t: 'V₁', tone: 'u2', kids: [{ t: 'V₀ (coarse)', s: 'scaling φ', tone: 'ok' }, { t: 'W₀', s: 'wavelet ψ details', tone: 'a' }] }, { t: 'W₁', s: 'finer details', tone: 'a' }] },
    { h: 'Haar: [4, 6, 10, 12]' },
    { flow: [{ t: '[4, 6, 10, 12]', tone: 'u1' }, { t: 'avg (5, 11) | det (−1, −1)' }, { t: 'avg 8 | det −3' }, { t: '[8, −3, −1, −1]', tone: 'ok' }], labels: ['level 1', 'level 2', ''] },
    { h: '2-D DWT subbands' },
    { grid: [
      { cap: 'Level 1', matrix: [['LL', 'HL'], ['LH', 'HH']] },
      { cap: 'Level 2 (split LL again)', matrix: [['LL₂', 'HL₂', 'HL₁', 'HL₁'], ['LH₂', 'HH₂', 'HL₁', 'HL₁'], ['LH₁', 'LH₁', 'HH₁', 'HH₁'], ['LH₁', 'LH₁', 'HH₁', 'HH₁']], hl: ['0,0'] }
    ] },
    { grid: [{ t: 'Fourier', s: 'infinite waves · what frequency', tone: 'u1' }, { t: 'Wavelet', s: 'short waves · what AND where', tone: 'ok' }] }
  ],
  quiz: [
    { q: 'Vⱼ₊₁ equals', o: ['Vⱼ ∩ Wⱼ', 'Vⱼ ⊕ Wⱼ', 'Wⱼ only', 'Vⱼ − Wⱼ'], a: 1, why: 'Finer approximation = coarse approximation + details.' },
    { q: 'The key advantage of wavelets over Fourier is', o: ['Faster sine computation', 'Localisation in both position and frequency', 'Complex output', 'No inverse needed'], a: 1, why: 'Wavelets are finite-duration.' },
    { q: 'Full Haar of [2, 4, 6, 8] is', o: ['[5, −2, −1, −1]', '[5, 2, 1, 1]', '[20, 0, 0, 0]', '[3, 7, 1, 1]'], a: 0, why: 'Averages (3, 7), details (−1, −1); then 5 and −2.' }
  ],
  rev: ['Multiresolution = analyse at many scales (Google Maps zoom)', 'φⱼ,ₖ = 2^(j/2)φ(2ʲx − k) → approximation Vⱼ; ψⱼ,ₖ → details Wⱼ', '<b>Vⱼ₊₁ = Vⱼ ⊕ Wⱼ</b>; f = approximation + Σ details', 'Haar [4,6,10,12] → [8, −3, −1, −1]; 2-D: LL, LH, HL, HH', 'Fourier: infinite sinusoids, frequency only; wavelet: finite, frequency + location'],
  trick: '<b>φ = photo (approximation), ψ = sharpen-pass (details)</b>. Fourier knows WHAT, wavelet knows WHAT + WHERE.',
  easy: {
    en: { s: 'Wavelets describe an image at many zoom levels: a rough version plus the details to add at each level.', story: 'Google Maps: zoomed out you see the city outline; each zoom-in adds streets, then buildings. Wavelet = those layers of detail.', words: [['Scaling function φ', 'Builds the rough version.'], ['Wavelet ψ', 'Adds details.'], ['Multiresolution', 'Many zoom levels.'], ['LL/LH/HL/HH', '2-D subbands.']], how: ['Average pairs → rough version.', 'Differences → details.', 'Repeat on the rough version.', 'Rebuild by adding details back.'], exam: 'Background, expansion formulas with φ and ψ, Vⱼ₊₁ = Vⱼ ⊕ Wⱼ, Haar example, subband picture, Fourier vs wavelet table.', yaad: 'Fourier = what. Wavelet = what + where.' },
    bhai: { s: 'Wavelet image ko kai zoom levels pe dekhta hai: ek rough version + har level ki details.', story: 'Google Maps: door se shahar, zoom karo toh sadkein, aur zoom toh buildings. Wavelet = wahi detail ki layers.', words: [['φ', 'Rough version banata hai.'], ['ψ', 'Details jodta hai.'], ['Multiresolution', 'Kai zoom levels.'], ['LL/LH/HL/HH', '2-D subbands.']], how: ['Pairs ka average → rough.', 'Difference → details.', 'Rough pe phir se.', 'Details jod ke wapas banao.'], exam: 'Background, φ ψ formulas, Vⱼ₊₁ = Vⱼ ⊕ Wⱼ, Haar example, subbands, Fourier vs wavelet table.', yaad: 'Fourier = kya. Wavelet = kya + kahan.' },
    gaali: { s: 'Wavelet image ko alag-alag zoom pe dekhta hai: ek rough version aur details. Tera future rough version hi hai, bc.', story: 'Google Maps pe door se shahar, zoom kar toh sadak, aur zoom toh tera ghar jahan tu so raha hai bajaye padhne ke, chutiye.', words: [['φ', 'Rough version.'], ['ψ', 'Details.'], ['Multiresolution', 'Kai zoom.'], ['LL etc.', 'Subbands. LL = chhoti photo.']], how: ['Average → rough.', 'Difference → detail.', 'Phir se.', 'Jod ke wapas. Ho gaya, gadhe.'], exam: 'Formulas, Vⱼ₊₁ = Vⱼ ⊕ Wⱼ, Haar example, table. Fourier vs wavelet table chhoda toh 5 mein 2, harami.', yaad: 'Fourier = kya, wavelet = kya + kahan. Ratt le, kamine.' }
  }
},
{
  id: 'd2-morph', unit: 2, title: 'Morphology: Dilation, Erosion, Opening, Closing, Hit-or-Miss', marks: '5 / 10', mins: 25, imp: true,
  q: 'Apply dilation, erosion, opening and closing to the given binary image with the given structuring element. Explain the hit-or-miss transform for shape detection. <i>(IQ Q18 · 10M)</i>',
  simple: `<p>Morphology edits <b>shapes</b> in a binary image using a small stamp called the <b>structuring element (SE)</b>.</p>
<ul><li><b>Dilation</b> ⊕: stamp on every object pixel → object <b>grows</b>, gaps fill.</li>
<li><b>Erosion</b> ⊖: keep a pixel only if the whole stamp fits inside → object <b>shrinks</b>, specks vanish.</li>
<li><b>Opening</b> = erode then dilate → removes small spurs/dots, keeps size.</li>
<li><b>Closing</b> = dilate then erode → fills small holes/gaps, keeps size.</li>
<li><b>Hit-or-miss</b>: finds an exact pattern (object part fits A, background part fits A<sup>c</sup>).</li></ul>`,
  learn: [
    { title: 'Dilation', body: `<p>A ⊕ B = {z | (B̂)<sub>z</sub> ∩ A ≠ ∅}: z is in the output if the reflected SE placed at z touches A.</p>` },
    { title: 'Erosion', body: `<p>A ⊖ B = {z | (B)<sub>z</sub> ⊆ A}: z is kept only if the SE placed at z fits completely inside A.</p>` },
    { title: 'Opening', body: `<p>A ∘ B = (A ⊖ B) ⊕ B. Smooths contours, breaks thin links, removes protrusions and small objects.</p>` },
    { title: 'Closing', body: `<p>A • B = (A ⊕ B) ⊖ B. Fuses narrow breaks, fills small holes and gaps.</p>` },
    { title: 'Hit-or-miss', body: `<p>A ⊛ B = (A ⊖ B₁) ∩ (A<sup>c</sup> ⊖ B₂). B₁ = must-be-object, B₂ = must-be-background. Finds isolated points, corners, templates.</p>` }
  ],
  short: `<p>With structuring element B: <b>dilation</b> A ⊕ B = {z | (B̂)<sub>z</sub> ∩ A ≠ ∅} grows objects; <b>erosion</b> A ⊖ B = {z | (B)<sub>z</sub> ⊆ A} shrinks them; <b>opening</b> (A ⊖ B) ⊕ B removes small objects/protrusions; <b>closing</b> (A ⊕ B) ⊖ B fills small holes/gaps. <b>Hit-or-miss</b> A ⊛ B = (A ⊖ B₁) ∩ (A<sup>c</sup> ⊖ B₂) detects locations where a shape B₁ fits the object and B₂ fits the background.</p>`,
  answer: `<h3>Definitions (A = binary image, B = structuring element)</h3><table class="tbl"><tr><th>Operation</th><th>Definition</th><th>Effect</th></tr>
<tr><td>Dilation A ⊕ B</td><td>{z | (B̂)<sub>z</sub> ∩ A ≠ ∅}</td><td>Grows objects, fills gaps, bridges breaks</td></tr>
<tr><td>Erosion A ⊖ B</td><td>{z | (B)<sub>z</sub> ⊆ A}</td><td>Shrinks objects, removes small objects and thin lines</td></tr>
<tr><td>Opening A ∘ B</td><td>(A ⊖ B) ⊕ B</td><td>Removes spurs, small objects; smooths contour; idempotent</td></tr>
<tr><td>Closing A • B</td><td>(A ⊕ B) ⊖ B</td><td>Fills small holes, joins narrow gaps; idempotent</td></tr></table>
<p><b>Duality</b>: (A ⊖ B)<sup>c</sup> = A<sup>c</sup> ⊕ B̂; (A • B)<sup>c</sup> = A<sup>c</sup> ∘ B̂.</p>
<h3>Worked example (B = 3×3 square of 1s, origin at centre)</h3>
<pre class="mono">A (block + spur + noise dot):
. . . . . . .
. 1 1 1 . . .
. 1 1 1 1 . .     ← spur at (2,4)
. 1 1 1 . . .
. . . . . . 1     ← isolated dot at (4,6)
. . . . . . .</pre>
<p><b>Erosion A ⊖ B</b>: the 3×3 SE fits completely only when centred at (2,2) → output = single pixel (2,2). Spur and dot disappear.</p>
<pre class="mono">. . . . . . .
. . . . . . .
. . 1 . . . .
. . . . . . .
. . . . . . .
. . . . . . .</pre>
<p><b>Dilation A ⊕ B</b>: every 1 is replaced by a 3×3 block → object grows by one pixel all round; the spur widens; the dot becomes a 3×3 blob (clipped at the border).</p>
<pre class="mono">1 1 1 1 1 . .
1 1 1 1 1 1 .
1 1 1 1 1 1 .
1 1 1 1 1 1 1
1 1 1 1 1 1 1
. . . . . 1 1</pre>
<p><b>Opening (A ⊖ B) ⊕ B</b>: dilate the eroded pixel (2,2) by the 3×3 SE → exactly the 3×3 block rows 1–3, cols 1–3. <b>Spur and noise dot removed, block size kept.</b></p>
<p><b>Closing (A ⊕ B) ⊖ B</b> on an object with a hole (5×5 square with a hole in the centre): dilation fills the hole, erosion restores the outline → <b>solid 5×5 square</b> (hole filled, size kept).</p>
<h3>Hit-or-miss transform</h3><p><b>A ⊛ B = (A ⊖ B₁) ∩ (A<sup>c</sup> ⊖ B₂)</b>, B = (B₁, B₂): B₁ = pixels that must be object (hit), B₂ = pixels that must be background (miss). The output marks positions where <b>both</b> fit, i.e. the exact shape occurs.</p>
<p>Example: to find <b>isolated pixels</b>, B₁ = centre pixel, B₂ = its 8 neighbours. In the image above, only the dot at (4,6) matches (its 8 neighbours are background); pixels of the block fail because their neighbours are object. Uses: detecting isolated points, corners, end points, templates; basis of thinning and thickening.</p>
<p><b>Structuring element decomposition & strel</b>: dilation is associative, A ⊕ (B₁ ⊕ B₂) = (A ⊕ B₁) ⊕ B₂, so a 5×5 square = (1×5) ⊕ (5×1): 10 operations per pixel instead of 25. MATLAB <code>strel('square',w)</code>, <code>strel('disk',r)</code>, <code>strel('line',len,deg)</code>; <code>imdilate</code>, <code>imerode</code>, <code>imopen</code>, <code>imclose</code>.</p>`,
  dg: [
    { h: 'B = 3×3 square' },
    { grid: [
      { cap: 'A: block + spur + dot', matrix: [[0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0]], bin: true, small: true },
      { cap: 'Erosion A ⊖ B: only (2,2) survives', matrix: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]], bin: true, small: true },
      { cap: 'Dilation A ⊕ B: grows', matrix: [[1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1]], bin: true, small: true },
      { cap: 'Opening: spur & dot gone, block kept', matrix: [[0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]], bin: true, small: true }
    ] },
    { grid: [
      { cap: 'A with a hole', matrix: [[0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0], [0, 1, 1, 0, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0]], bin: true, small: true, hl: ['3,3'] },
      { cap: 'Closing A • B: hole filled, size kept', matrix: [[0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0]], bin: true, small: true, hl: ['3,3'] }
    ] },
    { h: 'Hit-or-miss: find isolated pixels' },
    { flow: [{ t: 'B₁ = centre 1', s: 'must be object', tone: 'ok' }, { t: 'B₂ = 8 neighbours 0', s: 'must be background', tone: 'bad' }, { t: '(A ⊖ B₁) ∩ (Aᶜ ⊖ B₂)', s: 'only the dot at (4,6) matches', tone: 'a' }], labels: ['∩', ''] }
  ],
  quiz: [
    { q: 'Opening is', o: ['Dilate then erode', 'Erode then dilate', 'Erode twice', 'Complement then dilate'], a: 1, why: 'A ∘ B = (A ⊖ B) ⊕ B.' },
    { q: 'Which operation fills small holes?', o: ['Erosion', 'Opening', 'Closing', 'Hit-or-miss'], a: 2, why: 'Closing = dilation then erosion.' },
    { q: 'Hit-or-miss combines', o: ['Two dilations', 'Erosion of A by B₁ and erosion of Aᶜ by B₂', 'Opening and closing', 'Mean and median'], a: 1, why: 'Object part must hit, background part must miss.' }
  ],
  rev: ['<b>Dilation</b> {z | (B̂)z ∩ A ≠ ∅}: grow; <b>erosion</b> {z | (B)z ⊆ A}: shrink', '<b>Opening</b> = erode → dilate: removes spurs, dots, keeps size', '<b>Closing</b> = dilate → erode: fills holes, gaps', 'Hit-or-miss: <b>(A ⊖ B₁) ∩ (Aᶜ ⊖ B₂)</b>; isolated pixels, corners', 'Decomposition: 5×5 = (1×5) ⊕ (5×1); strel(\'square\'/\'disk\'/\'line\')'],
  trick: '<b>OPEN = "Out Pops Extra Noise"</b> (erode first). <b>CLOSE = "Cover Little Openings"</b> (dilate first).',
  easy: {
    en: { s: 'Morphology grows, shrinks and cleans shapes using a small stamp called a structuring element.', story: 'A cookie-cutter stamp over dough: press everywhere there is dough and you get a fatter shape (dilation); keep only spots where the whole cutter fits and you get a thinner shape (erosion).', words: [['SE', 'The small stamp shape.'], ['Dilation', 'Grow.'], ['Erosion', 'Shrink.'], ['Opening/closing', 'Shrink-grow / grow-shrink.']], how: ['Erosion: slide SE, keep z if it fits fully.', 'Dilation: slide SE, mark z if it touches.', 'Opening: erosion then dilation.', 'Closing: dilation then erosion.', 'Hit-or-miss: fit object part and background part.'], exam: 'Definitions table, all four grids drawn step by step, closing hole example, hit-or-miss formula with isolated-pixel example, decomposition note.', yaad: 'OPEN = Out Pops Extra Noise; CLOSE = Cover Little Openings.' },
    bhai: { s: 'Morphology ek chhote stamp (structuring element) se shapes ko mota, patla aur saaf karta hai.', story: 'Aate pe cookie cutter: jahan aata hai wahan dabao toh shape moti (dilation). Sirf wahan rakho jahan poora cutter fit ho toh patli (erosion).', words: [['SE', 'Chhota stamp.'], ['Dilation', 'Mota karna.'], ['Erosion', 'Patla karna.'], ['Opening/closing', 'Patla-mota / mota-patla.']], how: ['Erosion: SE poora fit ho toh rakho.', 'Dilation: chhoo jaaye toh mark.', 'Opening: erosion phir dilation.', 'Closing: dilation phir erosion.', 'Hit-or-miss: object aur background dono fit.'], exam: 'Table, chaaron grid step by step, closing ka hole example, hit-or-miss formula + example.', yaad: 'OPEN = noise bahar, CLOSE = chhed band.' },
    gaali: { s: 'Morphology ek chhote stamp se shapes ko mota-patla karta hai. Tera pet bhi dilation ka example hai, bc.', story: 'Aate pe cutter: jahan aata wahan daba toh moti shape (dilation), sirf jahan poora fit ho toh patli (erosion). Simple hai chutiye, roti bhi aise hi banti hai.', words: [['SE', 'Stamp.'], ['Dilation', 'Mota.'], ['Erosion', 'Patla.'], ['Opening/closing', 'Order yaad rakh, ulta kiya toh gaya.']], how: ['Erosion: poora fit.', 'Dilation: chhoo gaya.', 'Opening: patla phir mota.', 'Closing: mota phir patla.', 'Hit-or-miss: dono fit. Ho gaya, gadhe.'], exam: 'Table, chaaron grid, hole example, hit-or-miss. Grid nahi banaya toh 10 mein 3, harami. Order ulta likha toh 0.', yaad: 'OPEN = noise bahar, CLOSE = chhed band. Ratt le, bhosdike.' }
  }
}
];

const cards = [
  [2, 'Degradation model?', 'g = h * f + η; G = HF + N.'],
  [2, 'Gaussian noise PDF?', '[1/(√2πσ)] e^(−(z−μ)²/2σ²).'],
  [2, 'Rayleigh PDF?', '(2/b)(z−a)e^(−(z−a)²/b), z ≥ a.'],
  [2, 'Best filter for salt & pepper?', 'Median.'],
  [2, 'Contraharmonic Q > 0 removes?', 'Pepper noise (Q < 0 removes salt).'],
  [2, 'Inverse filter with noise gives?', 'F + N/H → noise blows up where H small.'],
  [2, 'Wiener filter formula?', 'H*/(|H|² + Sη/Sf) · G.'],
  [2, 'CLS filter formula?', 'H*/(|H|² + γ|P|²) · G, P = DFT(Laplacian).'],
  [2, 'CLS advantage over Wiener?', 'Needs only noise mean & variance, not spectra.'],
  [2, 'RGB → CMY?', 'C = 1−R, M = 1−G, Y = 1−B.'],
  [2, 'HSI intensity?', 'I = (R+G+B)/3.'],
  [2, 'HSI saturation?', 'S = 1 − 3·min(R,G,B)/(R+G+B).'],
  [2, 'Pseudocolour?', 'False colours assigned to gray levels for visibility.'],
  [2, 'Vⱼ₊₁ in terms of Vⱼ?', 'Vⱼ ⊕ Wⱼ (approximation + details).'],
  [2, 'Wavelet vs Fourier?', 'Wavelet: finite, localised in position and frequency.'],
  [2, 'Opening?', '(A ⊖ B) ⊕ B: removes small objects/spurs.'],
  [2, 'Closing?', '(A ⊕ B) ⊖ B: fills small holes/gaps.'],
  [2, 'Hit-or-miss?', '(A ⊖ B₁) ∩ (Aᶜ ⊖ B₂).']
];

export default { topics, cards };
