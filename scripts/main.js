const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const createBrowserHistory = require('history/lib/createBrowserHistory');

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;

//<App/>
const App = React.createClass({
    render: () => {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order/>
                <Inventory/>
            </div>
        )
    }
});



//<Inventory/>
const Inventory = React.createClass({
    render : () => {
        return(
            <p>Inventory</p>
        )
    }
});

//<Order/>
const Order = React.createClass({
    render : () => {
        return(
            <p>Order</p>
        )
    }
});

//<Header/>
const Header = React.createClass({
    render : function () {
        return(
            <header className="top">
                <h1>Catch of the Day</h1>
                <h3 className="tagline"><span>{this.props.tagline}</span></h3>
            </header>
        )
    }
});



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


//<NotFound/>
const NotFound = React.createClass({
    render : () => {
        return(
            <p>Not Found</p>
        )
    }
});


const routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker}/>
        <Route path="/store/:storeId" component={App}/>
        <Route path="*" component={NotFound}/>
    </Router>
)


ReactDOM.render(routes, document.getElementById('main'));