import {gql, graphql, compose} from 'react-apollo';
import {connect} from 'react-redux';
import {updateSession, updateSeason} from '../reducers/app/app-actions';

const fragments = {
    dataPage: gql`
        fragment DataPage on Context {
            Session
            Season
            Play {
                Food
                Lumber
                CreaturesCost
                Housing
                CreatureCount
            }
        }
    `,
};

const contextQuery = gql`
    query Context($Session: String, $Season: Int) {
        Context(Session: $Session, Season: $Season) {
            ...DataPage
        }
    }
    ${fragments.dataPage}
`;

const endSeasonMutation = gql`
    mutation EndSeason($Session: String!) {
        EndSeason(Session: $Session) {
            ...DataPage
        }
    }
    ${fragments.dataPage}
`;

const mapStateToProps = (state, ownProps) => ({
    Session: state.appStore.session,
    Season: state.appStore.season,
});

const mapDispatchToProps = {
    updateSession,
    updateSeason,
};

const endSeasonMutationOptions = {
    props: ({ mutate }) => ({
        endSeason: (Session, Season) => mutate({ variables: { Session, Season } }),
    })
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    graphql(contextQuery),
    graphql(endSeasonMutation, endSeasonMutationOptions),
);
