const transactions=
{
    date:[],
    image:[],
    spendedRs:[],
    message:[],
    backgroundColor:[]
};

const title=document.querySelector('#title');
const transactionBox=document.querySelector('#transactionAdder');
console.log(transactionBox);
const rightSection=document.querySelector('#rightSection');
const dashboard=document.querySelector('#dashBoard');
const documentElementBackgroundColor=getComputedStyle(document.documentElement).backgroundColor;
const inputMessage=document.querySelector('#inputMessage');
const totalRsInTransactionAdder=document.querySelector('#totalRs');
const noTransaction=document.querySelector('#noTransaction');
console.log(totalRsInTransactionAdder);
document.querySelector('#rightSection').addEventListener('click',(event)=>{    
    if(event.target.id==='addExpensiveBox')
    {
        transactionBox.style.display='grid'; 
        rightSection.style.opacity="50%";  
    }
    else if(event.target.id==='addMoneyBox')
    {
        console.log(event.target.id);
    }
});

//transaction event

document.querySelector('#transactionAdder').addEventListener('click' ,(event)=>{
   
    if(event.target.id==='deleteOption')
    {
        document.documentElement.style.backgroundColor=documentElementBackgroundColor;
        rightSection.style.opacity="100%";
        transactionBox.style.display='none';
    }
    else if(event.target.id==='increaseRs')
    {
        totalRsInTransactionAdder.textContent= String(Number.parseInt(totalRsInTransactionAdder.textContent) + 1);
    }
    else if(event.target.id==='decreaseRs')
    {
        totalRsInTransactionAdder.textContent= String(Number.parseInt(totalRsInTransactionAdder.textContent) - 1);
    }
    else if(event.target.id==='totalRs')
    {
        console.log(inputMessage);
        inputMessage.setAttribute('placeholder','Enter Money');
        inputMessage.focus();
        inputMessage.setAttribute('type','number');
        console.log(inputMessage);
    }
    else if(event.target.id==='utilities')
    {
        for(let index=1;index<categoriesBox.children.length;index++)
        {
            console.log(getComputedStyle(categoriesBox.children[index]).backgroundColor);
            const backgroundColor=getComputedStyle(categoriesBox.children[index]).backgroundColor;
            console.log(backgroundColor);
            if(backgroundColor!=='rgba(0, 0, 0, 0)')
            {
                console.log("davinder");
                categoriesBox.children[index].style.backgroundColor='rgb(0, 0, 0, 0)';
            }
        }   
        event.target.style.backgroundColor='red';        
    }
    else if(event.target.id==='food')
    {
        for(let index=1;index<categoriesBox.children.length;index++)
        {
            console.log(getComputedStyle(categoriesBox.children[index]).backgroundColor);
            const backgroundColor=getComputedStyle(categoriesBox.children[index]).backgroundColor;
            console.log(backgroundColor);
            if(backgroundColor!=='rgba(0, 0, 0, 0)')
            {
                console.log("davinder");
                categoriesBox.children[index].style.backgroundColor='rgb(0, 0, 0, 0)';
            }
        }
        event.target.style.backgroundColor='greenyellow';
    }
    else if(event.target.id==='acceptedBtn')
    {
        console.log(event.target.id);
        transactions.message.push(inputMessage.value);
        transactions.spendedRs.push(totalRsInTransactionAdder.textContent);
        console.log(transactions.spendedRs[0]);
        console.log(document.querySelector("#dateValue").value);
        transactions.date.push(document.querySelector('#dateValue').value ? document.querySelector('#dateValue').value: new Date()); 
        alert("successfully added");
        noTransaction.style.display='none';
        dashboard.style.display='flex';
        document.querySelector('#transactionHistory').insertAdjacentHTML(`afterbegin`,
            `<div class="transactionHistoryBox" >
                <div class="transactionHistoryItem" id="transactionImage">
                  <img class="image" src="/Frontend/assets/img/profile.png" alt="">
                </div>
                <div class="transactionHistoryItem" id="messageOfSpending">
                  <p class="spendingMessage">${transactions.message.at(-1)}</p>
                  <p class="date">${transactions.date.at(-1)}</p>
                </div>
                <div class="transactionHistoryItem" id="spendRs" style="color:red">-${transactions.spendedRs.at(-1)}</div>
              </div>`            
        );
        
    }    
});
inputMessage.addEventListener('keyup',(event)=>{
    console.log(event);
    console.log(inputMessage.getAttribute('type'));
    if(event.key==='Enter' && inputMessage.getAttribute('type')==='number')
    {
        console.log(inputMessage.value);
        totalRsInTransactionAdder.textContent=inputMessage.value;
        inputMessage.value='';
        inputMessage.setAttribute('type','text');
        inputMessage.setAttribute('placeholder','Enter Expensive Name');
        console.log(inputMessage);
    }
    else if(inputMessage.getAttribute('type')==='number')
    {
        totalRsInTransactionAdder.textContent=inputMessage.value;
    }
});






//
const leftSection=document.querySelector('#leftSection');
document.querySelector('#leftSection').addEventListener('click',(event)=>{

    if(event.target.id==='dashboardElement' && transactions.spendedRs.length)
    {
        console.log("davinder");
    }
});



// Add Money
