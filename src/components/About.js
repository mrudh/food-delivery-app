import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

//const About = () => {
//     return (
//         <div>
//             <h1>About</h1>
//             {/*<User name={"Mrudhulaa (function)"}/>*/}
//             <UserClass name={"Mrudhulaa (class)"} location={"Chennai (class)"}/>
//         </div>
//     );
// };

class About extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <div>
                 <h1>About</h1>
                 <h2>This is Namaste React Web Series</h2>
                 <UserClass name={"Mrudhulaa (class)"} location={"Chennai (class)"}/>
            </div>
        );
    }
}

export default About;