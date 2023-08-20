import { createContext, useState } from "react";

const ResultContext = createContext([])

export const ResultProvider = ({ children }) => {
    const [getResult, setGetResult] = useState([])


    return (
        <ResultContext.Provider value={[getResult, setGetResult]}>
            {children}
        </ResultContext.Provider>
    )
}

export default ResultContext;