import {PhoneSupportStyled} from "./styled";

import phone from "../../../media/61337.png"

export const PhoneSupport = () => {

    return (
        <PhoneSupportStyled className={"non-support"}>
            <img src={phone} alt={"not-support"} />
        </PhoneSupportStyled>
    )
}