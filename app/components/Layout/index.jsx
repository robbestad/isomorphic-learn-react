'use strict';

var React = require('react'),
    {RouteHandler, Link} = require('react-router'),
    Headroom = require("react-headroom"),
    Hammer = require('react-hammerjs'),
    $ = require('jquery'),
    LoginStore = require("../Login/store");

React.initializeTouchEvents(true);

let eventIds=[];

module.exports = React.createClass({
    mixins: [LoginStore.mixin],

    displayName:"Learn React",
    storeDidChange(){
        //console.log("store did change");
        this.setState(this.state);
    },
    handleTap(){
        this.closeMenu();
    },
    getInitialState(){
      return {
          searchOpen:false,
          menuOpen:false
      }
    },

    eventHandler(type) {
        let _this=this;
        return Handler.addListener(window, type, function() {
            _this.closeMenu();
        }, false);
    },
    componentDidMount(){
        let _this=this;
        eventIds.push(Handler.addListener(window, 'touchmove', function() {
            _this.closeMenu();
        }, false));

        eventIds.push(Handler.addListener(window, 'scroll', function() {
            _this.closeMenu();
        }, false));


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

    render() {
        return (<section>
            <div className="page-header-wrap">
                <nav ref="mainMenu" className="main-menu header-panel">
                    <ul >
                        <li onClick={this.closeMenu}>
                            <Link to="/">Home</Link>
                        </li>

                        <li onClick={this.closeMenu}>
                            <Link to="source">Source</Link>
                        </li>

                        <li onClick={this.closeMenu}>
                            <Link to="login">Login</Link>
                        </li>


                    </ul>
                </nav>
                <Headroom>
                    <header className="page-header">
                    <div id="header" className="header-bar">
                        <div ref="feedbackModal" id="feedback-modal"></div>
                        <Hammer className="container" onTap={this.toggleMenu}>
                            <div className="header-bar-wrap">
                                <div className="header-options">
                                    <div className="header-panel-wrap">
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
                        </Hammer>
                    </div>
                </header>
                </Headroom>
            </div>

            <Hammer className="container main-container" onTap={this.handleTap}
                onPress={this.handleTap} onSwipe={this.handleTap}>
                    <RouteHandler />
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

    }
});