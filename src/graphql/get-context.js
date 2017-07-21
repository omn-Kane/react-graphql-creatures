import {gql, graphql} from 'react-apollo';
import fragments from './fragments';

export const contextQuery = gql`
    query Context($Session: String, $Season: Int) {
        Context(Session: $Session, Season: $Season) {
            ...DataPage
        }
    }
    ${fragments.dataPage}
`;

export default graphql(contextQuery);
