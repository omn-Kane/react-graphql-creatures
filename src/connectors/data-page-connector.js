import {gql, graphql} from 'react-apollo';

const contextQuery = gql`
    query Context($Session: String!, $Day: Int!) {
        Context(Session: $Session, Day: $Day) {
            Session
            Day
            Play {
                Food
                Lumber
                CreaturesCost
                Housing
                CreatureCount
            }
        }
    }
`;

export default graphql(contextQuery);
