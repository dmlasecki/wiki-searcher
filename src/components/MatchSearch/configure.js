import connectMatchSearch from "./MatchSearch";
import createActions from "../../redux/actions";

export default function createMatchSearch(api) {
    return connectMatchSearch(createActions(api));
}