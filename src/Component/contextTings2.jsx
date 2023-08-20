import { createContext, useState } from "react";

const ResultContext2 = createContext([])

export const ResultProvider2 = ({ children }) => {
    const [getTvResult , setgetTvResult] = useState([])


    return (
        <ResultContext2.Provider value={[getTvResult ,setgetTvResult]}>
            {children}
        </ResultContext2.Provider>
    )
}

export default ResultContext2;