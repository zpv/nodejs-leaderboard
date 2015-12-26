# sqlite2json

Maps SQLite3 data to JSON by running multiple queries against the DB.


## Getting Started

Install like this:

```Bash
npm install sqlite2json
```

Use as follows:

```javascript
var S2J = require('sqlite2json');

var s2j = new S2J('/path/to/the/db.sqlite');

s2j.addQuery('query', 'SELECT column FROM table');

s2j.run(function(err, json)
{
    if (err)
    {
        console.log('There was an error: %s', err);
    }
    else
    {
        console.log('Here is your JSON: %s', json);

        // Prints something like {"query": [{"column": "a"}, {"column": "b"}]}
    }
});
```


## License

Copyright (c) 2014 Nicola Orritos  
Licensed under the MIT license.
