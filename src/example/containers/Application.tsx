import { connect, Dispatch } from "react-redux";
import * as Actions from "../actions/";
import Application from "../components/Application";
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

export default connect(mapStateToProps, mapDispatchToProps)(Application);
