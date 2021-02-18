# Interactive Form

Third project of the Team Treehouse Full Stack JavaScript Techdegree.

## Full Stack Conference Form

This form enables user to register for the "Full Stack Conference".

At default the form will only display the fields that are neccessary. Any exceptions, e.g. an other job role, preferred t-shirt design or any payment other than credit card, will show the user the required input fields.

All the required fields will be validated when the user tries to submit and when needed usefull hints will be provided before the form can be succesfully submitted.

### Register for activities

Selecting an activity will check if there are any other activities that occur at the same time. Those activities will be disabled preventing the user to register for conflicting activities

### Real-time conditional error messages

The name input validates user input real time when it registers a key up event. It will check for two conditions using regular expressions:

-   "Name" field is blank.
-   "Name" field contains characters other than letters.

The user will be provided with conditional error messages when one of the conditions is met. If none of the conditions is met the error messages will be hidden.
