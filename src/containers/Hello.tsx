import { Hello, Props } from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
    return {
      enthusiasmLevel,
      name: languageName,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
      onIncrement: () => dispatch(actions.incrementEnthusiasm()),
      onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    };
}

// bug:https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237
// export default connect<{}, Props , {}>(mapStateToProps, mapDispatchToProps)(Hello);
export default connect<Props, {}, {}>(mapStateToProps, mapDispatchToProps)(Hello);