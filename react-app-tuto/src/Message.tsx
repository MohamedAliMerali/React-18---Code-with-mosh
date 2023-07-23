
function Message() {
    // JSX: JavaScript XML
    // you can use Dynamic content
    const name = "Mirana";
    if (name)
        // you can use a function too, exp: getName() 
        return <h1>Hello {name}</h1>;
    return <h1>Hello world</h1>;
    // return <h1>Hello React</h1>
    
}

export default Message;