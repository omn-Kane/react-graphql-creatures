import {gql, graphql} from 'react-apollo';

export const actionMutation = gql`
    mutation BulkSetAction($Session: String!, $Season: Int!, $Actions: [SetCreatureAction]){
        BulkSetAction(Session: $Session, Season: $Season, Actions: $Actions)
    }
`;

const actionMutationOptions = {
    props: ({ mutate }) => ({
        setBulkActions: (Session, Season, Actions) => mutate({ variables: { Session, Season, Actions } }),
    })
};

export default graphql(actionMutation, actionMutationOptions);
