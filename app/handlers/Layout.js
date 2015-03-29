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
   /*  let _this=this;
        eventIds.push(Handler.addListener(window, 'touchmove', function() {
            _this.closeMenu();
        }, false));

        eventIds.push(Handler.addListener(window, 'scroll', function() {
            _this.closeMenu();
        }, false));
*/
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


  render: function() {
    var className = 'App';
    if (this.state.longLoad)
      className += ' App--loading';
if(true){
  return (
    <section>
      <Headroom>
          MEnu
      </Headroom>
          <TransitionGroup transitionName="detail">
            <RouteHandler {...this.props} />
          </TransitionGroup>
    </section>
    );
}
/*if(false){
return (<section>
            <div className="page-header-wrap" key="35wxx">
                <nav ref="mainMenu" className="main-menu header-panel">
                    <ul >
                        <li onClick={this.closeMenu}>
                            <Link to="home">Home</Link>
                        </li>

                        <li onClick={this.closeMenu}>
                            <Link to="source">Source</Link>
                        </li>

                        <li onClick={this.closeMenu}>
                            <Link to="login">Login</Link>
                        </li>
                    </ul>
                </nav>
                <span>
                    <header className="page-header">
                    <div id="header" className="header-bar">
                        <div ref="feedbackModal" id="feedback-modal"></div>
                        <div className="container">
                            <div className="header-bar-wrap">
                                <div className="header-options">
                                    <div className="header-panel-wrap" onClick={this.toggleMenu}>
                                        <span ref="menuLink" className="menu-link header-panel-element header-panel-link">
                                            <span
                                                className="text-link">Meny</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="logo-wrap logo">
                                    <h2 className="header">Learn React</h2>
                                </div>

                                <div className="header-options main-options">


                                    <div className="header-panel-wrap">
                                        <span onClick={this.toggleSearch}
                                            className="active-link search-link header-panel-element header-panel-link glyphicon glyphicon-search">
                                            <span
                                                className="text-link">Search</span>
                                        </span>

                                        <div ref="mainSearch" className="main-search header-panel">
                                            <div className="container">
                                                <div className="input-search-group">
                                                    <form method="get" action="http://www.google.com/search" role="search">
                                                        <input type="text" name="q"
                                                            ref="searchInput"
                                                            className="input-search form-control input-lg twitter-typeahead"
                                                            placeholder="Search" id="searchfield" />
                                                        <button className="btn btn-search glyphicon glyphicon-search"
                                                            type="submit"></button>

                                                        <input type="hidden" name="sitesearch" value="www.robbestad.com"/>
                                                        <input hidden="true" type="submit" value="Google Search" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </header>
                </span>
            </div>

            <Hammer className="container main-container" onTap={this.handleTap}
                onPress={this.handleTap} onSwipe={this.handleTap}>
                      <TransitionGroup transitionName="detail">
                  <RouteHandler {...this.props} />
                </TransitionGroup>
            </Hammer>

            <div className="push">&nbsp;</div>

            <div id="footer" className="footer">
                <div className="container">
                    <div className="logo-wrap">
                        <h2 className="page-footer">Learn React</h2>
                        <p>
                            <Link to="/login">Login</Link> status: {LoginStore.isAuthenticated().toString()}
                        </p>
                    </div>
                    <ul className="footer-links">
                        <li>
                            <a href="http://www.robbestad.com" className="copyright">&#169; 2015 Sven Anders Robbestad</a>
                        </li>
                    </ul>
                </div>
            </div>

        </section>)
}*/

  }
});
