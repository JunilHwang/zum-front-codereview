import api from '../lib/api';
const createType = (type) => [type, `${type}_SUCCESS`, `${type}_ERROR`];
export const [DETAIL, DETAIL_SUCCESS, DETAIL_ERROR] = createType('DETAIL');
export const [SUB, SUB_SUCCESS, SUB_ERROR] = createType('SUB');
export const [HOME, HOME_SUCCESS, HOME_ERROR] = createType('HOME');
export const [FAVOR, FAVOR_SUCCESS, FAVOR_ERROR] = createType('FAVOR');

export default (state = initialState, action) => {
    switch (action.type) {
        case HOME:
            return {
                ...state,
                home: null,
                loading: true,
                error: null,
            };
        case HOME_SUCCESS:
            return {
                ...state,
                home: action.home,
                loading: false,
                error: null,
            };
        case HOME_ERROR:
            return {
                ...state,
                home: action.home,
                loading: false,
                error: action.error,
            };
        case SUB:
            return {
                ...state,
                sub: null,
                loading: true,
                error: null,
            };
        case SUB_SUCCESS:
            return {
                ...state,
                sub: action.sub,
                loading: false,
                error: null,
            };
        case SUB_ERROR:
            return {
                ...state,
                sub: action.sub,
                loading: false,
                error: action.error,
            };
        case DETAIL:
            return {
                ...state,
                detail: null,
                loading: true,
                error: null,
            };
        case DETAIL_SUCCESS:
            return {
                ...state,
                detail: action.detail,
                loading: false,
                error: null,
            };
        case DETAIL_ERROR:
            return {
                ...state,
                detail: action.detail,
                loading: false,
                error: action.error,
            };
        case FAVOR:
            return {
                ...state,
                favor: null,
                loading: true,
                error: null,
            };
        case FAVOR_SUCCESS:
            return {
                ...state,
                favor: action.favor,
                loading: false,
                error: null,
            };
        case FAVOR_ERROR:
            return {
                ...state,
                favor: action.favor,
                loading: false,
                error: action.error,
            };
        default:
            return { ...state };
    }
};
