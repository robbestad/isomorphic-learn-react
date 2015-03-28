'use strict';

const React = require("react"),
    { Grid, Col, Row} = require('react-bootstrap'),
    {Link} = require('react-router'),
    {McFlyRoute} = require('../routes.jsx'),
/*    {ReactFireRoute, McFlyRoute, ButtonRoute, StaticsRoute, StickyRoute,
        LoginRoute, MarkdownRoute, RefluxRoute, FormsRoute,
        ChartsRoute, AnimationsRoute, BreadcrumbsRoute, ComponentRoute} = require('../routes.jsx'),
*/
    ApiStore = require("../Mcfly/store"),
    RefluxStore = require("../Reflux/store"),
    //Rx = require('rx'),
    LoginStore = require("../Login/store"),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin;


    export default React.createClass({
    mixins: [PureRenderMixin],
    displayName: 'Home',
    componentDidMount(){
        console.log('%cWelcome to Learn React! ', 'background: #333; color: #aaa');
        console.log('%cLearn React!', 'font-weight:bold;', 'is a collection of examples, ' +
        'modules and tutorials for Reactjs');console.log('Additional examples ' +
        'are being added every now and then, so be sure to ' +
        'bookmark and come again!');
        console.log('%chttp://learnreact.robbestad.com','background: #999;');
    },
    render() {

        return <Grid className="flyin-widget">
            <Row className="show-grid" >
                <Col md={12} className="columnBox">
                    <strong>Learn React</strong>
                &nbsp; is a collection of React examples,
                    modules and tutorials. More will be coming
                    every now and then, so be sure to bookmark and come back or star/fork it
                    on
                    <a href="https://github.com/svenanders/learn-react">github</a>
                    .
                </Col>
            </Row>
            <Row className="show-grid">
                <Col md={12}>
                    <h2>Components</h2>
                </Col>
            </Row>


            <Row>
            


                <Col xs={12} md={6} className="columnBox">
                    <Link to={McFlyRoute.name}>
                        <strong>
                            McFly example
                        </strong>
                    </Link>
                    <br/>
                    This component uses McFly to populate a datastore with a JSON resource using AJAX.
                    <br/>
                    The McFly store currently holds&nbsp;
                    <strong>{ApiStore.getPosts().length}</strong>
                &nbsp;objects
                    <br/>
                    <span className="label blue">McFly</span>
                &nbsp;
                    <span className="label blue">Flux</span>
                &nbsp;
                    <span className="label blue">JSON</span>

                </Col>
            </Row>
        </Grid>
    }
});