import { createContext, useReducer } from "react";

const Store = createContext();
const initialState = {
  skills: [],
  unSkills: [],
  customers: [],
  requests: [],
  histories: [],
  myHistories: [],
  start_group_location: 0,
  start_filter_location: 0,
  start: 0,
  start2: 0,
  start3: 0,
  start4: 0,
  count: 0,
  phone: null,
  start_time: null,
  end_time: null,
  filterValue: -1,
  filteredHistories: [],
  marketers: [],
  phones: [],
  locations: [],
  filterFeedback: null,
  filterName: null,
  filterStartDate: null,
  filterEndDate: null,
  fetchHistory: false,
  loading: false,
  downloads: [],
  listPhone: [],
  wesabiUser: localStorage.getItem("wesabiUser")
    ? JSON.parse(localStorage.getItem("wesabiUser"))
    : null,
  isAdmin: localStorage.getItem("isAdmin") || false,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_FETCHING":
      return { ...state, loading: action.payload };
    case "END_FETCHING":
      return { ...state, loading: action.payload };
    case "UPDATE_GROUP_FILTER":
      return {
        ...state,
        filterFeedback: action.payload.feedback,
        filterName: action.payload.marketer,
        filterStartDate: action.payload.startDate,
        filterEndDate: action.payload.endDate,
      };
    case "UPDATE_MARKETER":
      return {
        ...state,
        marketers: action.payload,
      };
    case "UPDATE_PHONE":
      return {
        ...state,
        phones: action.payload,
      };
    case "PHONE_LIST":
      return {
        ...state,
        listPhone: action.payload,
        loading: false,
      };
    case "RESET_SINGLE_FILTER":
      return {
        ...state,
        filterValue: "",
      };
    case "RESET_GROUP_FILTER":
      return {
        ...state,
        filterFeedback: null,
        filterName: null,
        filterStartDate: null,
        filterEndDate: null,
      };
    case "RESET_SEARCH_PARAM":
      return {
        ...state,
        phone: null,
        start_time: null,
        end_time: null,
      };
    case "UPDATE_SEARCH_PARAM":
      return {
        ...state,
        phone: action.payload.phone,
        start_time: action.payload.start_time,
        end_time: action.payload.end_time,
      };
    case "UPDATE_DOWNLOAD":
      return {
        ...state,
        downloads: action.payload,
      };
    case "SET_COUNT":
      return {
        ...state,
        count: action.payload,
      };

    case "UPDATE_ADMIN":
      return {
        ...state,
        isAdmin: action.payload,
      };
    case "UPDATE_FILTERED_HISTORIES":
      return {
        ...state,
        filteredHistories: action.payload,
      };
    case "UPDATE_SINGLE_FILTER":
      return {
        ...state,
        filterValue: action.payload,
      };
    case "UPDATE_HISTORY":
      return {
        ...state,
        histories: action.payload,
      };
    case "UPDATE_LOCATION":
      return {
        ...state,
        locations: action.payload,
      };
    case "UPDATE_MY_HISTORY":
      return {
        ...state,
        myHistories: action.payload,
      };
    case "GET_REQUEST":
      return {
        ...state,
        requests: action.payload,
        loading: false,
      };
    case "SAVE_USER":
      return {
        ...state,
        wesabiUser: action.payload,
      };
    case "INCREASE_START_GROUP_LOCATION":
      return { ...state, start_group_location: action.payload };
    case "REDUCE_START_GROUP_LOCATION":
      return { ...state, start_group_location: action.payload };
    case "INCREASE_START_FILTER_LOCATION":
      return { ...state, start_filter_location: action.payload };
    case "REDUCE_START_FILTER_LOCATION":
      return { ...state, start_filter_location: action.payload };
    case "INCREASE_START":
      return { ...state, start: action.payload };
    case "REDUCE_START":
      return { ...state, start: action.payload };
    case "INCREASE_START2":
      return { ...state, start2: action.payload };
    case "REDUCE_START2":
      return { ...state, start2: action.payload };
    case "INCREASE_START3":
      return { ...state, start3: action.payload };
    case "REDUCE_START3":
      return { ...state, start3: action.payload };
    case "INCREASE_START4":
      return { ...state, start4: action.payload };
    case "REDUCE_START4":
      return { ...state, start4: action.payload };
    default:
      return state;
  }
}
function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export { Store, StoreProvider };
