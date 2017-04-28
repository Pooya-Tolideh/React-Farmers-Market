const React = require('react');
const ReactDOM = require('react-dom');






// <StorePicker/>
const StorePicker = React.createClass({
    render: () => {
        return(
            <form action="" className="store-selector">
                    <h2>Please enter a store</h2>
                    <input type="text" ref="storeId"/>
                    <input type="submit"/>
            </form>
       )
    }
});

ReactDOM.render(<App/>, document.getElementById('main'));