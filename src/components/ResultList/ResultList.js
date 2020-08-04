import React from "react";
import ResultListItem from "./ResultListItem/ResultListItem";

import styles from "./ResultList.module.scss"

export default function ResultList({ data, isLoading, error }) {
	return (
		<div className={styles.resultList}>
			{isLoading ? (
				<p>loading ...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				data?.map((item, index) => <ResultListItem key={index} item={item} />)
			)}
		</div>
	);
}
