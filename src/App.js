import React from "react";
import Layout from "./components/Layout/Layout";
import { Provider } from "react-redux";

export default function App({ store, MatchSearch }) {
	return (
		<Provider store={store}>
			<Layout>
				<MatchSearch />
			</Layout>
		</Provider>
	);
}
