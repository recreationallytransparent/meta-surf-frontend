import {RootState, Services} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export type ThunkFunction<T> = (
    dispatch: ThunkDispatch<RootState, Services, AnyAction>,
    getState: () => RootState,
    api: Services
) => ThunkAction<Promise<T>, RootState, Services, AnyAction>