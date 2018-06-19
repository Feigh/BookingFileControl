import { connect, Dispatch } from "react-redux";
import * as Actions from "../actions/";
import Hello from "../components/Hello";
import { IStoreState } from "../types/";

export function mapStateToProps({ enthusiasmLevel, languageName }: IStoreState) {
  return {
    enthusiasmLevel,
    name: languageName
  };
}

export function mapDispatchToProps(dispatch: Dispatch<Actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(Actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(Actions.decrementEnthusiasm())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
