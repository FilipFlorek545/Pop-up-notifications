import {Children, cloneElement} from "react";

export const OnClickChildren = ({children}) => {
    let handleClick = () => {
        console.log(123)
    }
    const result = Children.map(children, child => {
        return cloneElement(child, { onClick: () => handleClick() });
    })
    console.log(result)
    return result
}