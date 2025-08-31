import { useState } from "react";

function MyForm() {
    const [text, setText] = useState("");
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = (event) => {
        setUser({...user, [event.target.name]:
            event.target.value})
    }

    const handleSubmit = (event) => {
        alert(`Hello ${user.firstName} ${user.lastName}`);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
            name="firstName"
            onChange={handleChange}
            value={user.firstName}/>
            <input type="text"
            name="lastName"
            onChange={handleChange}
            value={user.lastName}/>
            <input type="email"
            name="email"
            onChange={handleChange}
            value={user.email}/>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default MyForm;