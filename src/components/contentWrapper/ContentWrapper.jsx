import React from "react";

import "./style.scss";

const ContentWrapper = ({ children }) => {
    return (
        <div className="contentWrapper">
            {children ? children : ""}
        </div>);
};

export default ContentWrapper;