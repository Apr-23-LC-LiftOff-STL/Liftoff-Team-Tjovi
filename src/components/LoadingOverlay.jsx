import styles from "./LoadingOverlay.module.css"
import ReactDOM from "react-dom"
import {MoonLoader} from "react-spinners"

export default function LoadingOverlay(){
    return ReactDOM.createPortal(
        <div className={styles.overlay}>
         <span className={styles.moonLoader}>   <MoonLoader speedMultiplier={0.5} size={100}/>
         </span>
        </div>, document.getElementById("overlay")
    )
}