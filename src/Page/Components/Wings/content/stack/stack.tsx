import {WingsContentStackStyled} from "./styled";
import {Card} from "../../../../../Components/General/My/Card/Card";

import vive from "../../../../../media/stack/He536b68c4c0d48acb0ffe73378829104A.jpg.png"
import quest from "../../../../../media/stack/01_Meta-Quest-Pro.jpg.png"
import base from "../../../../../media/stack/1_95_.png"

const stackData = [{
    image: quest,
    name: "Quest Pro"
},{
    image: vive,
    name: "VIVE Tracker"
},{
    image: base,
    name: "VIVE Stations"
}]

export const StackItemContent = () => {

    return (
        <WingsContentStackStyled>
            {stackData.map((world) => (<Card
                className={"item"}
                image={world.image}
                description={world.name}
                borderColor={"rgba(255,255,255,0.07)"}
                backgroundColor={"rgba(255,255,255,0.07)"}
            />))}
        </WingsContentStackStyled>
    )
}