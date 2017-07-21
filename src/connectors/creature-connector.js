import {gql, graphql} from 'react-apollo';

const contextQuery = gql`
    query Creatures($Session: String!, $Day: Int!, $Offset: Int!, $Limit: Int!) {
        Creatures(Session: $Session, Day: $Day, Offset: $Offset, Limit: $Limit) {
            ID
            Sex
            Action
            Stats {
                Age
                Longevity
                Agility
                Strength
                Intellect
                EpiceneChance
                MultiBirthChance
            }
        }
    }
`;

const options = {
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
    props({data}) {
        console.log('New Data Loading');
        let fetchMoreCreatures = () => {};
        if (data.Context) {
            fetchMoreCreatures = () => {
                data.fetchMore({
                    variables: {
                        Offset: data.Creatures.length,
                    },
                    updateQuery: (previousResult, {fetchMoreResult}) => {
                        console.log('Updating Existing Data');
                        if (!fetchMoreResult) return previousResult;
                        let newThing = {...previousResult, ...fetchMoreResult};
                        newThing.Creatures = [...previousResult.Creatures, ...fetchMoreResult.Creatures]
                        return newThing;
                    },
                });
            };
        }

        return {
            data: {
                ...data,
                fetchMoreCreatures,
            },
        };
    },
};

export default graphql(contextQuery, options);
