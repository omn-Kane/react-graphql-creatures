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
                ...props,
                Offset: 0,
                Limit: 10,
            },
            fetchPolicy: 'network-only',
        };
    },
    props({data}) {
        console.log('WOOT', data);
        let fetchMoreCreatures = () => {};
        if (data.Context) {
            fetchMoreCreatures = data.fetchMore.bind(data.fetchMore, {
                variables: {
                    Offset: data.Context.Play.Creatures.length,
                },
                updateQuery: (previousResult, {fetchMoreResult}) => {
                    console.log('WOOT2', previousResult, fetchMoreResult);
                    if (!fetchMoreResult) return previousResult;
                    let newThing = {...previousResult, ...fetchMoreResult};
                    newThing.Context.Play.Creatures = [...previousResult.Context.Play.Creatures, ...fetchMoreResult.Context.Play.Creatures]
                    return newThing;
                },
            });
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
