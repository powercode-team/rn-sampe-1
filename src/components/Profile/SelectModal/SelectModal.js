import React from 'react';
import { View, TouchableHighlight, TouchableOpacity, Text, ScrollView, Animated } from 'react-native';
import Modal from 'react-native-modal';
import propTypes from 'prop-types';
import styles from './styles';
import { colors } from './../../../styles/base';

class SelectModal extends React.Component {
  state = {
    selectedValue: new Animated.Value(0),
    activeOption: '',
  };

  onSelect = (option) => {
    this.setState({ activeOption: option });
    Animated.timing(this.state.selectedValue, {
      toValue: 1,
      duration: 600,
    }).start(() => {
      this.props.onSelect(option);
      this.setState({ selectedValue: new Animated.Value(0) });
    });
  };

  renderTitle = (option) => {
    let title = '';
    if (typeof option === 'string') {
      title = option;
    } else if (option.category_name) {
      title = option.category_name;
    } else if (option.contract_type_name) {
      title = option.contract_type_name;
    } else if (option.seniority_level_name) {
      title = option.seniority_level_name;
    }
    return this.context.t(title);
  };

  render() {
    const { options, title, visible, closeModal } = this.props;
    return (
      <Modal style={styles.modalStyles} isVisible={visible} animationOutTiming={800}>
        <View style={styles.backgroundView}>
          <TouchableHighlight
            style={styles.background}
            onPress={() => closeModal('Cancel')}
            underlayColor="transparent"
          >
            <View style={styles.background} />
          </TouchableHighlight>
          <View style={styles.wrapperScrollView}>
            <Text style={styles.title}>{this.context.t(title)}</Text>
            <ScrollView contentContainerStyle={styles.modalView} scrollEnabled={Boolean(options && options.length > 8)}>
              <View style={styles.optionsContainer}>
                {options && options.length
                  ? options.map((option) => {
                      const textColor =
                        this.renderTitle(option) === this.props.selectedOption ? colors.primary : colors.text;
                      const renderText =
                        option === this.state.activeOption ? (
                          <Animated.Text
                            style={[
                              styles.optionText,
                              { color: textColor },
                              {
                                color: this.state.selectedValue.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [textColor, colors.primary],
                                }),
                              },
                            ]}
                          >
                            {this.renderTitle(option)}
                          </Animated.Text>
                        ) : (
                          <Text style={styles.optionText}>{this.renderTitle(option)}</Text>
                        );
                      return (
                        <TouchableOpacity
                          key={this.renderTitle(option)}
                          style={styles.optionButton}
                          onPress={() => this.onSelect(option)}
                        >
                          {renderText}
                        </TouchableOpacity>
                      );
                    })
                  : null}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}

SelectModal.propTypes = {
  // options: propTypes.arrayOf(propTypes.string).isRequired,
  title: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
  onSelect: propTypes.func.isRequired,
  options: propTypes.array.isRequired,
  selectedOption: propTypes.string,
};
SelectModal.contextTypes = {
  t: propTypes.func.isRequired,
};
export default SelectModal;
