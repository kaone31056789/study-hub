// Introduction to Digital Image Processing (24ITT-311 / 24CST-311).
// Sources: ankushraj.dev DIP notes (units 1–3, MST-1 & MST-2 questions), CU LMS syllabus, the student's 20 important questions.
import unit1 from './unit1';
import unit2 from './unit2';
import unit3 from './unit3';
import formulas from './formulas';

const IQ = [
  [1, 'Define sampling and quantization. An image is sampled at 512×512 with 8 bits per pixel. Calculate the storage required, and the new size if it is reduced to 256×256 with 4 bits per pixel.', 5, 'd1-sampling'],
  [2, 'Explain the relationships between pixels (neighbors, adjacency, connectivity). For the given binary image, find the shortest 4-path, 8-path and m-path between two pixels.', 10, 'd1-pixels'],
  [3, 'Compute the 2-D DFT of a 4×4 image using the separability property, and state any two properties of the 2-D FFT.', 10, 'd1-dft'],
  [4, 'Generate the 8×8 Hadamard matrix. Compare the Walsh and Hadamard transforms with respect to ordering and computation.', 10, 'd1-walsh'],
  [5, 'Why is the DCT preferred over the DFT for image compression? Justify with energy compaction.', 5, 'd1-dct'],
  [6, 'Apply the Haar transform to a 4×4 image and show how it represents both average and detail information.', 10, 'd1-haar'],
  [7, 'Explain the Hotelling (KL) transform with steps. Compute the eigenvectors for the given set of vectors.', 10, 'd1-klt'],
  [8, 'Perform histogram equalization on the given 3-bit, 8-level image. Draw the original and equalized histograms and comment on the contrast change.', 10, 'd1-hist'],
  [9, 'Compare point operations (negative, log, power-law, contrast stretching) with neighborhood operations. Which is best for an image with a very dark background? Justify.', 5, 'd1-point'],
  [10, 'Apply a 3×3 median filter and a 3×3 averaging filter to the given image containing salt-and-pepper noise. Analyze which gives the better result and why.', 10, 'd1-median'],
  [11, 'Differentiate ideal, Butterworth and Gaussian low-pass filters in the frequency domain. Explain the ringing effect and how to avoid it.', 10, 'd1-lpf'],
  [12, 'How are frequency-domain filters generated from spatial filters? Design a high-pass sharpening filter and explain its effect.', 5, 'd1-hpf'],
  [13, 'List the noise models (Gaussian, Rayleigh, Gamma, Exponential, Uniform, Impulse) with their PDFs. Which spatial filter suits each type?', 5, 'd2-noise'],
  [14, 'Explain inverse filtering and its limitation in the presence of noise. Show how Wiener filtering overcomes it.', 10, 'd2-inverse'],
  [15, 'Derive the Minimum Mean Square Error (Wiener) filter. Compare it with constrained least squares filtering.', 10, 'd2-wiener'],
  [16, 'Explain the RGB, CMY and HSI color models, with conversion from RGB to HSI. Describe pseudocolor image processing with an application.', 10, 'd2-color'],
  [17, 'Explain multiresolution expansions and the wavelet transform. How is a wavelet different from a Fourier basis?', 5, 'd2-wavelet'],
  [18, 'Apply dilation, erosion, opening and closing to the given binary image with the given structuring element. Explain the hit-or-miss transform for shape detection.', 10, 'd2-morph'],
  [19, 'Explain coding, interpixel and psychovisual redundancy. For the given symbol probabilities, build the Huffman code and calculate average length, entropy, efficiency and compression ratio. Suggest a better scheme if efficiency is low.', 10, 'd3-huffman'],
  [20, 'Draw and explain the JPEG 2000 block diagram. Compare lossy and lossless predictive coding. Also explain edge detection, edge linking, thresholding and region-oriented segmentation.', 10, 'd3-jpeg']
];

