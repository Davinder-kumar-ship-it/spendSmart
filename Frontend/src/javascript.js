'use strict'
const currentDate=new Date();
console.log(currentDate);
const year=new Date(2026,11,12,12,30,21);
console.log(year);

const student={
    firstName:"Davinder",
    lastName:"kumar",
    age:22,    
};
console.log(student);
console.log(student.age);
console.log(student.firstName);
console.log(student.lastName);

const nameKey='Name';
console.log("through Bracket Notation");
console.log(student['first'+ nameKey],student['last'+ nameKey],student['age']);
const calendar={
    monthsAndYear:["Jan 2026","Feb 2026","Mar 2026","Apr 2026","May 2026","Jun 2026",
        "Jul 2026","Aug 2026","Sep 2026","Oct 2026","Nov 2026","Dec 2026"
    ],
};
console.log(calendar);
const dateBox=document.querySelector('#dateBox');
const dateDropDownBox=document.querySelector('.dropDownBoxForDate');
document.querySelector('#rightNavigation').addEventListener('click',(e)=>
{
    if(dateBox===e.target)
    {
       dateDropDownBox.style='display:flex';
    }
});
document.querySelector('.dropDownBoxForDate').addEventListener('click',(e)=>
{
    dateBox.textContent=e.target.textContent;
});