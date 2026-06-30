export const securityProgram = {
  programId: 'security-program',
  title: 'Security Program',
  category: 'Main Program',
  description:
    'A complete security training program offered by SafeZone Security Academy. The program includes the book, theoretical training, tactical training, and CNESST training.',
  included: ['Book', 'Theoretical training', 'Tactical training', 'CNESST training'],
  duration: '70 hours',
  amountCents: 37499,
  currency: 'CAD',
  displayPrice: '$374.99',
  certificate:
    'Students receive a certificate from SafeZone Security Academy after completing the program.',
  licenseStatement: 'SafeZone Security Academy has the BSP license.',
  image: '/training-images/security-training-team.jpg',
  imageAlt: 'Security training team participating in the complete SafeZone Security Program',
  active: true,
  registrationEnabled: true,
  stripePriceId: '',
  paymentEnabled: false,
};

export function getSecurityProgramById(programId) {
  return securityProgram.active && securityProgram.programId === programId ? securityProgram : undefined;
}
