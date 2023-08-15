import React from "react";

class UserClass extends React.Component {
    //constructor is called whenever a class is instantiated. Then render is called
    constructor(props){
        super(props);

        this.state = {
            userInfo: {
                name: "Dummy",
                login: "Default",
            },
        };
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/mrudh");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });
        console.log(json);
    }

    render() {
        const { name, login, avatar_url } =  this.state.userInfo; //Destructuring
        
        return (
            <div className="user-card">
                <img src="{avatar_url}"/>
                <h2>Name: {name}</h2>
                <h3>Login: {login}</h3>
                <h4>Contact: awesomemru</h4>
            </div>
        );
    };
};

export default UserClass;