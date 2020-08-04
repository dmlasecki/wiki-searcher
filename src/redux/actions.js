import { createSyncAction } from "./utils";
import { htmlSpanRegex, htmlSpanRegexGlobal } from "../constants/regex";

export const ActionTypes = {
	GET_WIKI_DATA_FETCHING: "GET_WIKI_DATA_FETCHING",
	GET_WIKI_DATA_SUCCESS: "GET_WIKI_DATA_SUCCESS",
	GET_WIKI_DATA_ERROR: "GET_WIKI_DATA_ERROR",
};

const SyncActionsCreators = {
	getWikiDataFetching: () => createSyncAction(ActionTypes.GET_WIKI_DATA_FETCHING),
	getWikiDataSuccess: (data) => createSyncAction(ActionTypes.GET_WIKI_DATA_SUCCESS, data),
	getWikiDataError: (err) => createSyncAction(ActionTypes.GET_WIKI_DATA_ERROR, err),
};

export default function createActions(api) {
	return {
		getWikiResults: createGetWikiResults(api),
		replacePhrase: createReplacePhrase(),
		replacePhraseAll: createReplacePhraseAll(),
	};
}

export const createGetWikiResults = (api) => (phrase) => (dispatch) => {
	dispatch(SyncActionsCreators.getWikiDataFetching());
	api.getWikiResults(phrase)
		.then((data) => {
			if (data.error) {
				throw new Error(data.error.info);
			}
			dispatch(SyncActionsCreators.getWikiDataSuccess(data.query.search));
		})
		.catch((err) => dispatch(SyncActionsCreators.getWikiDataError(err.toString())));
};

export const createReplacePhrase = () => (replacePhrase) => (dispatch, getState) => {
	const data = getState().searchData.data;

	for (let i = 0; i < data.length; i++) {
		const snippetIncludesPhrase = htmlSpanRegex.test(data[i].snippet);
		if (snippetIncludesPhrase) {
			data[i].snippet = data[i].snippet.replace(htmlSpanRegex, replacePhrase);
			break;
		}
	}
	dispatch(SyncActionsCreators.getWikiDataSuccess(data));
};

export const createReplacePhraseAll = () => (replacePhrase) => (dispatch, getState) => {
	const data = getState().searchData.data;
	const replacedSnippetsData = data.map((d) => ({
		...d,
		snippet: (d.snippet = d.snippet.replace(htmlSpanRegexGlobal, replacePhrase)),
	}));
	dispatch(SyncActionsCreators.getWikiDataSuccess(replacedSnippetsData));
};
