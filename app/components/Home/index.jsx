'use strict';

const React = require("react"),
    { Grid, Col, Row} = require('react-bootstrap'),
    {Link} = require('react-router'),
    //{McFlyRoute, LoginRoute, ArticlesRoute} = require('../routes.jsx'),
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
        //console.log('%chttp://learnreact.robbestad.com','background: #999;');
    },
    render() {

        return <Grid className="flyin-widget">
            <Row className="show-grid" >


                <Col md={12}>
                    <p className="columnBox">
                    <strong>Learn React</strong>
                &nbsp; is a collection of React examples,
                    modules and tutorials. More will be coming
                    every now and then, so be sure to bookmark and come back or star/fork it
                    on&nbsp;
                    <a href="https://github.com/svenanders/learn-react">github</a>.
                    </p>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col md={12}>
                    <h2 className="columnBox">Components</h2>
                </Col>
            </Row>


            <Row>

               

            </Row>
        </Grid>
    }
});