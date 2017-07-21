import {gql, graphql} from 'react-apollo';

export const actionMutation = gql`
    mutation SetAction($Session: String!, $Season: Int!, $ID: Int!, $Action: String!) {
        SetAction(Session: $Session, Season: $Season, ID: $ID, Action: $Action) {
            Action
        }
    }
`;

const actionMutationOptions = {
    props: ({ mutate }) => ({
        setAction: (Session, Season, ID, Action) => mutate({ variables: { Session, Season, ID, Action } }),
    })
};

export default graphql(actionMutation, actionMutationOptions);
