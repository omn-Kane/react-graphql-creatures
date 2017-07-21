import {gql, graphql} from 'react-apollo';
import fragments from './fragments';

export const endSeasonMutation = gql`
    mutation EndSeason($Session: String!) {
        EndSeason(Session: $Session) {
            ...DataPage
        }
    }
    ${fragments.dataPage}
`;

const endSeasonMutationOptions = {
    props: ({ mutate }) => ({
        endSeason: (Session, Season) => mutate({ variables: { Session, Season } }),
    })
};

export default graphql(endSeasonMutation, endSeasonMutationOptions);
