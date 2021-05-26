import {BounceLoader} from "react-spinners";
import {css} from "@emotion/core";

export default function Loader(params) {
    const {size} = params
    const override = css`
      display: block;
      margin-top: 5vh;
      margin-left: auto;
      margin-right: auto;
    `;

    return (<BounceLoader css={override} color={"#5186ff"} size={size}/>);
}