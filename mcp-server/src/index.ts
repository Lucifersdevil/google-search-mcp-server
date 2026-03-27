import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { SCIENTIFIC_CONSTANTS } from './constants.js';

const server = new Server(
  {
    name: 'science-research-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// --- TOOLS ---
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_academic_sources',
        description: 'Searches academic sources (ArXiv, ResearchGate, .edu) for scientific papers and returns structured summaries with LaTeX math support.',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'The scientific search query (e.g., "quantum entanglement")' },
            maxResults: { type: 'number', description: 'Maximum number of results to return (default: 3)' },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_scientific_constants',
        description: 'Returns a structured JSON of Physics and Chemistry constants in LaTeX format.',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Category of constants to retrieve ("physics", "chemistry", or "all")', enum: ['physics', 'chemistry', 'all'] }
          },
          required: ['category'],
        },
      }
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'search_academic_sources') {
    const rawQuery = request.params.arguments?.query as string;
    const maxResults = (request.params.arguments?.maxResults as number) || 3;

    // Automatically append academic filters to the query
    const academicQuery = `${rawQuery} (site:arxiv.org OR site:edu OR site:researchgate.net)`;

    try {
      // For demonstration, we return a structured mock response that includes LaTeX
      const mockResults = {
        originalQuery: rawQuery,
        executedQuery: academicQuery,
        results: [
          {
            title: 'A Novel Approach to Quantum Gravity',
            authors: ['Jane Doe', 'John Smith'],
            source: 'arxiv.org',
            published: '2026-03-15',
            summary: 'We propose a new framework for quantum gravity where the metric tensor $g_{\\mu\\nu}$ is quantized directly. The governing equation is given by $\\hat{H} |\\Psi\\rangle = 0$, leading to a modified Einstein field equation $R_{\\mu\\nu} - \\frac{1}{2} R g_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} \\langle \\hat{T}_{\\mu\\nu} \\rangle$.',
            url: 'https://arxiv.org/abs/mock.12345',
          },
        ],
      };

      return {
        content: [{ type: 'text', text: JSON.stringify(mockResults, null, 2) }],
      };
    } catch (error: any) {
      return {
        content: [{ type: 'text', text: `Error fetching academic sources: ${error.message}` }],
        isError: true,
      };
    }
  }

  if (request.params.name === 'get_scientific_constants') {
    const category = request.params.arguments?.category as string;
    let resultData;

    if (category === 'physics') {
      resultData = SCIENTIFIC_CONSTANTS.physics;
    } else if (category === 'chemistry') {
      resultData = SCIENTIFIC_CONSTANTS.chemistry;
    } else {
      resultData = SCIENTIFIC_CONSTANTS;
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(resultData, null, 2) }],
    };
  }

  throw new Error('Tool not found');
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Science Research MCP Server running on stdio');
}

main().catch(console.error);
