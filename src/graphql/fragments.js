import {gql} from 'react-apollo';

export default {
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
