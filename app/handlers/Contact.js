var React = require('react');
var api = require('../utils/api');

var Contact = module.exports = React.createClass({

  statics: {
    fetchData: function(token, params, query) {
      return api.get(`/contacts/${params.id}`, token);
    }
  },

  render: function() {
    var contact = this.props.data.contact.contact;
    return (
      <div className="Detail">
        <div className="Contact">
          <h1 className="Heading Heading--alt">{contact.first} {contact.last}</h1>
          <div className="Content padBox">
            <img className="Avatar" key={contact.id} src={contact.avatar}/>
            <div className="KVSet">
              <div className="KV">
                <div className="KV__Key">First Name</div>
                <div className="KV__Value">{contact.first}</div>
              </div>
              <div className="KV">
                <div className="KV__Key">Last Name</div>
                <div className="KV__Value">{contact.last}</div>
              </div>
              <div className="KV">
                <div className="KV__Key">Avatar URL</div>
                <div className="KV__Value">{contact.avatar}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

