export const SCIENTIFIC_CONSTANTS = {
  physics: {
    speedOfLight: { value: 299792458, unit: 'm/s', symbol: 'c', latex: '$c$' },
    planckConstant: { value: 6.62607015e-34, unit: 'J\\cdot s', symbol: 'h', latex: '$h$' },
    gravitationalConstant: { value: 6.67430e-11, unit: 'm^3/(kg\\cdot s^2)', symbol: 'G', latex: '$G$' },
    elementaryCharge: { value: 1.602176634e-19, unit: 'C', symbol: 'e', latex: '$e$' }
  },
  chemistry: {
    avogadroConstant: { value: 6.02214076e23, unit: 'mol^{-1}', symbol: 'N_A', latex: '$N_A$' },
    boltzmannConstant: { value: 1.380649e-23, unit: 'J/K', symbol: 'k_B', latex: '$k_B$' },
    idealGasConstant: { value: 8.314462618, unit: 'J/(mol\\cdot K)', symbol: 'R', latex: '$R$' }
  }
};
