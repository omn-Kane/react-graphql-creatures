import React from 'react';
import {ApolloClient, createNetworkInterface, ApolloProvider} from 'react-apollo';

const networkInterface = createNetworkInterface({uri: 'http://localhost:8080/graphql'});
const client = new ApolloClient({networkInterface: networkInterface});

export const CreaturesGraphql = ({ children }) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}

export default CreaturesGraphql;
