# Snabbt.js animations

    /**
     * Click a button and animate the button class
     * @flow
     */

    var React = require("react"),
        {Bootstrap, Grid, Col, Row, Button} = require('react-bootstrap');

    var Markdown2Html = require("../react-markdown-to-html");

    var Breadcrumbs = require('react-breadcrumbs');

    var snabbt=require("snabbt.js");

    module.exports = React.createClass({
        displayName:"Button Example",

        getInitialState: function (): any {
            return {
                buttonText: "Not clicked",
                buttonClicked: 0,
                buttonStyle:'info'
            };
        },

        onClick: function (): any {
            var element = document.getElementById("specialButton");
            if(this.state.buttonClicked) {
                snabbt(element, {
                    rotation: [0, 2*Math.PI, 0]
                });
                this.setState({buttonText: "Shake me", buttonClicked: 0, buttonStyle:'info'})
            } else {
                snabbt(element, 'attention', {
                    rotation: [0, 0, Math.PI/2],
                    springConstant: 1.9,
                    springDeceleration: 0.9,
                });
                this.setState({buttonText: "Spin me around", buttonClicked: 1, buttonStyle:'success'});
            }
        },

        componentDidMount() {
            setTimeout(function () {
                var element = document.getElementById("specialButton");
                snabbt(element, 'attention', {
                    position: [50, 0, 0],
                    springConstant: 2.4,
                    springDeceleration: 0.9,
                });
            }, 2500);
        },

        render: function () {
            return <Grid className="flyin-widget">
                <Row className="show-grid">
                    <Col md={12}><Breadcrumbs /></Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                        <h1>Animations</h1>
                        <p>Demonstrates the use of snabbt.js to animate. Click button to start animation.</p>
                        <Button id="specialButton" bsStyle={this.state.buttonStyle} className="button"
                            onClick={this.onClick}><span className="buttonStatus">{this.state.buttonText}</span>
                        </Button>

                    </Col>
                </Row>
            </Grid>
        }

    });
