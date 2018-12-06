

// let date = Math.round(new Date().getTime()/1000);
// console.log(date);
//
// var datum = new Date(Date.UTC('2009','01','13','23','31','30'));
// console.log(datum.getTime()/1000);
//
// function toTimestamp(year,month,day,hour,minute,second){
//  var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
//  console.log(datum.getTime()/1000);
// }

// Math.round(new Date().getTime()/1000);
// var datum = new Date(Date.UTC('2009','01','13','23','31','30'));
// return datum.getTime()/1000;
// function toTimestamp(year,month,day,hour,minute,second){
//  var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
//  return datum.getTime()/1000;
// }
// function toTimestamp(strDate){
//  var datum = Date.parse(strDate);
//  return datum/1000;
// }
// alert(toTimestamp('02/13/2009 23:31:30'));
// alert(toTimestamp('12/04/2018 17:31:30'));


var myDate = "26-02-2012";
myDate = myDate.split("-");
var newDate = myDate[1] + "," + myDate[0] + "," + myDate[2];
console.log(new Date(newDate).getTime());

// First let's create an array of JavaScript Date
// objects.
// More info about the Date class:
// http://w3schools.com/js/js_obj_date.asp

var db = [
  {date: '2012-04-15T23:15:12Z',
   resolved: true},
  {date: '2012-04-12T23:15:12Z',
   resolved: false},
  {date: '2012-04-12T23:15:12Z',
   resolved: true},
  {date: '2012-04-12T23:15:12Z',
   resolved: false}
];




// var dates = [
//   new Date(2010, 4, 10, 10, 07, 16),
//   new Date(2010, 4, 8, 9, 16, 09),
//   new Date(2010, 3, 30, 0, 15, 49),
//   new Date(2010, 3, 8, 10, 08, 35)
// ];

// Now we will define our date comparison functions. These are callbacks
// that we will be providing to the array sort method below.
var date_sort_asc = function(date1, date2) {
  // This is a comparison function that will result in dates being sorted in
  // ASCENDING order. As you can see, JavaScript's native comparison operators
  // can be used to compare dates. This was news to me.
  if (date1 > date2) return 1;
  if (date1 < date2) return -1;
  return 0;
};

var date_sort_desc = function(date1, date2) {
  // This is a comparison function that will result in dates being sorted in
  // DESCENDING order.
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
};

// Finally, we are now able to call the sort method on our array of dates.
// More info about array sorting: http://w3schools.com/jsref/jsref_sort.asp

// First let's sort the array in ascending order.
dates.sort(date_sort_asc);

// Now let's output the results to the page to show that the dates are now
// sorted in ascending order.
// document.write('<p>Dates sorted in ascending order (oldest to newest):</p>');
// for (var i = 0; i < dates.length; i++) {
//   document.write((i+1) + ': ' + dates[i] + '<br>');
// }

// Now let's sort the dates in descending order and output the results.
db.sort(date_sort_desc);

document.write('<p>newest to oldest:</p>');
for (var i = 0; i < db.length; i++) {
  document.write((i+1) + ': ' + db[i] + '<br>');
}



db.sort(function(a,b) {
  var x = b.resolved - a.resolved;
  return x == 0? a.date_sort_desc - b.date_sort_desc : x;
});

var userQuery = new Parse.Query(Parse.db);
userQuery.ascending("createdAt");
