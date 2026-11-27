// DIP Unit 3 · Compression & Segmentation (CO3).

const topics = [
{
  id: 'd3-basics', unit: 3, title: 'Compression Basics: Redundancy, Fidelity, Encoder–Decoder Model', marks: '2 / 5', mins: 15, imp: true,
  q: 'Explain coding, interpixel and psychovisual redundancy. Explain fidelity criteria and the image compression model (source encoder and decoder). <i>(IQ Q19 part · syllabus)</i>',
  simple: `<p>Compression = store the same picture with fewer bits by removing <b>redundancy</b> (data that adds no information).</p>
<ul><li><b>Coding</b> redundancy: same bits for common and rare values → fix with Huffman.</li>
<li><b>Interpixel</b> redundancy: neighbours look alike → fix with prediction, run-length, transforms.</li>
<li><b>Psychovisual</b> redundancy: details the eye ignores → fix with quantization (lossy).</li></ul>
<p>CR = n₁/n₂. Quality is checked with <b>fidelity criteria</b> (RMS, PSNR, or human rating).</p>`,
  learn: [
    { title: 'Ratio', body: `<p>CR = n₁/n₂; R<sub>D</sub> = 1 − 1/CR. 10 MB → 2 MB: CR = 5:1, R<sub>D</sub> = 0.8 (80% redundant).</p>` },
    { title: 'Three redundancies', body: `<p>Coding (fixed-length codes waste bits) · Interpixel (100,100,100,101 → 100 then 0,0,1) · Psychovisual (256 → 64 levels unnoticed).</p>` },
    { title: 'Entropy', body: `<p>H = −Σ p<sub>k</sub> log₂ p<sub>k</sub> bits/pixel: the minimum average bits for lossless coding.</p>` },
    { title: 'Fidelity', body: `<p>Objective: e<sub>rms</sub> = [(1/MN)ΣΣ(f̂ − f)²]<sup>½</sup>, MSE, PSNR = 10 log₁₀[(L−1)²/MSE]. MSE 25 → PSNR ≈ 34.15 dB. Subjective: Excellent … Unusable.</p>` },
    { title: 'Model', body: `<p>Encoder: <b>mapper</b> (interpixel, reversible) → <b>quantizer</b> (psychovisual, irreversible, only lossy) → <b>symbol encoder</b> (coding) → channel encoder. Decoder reverses: channel decoder → symbol decoder → inverse mapper.</p>` }
  ],
  short: `<p>Compression removes redundancy: <b>coding</b> (inefficient code lengths; removed by variable-length codes), <b>interpixel</b> (correlation between neighbouring pixels; removed by prediction, run-length, transforms), <b>psychovisual</b> (information the eye ignores; removed by quantization). CR = n₁/n₂, R<sub>D</sub> = 1 − 1/CR. Fidelity: objective (e<sub>rms</sub>, MSE, PSNR) and subjective ratings. Model: source encoder (mapper → quantizer → symbol encoder) + channel encoder; decoder reverses (no inverse quantizer).</p>`,
  answer: `<h3>Why compress</h3><p>A 1024×1024, 8-bit image ≈ 1 MB; colour ≈ 3 MB; video needs 25–30 frames/s. Compression reduces storage and transmission cost. <b>CR = n₁/n₂</b>, <b>R<sub>D</sub> = 1 − 1/CR</b> (10 MB → 2 MB: CR = 5:1, R<sub>D</sub> = 0.8).</p>
<h3>Redundancies and removal</h3><table class="tbl"><tr><th>Redundancy</th><th>Meaning</th><th>Example</th><th>Removed by</th></tr>
<tr><td>Coding</td><td>Same number of bits for every gray level although probabilities differ</td><td>Common level gets 8 bits like a rare one</td><td>Variable-length codes: Huffman, arithmetic</td></tr>
<tr><td>Interpixel (spatial/temporal)</td><td>Neighbouring pixels/frames are highly correlated, so values are predictable</td><td>100,100,100,101 → 100 then 0,0,1</td><td>Predictive coding, run-length, transforms (mapper)</td></tr>
<tr><td>Psychovisual</td><td>Information the eye does not notice</td><td>256 → 64 gray levels unnoticed</td><td>Quantization (lossy)</td></tr></table>
<p><b>Entropy</b> H = −Σ p<sub>k</sub> log₂ p<sub>k</sub> bits/pixel = lower bound for lossless coding.</p>
<h3>Fidelity criteria</h3><ul>
<li><b>Objective</b>: error e(x,y) = f̂ − f; <b>e<sub>rms</sub> = [(1/MN)ΣΣ(f̂ − f)²]<sup>½</sup></b>; MSE; <b>PSNR = 10 log₁₀[(L−1)²/MSE] dB</b> (8-bit, MSE = 25 → PSNR = 10 log₁₀(2601) ≈ 34.15 dB).</li>
<li><b>Subjective</b>: viewers rate Excellent, Fine, Passable, Marginal, Inferior, Unusable. Objective measures are easy but may not match perception.</li></ul>
<h3>Image compression model</h3><p><b>Source encoder</b>: <b>Mapper</b> transforms data to reduce interpixel redundancy (differences, transform coefficients, run lengths; reversible) → <b>Quantizer</b> reduces accuracy to remove psychovisual redundancy (irreversible; omitted for lossless) → <b>Symbol encoder</b> assigns variable-length codes (coding redundancy). <b>Channel encoder</b> adds controlled redundancy (e.g. Hamming code) to fight channel errors.</p>
<p><b>Decoder</b>: channel decoder → symbol decoder → inverse mapper → f̂(x,y). There is no inverse quantizer (quantization cannot be undone).</p>`,
  dg: [
    { h: 'Three redundancies → three blocks' },
    { grid: [{ t: 'Coding', s: '→ symbol encoder (Huffman)', tone: 'u1' }, { t: 'Interpixel', s: '→ mapper (prediction, RLE, DCT)', tone: 'u2' }, { t: 'Psychovisual', s: '→ quantizer (lossy)', tone: 'a' }] },
    { h: 'Compression model' },
    { flow: [{ t: 'f(x, y)', tone: 'u1' }, { t: 'Mapper', s: 'reversible' }, { t: 'Quantizer', s: 'only lossy step', tone: 'bad' }, { t: 'Symbol encoder', s: 'VLC' }, { t: 'Channel encoder', s: '+ Hamming' }], labels: ['', '', '', ''] },
    { flow: [{ t: 'Channel decoder' }, { t: 'Symbol decoder' }, { t: 'Inverse mapper' }, { t: 'f̂(x, y)', tone: 'ok' }], labels: ['', '', ''] },
    { note: 'No inverse quantizer: what the quantizer throws away is gone. Lossless coding skips the quantizer.' },
    { h: 'Fidelity' },
    { flow: [{ t: 'MSE = 25', s: '8-bit, L−1 = 255' }, { t: 'PSNR = 10 log₁₀(255²/25)', s: '≈ 34.15 dB', tone: 'ok' }], labels: ['→'] }
  ],
  quiz: [
    { q: 'Which block of the encoder removes psychovisual redundancy?', o: ['Mapper', 'Quantizer', 'Symbol encoder', 'Channel encoder'], a: 1, why: 'Quantization drops detail the eye ignores (irreversible).' },
    { q: '10 MB compressed to 2 MB gives Rᴅ =', o: ['0.2', '0.5', '0.8', '5'], a: 2, why: 'CR = 5, Rᴅ = 1 − 1/5 = 0.8.' },
    { q: 'Higher PSNR means', o: ['Worse quality', 'Better quality', 'More compression', 'More noise'], a: 1, why: 'Less error relative to the peak signal.' }
  ],
  rev: ['CR = n₁/n₂; <b>Rᴅ = 1 − 1/CR</b>', 'Coding (VLC) · Interpixel (prediction/RLE/transform) · Psychovisual (quantization)', 'Entropy H = −Σ p log₂ p = lossless lower bound', 'e_rms, MSE, <b>PSNR = 10 log₁₀((L−1)²/MSE)</b>; subjective scale', 'Mapper → quantizer (lossy only) → symbol encoder → channel encoder; decoder has no inverse quantizer'],
  trick: '<b>"C-I-P"</b>: Coding → Code it shorter, Interpixel → Predict it, Psychovisual → Pretend you didn\'t see it.',
  easy: {
    en: { s: 'Compression throws away repetition (redundancy) so the same picture needs fewer bits.', story: 'Writing "same as above" in a register instead of rewriting a row (interpixel), using short nicknames for frequent names (coding), and skipping decimals nobody reads (psychovisual).', words: [['CR', 'Original size ÷ compressed size.'], ['Redundancy', 'Repeated / useless data.'], ['PSNR', 'Quality score in dB, higher is better.'], ['Quantizer', 'The only lossy block.']], how: ['Mapper removes interpixel repetition.', 'Quantizer drops invisible detail.', 'Symbol encoder gives short codes to common values.', 'Decoder reverses (except quantizer).'], exam: 'CR & Rᴅ with example, redundancy table, entropy, fidelity formulas with PSNR example, labelled block diagram.', yaad: 'C-I-P: Code shorter, Predict, Pretend.' },
    bhai: { s: 'Compression repetition hata deta hai taaki same photo kam bits mein aa jaaye.', story: 'Register mein "upar jaisa" likhna (interpixel), common naamon ke short nickname (coding), aur woh decimals chhod dena jo koi padhta nahi (psychovisual).', words: [['CR', 'Original ÷ compressed.'], ['Redundancy', 'Faltu repeat data.'], ['PSNR', 'Quality dB mein, zyada achha.'], ['Quantizer', 'Akela lossy block.']], how: ['Mapper repeat hatata.', 'Quantizer invisible detail hatata.', 'Symbol encoder short codes deta.', 'Decoder ulta karta (quantizer chhod ke).'], exam: 'CR, Rᴅ example, redundancy table, entropy, PSNR example, block diagram.', yaad: 'C-I-P.' },
    gaali: { s: 'Compression faltu repeat data phenk deta hai. Tere WhatsApp forwards pe bhi laga do, bc.', story: 'Register mein "upar jaisa" likh (interpixel), "Bholu" jaise chhote naam (coding), aur woh decimals jo koi chutiya nahi padhta, chhod de (psychovisual).', words: [['CR', 'Original ÷ compressed.'], ['Redundancy', 'Kachra data.'], ['PSNR', 'Quality, zyada = achha.'], ['Quantizer', 'Akela lossy. Jo gaya wo gaya, tere ex jaisa.']], how: ['Mapper.', 'Quantizer.', 'Symbol encoder.', 'Decoder ulta. Ho gaya, gadhe.'], exam: 'CR, table, PSNR example, block diagram. Diagram mein quantizer ko lossy nahi bola toh marks gaye, harami.', yaad: 'C-I-P. Ratt le, kamine.' }
  }
},
{
  id: 'd3-huffman', unit: 3, title: 'Huffman Coding: Average Length, Entropy, Efficiency', marks: '5 / 10', mins: 25, imp: true,
  q: 'Explain coding, interpixel and psychovisual redundancy. For the given symbol probabilities, build the Huffman code and calculate average length, entropy, efficiency and compression ratio. Suggest a better scheme if efficiency is low. <i>(IQ Q19 · 10M)</i>',
  simple: `<p>Huffman gives <b>short codes to frequent symbols</b> and long codes to rare ones. Build it bottom-up:</p>
<ol><li>Sort probabilities.</li><li>Merge the <b>two smallest</b> into one node.</li><li>Repeat until one node (1.0) remains.</li><li>Label branches 0/1 and read codes from the root.</li></ol>
<p>Then L<sub>avg</sub> = Σ p·l, H = −Σ p log₂ p, efficiency η = H/L<sub>avg</sub>, CR = fixed bits / L<sub>avg</sub>.</p>`,
  learn: [
    { title: 'Probabilities', body: `<p>a1 0.4, a2 0.3, a3 0.1, a4 0.1, a5 0.06, a6 0.04.</p>` },
    { title: 'Merge', body: `<p>0.04+0.06 = 0.1 → 0.1+0.1 = 0.2 → 0.1+0.2 = 0.3 → 0.3+0.3 = 0.6 → 0.4+0.6 = 1.0.</p>` },
    { title: 'Codes', body: `<p>a1 0 · a2 10 · a3 110 · a4 1110 · a5 11110 · a6 11111 (prefix-free).</p>` },
    { title: 'Numbers', body: `<p>L<sub>avg</sub> = 0.4(1)+0.3(2)+0.1(3)+0.1(4)+0.06(5)+0.04(5) = <b>2.2 bits</b>. H ≈ <b>2.14</b>. η = 2.14/2.2 = <b>97.4%</b>. CR = 3/2.2 ≈ <b>1.36</b>.</p>` },
    { title: 'If η is low', body: `<p>Use <b>arithmetic coding</b> (no whole-bit-per-symbol limit) or <b>extended Huffman</b> (code pairs/blocks of symbols), or remove interpixel redundancy first (predictive/RLE).</p>` }
  ],
  short: `<p>Huffman coding: repeatedly combine the two least probable symbols, then assign 0/1 down the tree; produces an optimal prefix code for symbol-by-symbol coding. For p = {0.4, 0.3, 0.1, 0.1, 0.06, 0.04}: codes 0, 10, 110, 1110, 11110, 11111; L<sub>avg</sub> = 2.2 bits/symbol, H = 2.14 bits, η = 97.4%, redundancy 2.6%, CR vs 3-bit fixed code = 1.36. If efficiency is low (e.g. very skewed probabilities), use arithmetic coding or extended (block) Huffman.</p>`,
  answer: `<h3>Redundancies (brief)</h3><p><b>Coding</b>: fixed-length codes ignore probabilities. <b>Interpixel</b>: neighbouring pixels are correlated. <b>Psychovisual</b>: eye ignores some detail. Huffman removes <b>coding redundancy</b>.</p>
<h3>Huffman procedure</h3><ol><li>Arrange symbols in decreasing probability.</li><li>Combine the two lowest probabilities into a new node; re-sort.</li><li>Repeat until a single node of probability 1.</li><li>Assign 0 and 1 to the two branches at each merge; code = path from the root.</li></ol>
<h3>Numerical: p = a1 0.4, a2 0.3, a3 0.1, a4 0.1, a5 0.06, a6 0.04</h3>
<table class="tbl"><tr><th>Merge</th><th>Combined</th><th>New p</th><th>List after merge</th></tr>
<tr><td>1</td><td>a5 0.06 + a6 0.04</td><td>0.1</td><td>0.4, 0.3, 0.1, 0.1, 0.1</td></tr>
<tr><td>2</td><td>a4 0.1 + (a5a6) 0.1</td><td>0.2</td><td>0.4, 0.3, 0.2, 0.1</td></tr>
<tr><td>3</td><td>a3 0.1 + 0.2</td><td>0.3</td><td>0.4, 0.3, 0.3</td></tr>
<tr><td>4</td><td>a2 0.3 + 0.3</td><td>0.6</td><td>0.6, 0.4</td></tr>
<tr><td>5</td><td>a1 0.4 + 0.6</td><td>1.0</td><td>done</td></tr></table>
<table class="tbl"><tr><th>Symbol</th><th>p</th><th>Code</th><th>Length l</th><th>p·l</th><th>−p log₂p</th></tr>
<tr><td>a1</td><td>0.4</td><td>0</td><td>1</td><td>0.40</td><td>0.529</td></tr>
<tr><td>a2</td><td>0.3</td><td>10</td><td>2</td><td>0.60</td><td>0.521</td></tr>
<tr><td>a3</td><td>0.1</td><td>110</td><td>3</td><td>0.30</td><td>0.332</td></tr>
<tr><td>a4</td><td>0.1</td><td>1110</td><td>4</td><td>0.40</td><td>0.332</td></tr>
<tr><td>a5</td><td>0.06</td><td>11110</td><td>5</td><td>0.30</td><td>0.244</td></tr>
<tr><td>a6</td><td>0.04</td><td>11111</td><td>5</td><td>0.20</td><td>0.186</td></tr>
<tr><td colspan="4"><b>Total</b></td><td><b>2.20</b></td><td><b>2.14</b></td></tr></table>
<ul><li><b>Average length</b> L<sub>avg</sub> = Σ p·l = <b>2.2 bits/symbol</b>.</li>
<li><b>Entropy</b> H = −Σ p log₂ p = <b>2.14 bits/symbol</b>.</li>
<li><b>Efficiency</b> η = H / L<sub>avg</sub> = 2.14 / 2.2 = <b>97.4%</b>; redundancy = 1 − η = 2.6%.</li>
<li><b>Compression ratio</b> vs fixed 3-bit code (6 symbols need ⌈log₂6⌉ = 3 bits): CR = 3 / 2.2 = <b>1.36 : 1</b> (R<sub>D</sub> = 0.27).</li></ul>
<p>(Ties may give different codes, e.g. lengths 1,2,4,4,4,4, but L<sub>avg</sub> stays 2.2.) The code is <b>prefix-free</b>, so it decodes uniquely without separators: 0 10 110 → a1 a2 a3.</p>
<h3>Better scheme if efficiency is low</h3><ul>
<li><b>Arithmetic coding</b>: codes the whole message as one number in [0,1); not limited to an integer number of bits per symbol, approaches entropy (best when one symbol has very high probability, where Huffman wastes up to ~1 bit/symbol).</li>
<li><b>Extended (block) Huffman</b>: code pairs/blocks of symbols, so L<sub>avg</sub>/symbol → H.</li>
<li>Remove <b>interpixel</b> redundancy first (predictive coding, run-length, LZW) so the symbol probabilities become more skewed and compressible.</li></ul>`,
  dg: [
    { h: 'Huffman tree (0 = left, 1 = right)' },
    { tree: { t: '1.0', tone: 'a', kids: [
      { t: 'a1 · 0.4', s: 'code 0', tone: 'ok' },
      { t: '0.6', kids: [
        { t: 'a2 · 0.3', s: '10', tone: 'ok' },
        { t: '0.3', kids: [
          { t: 'a3 · 0.1', s: '110', tone: 'ok' },
          { t: '0.2', kids: [
            { t: 'a4 · 0.1', s: '1110', tone: 'ok' },
            { t: '0.1', kids: [{ t: 'a5 · 0.06', s: '11110', tone: 'ok' }, { t: 'a6 · 0.04', s: '11111', tone: 'ok' }] }] }] }] }] } },
    { h: 'Code length follows rarity' },
    { bars: [1, 2, 3, 4, 5, 5], labels: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'], cap: 'bits per symbol: frequent → short', tone: 'u1' },
    { grid: [{ t: 'L_avg = 2.2', s: 'Σ p·l', tone: 'u1' }, { t: 'H = 2.14', s: '−Σ p log₂p', tone: 'u2' }, { t: 'η = 97.4%', s: 'H / L_avg', tone: 'ok' }, { t: 'CR = 1.36', s: '3 / 2.2', tone: 'a' }] }
  ],
  quiz: [
    { q: 'In Huffman coding, at each step you merge', o: ['The two largest', 'The two smallest probabilities', 'Random pairs', 'Adjacent symbols'], a: 1, why: 'Least probable symbols get the longest codes.' },
    { q: 'Efficiency η equals', o: ['L_avg / H', 'H / L_avg', '1 − H', 'CR × H'], a: 1, why: 'Entropy is the lower bound on L_avg.' },
    { q: 'Better than Huffman when one symbol is very likely:', o: ['Fixed-length code', 'Arithmetic coding', 'Bit-plane slicing', 'Median filter'], a: 1, why: 'No whole-bit-per-symbol limit.' }
  ],
  rev: ['Merge two smallest → repeat → assign 0/1 → prefix-free code', 'Example codes 0, 10, 110, 1110, 11110, 11111', '<b>L_avg = Σ p·l = 2.2</b>; <b>H = −Σ p log₂p = 2.14</b>', '<b>η = H/L_avg = 97.4%</b>; <b>CR = 3/2.2 = 1.36</b>', 'Low η → arithmetic coding, extended Huffman, remove interpixel redundancy first'],
  trick: '<b>"Small-small merge, then read from the root."</b> −p log₂p values to memorise: 0.4 → 0.529, 0.3 → 0.521, 0.1 → 0.332.',
  easy: {
    en: { s: 'Huffman gives frequent symbols short codes and rare ones long codes, so the average gets close to the entropy.', story: 'Morse code: E (very common) is a single dot; Q (rare) is long. Huffman builds such a code automatically from the probabilities.', words: [['Prefix-free', 'No code is the start of another.'], ['L_avg', 'Average bits per symbol.'], ['Entropy', 'Theoretical minimum bits.'], ['Efficiency', 'Entropy ÷ L_avg.']], how: ['Sort probabilities.', 'Merge the two smallest; repeat.', 'Assign 0/1 at each merge.', 'Compute L_avg, H, η, CR.'], exam: 'Redundancy line, procedure, merge table, code table with p·l and −p log p columns, all four results, better-scheme paragraph.', yaad: 'Small-small merge; 2.2 / 2.14 / 97.4% / 1.36.' },
    bhai: { s: 'Huffman common symbols ko chhota code, rare ko lamba code deta hai. Average entropy ke paas aa jaata hai.', story: 'Morse code mein E ek dot hai (common), Q lamba (rare). Huffman probabilities se aisa code khud banata hai.', words: [['Prefix-free', 'Koi code dusre ki shuruaat nahi.'], ['L_avg', 'Average bits.'], ['Entropy', 'Minimum possible bits.'], ['Efficiency', 'Entropy ÷ L_avg.']], how: ['Sort karo.', 'Do sabse chhote jodo, repeat.', '0/1 lagao.', 'L_avg, H, η, CR nikalo.'], exam: 'Procedure, merge table, code table, chaaron results, better scheme.', yaad: 'Chhote-chhote jodo; 2.2 / 2.14 / 97.4% / 1.36.' },
    gaali: { s: 'Huffman common cheezon ko chhota code deta hai, rare ko lamba. Jaise tujhe sab "chutiya" bulaate hain, chhota aur common, bc.', story: 'Morse code mein E ek dot, Q lamba. Huffman khud aisa code banata hai. Tu toh Morse bhi nahi jaanta, gadhe.', words: [['Prefix-free', 'Koi code dusre ka shuru wala hissa nahi.'], ['L_avg', 'Average bits.'], ['Entropy', 'Minimum bits.'], ['Efficiency', 'H ÷ L_avg. Teri efficiency 0 hai.']], how: ['Sort.', 'Do sabse chhote jod.', '0/1 laga.', 'Ganit kar. Ho gaya, harami.'], exam: 'Merge table, code table, L_avg, H, η, CR, better scheme. Log₂ galat kiya toh poora numerical gaya, bhosdike.', yaad: '2.2 / 2.14 / 97.4% / 1.36. Ratt le, kamine.' }
  }
},
{
  id: 'd3-jpeg', unit: 3, title: 'Predictive Coding, Transform Coding (JPEG) & JPEG 2000', marks: '5 / 10', mins: 25, imp: true,
  q: 'Draw and explain the JPEG 2000 block diagram. Compare lossy and lossless predictive coding. <i>(IQ Q20 part · 10M)</i>',
  simple: `<ul><li><b>Predictive coding</b>: guess each pixel from the previous one and send only the <b>error</b>. Errors are small → few bits. Lossless: send exact error. Lossy (DPCM): <b>quantize</b> the error.</li>
<li><b>JPEG</b>: 8×8 blocks → DCT → quantize → zigzag → run-length + Huffman. Blocky at high compression.</li>
<li><b>JPEG 2000</b>: whole-image <b>wavelet</b> (DWT) → quantize → <b>EBCOT</b> arithmetic coding. No blocks, lossless + lossy in one, scalable.</li></ul>`,
  learn: [
    { title: 'Lossless predictive', body: `<p>e<sub>n</sub> = f<sub>n</sub> − f̂<sub>n</sub>. 100, 102, 101, 103 → send 100, +2, −1, +2. Decoder adds back exactly.</p>` },
    { title: 'Lossy predictive (DPCM)', body: `<p>Quantizer inside the loop; predictor uses <b>reconstructed</b> values so encoder and decoder stay in step. Step 4: 100, 104, 109, 108 → reconstructed 100, 104, 108, 108.</p>` },
    { title: 'JPEG baseline', body: `<p>8×8 DCT → quantization table → DC by difference, AC zigzag + run-length → Huffman.</p>` },
    { title: 'JPEG 2000 pipeline', body: `<p>Tiling → DC level shift + colour transform (RCT lossless / ICT lossy) → DWT (5/3 reversible or 9/7) → quantization (lossy only) → EBCOT (tier-1 context arithmetic coding, tier-2 rate control) → codestream.</p>` },
    { title: 'Why JPEG 2000', body: `<p>Better quality at low bit-rates, blur not blocks, progressive by resolution/quality, region-of-interest coding, one file for many qualities.</p>` }
  ],
  short: `<p><b>Lossless predictive coding</b> codes the prediction error e<sub>n</sub> = f<sub>n</sub> − f̂<sub>n</sub> with a symbol encoder; exact reconstruction. <b>Lossy predictive (DPCM)</b> quantizes e<sub>n</sub> inside the prediction loop (predictor fed with reconstructed values); higher compression, some error (granular noise, slope overload). <b>JPEG 2000</b>: tiling, DC level shift, colour transform (RCT/ICT), 2-D DWT (5/3 or 9/7), quantization, EBCOT coding, codestream; decoder reverses. Advantages: no blocking, lossless and lossy, scalability, ROI.</p>`,
  answer: `<h3>Predictive coding</h3><p>Predict each pixel from previous ones (e.g. f̂<sub>n</sub> = f<sub>n−1</sub>) and code only the <b>prediction error e<sub>n</sub> = f<sub>n</sub> − f̂<sub>n</sub></b>, which is small and peaked near 0 → fewer bits (removes interpixel redundancy).</p>
<p><b>Lossless</b>: encoder: f<sub>n</sub> → (−) predictor → e<sub>n</sub> → symbol encoder. Decoder: f<sub>n</sub> = e<sub>n</sub> + f̂<sub>n</sub>. Example: 100, 102, 101, 103 → 100, +2, −1, +2 (exact).</p>
<p><b>Lossy (DPCM)</b>: a <b>quantizer</b> maps e<sub>n</sub> → ė<sub>n</sub>; the predictor uses reconstructed values ḟ<sub>n</sub> = ė<sub>n</sub> + f̂<sub>n</sub> (inside the loop) so encoder and decoder predictions match and errors do not accumulate.</p>
<table class="tbl"><tr><th>n</th><th>f</th><th>e</th><th>ė (step 4)</th><th>Reconstructed</th></tr><tr><td>0</td><td>100</td><td>—</td><td>—</td><td>100</td></tr><tr><td>1</td><td>104</td><td>4</td><td>4</td><td>104</td></tr><tr><td>2</td><td>109</td><td>5</td><td>4</td><td>108</td></tr><tr><td>3</td><td>108</td><td>0</td><td>0</td><td>108</td></tr></table>
<p>Delta modulation = 1-bit DPCM: granular noise in flat areas, slope overload at sharp edges.</p>
<table class="tbl"><tr><th></th><th>Lossless predictive</th><th>Lossy predictive (DPCM)</th></tr>
<tr><td>Quantizer</td><td>None</td><td>Inside the prediction loop</td></tr>
<tr><td>Reconstruction</td><td>Exact</td><td>Approximate (quantization error)</td></tr>
<tr><td>Predictor input</td><td>Original values</td><td>Reconstructed values</td></tr>
<tr><td>Compression</td><td>Low (≈ 2:1)</td><td>Higher</td></tr>
<tr><td>Artifacts</td><td>None</td><td>Granular noise, slope overload</td></tr>
<tr><td>Use</td><td>Medical, archival</td><td>Speech/video, general images</td></tr></table>
<h3>Transform coding (JPEG baseline)</h3><p>8×8 blocks → DCT → quantize with a table → DC coded as difference from previous block; AC coefficients <b>zigzag</b> scanned and run-length coded → Huffman. Zonal (fixed low-frequency zone) vs threshold (keep above T) coding. High compression → <b>blocking artifacts</b>.</p>
<h3>JPEG 2000 block diagram</h3><p><b>Encoder</b>: Source image → <b>tiling</b> (optional) → <b>DC level shift</b> (subtract 2<sup>k−1</sup>) → <b>component (colour) transform</b>: RCT (reversible, lossless) or ICT (irreversible, YCbCr, lossy) → <b>2-D DWT</b> (5/3 integer filter for lossless, 9/7 for lossy; several levels → LL, LH, HL, HH) → <b>quantization</b> (dead-zone, lossy mode only) → <b>EBCOT</b>: tier-1 bit-plane context modelling + MQ arithmetic coding of code-blocks, tier-2 rate–distortion optimised packet formation → <b>codestream</b>.</p>
<p><b>Decoder</b>: codestream → EBCOT decoding → dequantization → inverse DWT → inverse colour transform → level shift back → image.</p>
<table class="tbl"><tr><th></th><th>JPEG</th><th>JPEG 2000</th></tr><tr><td>Transform</td><td>8×8 block DCT</td><td>DWT on whole image/tiles</td></tr><tr><td>Artifacts</td><td>Blocking</td><td>Blurring (no blocks)</td></tr><tr><td>Lossless</td><td>Separate mode</td><td>Built in, same codestream</td></tr><tr><td>Scalability</td><td>Limited</td><td>Resolution, quality, ROI</td></tr><tr><td>Entropy coder</td><td>Huffman</td><td>Arithmetic (EBCOT)</td></tr><tr><td>Complexity</td><td>Lower</td><td>Higher</td></tr></table>`,
  dg: [
    { h: 'Predictive coding: send only the error' },
    { flow: [{ t: 'fₙ', tone: 'u1' }, { t: '− f̂ₙ', s: 'predictor' }, { t: 'eₙ', s: 'small, near 0', tone: 'a' }, { t: 'Symbol encoder', s: 'Huffman', tone: 'ok' }], labels: ['', '', ''] },
    { branch: { down: 'eₙ (lossless) / quantized ėₙ (lossy)', up: 'reconstructed value feeds predictor', node: { t: 'Predictor', s: 'lossy: uses reconstructed ḟ, not f', tone: 'u2' } } },
    { grid: [
      { cap: 'Lossless: exact', matrix: [['f', 100, 102, 101, 103], ['sent', 100, '+2', '−1', '+2']] },
      { cap: 'DPCM step 4: small loss', matrix: [['f', 100, 104, 109, 108], ['rec', 100, 104, 108, 108]], hl: ['1,3'] }
    ] },
    { h: 'JPEG (baseline)' },
    { flow: [{ t: '8×8 blocks' }, { t: 'DCT' }, { t: 'Quantize', tone: 'bad' }, { t: 'Zigzag' }, { t: 'RLE + Huffman', tone: 'ok' }], labels: ['', '', '', ''] },
    { h: 'JPEG 2000 encoder' },
    { flow: [{ t: 'Tiling', s: 'optional' }, { t: 'DC level shift', s: '− 2ᵏ⁻¹' }, { t: 'Colour transform', s: 'RCT / ICT' }, { t: '2-D DWT', s: '5/3 or 9/7', tone: 'a' }], labels: ['', '', ''] },
    { flow: [{ t: 'Quantization', s: 'lossy only', tone: 'bad' }, { t: 'EBCOT tier-1', s: 'context + arithmetic' }, { t: 'EBCOT tier-2', s: 'rate control' }, { t: 'Codestream', s: '.jp2', tone: 'ok' }], labels: ['', '', ''] },
    { note: 'Decoder runs the same chain backwards (no inverse of the lossy quantization).' }
  ],
  quiz: [
    { q: 'In DPCM the predictor uses', o: ['Original pixels', 'Reconstructed pixels', 'Random values', 'DCT coefficients'], a: 1, why: 'So encoder and decoder stay in step.' },
    { q: 'JPEG 2000 uses which transform?', o: ['8×8 DCT', 'DWT', 'DFT', 'Hadamard'], a: 1, why: 'Wavelets, no blocks.' },
    { q: 'EBCOT stands for', o: ['Embedded Block Coding with Optimized Truncation', 'Error Based Coding of Tiles', 'Entropy Bit Coding of Transforms', 'Encoded Block Compression Tool'], a: 0, why: 'JPEG 2000 entropy coding.' }
  ],
  rev: ['Predictive: send <b>eₙ = fₙ − f̂ₙ</b>; 100,102,101,103 → 100,+2,−1,+2', 'Lossless: no quantizer, exact; DPCM: quantizer in loop, predictor uses reconstructed values', 'JPEG: 8×8 DCT → quantize → zigzag → RLE + Huffman; blocking', '<b>JPEG 2000</b>: tile → level shift → RCT/ICT → DWT (5/3, 9/7) → quantize → EBCOT → codestream', 'JPEG 2000: no blocks, lossless+lossy, scalable, ROI, arithmetic coding'],
  trick: 'JPEG 2000 = "<b>T-L-C-D-Q-E</b>": <i>Tiny Lions Can Dance Quite Elegantly</i>: Tiling, Level shift, Colour transform, DWT, Quantize, EBCOT.',
  easy: {
    en: { s: 'Predictive coding sends only the surprise; JPEG 2000 uses wavelets instead of 8×8 blocks.', story: 'Telling a friend today\'s temperature: "same as yesterday plus 2" is shorter than "31 degrees". That plus-2 is the prediction error.', words: [['Prediction error', 'Actual − guessed.'], ['DPCM', 'Lossy predictive coding.'], ['DWT', 'Wavelet transform.'], ['EBCOT', 'JPEG 2000\'s arithmetic coder.']], how: ['Predict from previous pixel.', 'Send the error (quantize it if lossy).', 'JPEG 2000: shift, colour transform, DWT, quantize, EBCOT.', 'Decoder reverses.'], exam: 'Predictive block idea + example, lossless vs lossy table, JPEG 2000 full block diagram with each block explained, JPEG vs JPEG 2000 table.', yaad: 'Tiny Lions Can Dance Quite Elegantly.' },
    bhai: { s: 'Predictive coding sirf "surprise" bhejta hai. JPEG 2000 8×8 blocks ki jagah wavelets use karta hai.', story: 'Dost ko temperature batana: "kal se 2 zyada" bolna "31 degree" se chhota hai. Wo +2 hi error hai.', words: [['Prediction error', 'Asli − andaaza.'], ['DPCM', 'Lossy predictive.'], ['DWT', 'Wavelet transform.'], ['EBCOT', 'JPEG 2000 ka coder.']], how: ['Pichhle pixel se guess.', 'Error bhejo (lossy mein quantize).', 'JPEG 2000: shift, colour, DWT, quantize, EBCOT.', 'Decoder ulta.'], exam: 'Predictive example, lossless vs lossy table, JPEG 2000 block diagram, JPEG vs JPEG 2000 table.', yaad: 'Tiny Lions Can Dance Quite Elegantly.' },
    gaali: { s: 'Predictive coding sirf ghatiya surprise bhejta hai. JPEG 2000 dabbe-wale JPEG ka baap hai, wavelets use karta hai, bc.', story: 'Dost ko bol "kal se 2 degree zyada", poora 31 bolne ki zaroorat nahi, chutiye. Wo 2 hi error hai.', words: [['Prediction error', 'Asli − andaaza.'], ['DPCM', 'Lossy predictive.'], ['DWT', 'Wavelet.'], ['EBCOT', 'Full form ratt le, examiner poochta hai.']], how: ['Guess.', 'Error bhej.', 'JPEG 2000 ke blocks.', 'Ulta decode. Ho gaya, gadhe.'], exam: 'Predictive example, table, JPEG 2000 diagram, JPEG vs JPEG 2000. Diagram nahi banaya toh 10 mein 2, harami.', yaad: 'Tiny Lions Can Dance Quite Elegantly. Ratt le, kamine.' }
  }
},
{
  id: 'd3-seg', unit: 3, title: 'Segmentation: Edges, Edge Linking, Thresholding, Regions', marks: '5 / 10', mins: 25, imp: true,
  q: 'Explain edge detection, edge linking, thresholding and region-oriented segmentation. <i>(IQ Q20 part · 10M)</i>',
  simple: `<p>Segmentation = cut the image into meaningful regions/objects. Two ideas:</p>
<ul><li><b>Discontinuity</b>: find sudden changes → points, lines, <b>edges</b> (Sobel, Prewitt, Laplacian, LoG, Canny). Then <b>link</b> broken edges (local, Hough).</li>
<li><b>Similarity</b>: group alike pixels → <b>thresholding</b> (global, Otsu, adaptive) and <b>region</b> growing / split-and-merge.</li></ul>`,
  learn: [
    { title: 'Masks', body: `<p>R = Σ w<sub>i</sub>z<sub>i</sub>. Point mask [−1 −1 −1; −1 8 −1; −1 −1 −1]; four line masks (H, V, ±45°). All sum to 0.</p>` },
    { title: 'Gradient', body: `<p>∇f = [G<sub>x</sub>, G<sub>y</sub>]; M = √(G<sub>x</sub>² + G<sub>y</sub>²) ≈ |G<sub>x</sub>| + |G<sub>y</sub>|; α = tan⁻¹(G<sub>y</sub>/G<sub>x</sub>). Sobel on [10 10 10; 10 10 10; 100 100 100]: G<sub>y</sub> = 360 → strong horizontal edge.</p>` },
    { title: 'Edge linking', body: `<p>Local: link neighbours with similar magnitude (|ΔM| ≤ E) and direction (|Δα| ≤ A). Global: <b>Hough</b>: each point votes in (a, b) or (ρ, θ) space; (1,1),(2,2),(3,3) → a = 1, b = 0.</p>` },
    { title: 'Thresholding', body: `<p>g = 1 if f &gt; T. Iterative: T = ½(m₁ + m₂) until stable (10,12,11,9,200,205,198,203 → T ≈ 106). Otsu maximises σ<sub>B</sub>². Adaptive for uneven light.</p>` },
    { title: 'Regions', body: `<p>Region growing from seeds with a similarity rule; split-and-merge with a quadtree (split if Q false, merge if Q(R<sub>i</sub> ∪ R<sub>j</sub>) true).</p>` }
  ],
  short: `<p>Segmentation partitions an image into regions with ∪R<sub>i</sub> = R, R<sub>i</sub> connected and disjoint, Q(R<sub>i</sub>) true, Q(R<sub>i</sub> ∪ R<sub>j</sub>) false for adjacent regions. <b>Edge detection</b>: gradient operators (Roberts, Prewitt, Sobel; M = √(G<sub>x</sub>²+G<sub>y</sub>²)), Laplacian/LoG zero crossings, Canny. <b>Edge linking</b>: local similarity of magnitude/direction; Hough transform. <b>Thresholding</b>: global (iterative T = ½(m₁+m₂)), Otsu, adaptive. <b>Region-oriented</b>: region growing from seeds, region splitting & merging (quadtree).</p>`,
  answer: `<h3>Image segmentation</h3><p>Dividing an image into regions R<sub>1</sub>…R<sub>n</sub> such that: ∪R<sub>i</sub> = R; each R<sub>i</sub> is connected; R<sub>i</sub> ∩ R<sub>j</sub> = ∅; Q(R<sub>i</sub>) = TRUE; Q(R<sub>i</sub> ∪ R<sub>j</sub>) = FALSE for adjacent regions. Approaches: <b>discontinuity</b> (edges) and <b>similarity</b> (threshold, regions).</p>
<h3>1. Detection of discontinuities</h3><p>Mask response <b>R = Σ w<sub>i</sub>z<sub>i</sub></b>. Point: |R| ≥ T with mask [−1 −1 −1; −1 8 −1; −1 −1 −1]. Lines: four masks (horizontal, vertical, +45°, −45°); largest response gives the direction.</p>
<h3>2. Edge detection</h3><p>Edge = set of pixels where intensity changes abruptly. 1st derivative → peak; 2nd derivative → zero crossing.</p><ul>
<li><b>Gradient</b>: ∇f = [G<sub>x</sub>, G<sub>y</sub>], <b>M = √(G<sub>x</sub>² + G<sub>y</sub>²) ≈ |G<sub>x</sub>| + |G<sub>y</sub>|</b>, α = tan⁻¹(G<sub>y</sub>/G<sub>x</sub>) (edge ⟂ α).</li>
<li><b>Roberts</b> 2×2 cross; <b>Prewitt</b> [−1 0 1] ×3 rows; <b>Sobel</b> [−1 0 1; −2 0 2; −1 0 1] (weight 2 → some smoothing).</li>
<li><b>Sobel example</b>: z = [10 10 10; 10 10 10; 100 100 100]: G<sub>x</sub> = 0; G<sub>y</sub> = (100+200+100) − (10+20+10) = 360; M = 360 → strong horizontal edge.</li>
<li><b>Laplacian</b>: zero crossings, noise-sensitive, double edges, no direction. <b>LoG (Marr–Hildreth)</b>: Gaussian smoothing then Laplacian. <b>Canny</b>: Gaussian → gradient → non-maximum suppression → hysteresis (two thresholds) → thin, connected edges.</li></ul>
<h3>3. Edge linking and boundary detection</h3><ul>
<li><b>Local processing</b>: in a 3×3/5×5 neighbourhood link (s,t) to (x,y) if |M(s,t) − M(x,y)| ≤ E and |α(s,t) − α(x,y)| ≤ A.</li>
<li><b>Global, Hough transform</b>: line y = ax + b ↔ point (a, b) in parameter space; each edge point votes for all lines through it (b = −xa + y); the accumulator cell with most votes is the line. Points (1,1), (2,2), (3,3) give b = −a+1, b = −2a+2, b = −3a+3, all meeting at (a = 1, b = 0) → y = x. Use the normal form <b>ρ = x cos θ + y sin θ</b> to handle vertical lines.</li></ul>
<h3>4. Thresholding</h3><p>g(x,y) = 1 if f(x,y) &gt; T, else 0. Works when the histogram is bimodal (T in the valley).</p><ol>
<li>Initial T (e.g. mean).</li><li>Split into G₁ (&gt; T) and G₂ (≤ T).</li><li>Means m₁, m₂.</li><li><b>T = ½(m₁ + m₂)</b>.</li><li>Repeat until ΔT &lt; ε.</li></ol>
<p>Example: 10, 12, 11, 9, 200, 205, 198, 203 → T₀ = 106; m₁ = 201.5, m₂ = 10.5 → T = 106 (stable). <b>Otsu</b>: choose T maximising between-class variance σ<sub>B</sub>² = ω₁ω₂(μ₁ − μ₂)². <b>Adaptive/local</b>: different T per region for uneven illumination. Multiple thresholds for 3+ classes.</p>
<h3>5. Region-oriented segmentation</h3><ul>
<li><b>Region growing</b>: choose seed(s); add 8-connected neighbours satisfying a similarity rule (e.g. |f − seed| ≤ T); stop when none qualify. Example seed 10, |f − 10| ≤ 5 grows over the dark pixels only.</li>
<li><b>Region splitting and merging</b>: start with the whole image; split any region with Q(R) = FALSE into 4 quadrants (quadtree); merge adjacent R<sub>i</sub>, R<sub>j</sub> if Q(R<sub>i</sub> ∪ R<sub>j</sub>) = TRUE; stop when no split/merge possible. No seeds needed.</li></ul>
<table class="tbl"><tr><th></th><th>Edge-based</th><th>Thresholding</th><th>Region-based</th></tr><tr><td>Uses</td><td>Sudden changes</td><td>Histogram</td><td>Similar neighbours</td></tr><tr><td>Strength</td><td>Boundaries</td><td>Simple, fast</td><td>Closed connected regions</td></tr><tr><td>Weakness</td><td>Gaps, noise</td><td>Uneven lighting</td><td>Seed / rule dependent</td></tr></table>`,
  dg: [
    { h: 'Two families' },
    { tree: { t: 'Segmentation', tone: 'a', kids: [
      { t: 'Discontinuity', tone: 'u1', kids: [{ t: 'Points / lines', s: 'masks' }, { t: 'Edges', s: 'Sobel · LoG · Canny' }, { t: 'Edge linking', s: 'local · Hough' }] },
      { t: 'Similarity', tone: 'u2', kids: [{ t: 'Thresholding', s: 'global · Otsu · adaptive' }, { t: 'Region growing', s: 'seeds' }, { t: 'Split & merge', s: 'quadtree' }] }] } },
    { h: 'Sobel on a horizontal edge' },
    { grid: [
      { cap: 'Region z', matrix: [[10, 10, 10], [10, 10, 10], [100, 100, 100]], heat: 100 },
      { cap: 'Sobel Gx → 0', matrix: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], sign: true },
      { cap: 'Sobel Gy → 360', matrix: [[-1, -2, -1], [0, 0, 0], [1, 2, 1]], sign: true }
    ] },
    { note: 'M = √(0² + 360²) = 360 → strong horizontal edge. Each mask sums to 0, so flat areas give 0.' },
    { h: 'Thresholding a bimodal histogram' },
    { bars: [6, 14, 18, 9, 3, 1, 2, 5, 12, 16, 10, 4], split: 5, cap: 'T sits in the valley between the dark and bright peaks (iterative T = ½(m₁ + m₂))', tone: 'u1' },
    { h: 'Region growing (seed 10, |f − 10| ≤ 5)' },
    { matrix: [[10, 12, 80, 82, 85], [11, 13, 79, 81, 84], [10, 11, 12, 83, 86], [9, 10, 11, 12, 87], [8, 9, 10, 11, 12]], heat: 90, hl: ['0,0', '0,1', '1,0', '1,1', '2,0', '2,1', '2,2', '3,0', '3,1', '3,2', '3,3', '4,0', '4,1', '4,2', '4,3', '4,4'], cap: 'Outlined = grown region; the 80s fail the rule' },
    { h: 'Hough: three points, one line' },
    { flow: [{ t: '(1,1) (2,2) (3,3)', tone: 'u1' }, { t: 'b = −xa + y for each', s: 'three lines in (a, b) space' }, { t: 'meet at a = 1, b = 0', s: 'y = x', tone: 'ok' }], labels: ['vote', 'max votes'] }
  ],
  quiz: [
    { q: 'Sobel Gy on [10 10 10; 10 10 10; 100 100 100] is', o: ['0', '90', '360', '400'], a: 2, why: '(100+200+100) − (10+20+10) = 360.' },
    { q: 'Iterative global threshold updates T as', o: ['max − min', '½(m₁ + m₂)', 'median', 'm₁·m₂'], a: 1, why: 'Average of the two class means.' },
    { q: 'Hough transform is used for', o: ['Noise removal', 'Edge linking / line detection', 'Compression', 'Colour conversion'], a: 1, why: 'Global edge linking by voting.' },
    { q: 'Which edge detector uses hysteresis thresholding?', o: ['Roberts', 'Prewitt', 'Canny', 'Laplacian'], a: 2, why: 'Canny: two thresholds for strong/weak edges.' }
  ],
  rev: ['Conditions: ∪Rᵢ = R, connected, disjoint, Q(Rᵢ) true, Q(Rᵢ ∪ Rⱼ) false', 'Masks R = Σwz; point [−1…8…−1]; 4 line masks; all sum 0', '<b>M = √(Gx² + Gy²)</b>; Sobel Gy example = 360; LoG, <b>Canny</b> (smooth, gradient, NMS, hysteresis)', 'Linking: local (|ΔM| ≤ E, |Δα| ≤ A); <b>Hough</b> votes, ρ = x cosθ + y sinθ', 'Threshold: <b>T = ½(m₁+m₂)</b> iterate; Otsu max σ_B²; adaptive. Regions: growing (seeds), split & merge (quadtree)'],
  trick: 'Canny = "<b>S-G-N-H</b>": <i>Smooth, Gradient, Non-max, Hysteresis</i>. Segmentation families: <b>Edge</b> it or <b>Group</b> it.',
  easy: {
    en: { s: 'Segmentation cuts an image into objects, either by finding edges or by grouping similar pixels.', story: 'Cutting a photo of a cricket ground: either trace the boundary line with scissors (edges) or colour all the green grass at once (similarity).', words: [['Edge', 'Sudden brightness change.'], ['Gradient', 'Size and direction of change.'], ['Threshold T', 'Cut-off brightness.'], ['Seed', 'Starting pixel for region growing.']], how: ['Detect edges with Sobel/Canny.', 'Link broken edges (local or Hough).', 'Or threshold using the histogram valley.', 'Or grow regions from seeds / split-merge.'], exam: 'Definition + 5 conditions, masks, gradient formulas with Sobel example, Canny steps, Hough example, threshold algorithm with example, region growing and split-merge, comparison table.', yaad: 'Edge it or group it. Canny = S-G-N-H.' },
    bhai: { s: 'Segmentation image ko objects mein kaatta hai: ya edges dhoondh ke, ya similar pixels group karke.', story: 'Cricket ground ki photo: ya kainchi se boundary line kaato (edges), ya saari hari ghaas ek saath rang do (similarity).', words: [['Edge', 'Achanak brightness change.'], ['Gradient', 'Change kitna aur kis taraf.'], ['Threshold T', 'Cut-off brightness.'], ['Seed', 'Region growing ka starting pixel.']], how: ['Sobel/Canny se edges.', 'Toote edges jodo (local, Hough).', 'Ya histogram ki valley pe threshold.', 'Ya seeds se region grow / split-merge.'], exam: 'Definition + conditions, masks, Sobel example, Canny steps, Hough example, threshold algorithm, regions, table.', yaad: 'Edge dhoondho ya group karo. Canny = S-G-N-H.' },
    gaali: { s: 'Segmentation photo ko tukdon mein kaatta hai: ya edges dhoondh, ya same jaise pixels ka gang bana. Tere chutiye doston ka gang jaisa, bc.', story: 'Ground ki photo mein ya kainchi se boundary kaat (edges), ya saari ghaas ek saath rang de (similarity). Kainchi se ungli mat kaat lena, gadhe.', words: [['Edge', 'Achanak change.'], ['Gradient', 'Kitna aur kidhar.'], ['Threshold', 'Cut-off.'], ['Seed', 'Shuruaati pixel.']], how: ['Edges nikaal.', 'Jod.', 'Ya threshold.', 'Ya region grow. Ho gaya, harami.'], exam: 'Conditions, Sobel example, Canny steps, Hough, threshold algo, regions, table. Sirf naam likhe bina example toh 10 mein 3, bhosdike.', yaad: 'Edge kar ya group kar. Canny = S-G-N-H. Ratt le, kamine.' }
  }
}
];

