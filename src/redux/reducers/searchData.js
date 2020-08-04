import { ActionTypes } from "../actions";

const initialState = {
    data: null, isLoading: false, error: null
};

export default function searchData(state = initialState, { type, payload }) {
    switch (type) {
        case ActionTypes.GET_WIKI_DATA_FETCHING:
            return { ...state, isLoading: true, data: null, error: null };
        case ActionTypes.GET_WIKI_DATA_SUCCESS:
            return { ...state, data: [...payload], isLoading: false, error: null }
        case ActionTypes.GET_WIKI_DATA_ERROR:
            return { ...state, isLoading: false, error: payload, data: null  }
        default:
            return state;
    }
}
