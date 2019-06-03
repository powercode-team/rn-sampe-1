import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import ProfileHeader from './../../components/Profile/ProfileHeader/ProfileHeader';
import LoadingModal from './../../components/LoadingModal/LoadingModal';
// import ErrorModal from './../../components/ErrorModal/ErrorModal';
import ValidationError from './../../components/ValidationError/ValidationError';
import { updateAvatar, deleteUserAvatar } from '../../actions/user';

class ProfileHeaderContainer extends Component {
  static propTypes = {
    isHeaderVisible: propTypes.bool.isRequired,
    avatar: propTypes.string,
    updateAvatar: propTypes.func.isRequired,
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
    city: propTypes.string,
    country: propTypes.string,
    profession: propTypes.string,
    deleteUserAvatar: propTypes.func.isRequired,
  };
  state = {
    isPhotoModalVisible: false,
    isLoadingModalVisible: false,
    isErrorModalVisible: false,
    // errorTitle: '',
    errorMessage: '',
  };

  changeModalState = (name, state) => {
    this.setState({ [name]: state });
  };
  openImageLibrary = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        // console.log('user canceled image selection');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const data = {
          filename: response.fileName,
          data: response.data,
        };
        this.setState({ isPhotoModalVisible: false, isLoadingModalVisible: true });
        this.props.updateAvatar(data, (e) => {
          if (e) {
            this.setState({
              isLoadingModalVisible: false,
              isErrorModalVisible: true,
              errorMessage: e.msg || e.message || e,
            });
            this.closePopupModal();
          } else {
            setTimeout(() => {
              this.setState({
                isLoadingModalVisible: false,
              });
            }, 800);
          }
        });
      }
    });
  };

  openCamera = () => {
    ImagePicker.launchCamera({}, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const filename = response.uri.replace(/^.*[\\/]/, '');
        const data = {
          filename,
          data: response.data,
        };
        this.setState({ isPhotoModalVisible: false, isLoadingModalVisible: true });
        this.props.updateAvatar(data, (e) => {
          if (e) {
            this.setState({
              isLoadingModalVisible: false,
              isErrorModalVisible: true,
              errorMessage: e.msg || e.message || e,
            });
            this.closePopupModal();
          } else {
            setTimeout(() => {
              this.setState({
                isLoadingModalVisible: false,
              });
            }, 800);
          }
        });
      }
    });
  };
  deletePhoto = () => {
    this.setState({ isPhotoModalVisible: false, isLoadingModalVisible: true });
    this.props.deleteUserAvatar(this.props.avatar, (e) => {
      if (e) {
        this.setState({
          isLoadingModalVisible: false,
          isErrorModalVisible: true,
          errorMessage: e.msg || e.message || e,
        });
        this.closePopupModal();
      } else {
        setTimeout(() => {
          this.setState({
            isLoadingModalVisible: false,
          });
        }, 800);
      }
    });
  };
  closePopupModal = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      this.setState({ errorMessage: '', isErrorModalVisible: false });
    }, 4000);
  };
  render() {
    return (
      <React.Fragment>
        <LoadingModal
          visible={this.state.isLoadingModalVisible}
          closeModal={() => this.changeModalState('isLoadingModalVisible', false)}
        />
        <ValidationError isVisible={this.state.isErrorModalVisible} message={this.state.errorMessage} isBottom />
        <ProfileHeader
          modalVisible={this.state.isPhotoModalVisible}
          onAvatarPress={() => this.changeModalState('isPhotoModalVisible', true)}
          closeModal={() => this.changeModalState('isPhotoModalVisible', false)}
          openCamera={this.openCamera}
          openImageLibrary={this.openImageLibrary}
          avatarURI={this.props.avatar}
          deletePhoto={this.deletePhoto}
          isHeaderVisible={this.props.isHeaderVisible}
          fullName={`${this.props.firstName} ${this.props.lastName}`}
          city={this.props.city}
          country={this.props.country}
          profession={this.props.profession}
          iconName={`${'\ue816'}`}
          showPrivateInfo
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.user.picture,
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  city: state.user.city,
  country: state.user.country,
  profession: state.user.profession,
});

const mapDispatchToProps = { updateAvatar, deleteUserAvatar };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileHeaderContainer);