const glossary = [
  ['Pixel', 'Smallest element of a digital image; holds one intensity value.'],
  ['f(x, y)', 'Intensity (gray level) at spatial position (x, y).'],
  ['Sampling', 'Digitising spatial coordinates; sets spatial resolution M × N.'],
  ['Quantization', 'Digitising intensity into L = 2ᵏ gray levels.'],
  ['False contouring', 'Visible bands in smooth areas from too few gray levels.'],
  ['N₄ / N₈', '4 horizontal-vertical neighbours / all 8 neighbours.'],
  ['m-adjacency', 'Mixed adjacency that removes multiple-path ambiguity of 8-adjacency.'],
  ['DC component', 'F(0,0) of the DFT = average intensity.'],
  ['Separability', 'A 2-D transform done as 1-D on rows, then on columns.'],
  ['Sequency', 'Number of sign changes in a Walsh/Hadamard basis row.'],
  ['Energy compaction', 'Packing most signal energy into few coefficients.'],
  ['KLT / Hotelling', 'Transform using eigenvectors of the covariance matrix; optimal, data-dependent.'],
  ['Histogram equalization', 's = (L−1) × CDF; spreads gray levels for contrast.'],
  ['Gamma correction', 's = c r^γ; compensates display non-linearity.'],
  ['Median filter', 'Non-linear filter: middle of the sorted window; kills impulse noise.'],
  ['Ringing', 'Ripples near edges from a sharp frequency cut-off (Gibbs phenomenon).'],
  ['Convolution theorem', 'Convolution in space = multiplication in frequency.'],
  ['Unsharp masking', 'g = f + k(f − blurred f); k > 1 = high-boost.'],
  ['Degradation model', 'g = h * f + η; G = HF + N.'],
  ['Inverse filter', 'F̂ = G/H; amplifies noise where H is small.'],
  ['Wiener filter', 'MMSE filter H*/(|H|² + Sη/Sf).'],
  ['CLS filter', 'H*/(|H|² + γ|P|²); smoothest result under a noise constraint.'],
  ['HSI', 'Hue, saturation, intensity colour model; separates brightness from colour.'],
  ['Pseudocolour', 'False colours assigned to gray levels to reveal differences.'],
  ['Wavelet', 'Short, scaled and shifted wave; localises frequency and position.'],
  ['Structuring element', 'Small shape used to probe a binary image in morphology.'],
  ['Opening / closing', 'Erode→dilate (removes specks) / dilate→erode (fills holes).'],
  ['Hit-or-miss', '(A ⊖ B₁) ∩ (Aᶜ ⊖ B₂): exact shape detector.'],
  ['Compression ratio', 'CR = n₁/n₂.'],
  ['Entropy', 'H = −Σ p log₂ p bits; lower bound for lossless coding.'],
  ['Huffman code', 'Optimal prefix code from repeatedly merging the two least likely symbols.'],
  ['DPCM', 'Lossy predictive coding with the quantizer inside the prediction loop.'],
  ['EBCOT', 'Embedded Block Coding with Optimized Truncation (JPEG 2000).'],
  ['Canny', 'Edge detector: smooth, gradient, non-max suppression, hysteresis.'],
  ['Hough transform', 'Finds lines by voting in parameter space (ρ = x cosθ + y sinθ).'],
  ['Otsu threshold', 'T that maximises between-class variance.']
];

