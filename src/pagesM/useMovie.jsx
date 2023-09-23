import { useState , useReducer, useEffect } from "react"
import axios from "axios"
function useMovie(popularM) {
    const [onClickOne , setOnClickOne] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage]= useState(1)
    const [sliderValues, setSliderValues] = useState([1890, new Date().getFullYear()]) // Initial values for the slider

    function stateReducer(state, action) {
        switch (action.type) {
            case 'state1':
                return { ...state, state1: action.payload };
            case 'state2':
                return { ...state, state2: action.payload };
            case 'state3':
                return { ...state, state3: action.payload };
            case 'state4':
                return { ...state, state4: action.payload };
            case 'state5':
                return { ...state, state5: action.payload };
            case 'state6':
                return { ...state, state6: action.payload };
            case 'state7':
                return { ...state ,state7: action.payload };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(stateReducer, {
        state1: [],
        state2: [], 
        state3: [],
        state4: [],
        state5: [],
        state6: [],
        state7: [],
    });

    const BringGenres = async ()=>{
        const data1 = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
        dispatch({type : 'state1' , payload : data1.data.genres})
    }

    const GenCertificationM = async ()=>{
        const get = await axios.get('https://api.themoviedb.org/3/certification/movie/list?api_key=1b6ccfb407b0626e097c87368fba764e')
        dispatch({type : 'state4', payload : get.data.certifications.US})
    }

    useEffect(()=>{
        BringGenres()
        GenCertificationM()
    },[])


    const handleSliderChange = (newValues) => {
        setSliderValues(newValues)
    }

    const handleAdd = (gen) => {
        if (!state.state2.some(existingGen => existingGen.id === gen.id)) {
            dispatch({type : 'state2' , payload : [...state.state2 ,gen]});
            dispatch({type : 'state1' , payload : state.state1.filter((g) => g.id !== gen.id)});
            setPage(1);
        }
    }
    

    const handleRemove = (gen)=>{
        dispatch({type : 'state1' , payload : [...state.state1 ,gen]})
        dispatch({type : 'state2' , payload :state.state2.filter((rem)=> rem.id !== gen.id)})
        getGenIdRemove(state.state2)
    }

        
    const getGenIdAdd = () => {
        if (state.state2 === undefined) return;
        if (state.state2.length < 1) return;
        const GId = state.state2.map(i => i.id);
        const res = GId.reduce((acc, cur) => acc + ',' + cur);
        dispatch({type : 'state3' , payload : [...state.state3, res]});
        console.log(state.state3)
    }
    

    const getGenIdRemove = (sel)=>{
        dispatch({type : 'state3', payload : state.state3.filter((id)=> id === sel.id)})
    }


    const handleAddCer = (cer)=>{
        dispatch({type : 'state5' , payload : [...state.state5 ,cer]})
        dispatch({type : 'state4' , payload : state.state4.filter((C)=> C.certification !== cer.certification)})
    }

    const handleRemoveCer = (cer)=>{
        dispatch({type : 'state4' , payload : [...state.state4 ,cer]})
        dispatch({type : 'state5' , payload : state.state5.filter((S)=> S.certification !== cer.certification)})
        
        removeCerReduce(state.state5 )
        
    }


    const addReduceCer = () => {
        if (state.state5.length < 1) return;
        const select = state.state5.map((C) => C.certification);
        const done = select.reduce((acc, cur) => acc + ',' + cur);
        dispatch({ type: 'state7', payload: [...state.state7, done] });
    }


    const removeCerReduce = (selectedAddCer) => {
        dispatch({ type: 'state7', payload: state.state7.filter((Cer) => Cer === selectedAddCer.certification) });
    }


    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(null, args);
          }, delay);
        };
    };

    const handleScroll = debounce(() => {
        const isNearBottom =
          window.innerHeight + window.pageYOffset >= document.documentElement.offsetHeight - 500;
      
        if (isNearBottom && !isLoading) {
            setIsLoading(true)
            setPage((prevPage) => prevPage + 1)
        }
    }, 500);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const handleGenreChange = async (selectedGenre) => {
        const initialMovies = await popularM(1);
        dispatch({type : 'state6' , payload : initialMovies});
      
        // Update the genre ID state
        dispatch({type : 'state3' , payload : selectedGenre});
        setPage(1) // Reset the page number to 1
    };


    const handleCertificationChange = async (selectedCertification) => {
        const initialMovies = await popularM(1);
        dispatch({type : 'state6' , payload : initialMovies});
      
        // Update the certification state
        dispatch({type : 'state5' , payload : selectedCertification});
        setPage(1) // Reset the page number to 1
    };

    useEffect(() => {
        if (page > 1) {
          const fetchMovies = async () => {
            const newMovies = await popularM(page);
            dispatch({type : 'state6' , payload : [...state.state6, ...newMovies]});
          };
      
          fetchMovies();
        }
    }, [page]);


    const handleFilterChanges = async () => {
        window.scrollTo(0, 0);
        const initialMovies = await popularM(1)
        dispatch({type : 'state6' , payload : initialMovies})

        // calling the functions that handle filtering change
        handleCertificationChange(state.state5 )
        handleGenreChange(state.state3)
        handleSliderChange(sliderValues)
        setPage(1)
    }


    useEffect(() => {
        const initialLoad = async () => {
            const initialMovies = await popularM(1);
            dispatch({type : 'state6' , payload : initialMovies});
        };
      
        initialLoad();
    }, []);


    useEffect(()=>{      
        getGenIdAdd()
    },[state.state2])

    useEffect(()=>{
        addReduceCer()
    },[state.state5])    

    return [
        state ,
        setOnClickOne, onClickOne  
        ,sliderValues ,handleSliderChange,handleRemove,handleAdd,handleRemoveCer,handleAddCer,handleFilterChanges
    ]
}

export default useMovie