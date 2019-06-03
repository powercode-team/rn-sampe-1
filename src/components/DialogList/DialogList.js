import React, { Component } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import propTypes from 'prop-types';
import SelectModal from '../Profile/SelectModal/SelectModal';

import styles from './styles';
import { dimensions } from './../../styles/base';

import { DOMAIN } from '../../utils/api';

import DialogItem from './DialogItem/DialogItem';

import taskIcon from '../../../assets/clipboardAltIcon.png';
import jobIcon from '../../../assets/bellIcon.png';
import substituteIcon from '../../../assets/peopleIcon.png';

class DialogList extends Component {
  static propTypes = {
    dialogs: propTypes.array.isRequired,
    isRefreshingList: propTypes.bool.isRequired,
    onUpdateList: propTypes.func.isRequired,
    onDeleteDialog: propTypes.func.isRequired,
    onSelectDialog: propTypes.func.isRequired,
  };
  static contextTypes = {
    t: propTypes.func.isRequired,
  };
  state = {
    deleteId: null,
    isDeleteOpen: false,
    choosedIndex: null,
  };

  getTypeData = (item) => {
    const typeData = { icon: '', name: '' };
    if (item.job_offer_id !== null || item.job_id !== null) {
      typeData.name = 'Job';
      typeData.icon = item.is_substitute ? substituteIcon : jobIcon;
    } else if (item.task_offer_id !== null || item.task_id !== null) {
      typeData.name = 'Task';
      typeData.icon = taskIcon;
    }
    return typeData;
  };

  getFromDialogData = (item) => {
    const fromDialogData = { icon: '', name: '' };
    if (item.thread_type === 'search') {
      fromDialogData.name = 'Search';
      fromDialogData.icon = '\ue807';
    } else if (item.thread_type === 'offer') {
      fromDialogData.name = 'Offer';
      fromDialogData.icon = '\ue804';
    }
    return fromDialogData;
  };

  setInteractableRef = (node) => {
    this.interactableRef.push(node);
  };

  interactableRef = [];

  keyExtractor = (item) => String(item.id);

  deleteChat = (val) => {
    if (val === 'Yes') {
      this.props.onDeleteDialog(this.state.deleteId);
    } else if (val === 'Cancel') {
      this.interactableRef[this.state.choosedIndex].snapTo({ index: 0 });
    }
    this.setState({ deleteId: null, isDeleteOpen: false, choosedIndex: null });
  };

  deleteSubmit = (id, i) => {
    this.setState({ deleteId: id, isDeleteOpen: true, choosedIndex: i });
  };

  renderItem = ({ item, index }) => {
    const { onSelectDialog } = this.props;

    let userAvatar = null;
    if (item.is_public_interlocutor) {
      userAvatar = item.picture && item.picture.length ? { uri: `${DOMAIN}${item.picture}` } : null;
    } else if (!item.is_public_interlocutor && item.is_visible && !item.interlocutor_is_deactivate) {
      userAvatar = item.picture && item.picture.length ? { uri: `${DOMAIN}${item.picture}` } : null;
    }

    const typeData = this.getTypeData(item);
    const fromDialogData = this.getFromDialogData(item);

    const dayAgo =
      item.last_message_date && item.last_message_date > 0
        ? `${item.last_message_date}${this.context.t('d')}`
        : this.context.t('today');

    let username;
    let isVisible;
    if (item.is_public_interlocutor) {
      // show
      username = item.interlocutor_name;
      isVisible = true;
    } else if (!item.is_public_interlocutor && item.is_visible && !item.interlocutor_is_deactivate) {
      // show
      username = item.interlocutor_name;
      isVisible = true;
    } else {
      // hide
      username = this.context.t('Private profile');
      isVisible = false;
    }
    // const username = item.is_public_interlocutor ? item.interlocutor_name : this.context.t('Private profile');

    const maxNumberOfLetters = Math.floor((dimensions.screenWidth * 0.75) / 12);
    const cropName = (name) =>
      (name.length < maxNumberOfLetters ? name : `${name.substring(0, maxNumberOfLetters).trim()}...`);

    const masterDisplayName = item.master ? `[${item.master.first_name} ${item.master.last_name[0]}.] ` : '';

    return (
      <DialogItem
        isPublic={isVisible}
        itemId={item.id}
        dayAgo={dayAgo}
        typeItemName={cropName(item.activity_name)}
        username={cropName(username)}
        userImg={userAvatar}
        typeIcon={typeData.icon}
        typeName={typeData.name}
        fromDialog={fromDialogData.name}
        fromDialogIcon={fromDialogData.icon}
        id={item.id}
        index={index}
        deleteSubmit={this.deleteSubmit}
        onSelectDialog={() => onSelectDialog(item)}
        unreadMessageCounter={item.unread_message_counter}
        setInteractableRef={this.setInteractableRef}
        masterDisplayName={masterDisplayName}
        isSubstitute={item.is_substitute}
      />
    );
  };

  render() {
    const { dialogs, isRefreshingList, onUpdateList } = this.props;

    return (
      <View style={styles.container}>
        {dialogs.length ? (
          <FlatList
            refreshing
            data={dialogs}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            refreshControl={<RefreshControl refreshing={isRefreshingList} onRefresh={onUpdateList} />}
          />
        ) : (
          <View style={styles.noChatsContainer}>
            <Text style={styles.text}>{this.context.t('No chat has been created yet')}</Text>
          </View>
        )}
        <SelectModal
          options={['Yes', 'Cancel']}
          title={this.context.t('Are you sure you want to delete this chat? You will no longer have access to the messages.')}
          visible={this.state.isDeleteOpen}
          closeModal={(option) => this.deleteChat(option)}
          onSelect={(option) => this.deleteChat(option)}
        />
      </View>
    );
  }
}

export default DialogList;