const cards = [
  [3, 'Compression ratio & relative redundancy?', 'CR = n₁/n₂; Rᴅ = 1 − 1/CR.'],
  [3, 'Three redundancies?', 'Coding, interpixel, psychovisual.'],
  [3, 'Only lossy block in the encoder?', 'Quantizer.'],
  [3, 'PSNR formula?', '10 log₁₀[(L−1)²/MSE] dB.'],
  [3, 'Entropy?', 'H = −Σ p log₂ p (lossless lower bound).'],
  [3, 'Huffman merge rule?', 'Combine the two least probable symbols repeatedly.'],
  [3, 'Huffman efficiency?', 'η = H / L_avg.'],
  [3, 'Better than Huffman?', 'Arithmetic coding / extended Huffman.'],
  [3, 'Predictive error?', 'eₙ = fₙ − f̂ₙ.'],
  [3, 'DPCM predictor input?', 'Reconstructed values (quantizer in loop).'],
  [3, 'JPEG 2000 transform?', 'DWT (5/3 lossless, 9/7 lossy).'],
  [3, 'EBCOT?', 'Embedded Block Coding with Optimized Truncation.'],
  [3, 'JPEG vs JPEG 2000 artifact?', 'Blocking vs blurring.'],
  [3, 'Gradient magnitude?', 'M = √(Gx² + Gy²) ≈ |Gx| + |Gy|.'],
  [3, 'Canny steps?', 'Gaussian smoothing, gradient, non-maximum suppression, hysteresis.'],
  [3, 'Hough normal form?', 'ρ = x cos θ + y sin θ.'],
  [3, 'Iterative threshold?', 'T = ½(m₁ + m₂), repeat until stable.'],
  [3, 'Otsu?', 'Choose T maximising between-class variance.'],
  [3, 'Split & merge?', 'Quadtree split if Q false; merge if Q(Rᵢ ∪ Rⱼ) true.']
];

export default { topics, cards };
