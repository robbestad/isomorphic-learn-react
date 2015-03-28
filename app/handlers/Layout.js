var React = require('react');
var { Link, RouteHandler } = require('react-router');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var api = require('../utils/api');
var twitter = "http://twitter.com/ryanflorence";
var rr = "https://github.com/rackt/react-router";
var source = "https://github.com/rackt/react-router-mega-demo";
var Headroom = require("react-headroom"),
    Hammer,
    $ = require('jquery'),
    LoginStore = require("../components/Login/store");

if (typeof window !== 'undefined') {
    Hammer = require('react-hammerjs');
    }
else {
    Hammer = React.createClass({
        render(){
            return <div />
        }
    })
}

let Handler = (function(){
    var i = 1,
        listeners = {};

    return {
        addListener: function(element, event, handler, capture) {
            element.addEventListener(event, handler, capture);
            listeners[i] = {element: element,
                event: event,
                handler: handler,
                capture: capture};
            return i++;
        },
        removeListener: function(id) {
            if(id in listeners) {
                var h = listeners[id];
                h.element.removeEventListener(h.event, h.handler, h.capture);
                delete listeners[id];
            }
        }
    };
}());

let eventIds=[];


var Root = module.exports = React.createClass({
  mixins: [LoginStore.mixin],

  statics: {
    fetchData: (token, params, query) => {
      return api.get('/contacts', token);
    }
  },

  getInitialState () {
    return {  
        longLoad: false,
        searchOpen:false,
        menuOpen:false
     };
  },

  componentDidMount () {
    var timeout;
    this.props.loadingEvents.on('start', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.setState({ longLoad: true });
      }, 250);
    });
    this.props.loadingEvents.on('end', () => {
      clearTimeout(timeout);
      this.setState({ longLoad: false });
    });
     let _this=this;
        eventIds.push(Handler.addListener(window, 'touchmove', function() {
            _this.closeMenu();
        }, false));

        eventIds.push(Handler.addListener(window, 'scroll', function() {
            _this.closeMenu();
        }, false));

  },

    displayName:"Learn React",
    storeDidChange(){
        //console.log("store did change");
        this.setState(this.state);
    },
    handleTap(){
        this.closeMenu();
    },

    eventHandler(type) {
        let _this=this;
        return Handler.addListener(window, type, function() {
            _this.closeMenu();
        }, false);
    },
    
    componentWillUnmount(){
        eventIds.map(function(eventId){
            Handler.removeListener(eventId);
        });
    },

    fadeFlash(){
        $("#feedback-modal").hide();
    },
    flash(body, toggleClass, delay) {
        if("undefined" === typeof delay) delay=3400;
        var flashDiv = $(this.refs.feedbackModal.getDOMNode()), className;
        switch (toggleClass) {
            case "warning":
                className = "alert-warning";
                break;
            case "danger":
                className = "alert-danger";
                break;
            case "info":
                className = "alert-info";
                break;
            case "success":
                className = "alert-success";
                break;
            default:
                className = "alert-danger"
        }
        flashDiv.empty().append(body).removeClass("alert-warning alert-success alert-danger alert-info").addClass(className),
        flashDiv.hasClass("open") || flashDiv.addClass("open").fadeIn().delay(delay), flashDiv.slideUp(300, function () {
            $(this).removeClass("open"), $(this).hide(0)
        })
    },

    openMenu () {
        this.closeSearch();
        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];
        //console.log(scrollPosition);
        this.refs.mainMenu.getDOMNode().style.top=(scrollPosition[1]+40);

        var _this=this;

        $(this.refs.mainMenu.getDOMNode()).slideDown("fast", function () {
            _this.setState({menuOpen:true});
        });
    },

    closeMenu(){
        var _this=this;
        _this.setState({menuOpen:false});
        $(this.refs.mainMenu.getDOMNode()).css("display","none");
    },
    closeSearch() {
        var _this=this;
        $(this.refs.mainSearch.getDOMNode()).slideUp("fast", function () {
            _this.setState({searchOpen:false});
        })
    },
    openSearch() {
        this.closeMenu();

        var _this=this;
        $(this.refs.mainSearch.getDOMNode()).slideDown("fast", function () {
            _this.refs.searchInput.getDOMNode().focus();
            _this.setState({searchOpen:true});
        });

    },
    toggleSearch(){
        this.state.searchOpen === true ? this.closeSearch() : this.openSearch();
    },
    toggleMenu(){
        this.state.menuOpen === true ? this.closeMenu() : this.openMenu();
    },

   /* renderContacts: function() {
      return sortContacts(this.props.data.root.contacts).map((contact) => {
        return (
          <li className="ContactList__Contact" key={contact.id}>
            <Link
              className="ContactList__Link"
              to="contact"
              params={{id: contact.id}}
            >
              {contact.first} {contact.last}
            </Link>
          </li>
        );
      });
    },
*/
  render: function() {
    var className = 'App';
    if (this.state.longLoad)
      className += ' App--loading';
    return (
      <div className="Master">
      {/*
       <div className="TopBar">
          Made by <a href={twitter}>Ryan Florence</a> with <a href={rr}>React Router</a>. View the <a href={source}>Source Code</a>.
        </div>
        <div className="Master">
          <h2 className="Heading">Contacts</h2>
          <div className="Content">
            <ul className="ContactList">
              <li className="ContactList__Contact" key="__newLink__">
                <Link
                  className="ContactList__Link ContactList__Link--new"
                  to="newContact"
                >New Contact</Link>
              </li>
              {this.renderContacts()}
            </ul>
          </div>
        </div> */}

        <TransitionGroup transitionName="detail">
          <RouteHandler {...this.props} />
        </TransitionGroup>
      </div>
    );
  }
});
