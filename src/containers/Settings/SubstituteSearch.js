import React, { Component } from 'react';
import propTypes from 'prop-types';
import { View, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import { debounce } from 'lodash';

import { translateTitle } from '../../translations/navigation';

import { changeVacationModeStatus } from '../../actions/user';

import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';

import LoadingModal from '../../components/LoadingModal/LoadingModal';
import HeaderBackButton from '../../components/HeaderBackButton/HeaderBackButton';
import SubstituteSearchInput from '../../components/Settings/SubstituteSearchInput/SubstituteSearchInput';
import SubstituteList from '../../components/Settings/SubstituteList/SubstituteList';
import SubstituteItem from '../../components/Settings/SubstituteItem/SubstituteItem';

import { colors } from '../../styles/base';
import { fetchAPI } from '../../utils/api';

class SubstituteSearchContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    return {
      headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
      headerTitle: <HeaderTitle text={translateTitle(lang, 'HR Substitute')} />,
      headerRight: <View />,
    };
  };

  static propTypes = {
    changeVacationModeStatus: propTypes.func.isRequired,
    navigation: propTypes.object.isRequired,
    lang: propTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.searchInputRef = React.createRef();
    this.debounceFetchUsers = debounce(this.fetchUsers, 500);
  }

  state = {
    searchValue: '',
    users: [],
    isLoading: false,
    isUpdatingStatus: false,
  };
  componentDidMount() {
    this.props.navigation.setParams({ lang: this.props.lang });
  }

  onUserSelect = (item) => {
    this.setState({ isUpdatingStatus: true });
    this.props.changeVacationModeStatus(true, item.id, () => {
      this.setState({ isUpdatingStatus: false });
      this.props.navigation.goBack();
    });
  };

  onSearchValueChange = (value) => {
    this.setState({ searchValue: value, isLoading: true });
    this.debounceFetchUsers(value);
  };

  setSearchInputFocus = () => {
    this.searchInputRef.current.focus();
  };

  keyExtractor = (item) => String(item.id);

  fetchUsers = async (value) => {
    try {
      if (value.length) {
        this.setState({ isLoading: true });
        const response = await fetchAPI(`/substitutes/?email=${value}`, 'GET');
        if (response.status_code === 200) {
          this.setState({ users: response.payload, isLoading: false });
        }
      } else {
        this.setState({ users: [], isLoading: false });
      }
    } catch (error) {
      console.log('fetchUsers', error);
    }
  };

  renderItem = ({ item }) => <SubstituteItem email={item.email} onPress={() => this.onUserSelect(item)} />;

  render() {
    const { searchValue, isLoading, users, isUpdatingStatus } = this.state;

    const showFoundUsers = Boolean(searchValue.length && !users.length && !isLoading);

    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SubstituteSearchInput
          value={searchValue}
          onChange={this.onSearchValueChange}
          setFocus={this.setSearchInputFocus}
          inputRef={this.searchInputRef}
        />
        <SubstituteList showFoundUsers={showFoundUsers}>
          <FlatList
            style={{ width: '100%' }}
            keyboardShouldPersistTaps="always"
            data={users}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => {}} />}
          />
        </SubstituteList>
        <LoadingModal visible={isUpdatingStatus} closeModal={() => this.setState({ isUpdatingStatus: false })} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang,
});

const mapDispatchToProps = {
  changeVacationModeStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubstituteSearchContainer);
