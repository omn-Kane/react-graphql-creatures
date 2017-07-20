import {gql, graphql} from 'react-apollo';

const contextQuery = gql`
    query Context($Session: String!, $Day: Int!, $Offset: Int!, $Limit: Int!) {
        Context(Session: $Session, Day: $Day) {
            Play {
                Creatures(Offset: $Offset, Limit: $Limit) {
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
                        Offset: data.Context.Play.Creatures.length,
                    },
                    updateQuery: (previousResult, {fetchMoreResult}) => {
                        console.log('Updating Existing Data');
                        if (!fetchMoreResult) return previousResult;
                        let newThing = {...previousResult, ...fetchMoreResult};
                        newThing.Context.Play.Creatures = [...previousResult.Context.Play.Creatures, ...fetchMoreResult.Context.Play.Creatures]
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
