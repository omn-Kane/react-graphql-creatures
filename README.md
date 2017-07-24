## Installation:
- `npm install`

### Starting Server:
- `npm start` A new tab will be opened in your browser

## Apollo:
- Look at `src/index.js` && `src/connectors/creatures-graphql.js` on how to hookup Apollo with your GraphQL backend.
- Look at `src/graphql/` for all the Graphql queries/mutations.
- Look at `src/connectors/app-connector.js` on how to 'connect' your apollo/graphql query/mutation with your React Component.
- Apollo's Docs: `http://dev.apollodata.com/react/index.html`

### What features are being used:
- Basic Graphql query with fragment: `src/graphql/get-context.js`
- Basic Graphql mutation with named function export: `src/graphql/set-creature-action.js`
- Basic Pagination with Graphql query: `src/get-creatures.js`
- Basic Graphql mutation with fragment with named function export: `src/graphql/end-season.js`
- Bulk Graphql mutation with named function export: `src/graphql/bulk-set-creatures-actions.js`
