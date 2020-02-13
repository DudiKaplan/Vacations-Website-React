import { AppState } from "./appState";
import { AnyAction } from "redux";
import { ActionType } from "./actionType";

export function reducer(oldAppState: AppState | undefined, action: AnyAction): AppState {
    
    if(!oldAppState)     {
        return new AppState();
    }

    const newAppState = { ...oldAppState };

    switch(action.type) {
        case ActionType.GetUser: 
            newAppState.user = action.payload;
            break;

        case ActionType.ClearUser:
            newAppState.user = {};
            break;
    }

    return newAppState;
}




