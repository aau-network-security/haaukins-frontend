import AppRouter from "./AppRouter";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScrolledToTop} from './features/generic/genericSlice'
function Main() {
    const dispatch = useDispatch()
    
    let previousOffset = 0
    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY === 0) {
                dispatch(setScrolledToTop(true))
                previousOffset = 0
            } else if (window.scrollY > 0 && previousOffset === 0){
                previousOffset = window.scrollY
                dispatch(setScrolledToTop(false))
            }
        }
    })
    return (
        <div className="App">
            <AppRouter />
        </div>
    );
}
 
export default Main;

