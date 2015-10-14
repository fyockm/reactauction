/** @jsx React.DOM */
var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Lots = React.createClass({
    // mixins: [ReactFireMixin],
    //
    // getInitialState: function() {
    //   return {
    //     lots: [],
    //     text: ''
    //   };
    // },
    //
    // componentWillMount: function() {
    //   var firebaseRef = new Firebase('https://silentauction.firebaseio.com/lots/');
    //   this.bindAsArray(firebaseRef.limitToLast(25), 'lots');
    // },

  render: function() {
    var _this = this;
    var createItem = function(item, index) {
      return (
        <li key={ index }>
          { item.text }
          <span onClick={ _this.props.removeItem.bind(null, item['.key']) }
                style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }}>
            X
          </span>
        </li>
      );
    };
    return <ul>{ this.props.lots.map(createItem) }</ul>;
  }
});

// var TodoApp = React.createClass({
//   mixins: [ReactFireMixin],
//
//   getInitialState: function() {
//     return {
//       lots: [],
//       text: ''
//     };
//   },
//
//   componentWillMount: function() {
//     var firebaseRef = new Firebase('https://silentauction.firebaseio.com/lots/');
//     this.bindAsArray(firebaseRef.limitToLast(25), 'lots');
//   },
//
//   onChange: function(e) {
//     this.setState({text: e.target.value});
//   },
//
//   removeItem: function(key) {
//     var firebaseRef = new Firebase('https://silentauction.firebaseio.com/lots/');
//     firebaseRef.child(key).remove();
//   },
//
//   handleSubmit: function(e) {
//     e.preventDefault();
//     if (this.state.text && this.state.text.trim().length !== 0) {
//       this.firebaseRefs['lots'].push({
//         text: this.state.text
//       });
//       this.setState({
//         text: ''
//       });
//     }
//   },
//
//   render: function() {
//     return (
//       <div>
//         <Lots lots={ this.state.lots } removeItem={ this.removeItem } />
//         <form onSubmit={ this.handleSubmit }>
//           <input onChange={ this.onChange } value={ this.state.text } />
//           <button>{ 'Add #' + (this.state.lots.length + 1) }</button>
//         </form>
//       </div>
//     );
//   }
// });

var Bids = React.createClass({
    // mixins: [ReactFireMixin],

  render() {
    return (
      <div>
        <h1>Bids</h1>
        <div className="master">
          <ul>
            {this.state.bids.map(function(bid) {
              <li key={bid.id}><Link to={`/bids/${bid.id}`}>{bid.name}</Link></li>
            })}
          </ul>
        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    )
  }
})

var Bid = React.createClass({
  // componentDidMount() {
  //   this.setState({
  //     // route components are rendered with useful information, like URL params
  //     bid: findUserById(this.props.params.bidId)
  //   })
  // },

  render() {
    return (
      <div>
        <h2>{this.state.bid.name}</h2>
      </div>
    )
  }
})

var NoMatch = React.createClass({
  render() {
    return <h3>Move along! Nothing to see here!</h3>
  }
})

var App = React.createClass({
  render() {
    return (
      <div>
        <header>
        ReactAuction
        <ul>
          <li><Link to="/lots">Lots</Link></li>
          <li><Link to="/bids">Bids</Link></li>
        </ul>
        </header>

        <RouteHandler/>
      </div>
    )
  }
})


var routes = (
<Route path="/" handler={App}>
  <Route path="lots" handler={Lots} />
  <Route path="bids" handler={Bids} />
  <DefaultRoute handler={NoMatch}/>
</Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
