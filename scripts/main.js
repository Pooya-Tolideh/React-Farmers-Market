const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const createBrowserHistory = require('history/lib/createBrowserHistory');
const h = require('./helpers.js');

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const History = ReactRouter.History;

//<App/>
const App = React.createClass({
    render: () => {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Farmers Market"/>
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
            <div>
                <p>Inventory</p>
                <AddForm />
            </div>
        )
    }
});

const AddForm = React.createClass({
    render: function() {
        return (
            <form className="fish-edit" onSubmit={this.createItem}>
                <input type="text" ref="name" placeholder="Name"/>
                <input type="text" ref="price" placeholder="Price"/>
                <select ref="status">   
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="text" id="" ref="desc" placeholder="Desc"></textarea>
                <input type="text" ref="image" placeholder="URL to image..."/>
                <button type="submit">+ Add item</button>
            </form>
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
                <h1>Sunnyville Farmers Market</h1>
                <h3 className="tagline"><span>{this.props.tagline}</span></h3>
            </header>
        )
    }
});



// <StorePicker/>
const StorePicker = React.createClass({
    mixins: [History],
    goToStore: function(e) {
        e.preventDefault();
        //Normally we'd write ->
        //const value = document.querySelector('.store-selector').querySelector('input').value;
        const storeId = this.refs.storeId.value;
        // console.log(storeId);
        this.history.pushState( null, `/store/${storeId}`);
    },
    render: function() {
        return(
            <form action="" className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please enter a store</h2>
                    <input type="text" ref="storeId" defaultValue={h.getFunName()}/>
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