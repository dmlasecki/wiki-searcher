import React from "react";
import styles from "./ResultListItem.module.scss"
import parse from 'html-react-parser';

export default function ResultListItem({ item }) {
    return (
        <div className={styles.item}>
            <b>{item.title}</b>
            <p>{parse(item.snippet)}</p>
        </div>
    )
}