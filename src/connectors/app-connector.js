import {gql, graphql, compose} from 'react-apollo';
import {connect} from 'react-redux';
import {updateSession, updateDay} from '../reducers/app/app-actions';

const fragments = {
    dataPage: gql`
        fragment DataPage on Context {
            Session
            Day
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
    query Context($Session: String, $Day: Int) {
        Context(Session: $Session, Day: $Day) {
            ...DataPage
        }
    }
    ${fragments.dataPage}
`;

const endDayMutation = gql`
    mutation EndDay($Session: String!) {
        EndDay(Session: $Session) {
            ...DataPage
        }
    }
    ${fragments.dataPage}
`;

const mapStateToProps = (state, ownProps) => ({
    Session: state.appStore.session,
    Day: state.appStore.day,
});

const mapDispatchToProps = {
    updateSession,
    updateDay,
};

const endDayMutationOptions = {
    props: ({ mutate }) => ({
        endDay: (Session, Day) => mutate({ variables: { Session, Day } }),
    })
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    graphql(contextQuery),
    graphql(endDayMutation, endDayMutationOptions),
);
