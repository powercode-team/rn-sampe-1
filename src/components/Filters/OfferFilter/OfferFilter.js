import React from 'react';
import { View } from 'react-native';
import propTypes from 'prop-types';

import SelectableRow from '../SelectableRow/SelectableRow';

import styles from './styles';

const OfferFilter = ({ items, handlerOnSelect }) => (
  <View style={styles.wrapper}>
    {items.map((item, index) => (
      <SelectableRow
        key={String(item.id)}
        value={item.value}
        isActive={item.isActive}
        onPress={() => handlerOnSelect(index)}
      />
    ))}
  </View>
);

OfferFilter.propTypes = {
  items: propTypes.array.isRequired,
  handlerOnSelect: propTypes.func.isRequired,
};

export default OfferFilter;
