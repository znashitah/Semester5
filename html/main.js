console.log('Hello from main.js') 

let age=25 
console.log(age) 
//const salary 
//console.log(salary) 

let sum=0 
sum=5 
console.log(sum) 

const name='zainab'
const language='javascript' 

const total=0 
const PI=3.14
const isprimarynumber=true 
const isnewuser=false 
let result 
//console.log(result) // this will show no result as it is undefined. 
const res=undefined 
const data=null //use when you do not know value 
const person={ 
    'first name':'Bruce',
    'last name' :'Lili',
    'age': 30

} 
//console.log(person["first name"]) 
const  array=[1,2,3,4,5,6] 
//console.log(array[1]) 
let a=10
a='zainab' 
a=true 
//console.log(a) 
let x=2 
y=4 
//console.log(x+y) 
//console.log(--x)  //logical operators 
//const isValidNumber= x > 1 && 5<y // and operator words if both values are true. (&&)
//console.log(isValidNumber) 
//const isValid= false 
//console.log(!isValid) 
console.log('nashitah'+'zainab')  
//const isEven=10%2 ===0? true: false 
//console.log(isEven) 
//console.log(2+'3') 
//console.log('5' - true) 
//console.log(5 + undefined) 
//console.log(parseFloat('5.3'))
console.log(String('500')) 
console.log((500).toString()) 
const var1=10
const var2='10' 
console.log(var1==var2) 
console.log(var1===var2) //this check that both variable are of same type of not as well 
//const num=-5 
//if (num>0){
   // console.log('Number is positive')}
    // else if(num<0){ 
   // console.log('number is negetive')}
//else{
   // console.log('Number is zero')
//} 
const colour='red' 
switch(colour){
    case 'red':{console.log('colour is red')
    break} 
    case 'blue':{console.log('colour is  blue')
    break} 
    case 'green':{console.log('colour is  green')
    break}
} 
//for (let i=1;i<5;i++){
   // console.log('iteration number'+ i)
//} 
//let i=1
//while(i<5){
  //  console.log('iteration number ' +i)
   // i++
//}  
//let i=6
//do{
  //  console.log('iteration number ' +i)
  //  i++
//}while(i<=5) 
const numofArray=[1,2,3,4,5] 
for (num of numofArray){
    console.log('iteration number' + num)
} 
function greet(username){
    console.log('good morning '+username)
} 
greet('zainab')   

//function add(a,b){
//    return a+b
//} 
//const sm = add(5,10)
//console.log(sm) 
const arrowsum=(a,b) =>{ 
    return a+b
} 
const  totalsum=arrowsum(10,5) 
console.log(totalsum)



