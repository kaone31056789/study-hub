// DIP Unit 1 · Fundamentals, Transforms, Enhancement (CO1). Source: ankushraj.dev DIP notes + CU syllabus (24ITT-311).
// HTML strings are trusted local content. Every topic carries its own diagram (dg) and three-language explainer (easy).

const topics = [
{
  id: 'd0-basics', unit: 0, title: 'Digital Image Basics (start here)', marks: 'foundation', mins: 10, pyq: 'MST-1 · 2M',
  q: 'What is a digital image? List the fundamental steps of digital image processing.',
  simple: `<p>A photo on your phone is just a <b>table of numbers</b>. Each box of the table is a <b>pixel</b>, and its number says how bright it is (0 = black, 255 = white).</p>
<ul><li><b>f(x, y)</b>: x, y = the box's position, f = its brightness (intensity / gray level).</li>
<li><b>Binary</b> image: only 0 and 1. <b>Grayscale</b>: 0–255. <b>Colour</b>: three tables (R, G, B).</li>
<li>DIP = using a computer to clean, improve, compress or understand these number tables.</li></ul>`,
  learn: [
    { title: 'Image = function', body: `<p>An image is a 2-D function <b>f(x, y)</b>. (x, y) is a position, f is the <b>intensity</b> there. If x, y and f are all finite and discrete, it is a <b>digital image</b>.</p>` },
    { title: 'Pixel', body: `<p>Each (x, y) cell is a <b>pixel</b> (picture element), the smallest unit. A 1920×1080 image has about 2 million pixels.</p>` },
    { title: 'Types', body: `<p><b>Binary</b> (0/1), <b>grayscale</b> (0–255 with 8 bits), <b>colour</b> (R, G, B channels, each 0–255).</p>` },
    { title: 'The DIP pipeline', body: `<p>Acquisition → enhancement → restoration → colour → wavelets → compression → morphology → segmentation → representation → recognition. Early steps output <b>images</b>; from segmentation on, the output is <b>features / labels</b>.</p>` }
  ],
  short: `<p><b>Digital image:</b> a 2-D function f(x, y) where x, y are spatial coordinates and f is the intensity (gray level); x, y and f are all finite, discrete quantities. Each element is a <b>pixel</b>.</p>
<p><b>Steps of DIP:</b> image acquisition, enhancement, restoration, colour image processing, wavelets & multiresolution, compression, morphological processing, segmentation, representation & description, object recognition (all sharing a knowledge base).</p>`,
  answer: `<h3>Digital image</h3><p>A digital image is a 2-D function <b>f(x, y)</b>: x and y are spatial (plane) coordinates and the amplitude f at (x, y) is the <b>intensity or gray level</b>. When x, y and f are all finite and discrete, the image is digital. Its elements are <b>pixels</b>.</p>
<table class="tbl"><tr><th>Type</th><th>Values</th></tr><tr><td>Binary</td><td>0 (black) or 1 (white)</td></tr><tr><td>Grayscale</td><td>0–255 (8 bits)</td></tr><tr><td>Colour</td><td>R, G, B channels, each 0–255 (24 bits)</td></tr></table>
<h3>Fundamental steps of DIP</h3><ol>
<li><b>Image acquisition</b>: capture with a sensor and digitise.</li>
<li><b>Image enhancement</b>: improve contrast, brightness, sharpness (subjective).</li>
<li><b>Image restoration</b>: remove blur and noise using a degradation model (objective).</li>
<li><b>Colour image processing</b>: work with colour models (RGB, HSI).</li>
<li><b>Wavelets & multiresolution</b>: represent the image at many scales.</li>
<li><b>Compression</b>: reduce storage or bandwidth (JPEG).</li>
<li><b>Morphological processing</b>: extract shape components (erosion, dilation).</li>
<li><b>Segmentation</b>: split the image into regions or objects.</li>
<li><b>Representation & description</b>: boundary / region features.</li>
<li><b>Object recognition</b>: assign a label to each object.</li></ol>
<p>A <b>knowledge base</b> guides every step. Steps 1–7 output images; steps 8–10 output attributes.</p>`,
  dg: [
    { h: 'An image is a table of numbers' },
    { matrix: [[12, 40, 90, 160], [30, 85, 170, 220], [70, 150, 230, 255], [110, 200, 250, 255]], heat: 255, cap: 'f(x, y): position (x, y) → brightness f. 0 = black, 255 = white' },
    { h: 'Fundamental steps of DIP' },
    { flow: [{ t: 'Acquisition', s: 'sensor → digitise', tone: 'u1' }, { t: 'Enhancement', s: 'look better' }, { t: 'Restoration', s: 'undo damage' }, { t: 'Colour', s: 'RGB · HSI' }], labels: ['', '', ''] },
    { flow: [{ t: 'Wavelets', s: 'multi-scale' }, { t: 'Compression', s: 'JPEG' }, { t: 'Morphology', s: 'shapes', tone: 'u2' }], labels: ['', ''] },
    { flow: [{ t: 'Segmentation', s: 'regions', tone: 'a' }, { t: 'Representation', s: 'features' }, { t: 'Recognition', s: 'labels', tone: 'ok' }], labels: ['', ''] },
    { note: 'Image in → image out until morphology; segmentation onwards outputs features and labels. A knowledge base guides every step.' }
  ],
  quiz: [
    { q: 'In f(x, y), what does f represent?', o: ['Pixel position', 'Intensity / gray level', 'Number of pixels', 'Bits per pixel'], a: 1, why: 'x, y are the position; f is the brightness (gray level) at that position.' },
    { q: 'An 8-bit grayscale pixel can take values from', o: ['0 to 1', '0 to 127', '0 to 255', '0 to 1023'], a: 2, why: '2⁸ = 256 levels: 0 to 255.' }
  ],
  rev: ['<b>f(x, y)</b>: x, y = position, f = intensity (gray level)', 'Pixel = smallest element; binary 0/1, gray 0–255, colour = R, G, B', '10 steps: acquisition, enhancement, restoration, colour, wavelets, compression, morphology, segmentation, representation, recognition', 'Enhancement = subjective; restoration = objective (uses a model)'],
  trick: '<b>Steps mnemonic:</b> "<b>A E R C W C M S R R</b>": <i>All Engineers Read Code, While Chai Makes Smart Report Ready</i>.',
  easy: {
    en: { s: 'A digital image is a grid of numbers; each number is how bright that pixel is.', story: 'Think of a cricket stadium mosaic made by fans holding cards. Each fan is a pixel; the shade of their card is the intensity. Stand far away and you see a face.', words: [['Pixel', 'One box of the grid.'], ['Intensity / gray level', 'The number in the box (brightness).'], ['f(x, y)', 'Brightness at row x, column y.'], ['Binary image', 'Only black and white (0/1).']], how: ['A camera sensor measures light.', 'The scene is cut into a grid (pixels).', 'Each pixel gets a whole number for its brightness.', 'Now a computer can process it.'], exam: 'Define f(x, y), pixel, the three image types, then list the 10 steps with one line each.', yaad: 'Image = number grid. Position = (x, y), value = f.' },
    bhai: { s: 'Digital image matlab numbers ki table. Har box ek pixel, aur uska number batata hai kitna bright hai.', story: 'Stadium mein fans cards utha ke ek photo banate hain na? Har fan ek pixel, card ka shade = brightness. Door se dekho toh poori photo dikhti hai.', words: [['Pixel', 'Table ka ek box.'], ['Intensity', 'Box ke andar ka number, brightness.'], ['f(x, y)', 'Row x, column y pe kitni roshni.'], ['Binary image', 'Sirf kaala-safed, 0 ya 1.']], how: ['Camera ka sensor light naapta hai.', 'Scene ko grid mein kaat dete hain.', 'Har box ko brightness ka number milta hai.', 'Ab computer usko process kar sakta hai.'], exam: 'f(x, y) define karo, pixel, 3 types, phir 10 steps ek-ek line mein.', yaad: 'Image = numbers ki grid. Jagah (x, y), value f.' },
    gaali: { s: 'Abe ullu, photo kuch nahi hai, bas numbers ki table hai. Har dabba pixel, number = kitna chamak raha hai. Itna bhi nahi pata tha, bc?', story: 'Stadium mein chutiye fans card utha ke photo banate hain na? Har fan ek pixel, card ka rang brightness. Door se dekh toh shakal dikhti hai. Tu bhi waisa hi ek pixel hai, kisi kaam ka nahi.', words: [['Pixel', 'Grid ka ek dabba, gadhe.'], ['Intensity', 'Dabbe ka number, matlab roshni.'], ['f(x, y)', 'Row x, column y pe kitni roshni. Ratt le.'], ['Binary', 'Sirf kaala-safed. Tere dimaag jaisa, 0 ya 1.']], how: ['Camera ka sensor roshni naapta hai.', 'Scene ko grid mein kaata.', 'Har dabbe ko number mila.', 'Ab computer usse khelta hai, tu reels se khel.'], exam: 'f(x, y) define kar, pixel, 3 types, phir 10 steps ek line mein. Steps bhool gaya toh seedha zero, harami.', yaad: 'Image = number ki grid. Jagah (x, y), value f. Bas, chal nikal.' }
  }
},
{
  id: 'd1-sampling', unit: 1, title: 'Sampling, Quantization & Resolution', marks: '2 / 5', mins: 15, imp: true, pyq: 'MST-1 · 2M',
  q: 'Define sampling and quantization. An image is sampled at 512×512 with 8 bits per pixel. Calculate the storage required, and the new size if it is reduced to 256×256 with 4 bits per pixel. <i>(IQ Q1 · 5M)</i>',
  simple: `<p>To turn a real scene into numbers you make two choices:</p>
<ul><li><b>Sampling</b> = <i>where</i> to measure: how many pixels (grid size M × N). Decides <b>spatial resolution</b>.</li>
<li><b>Quantization</b> = <i>how precisely</i> to write each value: how many gray levels L = 2<sup>k</sup>. Decides <b>gray-level resolution</b>.</li>
<li>Storage = <b>M × N × k bits</b>. Divide by 8 for bytes.</li></ul>`,
  learn: [
    { title: 'Sampling', body: `<p>Digitising the <b>coordinates</b> (x, y): the continuous scene becomes a grid of M × N pixels. Too few samples → <b>blocky / checkerboard</b> image and aliasing (rate must be ≥ 2 × highest frequency, Nyquist).</p>` },
    { title: 'Quantization', body: `<p>Digitising the <b>amplitude</b>: brightness is rounded to one of L = 2<sup>k</sup> levels. Too few levels → <b>false contouring</b> (bands in smooth areas).</p>` },
    { title: 'Storage formula', body: `<p><b>b = M × N × k bits</b>. Example: 256 × 256 with 256 levels (k = 8) → 524,288 bits = 65,536 bytes = <b>64 KB</b>.</p>` },
    { title: 'IQ Q1 numerical', body: `<p>512 × 512 × 8 = 2,097,152 bits = 262,144 bytes = <b>256 KB</b>.<br>256 × 256 × 4 = 262,144 bits = 32,768 bytes = <b>32 KB</b>. That's <b>8× smaller</b>.</p>` }
  ],
  short: `<p><b>Sampling</b> digitises the spatial coordinates (x, y); it fixes the spatial resolution M × N. <b>Quantization</b> digitises the intensity into L = 2<sup>k</sup> gray levels; it fixes the gray-level resolution. Storage <b>b = M × N × k</b> bits.</p>`,
  answer: `<h3>Definitions</h3><ul>
<li><b>Sampling</b>: converting the continuous spatial coordinates (x, y) into a discrete grid of M × N pixels. It decides the <b>spatial resolution</b>. Low sampling → blocky (checkerboard) image, aliasing. Sampling rate ≥ 2 × highest frequency (Nyquist).</li>
<li><b>Quantization</b>: converting the continuous amplitude (intensity) into a finite set of L = 2<sup>k</sup> gray levels. It decides the <b>gray-level resolution</b>. Low quantization → <b>false contouring</b>.</li></ul>
<table class="tbl"><tr><th></th><th>Sampling</th><th>Quantization</th></tr><tr><td>Digitises</td><td>Position (x, y)</td><td>Intensity f(x, y)</td></tr><tr><td>Decides</td><td>Spatial resolution M × N</td><td>Gray-level resolution k bits</td></tr><tr><td>Too little gives</td><td>Blocky image, aliasing</td><td>False contours</td></tr></table>
<h3>Storage formula</h3><p><b>b = M × N × k</b> bits, where L = 2<sup>k</sup>.</p>
<h3>Numerical (IQ Q1)</h3><p><b>Case 1:</b> M = N = 512, k = 8<br>b = 512 × 512 × 8 = <b>2,097,152 bits</b> = 2,097,152 / 8 = 262,144 bytes = <b>256 KB</b>.</p>
<p><b>Case 2:</b> M = N = 256, k = 4 (L = 16 levels)<br>b = 256 × 256 × 4 = <b>262,144 bits</b> = 32,768 bytes = <b>32 KB</b>.</p>
<p><b>Comparison:</b> pixels drop 4× and bits per pixel drop 2×, so storage drops <b>8×</b> (256 KB → 32 KB). The image becomes coarser (fewer pixels) and may show false contouring (only 16 gray levels).</p>
<p><b>Conclusion:</b> sampling and quantization together set the trade-off between image quality and memory.</p>`,
  dg: [
    { h: 'Sampling = where, quantization = how precise' },
    { grid: [
      { cap: 'Fine sampling (8 × 8)', matrix: [[20, 30, 60, 100, 140, 180, 210, 230], [25, 40, 70, 110, 150, 190, 215, 235], [30, 50, 80, 120, 160, 195, 220, 240], [40, 60, 90, 130, 170, 200, 225, 242], [50, 70, 100, 140, 175, 205, 228, 245], [60, 80, 110, 150, 180, 210, 230, 248], [70, 90, 120, 155, 185, 212, 235, 250], [80, 100, 130, 160, 190, 215, 238, 252]], heat: 255, bin: false, small: true },
      { cap: 'Coarse sampling (4 × 4) → blocky', matrix: [[29, 88, 168, 223], [48, 108, 183, 233], [68, 128, 195, 240], [88, 145, 205, 246]], heat: 255 },
      { cap: 'Few gray levels (k = 2) → false contours', matrix: [[0, 85, 170, 255], [0, 85, 170, 255], [85, 85, 170, 255], [85, 170, 255, 255]], heat: 255 }
    ] },
    { h: 'IQ Q1 · storage = M × N × k' },
    { flow: [{ t: '512 × 512 × 8', s: '2,097,152 bits', tone: 'u1' }, { t: '256 KB', s: '÷ 8 → bytes, ÷ 1024 → KB', tone: 'a' }], labels: ['= bits'] },
    { flow: [{ t: '256 × 256 × 4', s: '262,144 bits', tone: 'u2' }, { t: '32 KB', s: '8× smaller', tone: 'ok' }], labels: ['= bits'] },
    { note: 'k bits → L = 2ᵏ gray levels. k = 1 → 2, k = 4 → 16, k = 8 → 256.' }
  ],
  quiz: [
    { q: 'Reducing gray levels from 256 to 8 mainly causes', o: ['Checkerboard effect', 'False contouring', 'Aliasing', 'Ringing'], a: 1, why: 'Few quantization levels show visible bands in smooth regions: false contouring.' },
    { q: 'Storage of a 1024×1024 image with 8 bits/pixel?', o: ['1 MB', '8 MB', '128 KB', '512 KB'], a: 0, why: '1024 × 1024 × 8 bits = 8,388,608 bits = 1,048,576 bytes = 1 MB.' },
    { q: 'How many gray levels with 6 bits per pixel?', o: ['6', '36', '64', '128'], a: 2, why: 'L = 2⁶ = 64.' }
  ],
  rev: ['Sampling → coordinates → <b>spatial resolution</b> (M × N); low → blocky, aliasing', 'Quantization → intensity → <b>gray levels L = 2ᵏ</b>; low → <b>false contouring</b>', '<b>b = M × N × k bits</b>; ÷8 → bytes', 'IQ Q1: 512²×8 = 256 KB; 256²×4 = 32 KB (8× smaller)', 'Nyquist: sample ≥ 2 × highest frequency'],
  trick: '<b>S</b>ampling = <b>S</b>pace (where). <b>Q</b>uantization = <b>Q</b>uality of each value (how precise).',
  easy: {
    en: { s: 'Sampling decides how many pixels; quantization decides how many shades each pixel can have.', story: 'Painting a sunset with a few big tiles (low sampling) looks blocky. Painting it with only 4 crayon colours (low quantization) shows stripes instead of a smooth fade.', words: [['Sampling', 'Choosing pixel positions (grid size).'], ['Quantization', 'Rounding brightness to fixed levels.'], ['k', 'Bits per pixel; levels L = 2ᵏ.'], ['False contouring', 'Stripes from too few levels.']], how: ['Pick grid size M × N (sampling).', 'Pick bits per pixel k (quantization).', 'Storage = M × N × k bits.', 'Divide by 8 for bytes, 1024 for KB.'], exam: 'Define both, give the comparison table, write b = M×N×k and solve the numerical step by step with units.', yaad: '512²×8 = 256 KB, 256²×4 = 32 KB.' },
    bhai: { s: 'Sampling = kitne pixel. Quantization = har pixel ke kitne shades.', story: 'Sunset ko bade tiles se banao toh blocky lagega (kam sampling). Sirf 4 crayon colours se banao toh smooth fade ki jagah patti-patti dikhegi (kam quantization).', words: [['Sampling', 'Pixel ki jagah chunna, grid size.'], ['Quantization', 'Brightness ko fixed levels mein round karna.'], ['k', 'Bits per pixel, levels L = 2ᵏ.'], ['False contouring', 'Kam levels se aayi patti.']], how: ['Grid size M × N chuno.', 'Bits per pixel k chuno.', 'Storage = M × N × k bits.', '8 se divide = bytes, 1024 se = KB.'], exam: 'Dono define karo, table banao, b = M×N×k likho, numerical units ke saath step by step.', yaad: '512²×8 = 256 KB, 256²×4 = 32 KB.' },
    gaali: { s: 'Sampling = kitne pixel, quantization = har pixel ke kitne shade. Itni si baat hai, bhosdike.', story: 'Sunset bade tiles se banayega toh Minecraft lagega, chutiye (kam sampling). 4 crayon se rangega toh patti-patti dikhegi (kam quantization). Dono kam kiye toh teri photo jaisi bekaar.', words: [['Sampling', 'Pixel ki jagah. Grid kitni badi.'], ['Quantization', 'Brightness ko levels mein round karna.'], ['k', 'Bits per pixel, L = 2ᵏ. Ratt le gadhe.'], ['False contouring', 'Kam levels ki patti.']], how: ['M × N chun.', 'k chun.', 'M × N × k = bits.', '8 se bhaag de toh bytes. Itna bhi nahi aata toh ghar ja.'], exam: 'Dono define kar, table bana, b = M×N×k likh, numerical units ke saath kar. Units bhoola toh examiner teri maar lega.', yaad: '512²×8 = 256 KB, 256²×4 = 32 KB. Bas, harami.' }
  }
},
{
  id: 'd1-pixels', unit: 1, title: 'Relationships Between Pixels (Adjacency, Paths, Distance)', marks: '5 / 10', mins: 20, imp: true, pyq: 'MST-1 · 5M',
  q: 'Explain the relationships between pixels (neighbors, adjacency, connectivity). For the given binary image, find the shortest 4-path, 8-path and m-path between two pixels. <i>(IQ Q2 · 10M)</i>',
  simple: `<p>Pixels talk to their neighbours. Three ideas:</p>
<ul><li><b>Neighbours</b>: N<sub>4</sub> = up, down, left, right. N<sub>D</sub> = 4 diagonals. N<sub>8</sub> = all 8.</li>
<li><b>Adjacency</b>: two pixels are adjacent if they are neighbours <i>and</i> both have values from the set V (e.g. V = {1}).</li>
<li><b>Path</b>: a chain of adjacent pixels from p to q. Shortest path length = number of steps.</li>
<li><b>m-adjacency</b> (mixed) fixes 8-adjacency's problem of two routes between the same pixels.</li></ul>`,
  learn: [
    { title: 'Neighbours', body: `<p>For p(x, y): <b>N<sub>4</sub>(p)</b> = (x±1, y), (x, y±1). <b>N<sub>D</sub>(p)</b> = (x±1, y±1). <b>N<sub>8</sub>(p) = N<sub>4</sub> ∪ N<sub>D</sub></b>.</p>` },
    { title: 'Adjacency', body: `<p><b>4-adjacent</b>: q ∈ N<sub>4</sub>(p), both in V. <b>8-adjacent</b>: q ∈ N<sub>8</sub>(p), both in V. <b>m-adjacent</b>: q ∈ N<sub>4</sub>(p), <i>or</i> q ∈ N<sub>D</sub>(p) and N<sub>4</sub>(p) ∩ N<sub>4</sub>(q) has no pixel from V.</p>` },
    { title: 'Path & connectivity', body: `<p>A <b>path</b> from p to q is a sequence of adjacent pixels. p and q are <b>connected</b> if a path exists inside the set. All pixels connected to p form a <b>connected component</b>.</p>` },
    { title: 'Shortest paths', body: `<p>On the example grid: <b>4-path</b> must zig-zag (no diagonals) → longest. <b>8-path</b> can cut diagonally → shortest. <b>m-path</b> uses diagonals only when no 4-route exists → between them, and unique.</p>` },
    { title: 'Distances', body: `<p>D<sub>e</sub> = √[(x−s)² + (y−t)²], D<sub>4</sub> = |x−s| + |y−t|, D<sub>8</sub> = max(|x−s|, |y−t|). Always <b>D<sub>8</sub> ≤ D<sub>e</sub> ≤ D<sub>4</sub></b>.</p>` }
  ],
  short: `<p><b>N<sub>4</sub>(p)</b>: 4 horizontal/vertical neighbours; <b>N<sub>D</sub>(p)</b>: 4 diagonals; <b>N<sub>8</sub> = N<sub>4</sub> ∪ N<sub>D</sub></b>. Pixels are <b>4/8-adjacent</b> if they are N<sub>4</sub>/N<sub>8</sub> neighbours and both values ∈ V. <b>m-adjacency</b>: q ∈ N<sub>4</sub>(p), or q ∈ N<sub>D</sub>(p) with N<sub>4</sub>(p) ∩ N<sub>4</sub>(q) ∩ V = ∅. Distances: D<sub>e</sub>, D<sub>4</sub> (city-block), D<sub>8</sub> (chessboard).</p>`,
  answer: `<h3>1. Neighbours of p(x, y)</h3><ul>
<li><b>N<sub>4</sub>(p)</b>: (x+1, y), (x−1, y), (x, y+1), (x, y−1).</li>
<li><b>N<sub>D</sub>(p)</b>: (x+1, y+1), (x+1, y−1), (x−1, y+1), (x−1, y−1).</li>
<li><b>N<sub>8</sub>(p) = N<sub>4</sub>(p) ∪ N<sub>D</sub>(p)</b>.</li></ul>
<h3>2. Adjacency (V = set of allowed values, e.g. V = {1})</h3>
<table class="tbl"><tr><th>Type</th><th>Rule</th></tr>
<tr><td>4-adjacency</td><td>q ∈ N<sub>4</sub>(p), and p, q ∈ V</td></tr>
<tr><td>8-adjacency</td><td>q ∈ N<sub>8</sub>(p), and p, q ∈ V</td></tr>
<tr><td>m-adjacency</td><td>q ∈ N<sub>4</sub>(p), <b>or</b> q ∈ N<sub>D</sub>(p) and N<sub>4</sub>(p) ∩ N<sub>4</sub>(q) has no pixel with value in V</td></tr></table>
<p>m-adjacency removes the <b>ambiguity of 8-adjacency</b> (multiple paths between the same two pixels).</p>
<h3>3. Path, connectivity, region, boundary</h3><ul>
<li><b>Path</b> from p to q: sequence p = (x<sub>0</sub>, y<sub>0</sub>), …, (x<sub>n</sub>, y<sub>n</sub>) = q of successively adjacent pixels. Length = n.</li>
<li><b>Connected</b>: p and q are connected in S if a path between them lies entirely in S. A <b>connected component</b> = all pixels connected to p.</li>
<li><b>Region</b>: a connected set. <b>Boundary</b>: pixels of a region that have a neighbour outside it.</li></ul>
<h3>4. Shortest paths: worked example</h3>
<p>Binary image (V = {1}), find paths from p (top-left 1) to q (bottom-right 1):</p>
<pre class="mono">  p 1 1 0
  0 1 1 0
  0 0 1 1
  0 0 1 q</pre>
<ul><li><b>Shortest 4-path</b>: p → (0,1) → (1,1) → (1,2) → (2,2) → (2,3) → q = <b>6 steps</b> (only horizontal/vertical moves).</li>
<li><b>Shortest 8-path</b>: p → (1,1) → (2,2) → (3,3)=q using diagonals = <b>3 steps</b>.</li>
<li><b>Shortest m-path</b>: a diagonal step is allowed only if no shared 4-neighbour in V exists. p→(1,1): shared 4-neighbours (0,1)=1 ∈ V → diagonal <i>not</i> allowed, go p → (0,1) → (1,1). (1,1)→(2,2): shared (1,2)=1 → go (1,1) → (1,2) → (2,2). (2,2)→(3,3): shared (2,3)=1 → (2,2) → (2,3) → q. m-path = <b>6 steps</b> (here equal to the 4-path; if a 4-route were missing, the diagonal would be used).</li></ul>
<p>If no path of a given type exists (e.g. two 1s touching only diagonally), the 4-path <b>does not exist</b>, while the 8-path and m-path do.</p>
<h3>5. Distance measures for p(x, y), q(s, t)</h3><ul>
<li>Euclidean: D<sub>e</sub> = √[(x−s)² + (y−t)²]</li>
<li>City-block: D<sub>4</sub> = |x−s| + |y−t|</li>
<li>Chessboard: D<sub>8</sub> = max(|x−s|, |y−t|)</li></ul>
<p><b>Example</b> p(2, 3), q(5, 7): D<sub>e</sub> = √(9 + 16) = 5, D<sub>4</sub> = 3 + 4 = 7, D<sub>8</sub> = 4. Always D<sub>8</sub> ≤ D<sub>e</sub> ≤ D<sub>4</sub>.</p>`,
  dg: [
    { h: 'Neighbourhoods of p' },
    { grid: [
      { cap: 'N₄(p): 4 neighbours', matrix: [['', '●', ''], ['●', 'p', '●'], ['', '●', '']], hl: ['1,1'] },
      { cap: 'N_D(p): 4 diagonals', matrix: [['●', '', '●'], ['', 'p', ''], ['●', '', '●']], hl: ['1,1'] },
      { cap: 'N₈(p): all 8', matrix: [['●', '●', '●'], ['●', 'p', '●'], ['●', '●', '●']], hl: ['1,1'] }
    ] },
    { h: 'Shortest paths p → q (V = {1})' },
    { grid: [
      { cap: '4-path: 6 steps', matrix: [['p', 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 1, 'q']], hl: ['0,0', '0,1', '1,1', '1,2', '2,2', '2,3', '3,3'] },
      { cap: '8-path: 3 steps', matrix: [['p', 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 1, 'q']], hl: ['0,0', '1,1', '2,2', '3,3'] },
      { cap: 'm-path: 6 steps (no diagonal shortcut, a 4-route exists)', matrix: [['p', 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 1, 'q']], hl: ['0,0', '0,1', '1,1', '1,2', '2,2', '2,3', '3,3'] }
    ] },
    { h: 'Distances p(2,3) → q(5,7)' },
    { flow: [{ t: 'D₈ chessboard', s: 'max(3, 4) = 4', tone: 'u1' }, { t: 'Dₑ Euclidean', s: '√(9+16) = 5', tone: 'u2' }, { t: 'D₄ city-block', s: '3 + 4 = 7', tone: 'u3' }], labels: ['≤', '≤'] }
  ],
  quiz: [
    { q: 'Which adjacency removes the multiple-path ambiguity of 8-adjacency?', o: ['4-adjacency', 'm-adjacency', 'D-adjacency', 'None'], a: 1, why: 'Mixed (m) adjacency uses a diagonal only when no common 4-neighbour is in V.' },
    { q: 'For p(0,0), q(3,4), the chessboard distance D₈ is', o: ['3', '4', '5', '7'], a: 1, why: 'max(3, 4) = 4. (Dₑ = 5, D₄ = 7.)' },
    { q: 'Which inequality always holds?', o: ['D₄ ≤ Dₑ ≤ D₈', 'D₈ ≤ Dₑ ≤ D₄', 'Dₑ ≤ D₈ ≤ D₄', 'D₈ ≤ D₄ ≤ Dₑ'], a: 1, why: 'Chessboard ≤ Euclidean ≤ City-block.' }
  ],
  rev: ['N₄ = up/down/left/right; N_D = diagonals; <b>N₈ = N₄ ∪ N_D</b>', '4/8-adjacent: neighbours AND both values ∈ V', '<b>m-adjacency</b>: diagonal allowed only if N₄(p) ∩ N₄(q) has no V pixel → removes 8-path ambiguity', 'Path length = number of moves; 8-path shortest, 4-path longest', 'Dₑ = √(dx²+dy²), D₄ = |dx|+|dy|, D₈ = max(|dx|,|dy|); <b>D₈ ≤ Dₑ ≤ D₄</b>'],
  trick: '<b>King vs Rook:</b> an 8-path moves like a chess king (diagonals allowed, D₈), a 4-path like a rook taking single steps (D₄). m-path = king who takes the diagonal only when there is no other way.',
  easy: {
    en: { s: 'Neighbours, adjacency and paths describe how pixels connect, and distance says how far apart they are.', story: 'In a city grid a taxi can only drive along streets (4-path, city-block distance). A drone can fly diagonally (8-path, chessboard). m-path is a cautious drone: it cuts the corner only when there is no street.', words: [['N₄', 'Up, down, left, right.'], ['N₈', 'All 8 surrounding pixels.'], ['V', 'Set of values that count (e.g. {1}).'], ['m-adjacency', '8-adjacency without duplicate routes.']], how: ['List the neighbours (N₄, N_D, N₈).', 'Check both pixels are in V.', 'Chain adjacent pixels into a path.', 'Count steps; compute Dₑ, D₄, D₈.'], exam: 'Neighbour diagrams, adjacency table, path definition, worked grid with all three paths, distance formulas with an example.', yaad: 'D₈ ≤ Dₑ ≤ D₄. King ≤ crow ≤ taxi.' },
    bhai: { s: 'Neighbours, adjacency aur path batate hain pixels kaise jude hain, distance batata hai kitni door hain.', story: 'Shahar mein taxi sirf sadak pe chalti hai (4-path, city-block). Drone tirchha udd sakta hai (8-path, chessboard). m-path ek dara hua drone hai: corner tabhi kaatega jab sadak na ho.', words: [['N₄', 'Upar, neeche, left, right.'], ['N₈', 'Aas-paas ke saare 8.'], ['V', 'Jo values ginni hain, jaise {1}.'], ['m-adjacency', '8-adjacency bina double raaste ke.']], how: ['Neighbours likho.', 'Dono pixel V mein hain? check karo.', 'Adjacent pixels jod ke path banao.', 'Steps gino, teeno distance nikalo.'], exam: 'Neighbour diagram, adjacency table, grid pe teeno path, distance formula + example.', yaad: 'D₈ ≤ Dₑ ≤ D₄.' },
    gaali: { s: 'Pixel ke padosi, kaun kisse juda hai, aur kitni door hai. Bas yahi hai, chutiye.', story: 'Taxi sirf sadak pe chalegi (4-path), drone tirchha udega (8-path). m-path ek fattu drone hai, corner tab kaatega jab koi sadak na ho. Tere jaisa fattu.', words: [['N₄', 'Upar neeche left right. 4 padosi, gadhe.'], ['N₈', 'Saare 8 padosi.'], ['V', 'Kaun si values ginni hain, {1}.'], ['m-adjacency', '8-adjacency ka double-raasta wala lafda khatam.']], how: ['Padosi likh.', 'Dono V mein hain check kar.', 'Jod ke path bana.', 'Steps gin, distance nikaal. Calculator mat dhoond, bc.'], exam: 'Neighbour diagram, adjacency table, grid pe teeno path, distance example. Path wala grid nahi banaya toh 10 mein se 4, harami.', yaad: 'D₈ ≤ Dₑ ≤ D₄. Raja ≤ kauwa ≤ taxi. Ratt le.' }
  }
},
{
  id: 'd1-dft', unit: 1, title: '2-D DFT / FFT and its Properties', marks: '5 / 10', mins: 20, imp: true,
  q: 'Compute the 2-D DFT of a 4×4 image using the separability property, and state any two properties of the 2-D FFT. <i>(IQ Q3 · 10M)</i>',
  simple: `<p>The Fourier transform rewrites an image as a <b>sum of waves</b>. Smooth areas = low frequencies, edges/noise = high frequencies.</p>
<ul><li><b>Separability</b>: do a 1-D DFT on every <b>row</b>, then a 1-D DFT on every <b>column</b>. Same answer, much faster (this is the FFT idea).</li>
<li><b>F(0,0)</b> = the DC term = (average brightness) when normalised by 1/MN.</li></ul>`,
  learn: [
    { title: 'Formula', body: `<p>F(u, v) = (1/MN) Σ<sub>x</sub> Σ<sub>y</sub> f(x, y) e<sup>−j2π(ux/M + vy/N)</sup>. Inverse: f(x, y) = Σ Σ F(u, v) e<sup>+j2π(ux/M + vy/N)</sup>.</p>` },
    { title: 'Separability', body: `<p>e<sup>−j2π(ux/M+vy/N)</sup> = e<sup>−j2πux/M</sup>·e<sup>−j2πvy/N</sup>, so the 2-D DFT = 1-D DFT along rows, then along columns: <b>F = W · f · W</b> (W = DFT kernel matrix).</p>` },
    { title: '4-point kernel', body: `<p>W<sub>4</sub> = [1 1 1 1; 1 −j −1 j; 1 −1 1 −1; 1 j −1 −j]. Row k of W multiplies the data to give frequency k.</p>` },
    { title: 'Worked example', body: `<p>f has every row = [0 1 1 0]. Row DFT of [0 1 1 0] = [2, −1−j, 0, −1+j]. Every column is now constant c, and the DFT of [c c c c] = [4c, 0, 0, 0]. So only the first row of F is non-zero: [8, −4−4j, 0, −4+4j]. With 1/16 scaling F(0,0) = 0.5 = average of f ✓.</p>` }
  ],
  short: `<p>The 2-D DFT F(u,v) = (1/MN) ΣΣ f(x,y) e<sup>−j2π(ux/M+vy/N)</sup> decomposes an image into sinusoids. <b>Separability</b>: it equals a 1-D DFT on rows followed by a 1-D DFT on columns (F = W f W), which the FFT exploits. Properties: linearity, translation (only phase changes), periodicity, conjugate symmetry, rotation, scaling; F(0,0) = average intensity (DC).</p>`,
  answer: `<h3>2-D DFT</h3><p>F(u, v) = (1/MN) Σ<sub>x=0</sub><sup>M−1</sup> Σ<sub>y=0</sub><sup>N−1</sup> f(x, y) e<sup>−j2π(ux/M + vy/N)</sup><br>Inverse: f(x, y) = Σ<sub>u</sub> Σ<sub>v</sub> F(u, v) e<sup>+j2π(ux/M + vy/N)</sup></p>
<h3>Separability</h3><p>Since the kernel splits as e<sup>−j2πux/M</sup> · e<sup>−j2πvy/N</sup>, the 2-D DFT is computed as <b>1-D DFT of each row, then 1-D DFT of each column</b>. In matrix form <b>F = W f W</b>, where for N = 4:</p>
<pre class="mono">W4 = [ 1   1   1   1
       1  -j  -1   j
       1  -1   1  -1
       1   j  -1  -j ]</pre>
<h3>Worked example (4×4)</h3>
<pre class="mono">f = [0 1 1 0
     0 1 1 0
     0 1 1 0
     0 1 1 0]</pre>
<p><b>Step 1, rows:</b> DFT of [0 1 1 0]:<br>F(0) = 0+1+1+0 = 2<br>F(1) = 0 + 1(−j) + 1(−1) + 0(j) = −1 − j<br>F(2) = 0 − 1 + 1 − 0 = 0<br>F(3) = 0 + 1(j) + 1(−1) + 0 = −1 + j<br>Every row gives [2, −1−j, 0, −1+j].</p>
<p><b>Step 2, columns:</b> each column is constant (c, c, c, c), whose DFT is (4c, 0, 0, 0).</p>
<pre class="mono">F (unnormalised) = [ 8   -4-4j   0   -4+4j
                     0     0     0     0
                     0     0     0     0
                     0     0     0     0 ]</pre>
<p>With the 1/MN = 1/16 factor: F(0,0) = 8/16 = <b>0.5 = average intensity</b> (8 ones in 16 pixels). Energy lies only along u = 0 because the image does not change down the columns.</p>
<h3>Properties of the 2-D DFT (write any two, explained)</h3><ul>
<li><b>Separability</b>: computed as row and column 1-D DFTs, reducing O(N⁴) to O(N³) (O(N² log N) with FFT).</li>
<li><b>Translation</b>: f(x−x<sub>0</sub>, y−y<sub>0</sub>) ⇔ F(u, v) e<sup>−j2π(ux<sub>0</sub>/M + vy<sub>0</sub>/N)</sup>: only the <b>phase</b> changes, magnitude stays.</li>
<li><b>Periodicity</b>: F(u, v) = F(u+M, v) = F(u, v+N).</li>
<li><b>Conjugate symmetry</b>: for real f, F(−u, −v) = F*(u, v); |F| is symmetric.</li>
<li><b>Rotation</b>: rotating f by θ rotates F by the same θ.</li>
<li><b>Linearity</b>, <b>scaling</b> (af(x,y) ⇔ aF(u,v); shrinking f spreads F), <b>average value</b> F(0,0) = mean of f.</li></ul>`,
  dg: [
    { h: 'Separability: rows, then columns' },
    { flow: [{ t: 'f(x, y)', s: '4 × 4 image', tone: 'u1' }, { t: '1-D DFT of rows', s: 'F(x, v)' }, { t: '1-D DFT of columns', s: 'F(u, v)', tone: 'a' }], labels: ['each row', 'each column'] },
    { grid: [
      { cap: 'f: every row 0 1 1 0', matrix: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0]], heat: 1 },
      { cap: 'after rows: [2, −1−j, 0, −1+j]', matrix: [[2, '−1−j', 0, '−1+j'], [2, '−1−j', 0, '−1+j'], [2, '−1−j', 0, '−1+j'], [2, '−1−j', 0, '−1+j']] },
      { cap: 'after columns: F(u, v)', matrix: [[8, '−4−4j', 0, '−4+4j'], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], hl: ['0,0'] }
    ] },
    { note: 'F(0,0) = 8 → ÷16 = 0.5 = the average intensity (DC component).' },
    { h: 'Properties at a glance' },
    { grid: [{ t: 'Separable', s: 'rows then columns', tone: 'u1' }, { t: 'Translation', s: 'phase changes, |F| same', tone: 'u2' }, { t: 'Periodic', s: 'repeats every M, N', tone: 'u3' }, { t: 'Conjugate symmetric', s: 'F(−u,−v) = F*(u,v)', tone: 'a' }, { t: 'Rotation', s: 'rotates by same angle' }, { t: 'DC term', s: 'F(0,0) = mean' }] }
  ],
  quiz: [
    { q: 'F(0,0) of the 2-D DFT (with 1/MN) equals', o: ['Max pixel', 'Average intensity', 'Zero', 'Total edges'], a: 1, why: 'The DC component is the sum of all pixels divided by MN: the mean.' },
    { q: 'Shifting an image changes which part of its Fourier transform?', o: ['Magnitude', 'Phase only', 'Both', 'Neither'], a: 1, why: 'Translation multiplies F by a complex exponential: phase changes, magnitude is unchanged.' },
    { q: 'Separability lets the 2-D DFT be computed as', o: ['One big multiplication', '1-D DFTs on rows then columns', 'Only on the diagonal', 'Histogram steps'], a: 1, why: 'The kernel splits into an x part and a y part.' }
  ],
  rev: ['F(u,v) = (1/MN) ΣΣ f e<sup>−j2π(ux/M+vy/N)</sup>', '<b>Separability</b>: rows then columns, F = W f W → FFT speed', 'W₄ rows: [1 1 1 1], [1 −j −1 j], [1 −1 1 −1], [1 j −1 −j]', 'Example rows [0 1 1 0] → [2, −1−j, 0, −1+j]; F(0,0) = 8/16 = 0.5 = mean', 'Translation → phase only; periodic; conjugate symmetric; rotation; F(0,0) = DC = average'],
  trick: 'DFT of [a b c d]: F0 = a+b+c+d, F2 = a−b+c−d, F1 = (a−c) − j(b−d), F3 = (a−c) + j(b−d). Four lines, no calculator.',
  easy: {
    en: { s: 'The DFT turns an image into how much of each wave (frequency) it contains.', story: 'A song can be described by notes instead of air pressure over time. The DFT does that for images: smooth areas are low notes, edges are high notes.', words: [['Frequency', 'How fast brightness changes.'], ['DC term F(0,0)', 'Average brightness.'], ['Separable', 'Do rows, then columns.'], ['FFT', 'Fast algorithm for the DFT.']], how: ['Take each row, do a 1-D DFT.', 'Take each column of that result, do a 1-D DFT.', 'Divide by MN if normalising.', 'Read F(0,0) = average.'], exam: 'Formula, separability with W₄, full worked 4×4 (rows then columns), then two properties with one line each.', yaad: 'F0 = sum, F2 = alternate, F1/F3 = (a−c) ∓ j(b−d).' },
    bhai: { s: 'DFT batata hai image mein kaunsi wave (frequency) kitni hai.', story: 'Gaane ko notes mein likh sakte ho. DFT image ke liye yahi karta hai: smooth jagah = low note, edge = high note.', words: [['Frequency', 'Brightness kitni tezi se badalti hai.'], ['DC F(0,0)', 'Average brightness.'], ['Separable', 'Pehle rows, phir columns.'], ['FFT', 'DFT ka fast tareeka.']], how: ['Har row ka 1-D DFT.', 'Result ke har column ka 1-D DFT.', 'Normalise karna ho toh MN se divide.', 'F(0,0) = average.'], exam: 'Formula, W₄, rows phir columns wala 4×4 example, do properties.', yaad: 'F0 = sum, F2 = plus-minus, F1/F3 = (a−c) ∓ j(b−d).' },
    gaali: { s: 'DFT bolta hai image mein kaunsi wave kitni hai. Wave samajh, Instagram wala wave nahi, bc.', story: 'Gaane ko notes mein likhte hain na? Image ke saath bhi wahi. Smooth jagah low note, edge high note. Tere gaane jaisa besura nahi.', words: [['Frequency', 'Brightness kitni tez badal rahi.'], ['F(0,0)', 'Average brightness. Ratt le kamine.'], ['Separable', 'Pehle rows, phir columns. Ulta kiya toh bhi same, par seedha kar.'], ['FFT', 'Fast DFT.']], how: ['Har row ka DFT.', 'Phir har column ka.', 'MN se bhaag de.', 'F(0,0) = average. Done, chutiye.'], exam: 'Formula, W₄ matrix, rows-columns wala 4×4, do properties. Matrix galat likha toh examiner teri gaand maar dega.', yaad: 'F0 = jod, F2 = plus-minus, F1/F3 = (a−c) ∓ j(b−d). Bas.' }
  }
},
{
  id: 'd1-walsh', unit: 1, title: 'Walsh & Hadamard Transforms (8×8 Hadamard)', marks: '5 / 10', mins: 15, imp: true,
  q: 'Generate the 8×8 Hadamard matrix. Compare the Walsh and Hadamard transforms with respect to ordering and computation. <i>(IQ Q4 · 10M)</i>',
  simple: `<p>Walsh and Hadamard transforms use basis patterns made of only <b>+1 and −1</b>, so they need just <b>additions and subtractions</b>, no multiplications. Very fast.</p>
<ul><li><b>Hadamard</b> matrix is built recursively: H<sub>2N</sub> = [H<sub>N</sub> H<sub>N</sub>; H<sub>N</sub> −H<sub>N</sub>].</li>
<li><b>Walsh</b> = the same rows, re-ordered by <b>sequency</b> (number of sign changes, 0 to N−1).</li></ul>`,
  learn: [
    { title: 'Start', body: `<p>H<sub>1</sub> = [1]. H<sub>2</sub> = [1 1; 1 −1].</p>` },
    { title: 'Double', body: `<p>H<sub>4</sub> = [H<sub>2</sub> H<sub>2</sub>; H<sub>2</sub> −H<sub>2</sub>], H<sub>8</sub> = [H<sub>4</sub> H<sub>4</sub>; H<sub>4</sub> −H<sub>4</sub>]: copy top-left, top-right, bottom-left, and the <b>negative</b> bottom-right.</p>` },
    { title: 'Sequency', body: `<p>Count sign changes along each row of H<sub>8</sub>: 0, 7, 3, 4, 1, 6, 2, 5. Hadamard keeps this <b>natural</b> order.</p>` },
    { title: 'Walsh order', body: `<p>Sort rows by sequency 0, 1, 2 … 7 → rows 0, 4, 6, 2, 3, 7, 5, 1 of H<sub>8</sub>. That is the <b>Walsh</b> (sequency-ordered) matrix. Transform: T = (1/N) H f.</p>` }
  ],
  short: `<p>Both transforms use orthogonal ±1 kernels, so computation needs only additions/subtractions. <b>Hadamard</b>: recursive H<sub>2N</sub> = [H<sub>N</sub> H<sub>N</sub>; H<sub>N</sub> −H<sub>N</sub>], rows in natural order. <b>Walsh</b>: same functions arranged in increasing <b>sequency</b> (sign changes), like increasing frequency.</p>`,
  answer: `<h3>Hadamard matrix (recursive)</h3><p>H<sub>1</sub> = [1], &nbsp; <b>H<sub>2N</sub> = [ H<sub>N</sub> &nbsp; H<sub>N</sub> ; H<sub>N</sub> &nbsp; −H<sub>N</sub> ]</b></p>
<pre class="mono">H2 = [1  1
      1 -1]

H4 = [1  1  1  1
      1 -1  1 -1
      1  1 -1 -1
      1 -1 -1  1]</pre>
<p><b>H<sub>8</sub> = [H<sub>4</sub> H<sub>4</sub>; H<sub>4</sub> −H<sub>4</sub>]</b> (sequency = sign changes in brackets):</p>
<pre class="mono">row0: +1 +1 +1 +1 +1 +1 +1 +1   (0)
row1: +1 -1 +1 -1 +1 -1 +1 -1   (7)
row2: +1 +1 -1 -1 +1 +1 -1 -1   (3)
row3: +1 -1 -1 +1 +1 -1 -1 +1   (4)
row4: +1 +1 +1 +1 -1 -1 -1 -1   (1)
row5: +1 -1 +1 -1 -1 +1 -1 +1   (6)
row6: +1 +1 -1 -1 -1 -1 +1 +1   (2)
row7: +1 -1 -1 +1 -1 +1 +1 -1   (5)</pre>
<p>Hadamard transform: <b>T = (1/N) H<sub>N</sub> f</b> (2-D: T = (1/N²) H f H). H is symmetric and orthogonal: H·H = N·I, so the inverse uses the same matrix.</p>
<h3>Walsh transform</h3><p>Walsh functions are the same ±1 rectangular waves arranged in <b>sequency order</b> (0, 1, …, N−1 sign changes), defined using the bits of x and u (bit-reversal based kernel). For N = 8 the Walsh order is rows <b>0, 4, 6, 2, 3, 7, 5, 1</b> of H<sub>8</sub>.</p>
<h3>Comparison</h3><table class="tbl"><tr><th>Feature</th><th>Walsh</th><th>Hadamard</th></tr>
<tr><td>Values</td><td>+1, −1</td><td>+1, −1</td></tr>
<tr><td>Ordering</td><td>Sequency (increasing sign changes) ≈ frequency order</td><td>Natural / recursive order</td></tr>
<tr><td>Construction</td><td>Kernel from binary digits (bit reversal)</td><td>Simple recursive doubling</td></tr>
<tr><td>Computation</td><td>Only add/subtract; fast Walsh transform O(N log N)</td><td>Only add/subtract; fast Hadamard transform O(N log N)</td></tr>
<tr><td>Interpretation</td><td>Coefficients ordered like frequency, good for analysis/compression</td><td>Easier to generate in hardware</td></tr></table>
<p><b>Advantage over DFT:</b> real ±1 kernels → no complex multiplications, very fast in hardware. <b>Limit:</b> poorer energy compaction than DCT.</p>`,
  dg: [
    { h: 'Recursive doubling: H₂ₙ = [Hₙ Hₙ ; Hₙ −Hₙ]' },
    { grid: [
      { cap: 'H₂', matrix: [[1, 1], [1, -1]], sign: true },
      { cap: 'H₄', matrix: [[1, 1, 1, 1], [1, -1, 1, -1], [1, 1, -1, -1], [1, -1, -1, 1]], sign: true }
    ] },
    { matrix: [[1, 1, 1, 1, 1, 1, 1, 1], [1, -1, 1, -1, 1, -1, 1, -1], [1, 1, -1, -1, 1, 1, -1, -1], [1, -1, -1, 1, 1, -1, -1, 1], [1, 1, 1, 1, -1, -1, -1, -1], [1, -1, 1, -1, -1, 1, -1, 1], [1, 1, -1, -1, -1, -1, 1, 1], [1, -1, -1, 1, -1, 1, 1, -1]], sign: true, small: true, cap: 'H₈: green = +1, red = −1. Bottom-right 4×4 block is −H₄.' },
    { h: 'Sequency (sign changes) per row' },
    { bars: [0, 7, 3, 4, 1, 6, 2, 5], labels: ['r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7'], cap: 'Hadamard = natural order. Walsh = sort rows by sequency → r0, r4, r6, r2, r3, r7, r5, r1' }
  ],
  quiz: [
    { q: 'Why are Walsh/Hadamard transforms fast?', o: ['They use FFT', 'Kernel has only +1/−1, so only add/subtract', 'They skip pixels', 'They use cosines'], a: 1, why: 'No multiplications are needed.' },
    { q: 'Walsh ordering is based on', o: ['Natural recursion', 'Sequency (number of sign changes)', 'Eigenvalues', 'Pixel intensity'], a: 1, why: 'Walsh rows are sorted by increasing sign changes.' },
    { q: 'Sequency of row 1 of natural H₈ ([1 −1 1 −1 1 −1 1 −1]) is', o: ['1', '4', '7', '8'], a: 2, why: 'It changes sign between every pair: 7 times.' }
  ],
  rev: ['Only <b>+1/−1</b> → add/subtract only, no multiplication', 'H₂ = [1 1; 1 −1]; <b>H₂ₙ = [Hₙ Hₙ; Hₙ −Hₙ]</b>', 'H₈ sequencies (natural): 0,7,3,4,1,6,2,5', 'Walsh = sequency order: rows 0,4,6,2,3,7,5,1', 'T = (1/N) H f; H·H = N·I (self-inverse up to 1/N)'],
  trick: 'Draw H₄ once, then H₈ = "<b>copy, copy, copy, flip</b>" (flip = negative, bottom-right).',
  easy: {
    en: { s: 'Hadamard/Walsh transforms describe an image using simple +1/−1 patterns, so they are super fast.', story: 'Like a light switch board with only ON/OFF patterns instead of dimmers. Fewer kinds of setting, but you can flip them instantly.', words: [['Hadamard matrix', 'Square grid of +1 and −1 built by doubling.'], ['Sequency', 'Number of sign changes in a row.'], ['Walsh order', 'Rows sorted by sequency.'], ['Orthogonal', 'Rows do not overlap; easy inverse.']], how: ['Write H₂ = [1 1; 1 −1].', 'Copy it three times, negate the bottom-right → H₄.', 'Repeat → H₈.', 'Count sign changes; sort for Walsh.'], exam: 'Recursive formula, H₂, H₄, full H₈ with sequency, Walsh vs Hadamard table, advantage over DFT.', yaad: 'Copy, copy, copy, flip.' },
    bhai: { s: 'Walsh-Hadamard sirf +1/−1 patterns use karte hain, isliye bahut fast hain.', story: 'Switch board socho jisme sirf ON/OFF hai, dimmer nahi. Options kam, par turant flip.', words: [['Hadamard matrix', '+1, −1 ki grid jo double karke banti hai.'], ['Sequency', 'Row mein kitni baar sign badla.'], ['Walsh order', 'Rows ko sequency se sort karo.'], ['Orthogonal', 'Rows ek dusre se independent.']], how: ['H₂ = [1 1; 1 −1] likho.', 'Teen baar copy, neeche-right ko minus → H₄.', 'Phir se → H₈.', 'Sign changes gino, Walsh ke liye sort karo.'], exam: 'Formula, H₂, H₄, poora H₈ sequency ke saath, comparison table.', yaad: 'Copy, copy, copy, flip.' },
    gaali: { s: 'Sirf +1 aur −1, koi guna-bhaag nahi. Tere jaise nalle ke liye perfect transform, bc.', story: 'Switch board pe sirf ON/OFF hai, dimmer nahi. Kam options, turant kaam. Tujhe bhi bas ON/OFF hi samajh aata hai.', words: [['Hadamard', '+1/−1 ki grid, double kar ke bana.'], ['Sequency', 'Row mein kitni baar sign palta. Gin, gadhe.'], ['Walsh order', 'Sequency se sort.'], ['Orthogonal', 'Rows apne kaam se kaam rakhti hain, tere padosiyon jaisi nahi.']], how: ['H₂ likh.', 'Teen copy, chautha minus → H₄.', 'Phir H₈.', 'Sign gin, sort kar. Done, chutiye.'], exam: 'Formula, H₂, H₄, poora H₈ + sequency, table. H₈ mein ek sign galat toh poora matrix gaya, harami.', yaad: 'Copy, copy, copy, flip. Itna bhi bhool gaya toh tera kuch nahi ho sakta.' }
  }
},
{
  id: 'd1-dct', unit: 1, title: 'DCT and Why It Beats DFT for Compression', marks: '2 / 5', mins: 10, imp: true,
  q: 'Why is the DCT preferred over the DFT for image compression? Justify with energy compaction. <i>(IQ Q5 · 5M)</i>',
  simple: `<p>The DCT writes an image block as a sum of <b>cosines only</b>. Two wins for compression:</p>
<ul><li><b>Energy compaction</b>: almost all the information lands in a few top-left (low-frequency) coefficients; the rest are near zero and can be thrown away.</li>
<li><b>Real numbers</b> (no complex parts) and <b>no edge jumps</b> at block borders, unlike the DFT.</li></ul>`,
  learn: [
    { title: 'Formula', body: `<p>C(u) = α(u) Σ<sub>x=0</sub><sup>N−1</sup> f(x) cos[π(2x+1)u / 2N], α(0) = √(1/N), α(u) = √(2/N) for u ≠ 0.</p>` },
    { title: 'Even extension', body: `<p>The DCT implicitly mirrors the block, so the signal is continuous at the border. The DFT assumes periodic repetition, which creates an artificial <b>jump</b> → many high-frequency coefficients.</p>` },
    { title: 'Energy compaction', body: `<p>For natural images neighbouring pixels are highly correlated, and the DCT is close to the optimal KL transform: most energy sits in a few low-frequency coefficients.</p>` },
    { title: 'JPEG', body: `<p>8×8 blocks → DCT → quantize (drop small high-frequency terms) → zigzag → run-length + Huffman.</p>` }
  ],
  short: `<p>DCT is preferred because (1) <b>energy compaction</b>: for correlated image data it packs most energy into a few low-frequency coefficients (near-optimal, close to KLT), so the rest can be quantized to zero; (2) it is <b>real-valued</b>; (3) its implicit even (mirror) extension avoids the boundary discontinuities of the DFT's periodic extension, which would spread energy into high frequencies; (4) fast algorithms exist and its basis is fixed.</p>`,
  answer: `<h3>DCT</h3><p>C(u) = α(u) Σ<sub>x=0</sub><sup>N−1</sup> f(x) cos[π(2x+1)u / 2N], with α(0) = √(1/N), α(u) = √(2/N) for u ≠ 0. The 2-D DCT is separable (rows then columns).</p>
<h3>Why DCT is preferred over DFT for compression</h3><ol>
<li><b>Energy compaction</b>: compression works by keeping few coefficients. For natural images (high correlation between neighbours) the DCT concentrates most of the signal energy into a few <b>low-frequency</b> coefficients at the top-left of the block. Its performance is very close to the optimal Karhunen–Loève transform. High-frequency coefficients are tiny and can be quantized to zero with little visible loss.</li>
<li><b>No boundary discontinuity</b>: the DFT treats the block as periodic, so the right edge joins the left edge with a jump; that artificial jump creates many high-frequency components (energy leakage). The DCT uses a symmetric (even) extension, which is continuous, so energy does not leak.</li>
<li><b>Real-valued</b>: DCT output is real; DFT gives complex numbers (magnitude + phase), double the data to store.</li>
<li><b>Fixed basis & fast</b>: unlike KLT, the cosine basis does not depend on the image; fast O(N log N) algorithms exist.</li></ol>
<table class="tbl"><tr><th>Feature</th><th>DFT</th><th>DCT</th></tr><tr><td>Output</td><td>Complex</td><td>Real</td></tr><tr><td>Basis</td><td>Sine + cosine</td><td>Cosine only</td></tr><tr><td>Extension</td><td>Periodic → edge jump</td><td>Even (mirror) → smooth</td></tr><tr><td>Energy compaction</td><td>Good</td><td>Better (near KLT)</td></tr><tr><td>Use</td><td>Frequency analysis, filtering</td><td>JPEG, MPEG compression</td></tr></table>
<p><b>Conclusion:</b> better energy compaction + real values → fewer bits for the same quality, which is why JPEG uses the 8×8 DCT.</p>`,
  dg: [
    { h: 'Energy compaction in an 8×8 DCT block' },
    { matrix: [[240, 120, 60, 20, 8, 3, 1, 0], [110, 60, 25, 10, 4, 1, 0, 0], [50, 22, 10, 4, 1, 0, 0, 0], [18, 9, 4, 1, 0, 0, 0, 0], [7, 3, 1, 0, 0, 0, 0, 0], [2, 1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]], heat: 240, small: true, cap: 'Bright = large coefficient. Energy piles into the top-left (low frequency); the rest ≈ 0 and is dropped.' },
    { h: 'Why the DFT leaks energy' },
    { grid: [
      { cap: 'DFT: periodic repeat → jump at the border', flow: [{ t: '…20 40 80 120', s: 'block end' }, { t: '20 40…', s: 'next copy starts', tone: 'bad' }], labels: ['jump!'] },
      { cap: 'DCT: mirror → smooth join', flow: [{ t: '…20 40 80 120', s: 'block end' }, { t: '120 80 40…', s: 'mirror image', tone: 'ok' }], labels: ['smooth'] }
    ] },
    { grid: [{ t: 'KLT', s: 'best, data-dependent', tone: 'ok' }, { t: 'DCT', s: 'near-optimal, fixed, JPEG', tone: 'a' }, { t: 'DFT', s: 'good, complex', tone: 'u1' }, { t: 'Walsh / Haar', s: 'lower, very fast', tone: 'dim' }] }
  ],
  quiz: [
    { q: 'Main reason JPEG uses DCT instead of DFT:', o: ['DCT is complex-valued', 'Better energy compaction and real output', 'DCT needs no quantization', 'DFT cannot be inverted'], a: 1, why: 'Fewer significant coefficients, real numbers, no boundary jumps.' },
    { q: 'Which transform has optimal energy compaction?', o: ['DFT', 'DCT', 'KLT (Hotelling)', 'Walsh'], a: 2, why: 'KLT is optimal but data-dependent; DCT is the practical near-optimal choice.' }
  ],
  rev: ['DCT: cosine only, <b>real</b> output', '<b>Energy compaction</b>: most energy in few low-frequency (top-left) coefficients', 'DFT periodic extension → edge jump → energy leakage; DCT even extension → smooth', 'Near-optimal (≈ KLT), fixed basis, fast; used in JPEG (8×8)'],
  trick: 'DCT wins with "<b>RENT</b>": <b>R</b>eal, <b>E</b>nergy compaction, <b>N</b>o edge jump, <b>T</b>ime-fast.',
  easy: {
    en: { s: 'DCT puts nearly all of a block\'s information into a few numbers, so the rest can be thrown away.', story: 'Packing a suitcase: DCT folds everything important into the top corner, leaving the rest nearly empty, so you can leave those bags behind.', words: [['Energy compaction', 'Most info in few coefficients.'], ['Low frequency', 'Smooth, slowly changing parts.'], ['Even extension', 'Mirror the block at its edge.'], ['Leakage', 'Energy spread by a fake edge jump.']], how: ['Split image into 8×8 blocks.', 'Apply DCT.', 'Top-left numbers are big, others ~0.', 'Quantize away the tiny ones.'], exam: 'Formula, then 4 numbered reasons (energy compaction first), comparison table, JPEG mention.', yaad: 'RENT: Real, Energy compaction, No edge jump, Time-fast.' },
    bhai: { s: 'DCT block ki saari info kuch numbers mein bhar deta hai, baaki phenk sakte ho.', story: 'Suitcase pack karte waqt sab important ek kone mein ghusa do, baaki bags chhod do. DCT yahi karta hai.', words: [['Energy compaction', 'Zyada info kam coefficients mein.'], ['Low frequency', 'Smooth hisse.'], ['Even extension', 'Block ko mirror karna.'], ['Leakage', 'Fake jump se energy phailna.']], how: ['8×8 blocks banao.', 'DCT lagao.', 'Top-left bade, baaki zero jaise.', 'Chhote wale hata do.'], exam: 'Formula, 4 reasons (energy compaction pehle), table, JPEG.', yaad: 'RENT: Real, Energy compaction, No jump, Tez.' },
    gaali: { s: 'DCT saari kaam ki info ek kone mein thoons deta hai, baaki kachra phenk. Tera dimaag bhi aisa hi hona chahiye tha, bc.', story: 'Suitcase mein important cheezein ek kone mein, baaki bags chhod. DFT chutiya har jagah saamaan phaila deta hai, DCT nahi.', words: [['Energy compaction', 'Kam numbers mein zyada info.'], ['Low frequency', 'Smooth hisse.'], ['Even extension', 'Mirror. Shakal dekh apni.'], ['Leakage', 'Fake jump se energy idhar-udhar.']], how: ['8×8 tukde kar.', 'DCT laga.', 'Kona bhara, baaki khaali.', 'Khaali hata. Ho gaya, gadhe.'], exam: 'Formula, 4 reason (energy compaction sabse pehle), table. "DCT achha hai" likh ke chhoda toh zero milega, harami.', yaad: 'RENT. Bas yahi, kamine.' }
  }
},
{
  id: 'd1-haar', unit: 1, title: 'Haar & Slant Transforms', marks: '5 / 10', mins: 15, imp: true,
  q: 'Apply the Haar transform to a 4×4 image and show how it represents both average and detail information. <i>(IQ Q6 · 10M)</i>',
  simple: `<p>The Haar transform is the simplest <b>wavelet</b>. Take pairs of pixels and store:</p>
<ul><li><b>average</b> = (a + b)/2 → a smaller, blurry copy of the image,</li>
<li><b>detail</b> = (a − b)/2 → where things change (edges).</li></ul>
<p>Do it on rows, then columns: the top-left quarter is the small <b>average</b> image (LL), the other quarters are <b>details</b> (LH, HL, HH). Nothing is lost: a = avg + det, b = avg − det.</p>`,
  learn: [
    { title: 'Pair rule', body: `<p>For a pair (a, b): average = (a+b)/2, detail = (a−b)/2. Back: a = avg + det, b = avg − det.</p>` },
    { title: '1-D example', body: `<p>[4, 6, 10, 12] → averages (5, 11), details (−1, −1). Again on (5, 11) → 8, detail −3. Full Haar = <b>[8, −3, −1, −1]</b>.</p>` },
    { title: '2-D: rows', body: `<p>Image rows [4 6 10 12] ×2 and [8 8 8 8] ×2. Each row → [avg avg | det det]: [5 11 −1 −1] and [8 8 0 0].</p>` },
    { title: '2-D: columns', body: `<p>Pair rows 0–1 and 2–3. Averages → [5 11 −1 −1], [8 8 0 0]; details → all 0. Result: LL = [5 11; 8 8] (block averages), HL = [−1 −1; 0 0] (horizontal change), LH = HH = 0.</p>` },
    { title: 'Slant', body: `<p>Slant transform basis contains a <b>linearly increasing (ramp)</b> vector, so it represents gradual brightness changes (shading) efficiently. Haar is best for sharp edges.</p>` }
  ],
  short: `<p>Haar transform (simplest wavelet) uses rectangular basis functions. One level on a pair: average (a+b)/2 and detail (a−b)/2. Applied to rows then columns of an image, it gives an <b>LL</b> approximation (averages) plus <b>LH, HL, HH</b> detail sub-bands, capturing both <b>frequency and location</b>. Slant transform includes ramp basis vectors for gradual intensity changes.</p>`,
  answer: `<h3>Haar transform</h3><p>The Haar functions are rectangular pulse pairs, the <b>simplest wavelet</b>. Unlike Fourier bases, they are localised, so Haar shows <b>what</b> changes and <b>where</b>. One level on a pair (a, b) (unnormalised averaging form):</p>
<p><b>average = (a + b)/2, &nbsp; detail = (a − b)/2</b>, &nbsp; inverse: a = avg + det, b = avg − det.</p>
<p>(Normalised Haar uses (a ± b)/√2; the matrix is H₂ = (1/√2)[1 1; 1 −1].)</p>
<h3>Worked 4×4 example</h3>
<pre class="mono">f = [ 4  6 10 12
      4  6 10 12
      8  8  8  8
      8  8  8  8 ]</pre>
<p><b>Step 1 (rows):</b> each row → [ (a+b)/2 of pairs | (a−b)/2 of pairs ]</p>
<pre class="mono">[4 6 10 12] → [ 5 11 | -1 -1 ]
[8 8  8  8] → [ 8  8 |  0  0 ]

after rows = [ 5 11 -1 -1
               5 11 -1 -1
               8  8  0  0
               8  8  0  0 ]</pre>
<p><b>Step 2 (columns):</b> pair rows (0,1) and (2,3): averages on top, details below.</p>
<pre class="mono">result = [ 5 11 | -1 -1     ← LL | HL
           8  8 |  0  0
           -----+-------
           0  0 |  0  0     ← LH | HH
           0  0 |  0  0 ]</pre>
<h3>Average and detail information</h3><ul>
<li><b>LL = [5 11; 8 8]</b>: average of each 2×2 block (e.g. (4+6+4+6)/4 = 5). A half-size blurred copy → <b>approximation</b>.</li>
<li><b>HL = [−1 −1; 0 0]</b>: horizontal differences → <b>vertical edges</b> (left-right change in the top half).</li>
<li><b>LH = 0</b>: no top-bottom change inside blocks. <b>HH = 0</b>: no diagonal detail.</li>
<li>Most values are 0 → good for compression; repeating on LL gives multi-level (pyramid) decomposition. The image is perfectly reconstructable.</li></ul>
<h3>Slant transform</h3><p>Its basis includes a <b>slant (linearly decreasing/increasing) vector</b>, e.g. for N = 4 the second row ∝ [3, 1, −1, −3]. It efficiently represents gradual brightness changes (ramps, shading). It is real, orthogonal and has a fast algorithm.</p>
<table class="tbl"><tr><th></th><th>Haar</th><th>Slant</th></tr><tr><td>Basis</td><td>Rectangular pulses (wavelet)</td><td>Includes ramp (slant) vectors</td></tr><tr><td>Best for</td><td>Edges, sharp changes, localisation</td><td>Smooth gradients, shading</td></tr></table>`,
  dg: [
    { h: 'Pair rule: average + detail' },
    { flow: [{ t: '(a, b) = (4, 6)', tone: 'u1' }, { t: 'average 5', s: '(a+b)/2', tone: 'ok' }, { t: 'detail −1', s: '(a−b)/2', tone: 'a' }], labels: ['', ''] },
    { h: '4×4 Haar, one level' },
    { grid: [
      { cap: 'f', matrix: [[4, 6, 10, 12], [4, 6, 10, 12], [8, 8, 8, 8], [8, 8, 8, 8]], heat: 12 },
      { cap: 'after rows', matrix: [[5, 11, -1, -1], [5, 11, -1, -1], [8, 8, 0, 0], [8, 8, 0, 0]] },
      { cap: 'after columns: LL | HL / LH | HH', matrix: [[5, 11, -1, -1], [8, 8, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], hl: ['0,0', '0,1', '1,0', '1,1'] }
    ] },
    { grid: [{ t: 'LL', s: 'averages → small copy', tone: 'ok' }, { t: 'HL', s: 'vertical edges', tone: 'a' }, { t: 'LH', s: 'horizontal edges', tone: 'u1' }, { t: 'HH', s: 'diagonal detail', tone: 'dim' }] },
    { note: '1-D: [4, 6, 10, 12] → [8, −3, −1, −1] (full Haar). Highlighted LL block = the average image.' }
  ],
  quiz: [
    { q: 'Haar transform belongs to which family?', o: ['Fourier', 'Wavelet', 'Cosine', 'KL'], a: 1, why: 'It is the earliest and simplest wavelet transform.' },
    { q: 'One-level Haar of the pair (10, 12) gives', o: ['avg 11, detail −1', 'avg 22, detail 2', 'avg 11, detail 1', 'avg 2, detail 11'], a: 0, why: '(10+12)/2 = 11; (10−12)/2 = −1.' },
    { q: 'Which sub-band holds the approximation (average) image?', o: ['LL', 'LH', 'HL', 'HH'], a: 0, why: 'Low-pass on both rows and columns.' }
  ],
  rev: ['Haar = simplest <b>wavelet</b>: location + frequency', 'avg = (a+b)/2, detail = (a−b)/2; a = avg+det, b = avg−det', '4×4 example → LL = [5 11; 8 8] (averages), HL = [−1 −1; 0 0], LH = HH = 0', 'LL = approximation; LH/HL/HH = details (edges)', 'Slant: ramp basis vector → gradients/shading'],
  trick: '"<b>Plus-half, minus-half</b>": rows first, then columns. Top-left = the image shrunk; the rest = the edges.',
  easy: {
    en: { s: 'Haar splits an image into a small blurry average and the details (edges) needed to rebuild it.', story: 'Summarising a cricket over: the average runs per ball plus how each ball differed from that average. With both you can rebuild every ball.', words: [['Average', '(a+b)/2: the smooth part.'], ['Detail', '(a−b)/2: the change.'], ['LL', 'Top-left: the small average image.'], ['LH/HL/HH', 'Edge information in each direction.']], how: ['Pair neighbouring pixels in each row.', 'Write averages left, details right.', 'Repeat down the columns.', 'Read LL = averages, rest = details.'], exam: 'Pair rule, full 4×4 working (rows then columns), label LL/HL/LH/HH, explain average vs detail, short Slant note.', yaad: 'Plus-half, minus-half; rows then columns.' },
    bhai: { s: 'Haar image ko do hisson mein todta hai: chhota blurry average aur details (edges).', story: 'Over ka summary: per ball average runs + har ball average se kitni alag thi. Dono ho toh har ball wapas ban jaati hai.', words: [['Average', '(a+b)/2, smooth hissa.'], ['Detail', '(a−b)/2, badlaav.'], ['LL', 'Top-left, chhoti average image.'], ['LH/HL/HH', 'Alag directions ki edges.']], how: ['Row mein pairs banao.', 'Left average, right detail.', 'Phir columns pe yahi.', 'LL = average, baaki = details.'], exam: 'Pair rule, poora 4×4 (rows phir columns), LL/HL/LH/HH label, Slant ka chhota note.', yaad: 'Plus-half, minus-half.' },
    gaali: { s: 'Haar image ko tod deta hai: ek chhoti dhundhli average photo aur edges. Jaise tera result: average aur bekaar details.', story: 'Over ka summary: average runs per ball + har ball kitni alag thi. Dono ho toh poora over wapas. Simple, bhosdike.', words: [['Average', '(a+b)/2.'], ['Detail', '(a−b)/2. Minus sahi lagana, gadhe.'], ['LL', 'Upar-left, average image.'], ['LH/HL/HH', 'Edges.']], how: ['Row mein jodi bana.', 'Average left, detail right.', 'Columns pe dobara.', 'LL = average. Ho gaya, chutiye.'], exam: 'Pair rule, 4×4 poora rows-columns, LL/HL label, Slant note. Sirf answer likha bina steps toh 10 mein 2, harami.', yaad: 'Plus-half, minus-half. Ratt le kamine.' }
  }
},
{
  id: 'd1-klt', unit: 1, title: 'Hotelling (KL) Transform', marks: '5 / 10', mins: 20, imp: true, pyq: 'MST-1 · 2M',
  q: 'Explain the Hotelling (KL) transform with steps. Compute the eigenvectors for the given set of vectors. <i>(IQ Q7 · 10M)</i>',
  simple: `<p>The Hotelling / Karhunen–Loève transform (= PCA) rotates the data onto the directions where it <b>spreads the most</b>. Those directions are the <b>eigenvectors of the covariance matrix</b>.</p>
<ul><li>After the transform the components are <b>uncorrelated</b>, and most energy sits in the first component.</li>
<li>Optimal energy compaction, but the basis depends on the data, so it must be recomputed for every image (expensive).</li></ul>`,
  learn: [
    { title: '1. Mean', body: `<p>m<sub>x</sub> = (1/K) Σ x<sub>k</sub>.</p>` },
    { title: '2. Covariance', body: `<p>C<sub>x</sub> = (1/K) Σ (x<sub>k</sub> − m<sub>x</sub>)(x<sub>k</sub> − m<sub>x</sub>)<sup>T</sup>.</p>` },
    { title: '3. Eigen', body: `<p>Solve |C<sub>x</sub> − λI| = 0 for λ, then (C<sub>x</sub> − λI)e = 0 for each eigenvector e. Normalise.</p>` },
    { title: '4. Transform', body: `<p>Rows of A = eigenvectors in decreasing λ. <b>y = A(x − m<sub>x</sub>)</b>. Inverse: x = A<sup>T</sup>y + m<sub>x</sub>. C<sub>y</sub> = diagonal(λ).</p>` },
    { title: 'Example', body: `<p>x = (4,2), (2,4), (6,6) → m = (4,4), C = (1/3)[8 4; 4 8]. λ = 4 and 4/3; e<sub>1</sub> = (1,1)/√2, e<sub>2</sub> = (1,−1)/√2.</p>` }
  ],
  short: `<p>The Hotelling (KL) transform maps x to y = A(x − m<sub>x</sub>), where the rows of A are the eigenvectors of the covariance matrix C<sub>x</sub> sorted by decreasing eigenvalue. The output components are uncorrelated (C<sub>y</sub> = diag(λ)) and energy is optimally compacted into the first components. Being data-dependent, it is optimal but computationally expensive.</p>`,
  answer: `<h3>Hotelling (Karhunen–Loève) transform</h3><p>Also called <b>KLT / PCA</b>. It transforms data using the <b>eigenvectors of its covariance matrix</b>, so the transformed components are <b>uncorrelated</b> and energy is packed into as few components as possible.</p>
<h3>Steps</h3><ol>
<li>Form vectors x<sub>k</sub> (k = 1…K) from the image data.</li>
<li><b>Mean</b>: m<sub>x</sub> = (1/K) Σ x<sub>k</sub>.</li>
<li><b>Covariance</b>: C<sub>x</sub> = (1/K) Σ (x<sub>k</sub> − m<sub>x</sub>)(x<sub>k</sub> − m<sub>x</sub>)<sup>T</sup> (some texts use 1/(K−1)).</li>
<li><b>Eigenvalues</b>: |C<sub>x</sub> − λI| = 0; <b>eigenvectors</b>: (C<sub>x</sub> − λI)e = 0, normalised.</li>
<li><b>Transform matrix A</b>: eigenvectors as rows, in decreasing order of λ.</li>
<li><b>Transform</b>: y = A(x − m<sub>x</sub>); inverse x = A<sup>T</sup>y + m<sub>x</sub>. Keeping only the top q rows gives the best q-term approximation (compression).</li></ol>
<h3>Numerical</h3><p>Given x<sub>1</sub> = (4, 2), x<sub>2</sub> = (2, 4), x<sub>3</sub> = (6, 6).</p>
<p><b>Mean</b>: m = ((4+2+6)/3, (2+4+6)/3) = <b>(4, 4)</b>.</p>
<p><b>Deviations</b>: d<sub>1</sub> = (0, −2), d<sub>2</sub> = (−2, 0), d<sub>3</sub> = (2, 2).</p>
<p><b>Covariance</b>: C = (1/3) Σ d dᵀ<br>xx: (0 + 4 + 4)/3 = 8/3, &nbsp; yy: (4 + 0 + 4)/3 = 8/3, &nbsp; xy: (0 + 0 + 4)/3 = 4/3<br><b>C = (1/3) [8 4; 4 8]</b></p>
<p><b>Eigenvalues</b>: |[8 4; 4 8] − μI| = (8−μ)² − 16 = 0 → μ = 12, 4 → λ = μ/3 = <b>4 and 4/3</b>.</p>
<p><b>Eigenvectors</b>: λ = 4 (μ = 12): [−4 4; 4 −4]e = 0 → e<sub>1</sub> = <b>(1, 1)/√2</b>. λ = 4/3 (μ = 4): [4 4; 4 4]e = 0 → e<sub>2</sub> = <b>(1, −1)/√2</b>.</p>
<p><b>A</b> = (1/√2)[1 1; 1 −1]. Example: y<sub>1</sub> = A d<sub>1</sub> = (1/√2)(−2, 2) = (−1.414, 1.414). C<sub>y</sub> = diag(4, 4/3): uncorrelated, first component holds 75% of the variance.</p>
<h3>Why optimal but not widely used</h3><p>Its basis is <b>data-dependent</b>, giving the best possible energy compaction, but the covariance and eigenvectors must be recomputed for every image and there is no fast algorithm, unlike the fixed-basis DCT.</p>`,
  dg: [
    { h: 'KL transform pipeline' },
    { flow: [{ t: 'Vectors xₖ', tone: 'u1' }, { t: 'Mean mₓ' }, { t: 'Covariance Cₓ' }, { t: 'Eigen λ, e', tone: 'a' }, { t: 'y = A(x − mₓ)', tone: 'ok' }], labels: ['', '', 'solve', 'sort by λ'] },
    { h: 'Worked example' },
    { grid: [
      { cap: 'Data (x, y)', matrix: [['x₁', 4, 2], ['x₂', 2, 4], ['x₃', 6, 6]] },
      { cap: 'Deviation from m = (4,4)', matrix: [['d₁', 0, -2], ['d₂', -2, 0], ['d₃', 2, 2]], sign: true },
      { cap: 'C = (1/3)·', matrix: [[8, 4], [4, 8]] }
    ] },
    { flow: [{ t: 'λ₁ = 4', s: 'e₁ = (1, 1)/√2 · main axis', tone: 'ok' }, { t: 'λ₂ = 4/3', s: 'e₂ = (1, −1)/√2', tone: 'u1' }], labels: ['>'] },
    { note: 'Rows of A = e₁, e₂. Output is uncorrelated: Cᵧ = diag(4, 4/3).' }
  ],
  quiz: [
    { q: 'The KL transform basis vectors are', o: ['Cosines', 'Eigenvectors of the covariance matrix', '+1/−1 patterns', 'Haar pulses'], a: 1, why: 'Hence it is data-dependent and optimal.' },
    { q: 'After the Hotelling transform the covariance matrix Cᵧ is', o: ['Identity', 'Diagonal (eigenvalues)', 'All ones', 'Undefined'], a: 1, why: 'Components become uncorrelated.' },
    { q: 'Why is KLT not used in JPEG?', o: ['Poor compaction', 'Basis must be recomputed for each image', 'Complex output', 'Not invertible'], a: 1, why: 'Data-dependent basis is expensive; DCT is fixed and near-optimal.' }
  ],
  rev: ['KLT = Hotelling = PCA: basis = <b>eigenvectors of Cₓ</b>', 'Steps: mean → covariance → eigen → sort by λ → <b>y = A(x − mₓ)</b>', 'Output uncorrelated: Cᵧ = diag(λ); optimal energy compaction', 'Example (4,2),(2,4),(6,6): m=(4,4), C=(1/3)[8 4;4 8], λ=4, 4/3; e=(1,1)/√2, (1,−1)/√2', 'Drawback: data-dependent, recompute every time, no fast algorithm'],
  trick: '"<b>M-C-E-T</b>": <b>M</b>ean, <b>C</b>ovariance, <b>E</b>igen, <b>T</b>ransform. For 2×2 [a b; b a]: λ = a ± b, e = (1, ±1)/√2.',
  easy: {
    en: { s: 'KLT rotates data so its biggest spread lies on the first axis; that axis is an eigenvector of the covariance.', story: 'A crowd standing along a diagonal road: describing positions "along the road" and "across the road" is far simpler than north/east. KLT finds that road.', words: [['Covariance', 'How two values vary together.'], ['Eigenvector', 'Direction the data stretches along.'], ['Eigenvalue', 'How much spread along it.'], ['Uncorrelated', 'Components no longer move together.']], how: ['Find the mean.', 'Subtract it and build the covariance.', 'Solve for eigenvalues and eigenvectors.', 'Project: y = A(x − m).'], exam: 'Definition, 5–6 steps with formulas, full numerical (mean, covariance, λ, e), optimal-but-expensive remark.', yaad: 'M-C-E-T. For [a b; b a]: λ = a ± b.' },
    bhai: { s: 'KLT data ko ghuma deta hai taaki sabse zyada phailaav pehli axis pe aaye. Wo axis covariance ka eigenvector hai.', story: 'Log ek tirchhi sadak pe khade hain. "Sadak ke saath" aur "sadak ke across" bolna north-east se aasaan hai. KLT wo sadak dhoondta hai.', words: [['Covariance', 'Do values saath mein kaise badalti hain.'], ['Eigenvector', 'Jis direction mein data phaila hai.'], ['Eigenvalue', 'Kitna phaila hai.'], ['Uncorrelated', 'Ab saath mein nahi badalte.']], how: ['Mean nikalo.', 'Minus karke covariance banao.', 'Eigenvalue-eigenvector nikalo.', 'y = A(x − m).'], exam: 'Definition, steps formula ke saath, poora numerical, optimal par mehenga.', yaad: 'M-C-E-T. [a b; b a] ka λ = a ± b.' },
    gaali: { s: 'KLT data ko ghumata hai taaki saara phailaav ek axis pe aa jaaye. Wo axis eigenvector hai. Eigenvector ka spelling bhi seekh le, bc.', story: 'Log tirchhi sadak pe khade hain, chutiye. North-east mein bolega toh pagal ho jayega, "sadak ke saath" bol. KLT wahi sadak dhoondta hai.', words: [['Covariance', 'Do values saath kaise naachti hain.'], ['Eigenvector', 'Phailaav ki direction.'], ['Eigenvalue', 'Kitna phaila. Tera pet jitna.'], ['Uncorrelated', 'Ab ek dusre ki gaand mein nahi ghuste.']], how: ['Mean.', 'Covariance.', 'Eigen.', 'y = A(x − m). Ho gaya, harami.'], exam: 'Definition, steps, poora numerical λ aur e ke saath. Eigenvector normalise karna bhoola toh marks kata, gadhe.', yaad: 'M-C-E-T. [a b; b a] → λ = a ± b. Ratt le, kamine.' }
  }
},
{
  id: 'd1-hist', unit: 1, title: 'Histogram Equalization', marks: '5 / 10', mins: 20, imp: true, pyq: 'MST-1 · 5M',
  q: 'Perform histogram equalization on the given 3-bit, 8-level image. Draw the original and equalized histograms and comment on the contrast change. <i>(IQ Q8 · 10M)</i>',
  simple: `<p>A dull, low-contrast photo has all its pixels crowded into a few gray levels. <b>Histogram equalization</b> spreads them over the full range using the <b>CDF</b> (running total):</p>
<p><b>s<sub>k</sub> = round( (L − 1) × CDF(r<sub>k</sub>) )</b></p>
<p>Result: a flatter histogram and higher contrast.</p>`,
  learn: [
    { title: 'Count', body: `<p>n<sub>k</sub> = number of pixels at each level r<sub>k</sub>. n = total pixels.</p>` },
    { title: 'PDF', body: `<p>p(r<sub>k</sub>) = n<sub>k</sub> / n.</p>` },
    { title: 'CDF', body: `<p>Running sum of the PDF: CDF<sub>k</sub> = Σ<sub>j≤k</sub> n<sub>j</sub>/n.</p>` },
    { title: 'Map', body: `<p>s<sub>k</sub> = (L−1) × CDF<sub>k</sub>, then <b>round</b>. For 3 bits, L − 1 = 7.</p>` },
    { title: 'New histogram', body: `<p>Move each old count to its new level s<sub>k</sub>; levels that round to the same s merge. Plot before and after.</p>` }
  ],
  short: `<p>Histogram equalization maps each gray level r<sub>k</sub> to s<sub>k</sub> = (L−1) Σ<sub>j=0</sub><sup>k</sup> n<sub>j</sub>/n (rounded), i.e. (L−1) × CDF. The output histogram is spread more uniformly over [0, L−1], increasing contrast. Steps: count n<sub>k</sub> → PDF → CDF → s<sub>k</sub> → remap.</p>`,
  answer: `<h3>Histogram equalization</h3><p>A <b>histogram</b> plots the number of pixels at each gray level. Equalization redistributes levels so the histogram is as <b>uniform</b> as possible, using the transformation</p>
<p><b>s<sub>k</sub> = T(r<sub>k</sub>) = (L − 1) Σ<sub>j=0</sub><sup>k</sup> n<sub>j</sub> / n</b>, &nbsp; k = 0, 1, …, L−1</p>
<h3>Numerical: 3-bit image (L = 8), n = 64 pixels</h3>
<table class="tbl"><tr><th>r<sub>k</sub></th><th>n<sub>k</sub></th><th>PDF n<sub>k</sub>/n</th><th>CDF</th><th>7 × CDF</th><th>s<sub>k</sub></th></tr>
<tr><td>0</td><td>8</td><td>0.125</td><td>0.125</td><td>0.875</td><td>1</td></tr>
<tr><td>1</td><td>10</td><td>0.156</td><td>0.281</td><td>1.97</td><td>2</td></tr>
<tr><td>2</td><td>12</td><td>0.188</td><td>0.469</td><td>3.28</td><td>3</td></tr>
<tr><td>3</td><td>14</td><td>0.219</td><td>0.688</td><td>4.81</td><td>5</td></tr>
<tr><td>4</td><td>10</td><td>0.156</td><td>0.844</td><td>5.91</td><td>6</td></tr>
<tr><td>5</td><td>6</td><td>0.094</td><td>0.938</td><td>6.56</td><td>7</td></tr>
<tr><td>6</td><td>3</td><td>0.047</td><td>0.984</td><td>6.89</td><td>7</td></tr>
<tr><td>7</td><td>1</td><td>0.016</td><td>1.000</td><td>7.00</td><td>7</td></tr></table>
<p><b>Mapping</b>: 0→1, 1→2, 2→3, 3→5, 4→6, 5→7, 6→7, 7→7.</p>
<p><b>Equalized histogram</b> (move counts): level 1: 8, level 2: 10, level 3: 12, level 4: 0, level 5: 14, level 6: 10, level 7: 6+3+1 = 10, level 0: 0.</p>
<h3>Comment on contrast</h3><ul>
<li>The original histogram is piled up in the low levels (dark, low contrast). After equalization the occupied levels are spread over almost the full range <b>1–7</b> and the counts are nearly equal (8–14) → a flatter histogram.</li>
<li>Gaps open up between used levels (e.g. 4 is empty), stretching differences between dark tones → <b>higher contrast</b>, more visible detail.</li>
<li>Close CDF values round to the same s (levels 5, 6, 7 → 7), so the output has <b>fewer distinct levels</b> (6 instead of 8); a perfectly flat histogram is not possible for discrete images.</li>
<li>It is automatic (no parameters) but can amplify noise in flat regions.</li></ul>
<p>(MST variant: 1000 pixels in levels 2–6 → mapping 2→1, 3→3, 4→6, 5,6→7: range 2–6 grows to 1–7.)</p>`,
  dg: [
    { h: 'Before: crowded towards dark levels' },
    { bars: [8, 10, 12, 14, 10, 6, 3, 1], cap: 'Original histogram nₖ (3-bit, 64 pixels)', tone: 'u1' },
    { h: 's = round(7 × CDF)' },
    { flow: [{ t: 'nₖ', s: 'count' }, { t: 'PDF', s: 'nₖ / 64' }, { t: 'CDF', s: 'running sum' }, { t: 'sₖ', s: 'round(7 × CDF)', tone: 'a' }], labels: ['', '', '× 7'] },
    { matrix: [['r', 0, 1, 2, 3, 4, 5, 6, 7], ['s', 1, 2, 3, 5, 6, 7, 7, 7]], small: true, hl: ['1,6', '1,7', '1,8'], cap: 'Mapping. Levels 5, 6, 7 merge into 7.' },
    { h: 'After: spread over the full range' },
    { bars: [0, 8, 10, 12, 0, 14, 10, 10], cap: 'Equalized histogram: flatter, wider → more contrast', tone: 'ok' }
  ],
  quiz: [
    { q: 'Histogram equalization uses which function of the input?', o: ['PDF', 'CDF', 'Median', 'Mean'], a: 1, why: 's = (L−1) × CDF.' },
    { q: 'For a 3-bit image the multiplier (L−1) is', o: ['3', '7', '8', '255'], a: 1, why: 'L = 2³ = 8 levels, L − 1 = 7.' },
    { q: 'Why can the equalized image have fewer distinct gray levels?', o: ['Noise', 'Rounding maps close CDF values to the same level', 'Clipping at 255', 'Wrong PDF'], a: 1, why: 'Discrete rounding merges levels.' }
  ],
  rev: ['<b>sₖ = (L−1) × CDF</b>, rounded', 'Table: rₖ | nₖ | PDF | CDF | (L−1)CDF | sₖ, always show it', 'Example map: 0→1, 1→2, 2→3, 3→5, 4→6, 5,6,7→7', 'Result: flatter, wider histogram → higher contrast; levels may merge', 'Automatic, but can amplify noise'],
  trick: '"<b>Count, Divide, Add-up, Multiply, Round</b>": CDAMR. Show every column, examiners mark the table.',
  easy: {
    en: { s: 'Equalization spreads crowded gray levels across the full range so the image gets more contrast.', story: 'A class where everyone scored 40–50 looks the same; re-grading by rank (CDF) spreads them from 0 to 100, so differences become obvious.', words: [['Histogram', 'Count of pixels at each level.'], ['PDF', 'Count ÷ total.'], ['CDF', 'Running total of PDF.'], ['L−1', 'Top gray level (7 for 3-bit).']], how: ['Count pixels per level.', 'Divide by total (PDF).', 'Keep a running sum (CDF).', 'Multiply by L−1 and round.', 'Re-draw the histogram.'], exam: 'Formula, full six-column table, mapping, both histograms drawn, 3–4 lines of contrast comment.', yaad: 'CDAMR: Count, Divide, Add-up, Multiply, Round.' },
    bhai: { s: 'Equalization bheed wale gray levels ko poori range mein phaila deta hai, contrast badh jaata hai.', story: 'Class mein sabke 40–50 aaye toh sab same lagte hain. Rank (CDF) se grade karo toh 0 se 100 tak phail jaate hain.', words: [['Histogram', 'Har level pe kitne pixel.'], ['PDF', 'Count ÷ total.'], ['CDF', 'PDF ka running total.'], ['L−1', 'Sabse upar ka level (3-bit mein 7).']], how: ['Har level ke pixel gino.', 'Total se divide (PDF).', 'Running sum (CDF).', 'L−1 se guna, round.', 'Naya histogram banao.'], exam: 'Formula, poori table, mapping, dono histogram, contrast pe 3–4 lines.', yaad: 'Gino, baanto, jodo, guna, round.' },
    gaali: { s: 'Bheed mein phanse gray levels ko poori range mein phaila de, contrast badh jayega. Tere chehre ka contrast toh koi nahi badha sakta, bc.', story: 'Class mein sab chutiyon ke 40–50 aaye, sab same dikhte hain. Rank se grade kar toh 0 se 100 phail gaye, ab pata chalta hai kaun sabse bada gadha hai.', words: [['Histogram', 'Har level pe kitne pixel.'], ['PDF', 'Count ÷ total.'], ['CDF', 'Running total. Jodta ja, bhosdike.'], ['L−1', '3-bit mein 7. 8 likha toh gaya.']], how: ['Gin.', 'Baant.', 'Jod.', 'Guna aur round.', 'Histogram bana. Bina histogram ke answer = kachra.'], exam: 'Formula, poori table, mapping, dono histogram, comment. Table skip kiya toh examiner teri maa-behen ek kar dega... marks mein.', yaad: 'Gin, baant, jod, guna, round. Itna toh kar le, harami.' }
  }
},
{
  id: 'd1-point', unit: 1, title: 'Point Operations vs Neighbourhood Operations', marks: '2 / 5', mins: 15, imp: true,
  q: 'Compare point operations (negative, log, power-law, contrast stretching) with neighborhood operations. Which is best for an image with a very dark background? Justify. <i>(IQ Q9 · 5M)</i>',
  simple: `<p><b>Point operation</b>: the new value of a pixel depends <b>only on that pixel</b>: s = T(r). <b>Neighbourhood operation</b>: it depends on a small window around the pixel (filters).</p>
<ul><li>Negative s = L−1−r · Log s = c log(1+r) · Power-law s = c r<sup>γ</sup> · Contrast stretching (linear).</li>
<li><b>Very dark background?</b> Use a <b>log</b> transform or <b>power-law with γ &lt; 1</b>: they expand dark levels so hidden detail appears.</li></ul>`,
  learn: [
    { title: 'Negative', body: `<p>s = L − 1 − r. 8-bit, r = 60 → s = 195. Good for white/gray detail in dark regions (e.g. mammograms).</p>` },
    { title: 'Log', body: `<p>s = c log(1 + r), c = (L−1)/log(1 + r<sub>max</sub>). <b>Expands dark</b> values, compresses bright ones. Used for Fourier spectra.</p>` },
    { title: 'Power-law (gamma)', body: `<p>s = c r<sup>γ</sup>. γ &lt; 1 brightens (expands dark), γ &gt; 1 darkens. c = 1, γ = 0.5, r = 0.36 → s = 0.6. Gamma correction for displays.</p>` },
    { title: 'Contrast stretching', body: `<p>s = [(s₂−s₁)/(r₂−r₁)](r − r₁) + s₁. Stretch [50,150] → [0,255]: r = 100 → 127.5 ≈ 128.</p>` },
    { title: 'Neighbourhood ops', body: `<p>Output depends on a window (3×3): smoothing (mean), median, sharpening (Laplacian). They change spatial detail (blur, noise, edges) rather than just the tone curve.</p>` }
  ],
  short: `<p><b>Point operation</b>: s = T(r), output depends only on the input pixel value (negative, log, power-law, contrast stretching); it changes brightness/contrast (tone). <b>Neighbourhood operation</b>: output depends on pixels in a window (mean, median, Laplacian); it smooths, denoises or sharpens. For a very dark background, a <b>log</b> or <b>power-law (γ &lt; 1)</b> transform is best because it expands the narrow dark range into a wider one.</p>`,
  answer: `<h3>Point operations: g(x, y) = T[f(x, y)], window = 1 pixel</h3>
<table class="tbl"><tr><th>Operation</th><th>Formula</th><th>Effect / use</th></tr>
<tr><td>Negative</td><td>s = L − 1 − r</td><td>Reverses intensities; shows white/gray detail in dark areas (r = 60 → 195)</td></tr>
<tr><td>Log</td><td>s = c log(1 + r)</td><td>Expands dark, compresses bright; displays high dynamic range (Fourier spectrum)</td></tr>
<tr><td>Power-law</td><td>s = c r<sup>γ</sup></td><td>γ &lt; 1 brightens, γ &gt; 1 darkens; gamma correction</td></tr>
<tr><td>Contrast stretching</td><td>s = [(s₂−s₁)/(r₂−r₁)](r−r₁)+s₁</td><td>Linear stretch of a narrow range to full range ([50,150]→[0,255]: 100 → 128)</td></tr></table>
<h3>Neighbourhood operations: window (e.g. 3×3)</h3><p>Output at (x, y) depends on f in a neighbourhood: averaging (smoothing), median (impulse noise), Laplacian / unsharp masking (sharpening).</p>
<h3>Comparison</h3><table class="tbl"><tr><th></th><th>Point</th><th>Neighbourhood</th></tr>
<tr><td>Depends on</td><td>Only f(x, y)</td><td>f in a window around (x, y)</td></tr>
<tr><td>Changes</td><td>Gray-level mapping (brightness, contrast)</td><td>Spatial detail (blur, noise, edges)</td></tr>
<tr><td>Implementation</td><td>Look-up table, very fast</td><td>Mask/convolution, slower</td></tr>
<tr><td>Examples</td><td>Negative, log, gamma, stretching, histogram eq.</td><td>Mean, median, Laplacian, Sobel</td></tr>
<tr><td>Spatial info used</td><td>None</td><td>Yes</td></tr></table>
<h3>Best for a very dark background: log / power-law (γ &lt; 1)</h3><p>In a dark image most pixels lie in a narrow low range. The <b>log transform</b> (and gamma with γ &lt; 1) has a <b>steep slope for small r</b>: a small range of dark input levels is mapped to a <b>wide range</b> of output levels, so hidden detail becomes visible, while bright values are compressed. A neighbourhood filter would not fix tone; contrast stretching helps only if the useful range is known; the negative helps only for small bright detail on a dark background. Hence log (for very high dynamic range, e.g. spectra) or γ ≈ 0.4–0.6 is the right choice.</p>`,
  dg: [
    { h: 'Transfer curves s = T(r)' },
    { plot: { xmax: 1, xlabel: 'input r', ylabel: 'out s', lines: [
      { name: 'identity', tone: 'dim', f: x => x },
      { name: 'negative', tone: 'u1', f: x => 1 - x },
      { name: 'log', tone: 'ok', f: x => Math.log(1 + 9 * x) / Math.log(10) },
      { name: 'γ = 0.4', tone: 'a', f: x => Math.pow(x, 0.4) },
      { name: 'γ = 2.5', tone: 'bad', f: x => Math.pow(x, 2.5) }] }, cap: 'Steep at small r = expands dark tones (log, γ < 1): best for a dark background' },
    { h: 'Point vs neighbourhood' },
    { grid: [
      { cap: 'Point: 1 pixel in → 1 out', matrix: [['', '', ''], ['', 'r', ''], ['', '', '']], hl: ['1,1'] },
      { cap: 'Neighbourhood: 3×3 in → 1 out', matrix: [['·', '·', '·'], ['·', 'r', '·'], ['·', '·', '·']], hl: ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2'] }
    ] }
  ],
  quiz: [
    { q: 'For an 8-bit image, the negative of r = 60 is', o: ['60', '195', '196', '255'], a: 1, why: '255 − 60 = 195.' },
    { q: 'Which transformation best reveals detail in a very dark image?', o: ['γ = 2.5', 'Log or γ < 1', 'Negative only', 'Median filter'], a: 1, why: 'They expand the narrow dark range.' },
    { q: 'A median filter is a', o: ['Point operation', 'Neighbourhood operation', 'Frequency filter', 'Colour model'], a: 1, why: 'It uses a window of pixels.' }
  ],
  rev: ['Point: s = T(r), only that pixel; neighbourhood: a window', 'Negative s = L−1−r; log s = c log(1+r); power s = c r^γ', 'γ < 1 brightens, γ > 1 darkens; contrast stretch is linear', '<b>Dark background → log or γ < 1</b> (expands dark levels)', 'Point = tone/LUT; neighbourhood = blur/denoise/sharpen'],
  trick: '<b>Gamma &lt; 1 = Glow</b> (brighter). Gamma &gt; 1 = Gloom (darker).',
  easy: {
    en: { s: 'Point operations re-map each pixel by itself; neighbourhood operations look at nearby pixels too.', story: 'Adjusting a TV\'s brightness knob is a point operation (every pixel changes by the same rule). Smudging a drawing with your thumb is a neighbourhood operation.', words: [['Point op', 's = T(r), one pixel.'], ['Log', 'Lifts dark tones.'], ['Gamma', 'γ<1 brighter, γ>1 darker.'], ['Neighbourhood', 'Uses a window (3×3).']], how: ['Point: look up r, write T(r).', 'Neighbourhood: slide a window, combine values.', 'Dark image: choose log or γ<1.', 'Justify with the curve slope.'], exam: 'Formula table for the four point ops, comparison table, then the dark-background answer with justification.', yaad: 'Gamma < 1 = Glow.' },
    bhai: { s: 'Point operation har pixel ko akele badalta hai, neighbourhood wala aas-paas ke pixels bhi dekhta hai.', story: 'TV ka brightness knob ghumana = point op. Drawing ko angoothe se ragadna = neighbourhood op.', words: [['Point op', 's = T(r), ek pixel.'], ['Log', 'Dark tones uthata hai.'], ['Gamma', 'γ<1 bright, γ>1 dark.'], ['Neighbourhood', 'Window (3×3) use karta hai.']], how: ['Point: r dekho, T(r) likho.', 'Neighbourhood: window ghumao.', 'Dark image: log ya γ<1.', 'Curve ka slope bata ke justify karo.'], exam: 'Chaaron ka formula table, comparison table, dark background ka answer justify karke.', yaad: 'Gamma < 1 = chamak.' },
    gaali: { s: 'Point op har pixel ko akela badalta hai, neighbourhood wala padosiyon ki bhi leta hai. Gossip aunty jaisa, bc.', story: 'TV ka brightness knob ghuma = point op. Drawing pe angootha ragad = neighbourhood. Tu dono mein fail hai, chutiye.', words: [['Point op', 'Sirf ek pixel.'], ['Log', 'Andhere ko ujala.'], ['Gamma', 'γ<1 chamak, γ>1 andhera. Ulta likha toh lund lag jaayega.'], ['Neighbourhood', '3×3 window.']], how: ['Point: T(r).', 'Neighbourhood: window ghuma.', 'Kaali photo: log ya γ<1.', 'Slope se justify. Ho gaya, harami.'], exam: 'Formula table, comparison, dark background answer justify karke. Sirf "log" likh ke chhoda toh 5 mein 1, gadhe.', yaad: 'Gamma < 1 = chamak. Ratt le, kamine.' }
  }
},
{
  id: 'd1-median', unit: 1, title: 'Median vs Averaging Filter (Salt & Pepper)', marks: '5 / 10', mins: 15, imp: true,
  q: 'Apply a 3×3 median filter and a 3×3 averaging filter to the given image containing salt-and-pepper noise. Analyze which gives the better result and why. <i>(IQ Q10 · 10M)</i>',
  simple: `<p>Salt-and-pepper noise = random pure white (255) or pure black (0) dots.</p>
<ul><li><b>Averaging (mean) filter</b>: replace the pixel with the average of its 3×3 window. The 255 outlier drags the average up → a grey smear, and edges blur.</li>
<li><b>Median filter</b>: sort the 9 values, take the <b>middle (5th)</b>. The outlier sits at the end of the list and is simply ignored → clean result, sharp edges.</li></ul>`,
  learn: [
    { title: 'Window', body: `<p>[10 12 11; 13 255 14; 12 11 13]: centre corrupted by salt.</p>` },
    { title: 'Mean', body: `<p>Sum = 10+12+11+13+255+14+12+11+13 = 351 → 351/9 = <b>39</b>. Still far from ~12: the noise is smeared.</p>` },
    { title: 'Median', body: `<p>Sort: 10, 11, 11, 12, <b>12</b>, 13, 13, 14, 255 → 5th = <b>12</b>. Noise removed.</p>` },
    { title: 'Edges', body: `<p>On a step edge [10 10 200 200], the mean gives in-between values (blur); the median keeps 10 or 200 (edge stays sharp).</p>` }
  ],
  short: `<p>A 3×3 <b>averaging filter</b> replaces each pixel by the mean of its window: linear, good for Gaussian noise, but an impulse (0/255) pulls the mean and smears, and edges blur. A 3×3 <b>median filter</b> takes the middle of the 9 sorted values: non-linear, discards the outliers, so salt-and-pepper noise is removed while edges are preserved. The median filter gives the better result for impulse noise.</p>`,
  answer: `<h3>Given noisy neighbourhood</h3><pre class="mono">10  12  11
13 255  14     ← 255 = salt noise
12  11  13</pre>
<h3>3×3 averaging filter</h3><p>g = (1/9) Σ window = (10+12+11+13+255+14+12+11+13)/9 = 351/9 = <b>39</b>.</p>
<p>The noisy value is reduced but not removed: 39 is still very different from neighbours (~12). Worse, when the window moves to the neighbouring pixels, 255 is still inside their windows, so <b>all 9 nearby outputs rise</b> → a grey blob (noise is spread).</p>
<h3>3×3 median filter</h3><p>Sort: 10, 11, 11, 12, <b>[12]</b>, 13, 13, 14, 255 → median = <b>12</b>. The outlier ends at one end of the sorted list and never becomes the median, so it is <b>removed completely</b>.</p>
<h3>Full small-image example</h3><pre class="mono">Input 5×5 (0 = pepper, 255 = salt):     Median output (interior):
10  10  10  10  10                       .   .   .   .   .
10 255  10  10  10                       .  10  10  10   .
10  10  10   0  10                       .  10  10  10   .
10  10  10  10  10                       .  10  10  10   .
10  10  10  10  10                       .   .   .   .   .
Mean output at (1,1) = (8×10 + 255)/9 ≈ 37, at (2,3) = (8×10 + 0)/9 ≈ 9</pre>
<h3>Analysis: which is better and why</h3><table class="tbl"><tr><th></th><th>Averaging</th><th>Median</th></tr>
<tr><td>Type</td><td>Linear</td><td>Non-linear (order statistic)</td></tr>
<tr><td>Impulse value</td><td>Pulled into the average, spread to neighbours</td><td>Discarded (sorted to the end)</td></tr>
<tr><td>Edges</td><td>Blurred</td><td>Preserved</td></tr>
<tr><td>Best for</td><td>Gaussian / uniform noise</td><td>Salt-and-pepper (impulse) noise</td></tr>
<tr><td>Cost</td><td>Cheap (sum)</td><td>Sorting needed</td></tr></table>
<p><b>Conclusion:</b> the <b>median filter</b> is better for salt-and-pepper noise because impulses are extreme outliers; the median ignores them, while the mean is dragged towards them and also blurs edges. (If noise density &gt; ~50% within windows, use an adaptive median filter.)</p>`,
  dg: [
    { h: 'Same 3×3 window, two filters' },
    { matrix: [[10, 12, 11], [13, 255, 14], [12, 11, 13]], heat: 255, hl: ['1,1'], cap: 'Centre pixel hit by salt noise (255)' },
    { grid: [
      { cap: 'Mean: Σ/9', flow: [{ t: '351 ÷ 9', tone: 'u1' }, { t: '39', s: 'still noisy, smeared', tone: 'bad' }], labels: ['='] },
      { cap: 'Median: sort, take 5th', flow: [{ t: '10 11 11 12 [12] 13 13 14 255', tone: 'u1' }, { t: '12', s: 'noise gone', tone: 'ok' }], labels: ['→'] }
    ] },
    { h: 'On a 5×5 image' },
    { grid: [
      { cap: 'Noisy input', matrix: [[10, 10, 10, 10, 10], [10, 255, 10, 10, 10], [10, 10, 10, 0, 10], [10, 10, 10, 10, 10], [10, 10, 10, 10, 10]], heat: 255 },
      { cap: 'Mean output (interior): noise spread into blobs', matrix: [[10, 10, 10, 10, 10], [10, 37, 36, 9, 10], [10, 37, 36, 9, 10], [10, 10, 9, 9, 10], [10, 10, 10, 10, 10]], heat: 255 },
      { cap: 'Median output: clean', matrix: [[10, 10, 10, 10, 10], [10, 10, 10, 10, 10], [10, 10, 10, 10, 10], [10, 10, 10, 10, 10], [10, 10, 10, 10, 10]], heat: 255 }
    ] }
  ],
  quiz: [
    { q: 'Median of 10, 12, 11, 13, 255, 14, 12, 11, 13 is', o: ['13', '12', '39', '255'], a: 1, why: 'Sorted: 10 11 11 12 12 13 13 14 255 → 5th = 12.' },
    { q: 'Why does the mean filter fail on salt noise?', o: ['It is non-linear', 'The outlier pulls the average', 'It sorts values', 'It needs FFT'], a: 1, why: '255 heavily biases the average and spreads to neighbours.' },
    { q: 'Median filter is best for', o: ['Gaussian noise', 'Salt-and-pepper noise', 'Periodic noise', 'Blur'], a: 1, why: 'It removes impulse outliers and keeps edges.' }
  ],
  rev: ['Mean: (1/9)Σ, linear, blurs edges, smears impulses', 'Median: sort 9 values, take the <b>5th</b>; non-linear; removes impulses, keeps edges', 'Example: mean = 351/9 = 39 (bad), median = 12 (good)', 'Mean → Gaussian noise; median → salt-and-pepper', 'High-density noise → adaptive median'],
  trick: '"<b>Sort, pick 5, replace</b>." The outlier always runs to the end of the queue.',
  easy: {
    en: { s: 'Median ignores extreme noisy pixels; averaging gets dragged by them.', story: 'Nine friends\' salaries, one is a billionaire. The average says everyone is rich (wrong); the median says the typical salary (right).', words: [['Salt & pepper', 'Random white/black dots.'], ['Mean filter', 'Average of the window.'], ['Median filter', 'Middle value after sorting.'], ['Outlier', 'A value far from the rest.']], how: ['Take the 3×3 window.', 'Mean: add all 9, divide by 9.', 'Median: sort, take the 5th.', 'Compare with neighbours, conclude.'], exam: 'Compute both on the window with full working, small-image example, comparison table, conclusion with the why.', yaad: 'Sort, pick 5, replace.' },
    bhai: { s: 'Median noisy extreme pixel ko ignore karta hai, average uske chakkar mein bigad jaata hai.', story: 'Nau doston ki salary, ek arabpati. Average bolega sab ameer (galat), median bolega aam salary (sahi).', words: [['Salt & pepper', 'Random safed/kaale dots.'], ['Mean filter', 'Window ka average.'], ['Median filter', 'Sort karke beech wala.'], ['Outlier', 'Baaki se bahut alag value.']], how: ['3×3 window lo.', 'Mean: jodo, 9 se divide.', 'Median: sort, 5th uthao.', 'Compare karke conclude.'], exam: 'Dono ka calculation, 5×5 example, table, conclusion.', yaad: 'Sort, 5th, replace.' },
    gaali: { s: 'Median noisy pixel ko laat maar ke bahar karta hai, average uske saath chipak ke barbaad ho jaata hai. Teri dosti jaisa, bc.', story: 'Nau chutiye dost, ek Ambani. Average bolega sab ameer, haha. Median bolega asli aukaat. Median sach bolta hai, kamine.', words: [['Salt & pepper', 'Kaale-safed dhabbe.'], ['Mean', 'Average. Pagal hai, outlier se darr jaata hai.'], ['Median', 'Sort karke beech wala.'], ['Outlier', 'Odd one out. Tu.']], how: ['3×3 le.', 'Mean: jod, 9 se bhaag.', 'Median: sort, 5va.', 'Compare, conclude. Ho gaya, gadhe.'], exam: 'Dono calculation, example, table, conclusion. Sort kiye bina median likha toh examiner pakad lega, harami.', yaad: 'Sort, 5va, replace. Bas, bhosdike.' }
  }
},
{
  id: 'd1-lpf', unit: 1, title: 'Frequency-Domain Low-Pass Filters & Ringing', marks: '5 / 10', mins: 20, imp: true,
  q: 'Differentiate ideal, Butterworth and Gaussian low-pass filters in the frequency domain. Explain the ringing effect and how to avoid it. <i>(IQ Q11 · 10M)</i>',
  simple: `<p>Frequency filtering: <b>DFT → multiply by H(u,v) → inverse DFT</b>. A low-pass filter keeps low frequencies (smooth areas) and cuts high ones (edges, noise) → blur.</p>
<ul><li><b>Ideal</b>: hard on/off cut at D₀ → <b>ringing</b> (ripples near edges).</li>
<li><b>Butterworth</b>: smooth roll-off, order n controls sharpness → little ringing.</li>
<li><b>Gaussian</b>: smoothest bell curve → <b>no ringing</b>.</li></ul>`,
  learn: [
    { title: 'Process', body: `<p>f → DFT → F(u,v) → G = H·F → inverse DFT → g. <b>Convolution theorem</b>: multiplication in frequency = convolution in space.</p>` },
    { title: 'Ideal LPF', body: `<p>H = 1 if D(u,v) ≤ D₀, else 0. D = distance from the centre. Sharp cut.</p>` },
    { title: 'Butterworth LPF', body: `<p>H = 1 / [1 + (D/D₀)<sup>2n</sup>]. At D = D₀, H = 0.5. Higher n → closer to ideal (more ringing).</p>` },
    { title: 'Gaussian LPF', body: `<p>H = e<sup>−D²/2D₀²</sup>. Its inverse transform is also a Gaussian (no ripples) → no ringing.</p>` },
    { title: 'Ringing', body: `<p>A sharp cut in frequency = a <b>sinc</b> in space, which has side lobes. Convolving with it puts ripples beside edges (Gibbs phenomenon). Fix: smooth transition (Butterworth low n, Gaussian).</p>` }
  ],
  short: `<p>Low-pass filters pass frequencies near the origin and attenuate the rest (smoothing). <b>ILPF</b> H = 1 for D ≤ D₀ else 0: sharp cut-off → severe <b>ringing</b>. <b>BLPF</b> H = 1/[1+(D/D₀)²ⁿ]: smooth, order-controlled, mild ringing for high n. <b>GLPF</b> H = e<sup>−D²/2D₀²</sup>: smoothest, no ringing. Ringing arises because a sharp frequency cut-off corresponds to a sinc with ripples in the spatial domain; avoid it with smooth transitions.</p>`,
  answer: `<h3>Frequency-domain filtering</h3><p>f(x,y) → DFT → F(u,v) → <b>G(u,v) = H(u,v)F(u,v)</b> → inverse DFT → g(x,y). D(u,v) = distance from (u,v) to the centre of the (centred) spectrum; D₀ = cut-off.</p>
<h3>1. Ideal low-pass filter (ILPF)</h3><p>H(u,v) = 1 if D(u,v) ≤ D₀; 0 if D(u,v) &gt; D₀. Passes everything inside the circle, nothing outside. Cannot be built in hardware; produces <b>blurring + strong ringing</b>.</p>
<h3>2. Butterworth low-pass filter (BLPF)</h3><p>H(u,v) = 1 / [1 + (D(u,v)/D₀)<sup>2n</sup>]. No sharp discontinuity; H = 0.5 at D = D₀. Order n: n = 1 no ringing, n = 2 negligible, larger n → approaches ILPF with visible ringing.</p>
<h3>3. Gaussian low-pass filter (GLPF)</h3><p>H(u,v) = e<sup>−D²(u,v) / 2D₀²</sup> (D₀ = σ). At D = D₀, H = 0.607. Its spatial form is also Gaussian (always positive, no oscillation) → <b>no ringing</b>, slightly less sharp cut-off than BLPF.</p>
<table class="tbl"><tr><th></th><th>Ideal</th><th>Butterworth</th><th>Gaussian</th></tr>
<tr><td>Transfer function</td><td>1 / 0 step</td><td>1/[1+(D/D₀)²ⁿ]</td><td>e<sup>−D²/2D₀²</sup></td></tr>
<tr><td>Transition</td><td>Abrupt</td><td>Smooth, set by n</td><td>Smoothest</td></tr>
<tr><td>Ringing</td><td>Severe</td><td>Mild (grows with n)</td><td>None</td></tr>
<tr><td>Control</td><td>D₀</td><td>D₀ and n</td><td>D₀ (σ)</td></tr>
<tr><td>Realisable</td><td>No</td><td>Yes</td><td>Yes</td></tr></table>
<h3>Ringing effect</h3><p>Ringing = rippling, ghost-like bands parallel to edges in the filtered image. <b>Cause</b>: the ideal filter is a rectangle (cylinder) in frequency; its inverse DFT is a <b>sinc</b>-like function with a main lobe and decaying side lobes. Filtering = convolution of the image with this function, so each edge is copied with oscillating side lobes (<b>Gibbs phenomenon</b>).</p>
<p><b>Avoiding ringing</b>: use filters with a <b>smooth transition</b>: Gaussian (no ringing), Butterworth with low order (n ≤ 2); or apply windowing to taper the cut-off.</p>`,
  dg: [
    { h: 'Pipeline' },
    { flow: [{ t: 'f(x, y)', tone: 'u1' }, { t: 'F(u, v)', s: 'DFT' }, { t: 'G = H · F', s: 'multiply', tone: 'a' }, { t: 'g(x, y)', s: 'inverse DFT', tone: 'ok' }], labels: ['DFT', '× H(u,v)', 'IDFT'] },
    { h: 'Filter profiles H(D)' },
    { plot: { xmax: 3, xlabel: 'D / D₀', ylabel: 'H', mark: { x: 1, label: 'D₀' }, lines: [
      { name: 'Ideal', tone: 'bad', f: d => (d <= 1 ? 1 : 0) },
      { name: 'Butterworth n=2', tone: 'u1', f: d => 1 / (1 + Math.pow(d, 4)) },
      { name: 'Gaussian', tone: 'ok', f: d => Math.exp(-(d * d) / 2) }] }, cap: 'Sharp step → ringing. Smooth roll-off → little / no ringing.' },
    { h: 'Why ringing: what the filter looks like in space' },
    { plot: { xmax: 4, xlabel: 'distance from edge', ylabel: '', lines: [
      { name: 'Ideal → sinc with ripples', tone: 'bad', f: x => 0.5 + 0.5 * (x < 0.05 ? 1 : Math.sin(Math.PI * x * 1.6) / (Math.PI * x * 1.6)) },
      { name: 'Gaussian → smooth', tone: 'ok', f: x => 0.5 + 0.5 * Math.exp(-x * x * 1.2) }] }, cap: 'Side lobes of the sinc copy every edge as faint rings.' }
  ],
  quiz: [
    { q: 'Which LPF produces no ringing?', o: ['Ideal', 'Butterworth n=10', 'Gaussian', 'All of them'], a: 2, why: 'Its spatial form is a Gaussian, no side lobes.' },
    { q: 'For a Butterworth LPF, H at D = D₀ equals', o: ['1', '0.5', '0.607', '0'], a: 1, why: '1/(1+1) = 0.5.' },
    { q: 'Ringing is caused by', o: ['Noise', 'Sharp cut-off → sinc side lobes in space', 'Quantization', 'Colour conversion'], a: 1, why: 'Gibbs phenomenon.' }
  ],
  rev: ['G = H · F (convolution theorem); D = distance from centre', 'ILPF: 1 if D ≤ D₀ else 0 → <b>severe ringing</b>', 'BLPF: 1/[1+(D/D₀)²ⁿ], H(D₀)=0.5; ringing grows with n', 'GLPF: e^(−D²/2D₀²) → <b>no ringing</b>', 'Ringing = sinc side lobes (Gibbs); avoid with smooth transition'],
  trick: 'Ideal → Butterworth → Gaussian = <b>cliff → slope → hill</b>. Only the cliff echoes (rings).',
  easy: {
    en: { s: 'Low-pass filters blur by cutting high frequencies; a hard cut causes ripples (ringing), a smooth cut does not.', story: 'Stopping a car instantly makes passengers jerk back and forth (ringing). Braking smoothly (Gaussian) keeps everyone still.', words: [['D₀', 'Cut-off distance.'], ['Ideal', 'On/off cut.'], ['Butterworth', 'Smooth cut, order n.'], ['Ringing', 'Ripples beside edges.']], how: ['Take the DFT.', 'Multiply by H(u,v).', 'Inverse DFT.', 'Choose a smooth H to avoid ringing.'], exam: 'Three formulas, the profile sketch, comparison table, ringing cause (sinc) and cure.', yaad: 'Cliff, slope, hill: only the cliff rings.' },
    bhai: { s: 'Low-pass high frequency kaat ke blur karta hai. Jhatke se kaato toh ripples (ringing), aaram se kaato toh nahi.', story: 'Gaadi achanak roko toh sab aage-peeche hilte hain (ringing). Aaram se brake lagao (Gaussian) toh sab shaant.', words: [['D₀', 'Cut-off distance.'], ['Ideal', 'On/off.'], ['Butterworth', 'Smooth, order n.'], ['Ringing', 'Edges ke paas lehrein.']], how: ['DFT lo.', 'H se guna.', 'Inverse DFT.', 'Smooth H lo, ringing nahi aayegi.'], exam: 'Teeno formula, graph, table, ringing ka kaaran (sinc) aur ilaaj.', yaad: 'Khai, dhalaan, pahaadi: sirf khai goonjti hai.' },
    gaali: { s: 'Low-pass high frequency kaat ke blur karta hai. Jhatke se kaata toh lehrein (ringing), aaram se toh nahi. Jhatka mat de, bc.', story: 'Gaadi achanak rokega toh sab sawaari aage-peeche hilegi, chutiye. Dheere brake laga (Gaussian). Driving bhi nahi aati tujhe.', words: [['D₀', 'Cut-off.'], ['Ideal', 'On/off, sabse chutiya.'], ['Butterworth', 'Smooth, order n.'], ['Ringing', 'Edge ke paas lehrein.']], how: ['DFT.', 'H se guna.', 'Inverse.', 'Gaussian le, ringing gaand maraye.'], exam: 'Teeno formula, graph, table, ringing ka kaaran aur ilaaj. Graph nahi banaya toh marks gaye, harami.', yaad: 'Khai, dhalaan, pahaadi. Sirf khai goonjti hai, bhosdike.' }
  }
},
{
  id: 'd1-hpf', unit: 1, title: 'Sharpening: Spatial → Frequency Filters & High-Pass Design', marks: '5', mins: 15, imp: true,
  q: 'How are frequency-domain filters generated from spatial filters? Design a high-pass sharpening filter and explain its effect. <i>(IQ Q12 · 5M)</i>',
  simple: `<p>A spatial mask (like the Laplacian) can be turned into a frequency filter by taking its <b>DFT</b> (after zero-padding to the image size): <b>H(u,v) = DFT{h(x,y)}</b>. Filtering in either domain gives the same result (convolution theorem).</p>
<p>A <b>high-pass</b> filter = <b>1 − low-pass</b>: it keeps edges and fine detail. Add it back to the image to <b>sharpen</b>.</p>`,
  learn: [
    { title: 'Spatial → frequency', body: `<p>Zero-pad the mask h(x,y) to P×Q, centre it, take the DFT → H(u,v). Then G = H·F.</p>` },
    { title: 'Design directly', body: `<p>Or specify H(u,v) directly: ideal/Butterworth/Gaussian high-pass, H<sub>HP</sub> = 1 − H<sub>LP</sub>.</p>` },
    { title: 'Laplacian', body: `<p>Mask [0 −1 0; −1 4 −1; 0 −1 0]. In frequency: H(u,v) = −4π²(u² + v²) (grows with frequency → high-pass). Sharpen: g = f + c∇²f.</p>` },
    { title: 'Unsharp & high-boost', body: `<p>mask = f − blur(f); g = f + k·mask. k = 1 unsharp masking, k &gt; 1 high-boost.</p>` },
    { title: 'Emphasis', body: `<p>H = a + b·H<sub>HP</sub> (a ≥ 0, b &gt; a) keeps some low-frequency tone so the image is not left flat grey.</p>` }
  ],
  short: `<p>A frequency filter is obtained from a spatial mask by zero-padding it to the image size and computing its DFT: H(u,v) = ℑ{h(x,y)}; by the convolution theorem, h * f ⇔ H·F. Filters can also be designed directly in frequency. A sharpening (high-pass) filter is H<sub>HP</sub> = 1 − H<sub>LP</sub>, e.g. Gaussian HPF 1 − e<sup>−D²/2D₀²</sup> or the Laplacian −4π²(u²+v²); it passes edges and fine detail and removes the smooth background.</p>`,
  answer: `<h3>Obtaining frequency-domain filters from spatial filters</h3><ol>
<li>Take the spatial mask h(x, y) (e.g. 3×3).</li>
<li><b>Zero-pad</b> it to P × Q (same as the padded image, P ≥ 2M − 1 to avoid wrap-around) and centre it.</li>
<li>Compute <b>H(u, v) = DFT{h(x, y)}</b>.</li>
<li>Filter: <b>G(u, v) = H(u, v) F(u, v)</b>, then inverse DFT. By the <b>convolution theorem</b> h(x,y) * f(x,y) ⇔ H(u,v)F(u,v), so the result equals spatial filtering.</li></ol>
<p>Alternatively, <b>generate filters directly</b> in frequency (ideal, Butterworth, Gaussian) from the desired response.</p>
<h3>Design of a high-pass sharpening filter</h3><p>High-pass = 1 − low-pass:</p>
<table class="tbl"><tr><th>Filter</th><th>H(u, v)</th></tr>
<tr><td>Ideal HPF</td><td>0 if D ≤ D₀, 1 if D &gt; D₀</td></tr>
<tr><td>Butterworth HPF</td><td>1 / [1 + (D₀/D)<sup>2n</sup>]</td></tr>
<tr><td>Gaussian HPF</td><td>1 − e<sup>−D²/2D₀²</sup></td></tr>
<tr><td>Laplacian</td><td>−4π²(u² + v²) &nbsp; (spatial mask [0 −1 0; −1 4 −1; 0 −1 0])</td></tr></table>
<p><b>Design</b>: choose a Gaussian HPF with cut-off D₀ (e.g. 30) to avoid ringing. Sharpened output with high-frequency emphasis: <b>H<sub>e</sub> = a + b·H<sub>HP</sub></b> (a ≈ 0.5, b ≈ 2), or in space <b>g = f + c∇²f</b> (c = ±1 per mask sign) / unsharp masking g = f + k(f − f<sub>blur</sub>).</p>
<h3>Effect</h3><ul>
<li>Low frequencies (smooth background) are attenuated, high frequencies (edges, fine texture) are passed → <b>edges and details are enhanced</b>.</li>
<li>A pure HPF output looks dark with only edges (average F(0,0) is removed); adding the original or a constant a restores tone.</li>
<li>Noise (also high-frequency) is amplified; ideal HPF causes ringing, Gaussian does not.</li></ul>`,
  dg: [
    { h: 'From a spatial mask to H(u, v)' },
    { flow: [{ t: 'Mask h(x,y)', s: '3×3 Laplacian', tone: 'u1' }, { t: 'Zero-pad', s: 'to P × Q, centre' }, { t: 'DFT', s: 'H(u,v)', tone: 'a' }, { t: 'G = H · F', s: '= h * f in space', tone: 'ok' }], labels: ['', '', ''] },
    { grid: [
      { cap: 'Laplacian mask (sums to 0)', matrix: [[0, -1, 0], [-1, 4, -1], [0, -1, 0]], sign: true },
      { cap: 'Its frequency response', plot: { xmax: 1, xlabel: 'frequency', ylabel: '|H|', lines: [{ name: '4π²(u²+v²)', tone: 'a', f: x => x * x }] } }
    ] },
    { h: 'High-pass = 1 − low-pass' },
    { plot: { xmax: 3, xlabel: 'D / D₀', ylabel: 'H', mark: { x: 1, label: 'D₀' }, lines: [
      { name: 'Ideal HPF', tone: 'bad', f: d => (d <= 1 ? 0 : 1) },
      { name: 'Butterworth HPF', tone: 'u1', f: d => (d < 0.001 ? 0 : 1 / (1 + Math.pow(1 / d, 4))) },
      { name: 'Gaussian HPF', tone: 'ok', f: d => 1 - Math.exp(-(d * d) / 2) }] } },
    { flow: [{ t: 'f', s: 'original' }, { t: 'f − blur(f)', s: 'mask = edges', tone: 'a' }, { t: 'f + k·mask', s: 'k=1 unsharp · k>1 high-boost', tone: 'ok' }], labels: ['', ''] }
  ],
  quiz: [
    { q: 'How do you get H(u,v) from a spatial mask?', o: ['Invert the mask', 'Zero-pad and take its DFT', 'Take the histogram', 'Transpose it'], a: 1, why: 'Convolution theorem: h * f ⇔ H·F.' },
    { q: 'A high-pass filter can be written as', o: ['H_LP²', '1 − H_LP', '1 / H_LP', 'H_LP − 1'], a: 1, why: 'H_HP = 1 − H_LP.' },
    { q: 'High-boost filtering uses k', o: ['k = 0', 'k = 1', 'k > 1', 'k < 0'], a: 2, why: 'k = 1 is unsharp masking; k > 1 is high-boost.' }
  ],
  rev: ['H(u,v) = DFT of the <b>zero-padded</b> spatial mask; G = H·F ⇔ h * f', 'Or design H directly in frequency', '<b>H_HP = 1 − H_LP</b>: ideal / Butterworth 1/[1+(D₀/D)²ⁿ] / Gaussian 1 − e^(−D²/2D₀²)', 'Laplacian ⇔ −4π²(u²+v²); sharpen g = f + c∇²f', 'Unsharp g = f + k(f − blur), k>1 high-boost; emphasis a + b·H_HP'],
  trick: '"<b>Pad, transform, multiply</b>" for any spatial mask. High-pass = "one minus low-pass".',
  easy: {
    en: { s: 'Any spatial mask becomes a frequency filter via its DFT; a high-pass filter keeps edges and sharpens.', story: 'Highlighting a textbook: the high-pass filter keeps only the outlines (edges); adding them back over the page makes everything look crisper.', words: [['Zero-padding', 'Add zeros so sizes match.'], ['Convolution theorem', 'Convolve in space = multiply in frequency.'], ['High-pass', 'Keeps fast changes (edges).'], ['High-boost', 'Sharpen extra (k > 1).']], how: ['Zero-pad the mask.', 'Take its DFT → H.', 'Multiply with F, inverse DFT.', 'For sharpening use H = 1 − H_LP and add back to f.'], exam: '4 steps for spatial→frequency, HPF formula table, chosen design, effect bullets.', yaad: 'Pad, transform, multiply. HP = 1 − LP.' },
    bhai: { s: 'Koi bhi spatial mask DFT lagake frequency filter ban jaata hai. High-pass edges rakhta hai, image sharp karta hai.', story: 'Kitaab pe sirf outlines highlight karo, phir page pe wapas daalo, sab crisp dikhega. Yahi sharpening hai.', words: [['Zero-padding', 'Zeros jod ke size barabar.'], ['Convolution theorem', 'Space mein convolve = frequency mein guna.'], ['High-pass', 'Tez badlaav rakhta hai.'], ['High-boost', 'Extra sharp (k > 1).']], how: ['Mask zero-pad karo.', 'DFT lo → H.', 'F se guna, inverse.', 'H = 1 − H_LP, wapas f mein jodo.'], exam: 'Spatial→frequency ke 4 steps, HPF table, design, effect.', yaad: 'Pad, transform, guna. HP = 1 − LP.' },
    gaali: { s: 'Mask ka DFT le, frequency filter ban gaya. High-pass edges rakhta hai, image ko dhaar deta hai. Tere dimaag ko nahi, bc.', story: 'Kitaab mein sirf outlines highlight kar ke wapas chipka, sab crisp. Tu toh poori kitaab highlight kar deta hai, chutiye.', words: [['Zero-padding', 'Zero bhar ke size barabar.'], ['Convolution theorem', 'Space mein convolve = frequency mein guna.'], ['High-pass', 'Edges rakhta hai.'], ['High-boost', 'k > 1, extra dhaar.']], how: ['Pad.', 'DFT.', 'Guna, inverse.', 'f mein jod. Ho gaya, gadhe.'], exam: '4 steps, HPF table, design, effect. Padding bhool gaya toh wrap-around ho jaayega aur marks bhi, harami.', yaad: 'Pad, transform, guna. HP = 1 − LP. Ratt le, kamine.' }
  }
}
];

const cards = [
  [1, 'Storage of an M×N image with k bits/pixel?', 'b = M × N × k bits (÷8 for bytes).'],
  [1, 'Sampling vs quantization?', 'Sampling digitises position (x, y); quantization digitises intensity into L = 2ᵏ levels.'],
  [1, 'Low quantization causes?', 'False contouring.'],
  [1, 'D₄, D₈, Dₑ for p(0,0), q(3,4)?', 'D₄ = 7, D₈ = 4, Dₑ = 5.'],
  [1, 'Why m-adjacency?', 'Removes multiple-path ambiguity of 8-adjacency.'],
  [1, 'F(0,0) of the DFT equals?', 'Average intensity (DC component), with 1/MN.'],
  [1, 'Separability of 2-D DFT?', '1-D DFT on rows, then on columns (F = W f W).'],
  [1, 'H₂ₙ in terms of Hₙ?', '[Hₙ Hₙ; Hₙ −Hₙ].'],
  [1, 'Walsh vs Hadamard ordering?', 'Walsh: sequency order; Hadamard: natural recursive order.'],
  [1, 'Why DCT over DFT?', 'Energy compaction, real output, no boundary jump.'],
  [1, 'Optimal energy-compaction transform?', 'KLT / Hotelling (data-dependent).'],
  [1, 'Haar pair rule?', 'avg = (a+b)/2, detail = (a−b)/2.'],
  [1, 'Histogram equalization formula?', 'sₖ = (L−1) × CDF, rounded.'],
  [1, 'Log transform use?', 'Expand dark values (e.g. Fourier spectrum display).'],
  [1, 'γ < 1 does what?', 'Brightens (expands dark tones).'],
  [1, 'Best filter for salt-and-pepper noise?', 'Median filter.'],
  [1, 'Which LPF has no ringing?', 'Gaussian.'],
  [1, 'Butterworth LPF formula?', 'H = 1/[1 + (D/D₀)²ⁿ].'],
  [1, 'High-pass from low-pass?', 'H_HP = 1 − H_LP.'],
  [1, 'Unsharp masking vs high-boost?', 'g = f + k(f − blur); k = 1 vs k > 1.']
];

export default { topics, cards };
