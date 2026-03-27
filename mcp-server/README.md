# MCP Google Search

A specialized Model Context Protocol (MCP) server that allows Claude (and other MCP clients) to perform Google searches and retrieve results.

## Architecture
This server is built using the `@modelcontextprotocol/sdk`. It exposes tools via standard stdio transport.
- **Tools**: `google_search` - Accepts a search query and returns search results.
- **Resources**: (Planned) Search history.
- **Prompts**: (Planned) Search refinement guidelines.

## Installation

```bash
npm install
npm run build
```

## Usage

To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "google-search": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-google-search/dist/index.js"]
    }
  }
}
```

## Development

```bash
npm run build
npm run test
```
