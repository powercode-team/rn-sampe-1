import { StackNavigator } from 'react-navigation';

import transitionConfig from './transition-config';
import MatchingArchive from '../containers/MatchingArchive/MatchingArchive';
import MatchingArchiveFilter from '../containers/MatchingArchive/MatchingArchiveFilter';

const MatchingArchiveNav = StackNavigator(
  {
    MatchingArchive: {
      screen: MatchingArchive,
    },
    MatchingArchiveFilter: {
      screen: MatchingArchiveFilter,
    },
  },
  {
    initialRouteName: 'MatchingArchive',
    transitionConfig,
    headerMode: 'none',
  },
);

export default MatchingArchiveNav;
