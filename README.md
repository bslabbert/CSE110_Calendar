#Calender algorithm for finding free intervals
  * Input: An array of event objects, [OPTIONAL] How far into the future you
      want to check (defaults to two weeks)

  * Output: Map { 'Month, Date' => [ [Start, End], ... , [Start, End] ] }

#Unit testing
type command 'mocha' to activate tests

install mocha chai with sudo:
"npm install mocha chai --save-dev"
