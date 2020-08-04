import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import debounce from "lodash.debounce";

import styles from "./MatchSearch.module.scss";

import ResultList from "../ResultList/ResultList";

function MatchSearch({ getWikiResults, replacePhrase, replacePhraseAll, isLoading, data, error }) {
	const [input, setInput] = useState({
		search: "",
		replace: "",
	});
	const delayedGet = debounce(handleGet, 700);

	function handleGet() {
		getWikiResults(input.search);
	}

	useEffect(() => {
		if (input.search) {
			delayedGet();
		}
		return delayedGet.cancel;
	}, [input.search]);


	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		})
	}

	function handleReplaceOne() {
		replacePhrase(input.replace);
	}

	function handleReplaceAll() {
		replacePhraseAll(input.replace);
	}

	return (
		<>
			<div className={styles.navInputs}>
				<input
					type={"text"}
					name={"search"}
					value={input.search}
					onChange={handleChange}
					placeholder={"Search phrase ..."}
				/>
				<input
					type={"text"}
					name={"replace"}
					value={input.replace}
					onChange={handleChange}
					placeholder={"Replace phrase ..."}
				/>
			</div>
			<button onClick={handleGet}>Search</button>
			<button onClick={handleReplaceOne}>Replace</button>
			<button onClick={handleReplaceAll}>Replace All</button>
			<ResultList data={data} isLoading={isLoading} error={error} />
		</>
	);
}

export default function connectMatchSearch(actions) {
	return connect(
		({ searchData }) => ({ ...searchData }),
		(dispatch) => bindActionCreators(actions, dispatch)
	)(MatchSearch);
}
