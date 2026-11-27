// Subject registry. To add a subject: create src/subjects/<id>/index.js (same shape as pblj) and add a row here.
// Last exam of the season (drives the timeline on the home page)
export const SEASON = { end: '2026-12-07' };

export const SUBJECTS = [
  {
    id: 'dip',
    name: 'Introduction to Digital Image Processing',
    short: 'DIP',
    code: '24ITT-311',
    exam: '2026-11-28',
    blurb: 'Sampling, transforms, enhancement, restoration, colour, wavelets, morphology, compression and segmentation.',
    load: () => import('./dip/index.js')
  },
  {
    id: 'pblj',
    name: 'Project Based Learning in Java',
    short: 'PBLJ',
    code: '24CSH-301',
    exam: '2026-11-25',
    blurb: 'Core Java, Collections & Threads, JDBC, Spring Boot, JPA, REST, Servlets & JSP.',
    load: () => import('./pblj/index.js')
  }
];
