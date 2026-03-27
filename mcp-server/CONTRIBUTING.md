# Contributing to Academic Science MCP

We welcome contributions from the scientific and developer communities! 

## Adding New Scientific Data Sources

To add a new data source (e.g., PubMed, Crossref, or a custom API):

1. **Create a new Tool**:
   - Open `src/index.ts`.
   - Add a new tool definition in the `ListToolsRequestSchema` handler.
   - Implement the API call in the `CallToolRequestSchema` handler.
   
2. **Ensure Structured Output**:
   - Do not return raw HTML or plain text walls.
   - Parse the API response and return a structured JSON object.
   - Ensure any mathematical formulas are wrapped in standard LaTeX delimiters (`$...$` for inline, `$$...$$` for block).

3. **Mocking and Testing**:
   - Add unit tests in the `tests/` directory.
   - Mock the external API responses using Vitest to ensure tests run offline and quickly.

## Pull Request Process

1. Fork the repo and create your branch from `main`.
2. Run `npm run format` and `npm run lint` to ensure code style consistency.
3. Ensure all tests pass with `npm test`.
4. Submit your PR with a clear description of the new data source or feature.
