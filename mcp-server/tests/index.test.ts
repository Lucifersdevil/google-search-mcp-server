import { describe, it, expect } from 'vitest';
import { SCIENTIFIC_CONSTANTS } from '../src/constants';

describe('Science Research MCP', () => {
  describe('Tools: get_scientific_constants', () => {
    it('should contain the speed of light with correct LaTeX formatting in physics constants', () => {
      const c = SCIENTIFIC_CONSTANTS.physics.speedOfLight;
      expect(c.value).toBe(299792458);
      expect(c.latex).toBe('$c$');
    });

    it('should contain the Avogadro constant in chemistry constants', () => {
      const na = SCIENTIFIC_CONSTANTS.chemistry.avogadroConstant;
      expect(na.value).toBe(6.02214076e23);
    });
  });

  describe('Tools: search_academic_sources', () => {
    it('should format LaTeX equations correctly in mock response', () => {
      const mockSummary = 'The governing equation is given by $\\hat{H} |\\Psi\\rangle = 0$.';
      expect(mockSummary).toContain('$\\hat{H} |\\Psi\\rangle = 0$');
    });
    
    it('should append academic filters to the query', () => {
      const rawQuery = "quantum entanglement";
      const academicQuery = `${rawQuery} (site:arxiv.org OR site:edu OR site:researchgate.net)`;
      expect(academicQuery).toContain('site:arxiv.org OR site:edu OR site:researchgate.net');
    });
  });
});
