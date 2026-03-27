import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { SCIENTIFIC_CONSTANTS } from './constants.js';

const server = new Server(
  {
    name: 'academic-science-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  },
);

// --- RESOURCES ---
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'science://constants/physics',
        name: 'Fundamental Physics Constants',
        description: 'A curated list of fundamental physics constants with LaTeX formatting.',
        mimeType: 'application/json',
      },
      {
        uri: 'science://constants/chemistry',
        name: 'Fundamental Chemistry Constants',
        description: 'A curated list of fundamental chemistry constants with LaTeX formatting.',
        mimeType: 'application/json',
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  if (uri === 'science://constants/physics') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(SCIENTIFIC_CONSTANTS.physics, null, 2),
        },
      ],
    };
  }
  if (uri === 'science://constants/chemistry') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(SCIENTIFIC_CONSTANTS.chemistry, null, 2),
        },
      ],
    };
  }
  throw new Error('Resource not found');
});

// --- TOOLS ---
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_arxiv',
        description: 'Searches the ArXiv database for academic papers and returns structured summaries with LaTeX math support.',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'The scientific search query (e.g., "quantum entanglement")' },
            maxResults: { type: 'number', description: 'Maximum number of results to return (default: 3)' },
          },
          required: ['query'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'search_arxiv') {
    const query = request.params.arguments?.query as string;
    const maxResults = (request.params.arguments?.maxResults as number) || 3;

    try {
      // In a real implementation, we would call the ArXiv API using axios:
      // const response = await axios.get(`http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&max_results=${maxResults}`);
      // const parsed = await xml2js.parseStringPromise(response.data);
      
      // For demonstration, we return a structured mock response that includes LaTeX
      const mockResults = {
        query,
        results: [
          {
            title: 'A Novel Approach to Quantum Gravity',
            authors: ['Jane Doe', 'John Smith'],
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
        content: [{ type: 'text', text: `Error fetching from ArXiv: ${error.message}` }],
        isError: true,
      };
    }
  }
  throw new Error('Tool not found');
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Academic Science MCP Server running on stdio');
}

main().catch(console.error);
