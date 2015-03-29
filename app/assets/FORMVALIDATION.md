# Form validation

    /**
     * Form validation
     * @flow
     */

    var React = require("react"),
        {Bootstrap, Grid, Col, Row, Button, Input} = require('react-bootstrap');

    var Markdown2Html = require("../react-markdown-to-html");

    var Breadcrumbs = require('react-breadcrumbs');

    module.exports = React.createClass({
        displayName:"Form validation Example",

        getInitialState: function() {
            return {
                value: ''
            };
        },

        validationState: function() {
            var email = this.state.value;
            if(email.length < 4) {return ''};
            if (!/^.+@.+\..+$/.test(email)) {
                if(!/^.+@.+$/.test(email)) {
                    return 'error';
                } else {
                    return 'warning';
                }
            } else {
                return 'success';
            }
        },

        handleChange: function() {
            this.setState({
                value: this.refs.input.getValue()
            });
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
                        <h1>Form validation</h1>
                        <p>Don't show error before user has started typing, and give warning if a '@' has been typed.</p>
                        <Input
                            type="text"
                            value={this.state.value}
                            placeholder="Your e-mail"
                            help="Validates e-mail format."
                            bsStyle={this.validationState()}
                            hasFeedback
                            ref="input"
                            groupClassName="group-class"
                            wrapperClassName="wrapper-class"
                            labelClassName="label-class"
                            onChange={this.handleChange} />
                        <br />
                        <Markdown2Html src="./assets/FORMVALIDATION.md" />
                    </Col>
                </Row>

            </Grid>
        }

    });
