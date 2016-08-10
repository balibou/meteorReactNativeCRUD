import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const cardSize = (window.width - MARGIN_HORIZONTAL * 4) / 2;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 5,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: colors.buttonBackground,
    color: colors.buttonText,
    width: cardSize,
    height: cardSize,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginVertical: 5,
    paddingTop: cardSize / 2.3,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    alignItems: 'center',
  },
  renderRow: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
