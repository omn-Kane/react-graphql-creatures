import {gql, graphql} from 'react-apollo';

export const creaturesQuery = gql`
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

export default graphql(creaturesQuery, creaturesQueryOptions);
