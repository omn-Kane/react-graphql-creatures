import {compose} from 'react-apollo';
import getCreatures from '../graphql/get-creatures';
import setCreatureAction from '../graphql/set-creature-action';

export default compose(getCreatures, setCreatureAction);
