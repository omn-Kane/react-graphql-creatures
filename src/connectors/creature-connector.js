import {gql, graphql, compose} from 'react-apollo';

const creaturesQuery = gql`
    query Creatures($Session: String!, $Day: Int!, $Offset: Int!, $Limit: Int!) {
        Creatures(Session: $Session, Day: $Day, Offset: $Offset, Limit: $Limit) {
            ID
            Sex
            Action
            Stats {
                Age
                Longevity
                Farming
                Lumberjacking
                EpiceneChance
                MultiBirthChance
            }
        }
    }
`;

const creatureMutation = gql`
    mutation SetAction($Session: String!, $Day: Int!, $ID: Int!, $Action: String!) {
        SetAction(Session: $Session, Day: $Day, ID: $ID, Action: $Action) {
            Action
        }
    }
`;

const creaturesQueryOptions = {
    options(props) {
        return {
            variables: {
                Session: props.Session,
                Day: props.Day,
                Offset: 0,
                Limit: 10,
            },
            fetchPolicy: 'network-only', // See http://dev.apollodata.com/react/api-queries.html#graphql-config-options-fetchPolicy
        };
    },
    props: ({ data }) => ({
        data: {...data},
        fetchMoreCreatures: () => data.fetchMore({
            variables: { Offset: data.Creatures.length },
            updateQuery: (previousResult, {fetchMoreResult}) => {
                if (!fetchMoreResult) return previousResult;
                console.log('Smething', fetchMoreResult);
                let newThing = {...previousResult, ...fetchMoreResult};
                newThing.Creatures = [...previousResult.Creatures, ...fetchMoreResult.Creatures]
                return newThing;
            },
        }),
    }),
};

const creatureMutationOptions = {
    props: ({ mutate }) => ({
        setAction: (Session, Day, ID, Action) => mutate({ variables: { Session, Day, ID, Action } }),
    })
};

export default compose(
    graphql(creaturesQuery, creaturesQueryOptions),
    graphql(creatureMutation, creatureMutationOptions),
);
