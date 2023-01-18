import AppRouter from "./AppRouter";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScrolledToTop} from './features/generic/genericSlice'
function Main() {
    const dispatch = useDispatch()
    const [ previousOffset, setPreviousOffset ] = useState(0)
    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY === 0) {
                dispatch(setScrolledToTop(true))
                setPreviousOffset(0)
            } else if (window.scrollY > 0 && previousOffset === 0){
                setPreviousOffset(window.scrollY)
                dispatch(setScrolledToTop(false))
            }
        }
    })
    return (
        <div className="App" >
            <AppRouter />
        </div>
    );
}
 
export default Main;

