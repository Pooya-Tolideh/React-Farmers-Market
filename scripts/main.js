const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const createBrowserHistory = require('history/lib/createBrowserHistory');
const h = require('./helpers.js');

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const History = ReactRouter.History;

var sampleData = {
    item1: {
            name : 'rand',
            price : 6.99,
            desc : 'lorem ipsom',
            status: 'Fresh',
            image: './images/test.jpg'

        },

    item2: {
            name : 'wand',
            price : 9.99,
            desc : 'lorem ipsom',
            status: 'Fresh',
            image: './images/test.jpg'

        },

    item3: {
            name : 'band',
            price : 19.99,
            desc : 'lorem ipsom',
            status: 'Sold Out',
            image: './images/test.jpg'

        }
};

//<App/>
const App = React.createClass({
    //parent component that controls data flow has state object
    // initial state = inital state of data in the app before it mounts

    getInitialState : function() {
        return {
            items: sampleData,
            orders: {}
        }
    },

    addItem : function(item) {
        var timestamp = (new Date()).getTime();
        this.state.items[`item-${timestamp}`] = item;
        this.setState({ items: this.state.items });
    },

    // get the key-value pair in orders dataset
    // if it's empty set the value of that key to 1
    // else add 1 to it
    addOrder: function(key) {
        this.state.orders[key] = this.state.orders[key] + 1 || 1;
        this.setState({ orders: this.state.orders });
    },

    renderItems : function () {
        let list = [];
        for (let key in this.state.items) {
            list.push(<Item key={key} details={this.state.items[key]} index={key} addOrder={this.addOrder}/>)
        }
        return list;
    },


    render: function () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Farmers Market"/>
                    <ul>
                        {this.renderItems()}
                    </ul>
                </div>
                <Order fishes={this.state.items} orders={this.state.orders}/>
                <Inventory addItem={ this.addItem } />
            </div>
        )
    }
});


//<Fish />

const Item = React.createClass({

    createOrder: function(e) {
        e.preventDefault();
        this.props.addOrder(this.props.index);
    },
    
    render: function() {
        const details = this.props.details;
        const isAvailable = (details.status === 'Fresh') ? true : false;
        const btn = isAvailable ? 'Add to Order' : 'Sold Out';
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name}/>
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{details.price}</span>
                    <p>{details.desc}</p>
                </h3>
                <button disabled={!isAvailable} onClick={this.createOrder}>{btn}</button>
            </li>
        )
    }
});



//<Inventory/>
const Inventory = React.createClass({
    render : function () {
        return(
            <div>
                <p>Inventory</p>
                <AddForm {...this.props} />
            </div>
        )
    }
});

//<AddForm />
const AddForm = React.createClass({

    createItem: function(e) {
        e.preventDefault();
        var item = {
            name : this.refs.name.value,
            price : this.refs.price.value,
            status : this.refs.status.value,
            desc : this.refs.desc.value,
            image : this.refs.image.value
        };
        console.log(item);
        this.props.addItem(item);
    },

    render: function() {
        return (
            <form className="fish-edit" onSubmit={this.createItem}>
                <input type="text" ref="name" placeholder="Name"/>
                <input type="text" ref="price" placeholder="Price"/>
                <select ref="status">   
                    <option value="available">Fresh</option>
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

    getTotal: function() {
        const orderIds = Object.keys(this.props.orders);
        return orderIds.reduce((total, key) => {
            let fish = this.props.fishes[key];
            let count = this.props.orders[key];
            const isAvailable = (fish.status === 'Fresh') ? true : false;
            if (isAvailable) {
                // return a new sum if available
                return total + (count * parseInt(fish.price));
            }
            //return the same total otherwise
            return total
        }, 0);
    },

    render : function() {

        return(
            <div className="order-wrap">
                <h2 className="order-title">Your Order</h2>
                <ul className="order">
                    {this.getTotal()}
                </ul>
            </div>
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