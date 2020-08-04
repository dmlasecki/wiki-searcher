import React from "react";
import "getbase/src/scss/styles.scss";

export default function Layout({ children }) {
    return <div className={"container-m"}>
        {children}
    </div>
}