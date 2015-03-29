# React Breadcrumbs

[React][1] Component for [React-Router][4].

Demo at [learnreact.robbestad.com][2]

## Installation

    % npm install react-breadcrumbs --save

## Usage


    var Breadcrumbs = require('react-breadcrumbs');

    MyComponent = React.createClass({
      render: function() {
         return (
           <div>
           	 <Breadcrumbs />
           </div>
        );
      }
    });

Optionally, you can add this prop to replace the default separator:

    <Breadcrumbs separator=" | " />

The breadcrumbs will automatically populate based on your
route configuration. It requires that you have a name="" parameter
in your routes for every route. It will use the displayName parameter
for the Breadcrumb link.

[1]: https://facebook.github.io/react
[2]: http://learnreact.robbestad.com/
[3]: https://github.com/svenanders/react-breadcrumbs/issues/1
[4]: https://github.com/rackt/react-router
