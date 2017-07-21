import {gql, graphql, compose} from 'react-apollo';

const creaturesQuery = gql`
    query Creatures($Session: String!, $Season: Int!, $Offset: Int!, $Limit: Int!) {
        Creatures(Session: $Session, Season: $Season, Offset: $Offset, Limit: $Limit) {
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
    mutation SetAction($Session: String!, $Season: Int!, $ID: Int!, $Action: String!) {
        SetAction(Session: $Session, Season: $Season, ID: $ID, Action: $Action) {
            Action
        }
    }
`;

const creaturesQueryOptions = {
    options(props) {
        return {
            variables: {
                Session: props.Session,
                Season: props.Season,
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
        setAction: (Session, Season, ID, Action) => mutate({ variables: { Session, Season, ID, Action } }),
    })
};

export default compose(
    graphql(creaturesQuery, creaturesQueryOptions),
    graphql(creatureMutation, creatureMutationOptions),
);
