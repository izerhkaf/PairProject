function formattedDate(date) {
  
// console.log(date);
let formatted = new Date(date).toISOString().split("T")[0]

return formatted
}
 
// console.log(formattedDate('Sat, 19 Jan 2019 05:40:07 GMT'));
module.exports = formattedDate