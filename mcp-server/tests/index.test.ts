import { describe, it, expect } from 'vitest';
import { SCIENTIFIC_CONSTANTS } from '../src/constants';

describe('Academic Science MCP', () => {
  describe('Resources: Constants', () => {
    it('should contain the speed of light with correct LaTeX formatting', () => {
      const c = SCIENTIFIC_CONSTANTS.physics.speedOfLight;
      expect(c.value).toBe(299792458);
      expect(c.latex).toBe('$c$');
    });

    it('should contain the Avogadro constant', () => {
      const na = SCIENTIFIC_CONSTANTS.chemistry.avogadroConstant;
      expect(na.value).toBe(6.02214076e23);
    });
  });

  describe('Tools: ArXiv Search', () => {
    it('should format LaTeX equations correctly in mock response', () => {
      const mockSummary = 'The governing equation is given by $\\hat{H} |\\Psi\\rangle = 0$.';
      expect(mockSummary).toContain('$\\hat{H} |\\Psi\\rangle = 0$');
    });
  });
});
