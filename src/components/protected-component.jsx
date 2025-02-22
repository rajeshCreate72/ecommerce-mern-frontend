import React, { useState } from "react";
import useAPI from "../hooks/api";

const ProtectedComponent = ({ children }) => {
    return <div>{children}</div>;
};

export default ProtectedComponent;