export default {
  formulas,
  units: { 0: 'Start here', 1: 'Fundamentals, Transforms & Enhancement', 2: 'Restoration, Colour, Wavelets & Morphology', 3: 'Compression & Segmentation' },
  ideaSub: { en: 'No maths background needed. Read this first; the exam answer is further down.' },
  pyqLabel: 'Important-questions paper',
  lbl: { pyq: 'MST', asked: 'Asked in MST', filter: 'MST', paper: 'MST + important questions', paperSub: 'with answers', paperLead: 'Both MST papers and your 20 important questions, each linked to its full answer and diagram. The 2-mark answers open right here.' },

  hero: {
    eyebrow: 'Exam tomorrow · numericals + theory',
    title: "Tonight's plan for DIP",
    titleBhai: 'Aaj raat ka plan: DIP',
    titleGaali: 'Kal DIP hai, aaj raat phaad de',
    text: 'Every one of your 20 important questions has its own topic here, with the full exam answer, a worked numerical and a diagram you can redraw. Do the numericals first; they are guaranteed marks.',
    textBhai: 'Tumhare 20 important questions mein se har ek ka alag topic hai: poora exam answer, solved numerical aur diagram. Pehle numericals karo, wahi pakke marks hain.',
    textGaali: 'Tere 20 important questions ka har ek topic yahan hai: answer, numerical, diagram, sab. Pehle numericals kar, wahi pakke marks hain. Phone neeche rakh aur shuru ho ja, kal paper hai bhai.'
  },

  pattern: {
    title: 'Likely paper pattern · 60 marks · theory + numericals',
    note: 'Assumed same as other CU end-sem papers (MST papers were 5 × 2 + 2 × 5). Numericals (storage, distances, histogram, median, Huffman, morphology) are the safest marks.',
    boxes: [['5 × 2', 'Section A · definitions, one-line formulas'], ['4 × 5', 'Section B · short numerical / compare'], ['3 × 10', 'Section C · full numerical or derivation + diagram']]
  },

  plan: [
    { title: 'Start here: what an image is', time: '≈ 10 min', why: 'Pixels, f(x, y) and the 10 steps of DIP. Everything else builds on this.', ids: ['d0-basics'] },
    { title: 'Numericals first (guaranteed marks)', time: '≈ 2 hrs', why: 'These six come up every time and are pure method. Learn the table/grid format and you will score even if nervous.', ids: ['d1-sampling', 'd1-hist', 'd1-median', 'd3-huffman', 'd1-pixels', 'd2-morph'] },
    { title: 'Unit 1 transforms & filters', time: '≈ 2 hrs', why: 'DFT, Hadamard, DCT, Haar, KLT, point ops and frequency filters. For each: formula, one worked example, the diagram.', ids: ['d1-dft', 'd1-walsh', 'd1-dct', 'd1-haar', 'd1-klt', 'd1-point', 'd1-lpf', 'd1-hpf'] },
    { title: 'Unit 2 restoration & colour', time: '≈ 1.5 hrs', why: 'Noise PDFs, inverse vs Wiener, the Wiener derivation, colour models and wavelets.', ids: ['d2-noise', 'd2-inverse', 'd2-wiener', 'd2-color', 'd2-wavelet'] },
    { title: 'Unit 3 compression & segmentation', time: '≈ 1 hr', why: 'Compression model, JPEG 2000 block diagram, predictive coding and segmentation.', ids: ['d3-basics', 'd3-jpeg', 'd3-seg'] }
  ],

  tips: [
    '<b>Numericals:</b> write the formula first, list the given values (M, N, k / rₖ, nₖ / p), then a <b>table</b>. Method marks come even if the last number slips.',
    '<b>2 marks:</b> definition + formula + one tiny example. 4–5 lines.',
    '<b>5 marks:</b> definition → formula → worked example or comparison table.',
    '<b>10 marks:</b> intro → <b>diagram</b> → steps/derivation under headings → worked example → comparison table → one-line conclusion.',
    '<b>Compare questions</b> (Ideal/Butterworth/Gaussian, Walsh/Hadamard, JPEG/JPEG 2000, inverse/Wiener/CLS): always a table.',
    'Draw every diagram you can: histograms before/after, filter curves, morphology grids, JPEG 2000 blocks, Huffman tree. Diagrams carry marks on their own.',
    'Units: bits ÷ 8 = bytes. log₂ values: −0.4log₂0.4 = 0.529, −0.3log₂0.3 = 0.521, −0.1log₂0.1 = 0.332.'
  ],

  pyq: [
    { title: 'Section A · 5 × 2 = 10 marks (MST questions)', items: [
      [1, 'List the steps involved in digital image processing.', 2, 'd0-basics'],
      [2, 'State the role of sampling in image digitization.', 2, 'd1-sampling'],
      [3, 'Identify the transform known for maximum energy compaction.', 2, 'd1-klt'],
      [4, 'How does inverse filtering work?', 2, 'd2-inverse'],
      [5, 'What are the objectives of Wiener filtering?', 2, 'd2-wiener']] },
    { title: 'Section B · 4 × 5 = 20 marks (important questions)', items: [
      [6, IQ[0][1], 5, 'd1-sampling'],
      [7, IQ[4][1], 5, 'd1-dct'],
      [8, IQ[8][1], 5, 'd1-point'],
      [9, IQ[12][1], 5, 'd2-noise']] },
    { title: 'Section C · 3 × 10 = 30 marks · Q10 & Q11 compulsory, then Q12 OR Q13', items: [
      [10, IQ[7][1], 10, 'd1-hist'],
      [11, IQ[18][1], 10, 'd3-huffman'],
      [12, IQ[15][1], 10, 'd2-color'],
      [13, IQ[17][1], 10, 'd2-morph']] },
    { title: 'MST-1 (2026-27) · Unit 1', items: [
      [1, 'List the steps involved in digital image processing.', 2, 'd0-basics'],
      [2, 'State the role of sampling in image digitization.', 2, 'd1-sampling'],
      [3, 'Identify the transform known for maximum energy compaction.', 2, 'd1-klt'],
      [4, 'Enumerate image quantization and sampling and their importance in DIP.', 2, 'd1-sampling'],
      [5, 'State the significance of gray-level resolution in image representation.', 2, 'd1-sampling'],
      [6, 'Discuss the relationship between pixels using adjacency, connectivity and distance measures.', 5, 'd1-pixels'],
      [7, 'A low-contrast grayscale image requires enhancement: determine a suitable histogram technique and predict its effect.', 5, 'd1-hist']] },
    { title: 'MST-2 (2026-27) · Unit 2', items: [
      [1, 'Describe the RGB model for colour image processing.', 2, 'd2-color'],
      [2, 'How does inverse filtering work?', 2, 'd2-inverse'],
      [3, 'What are the objectives of Wiener filtering?', 2, 'd2-wiener'],
      [4, 'State image restoration and mention its objective.', 2, 'd2-noise'],
      [5, 'What is the effect of salt-and-pepper noise on image pixels? Justify.', 2, 'd2-noise'],
      [6, 'Illustrate the role of pseudocolor image processing in medical imaging.', 5, 'd2-color'],
      [7, 'A pixel is (255,128,64) in RGB: convert to CMY and analyse the significance of colour-model conversion.', 5, 'd2-color']] },
    { title: 'Your 20 important questions', items: IQ }
  ],

  mock: {
    A: [
      ['Define sampling and quantization.', 'd1-sampling'],
      ['How many gray levels are possible with 6 bits per pixel?', 'd1-sampling'],
      ['Define m-adjacency. Why is it needed?', 'd1-pixels'],
      ['Find D₄ and D₈ between p(2,3) and q(6,7).', 'd1-pixels'],
      ['What is the DC component of the 2-D DFT?', 'd1-dft'],
      ['State the recursive formula for the Hadamard matrix.', 'd1-walsh'],
      ['Which transform gives maximum energy compaction?', 'd1-klt'],
      ['Write the histogram equalization transformation.', 'd1-hist'],
      ['Find the negative of r = 60 in an 8-bit image.', 'd1-point'],
      ['Why does an ideal LPF cause ringing?', 'd1-lpf'],
      ['State the degradation model.', 'd2-noise'],
      ['What is the effect of salt-and-pepper noise?', 'd2-noise'],
      ['Write the Wiener filter.', 'd2-wiener'],
      ['Convert RGB (255,128,64) to CMY.', 'd2-color'],
      ['Define opening and closing.', 'd2-morph'],
      ['Define compression ratio and relative redundancy.', 'd3-basics'],
      ['Define PSNR.', 'd3-basics'],
      ['What is EBCOT?', 'd3-jpeg'],
      ['Write the gradient magnitude.', 'd3-seg']
    ].map(([q, id]) => ({ q, id })),
    B: [
      [IQ[0][1], 'd1-sampling'], [IQ[4][1], 'd1-dct'], [IQ[8][1], 'd1-point'], [IQ[11][1], 'd1-hpf'], [IQ[12][1], 'd2-noise'], [IQ[16][1], 'd2-wavelet'],
      ['Apply a 3×3 median filter to the window [10 12 11; 13 255 14; 12 11 13]. Compare with the mean.', 'd1-median'],
      ['Explain the image compression model with a block diagram.', 'd3-basics'],
      ['Compare lossy and lossless predictive coding.', 'd3-jpeg'],
      ['Explain iterative global thresholding with an example.', 'd3-seg']
    ].map(([q, id]) => ({ q, id })),
    C: [
      [IQ[1][1], 'd1-pixels'], [IQ[2][1], 'd1-dft'], [IQ[3][1], 'd1-walsh'], [IQ[5][1], 'd1-haar'], [IQ[6][1], 'd1-klt'], [IQ[7][1], 'd1-hist'],
      [IQ[9][1], 'd1-median'], [IQ[10][1], 'd1-lpf'], [IQ[13][1], 'd2-inverse'], [IQ[14][1], 'd2-wiener'], [IQ[15][1], 'd2-color'], [IQ[17][1], 'd2-morph'],
      [IQ[18][1], 'd3-huffman'], ['Draw and explain the JPEG 2000 block diagram. Compare lossy and lossless predictive coding.', 'd3-jpeg'],
      ['Explain edge detection, edge linking, thresholding and region-oriented segmentation.', 'd3-seg']
    ].map(([q, id]) => ({ q, id }))
  },

  topics: [...unit1.topics, ...unit2.topics, ...unit3.topics],
  cards: [...unit1.cards, ...unit2.cards, ...unit3.cards],
  glossary
};
