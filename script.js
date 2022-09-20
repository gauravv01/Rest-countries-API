
const toggledarkmodeelement = document.getElementById('darkmode');
const main=document.querySelector('main');
const content=document.querySelector('#content');
const regionelement=document.querySelector('#region');
const select=document.querySelector('select');
const searchelement=document.getElementById('search');

const url= 'https://restcountries.com/v3.1/all';
var fetchedData = null;
async function fetchData(){
    const data= await fetch(url);
    const response=await data.json();
   const finalresponse= response.sort(function (a, b) {
        return a.name.common.localeCompare(b.name.common) ;
      });
    
    let arr=[];
    finalresponse.map(response=>{
        const {  region ,flags ,population,capital,name}=response;
        arr.push(region)
    })
const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) === index)
    const x= toFindDuplicates(arr).sort();
    for(const options of x){
        const regio=document.createElement('option');
regio.innerText=options;
regionelement.appendChild(regio);
    }
    fetchedData = finalresponse;
        showData(fetchedData);
    
}
fetchData();

const showData=(response)=>{
    content.classList.add("content");
    response.map(response=>{
        const { region ,flags ,population,capital,name}=response;
        const{png}=flags;
        const {common}=name;
        const obj={common,population, region  ,capital};
       const ol=document.createElement('ol');
       content.appendChild(ol);
       const img=document.createElement('img');
       ol.appendChild(img)
       img.setAttribute('src',png);
        const li=document.createElement('li');
        li.innerText=obj.common;
        li.style.padding='0.5rem 1rem';
        ol.appendChild(li);
        const pop=document.createElement('li');
        pop.innerText=`Populaion :${obj.population}` ;
        ol.appendChild(pop);
        const reg=document.createElement('li');
        reg.innerText=`Region : ${obj.region}`;
        ol.appendChild(reg);
        const cap=document.createElement('li');
        cap.innerText=`Capital : ${obj.capital}` ;
        ol.appendChild(cap);
    })

}
let Filteredresponses =null;
const filterregion =(e)=>{
    console.log(e);
    if(e.target.value==='filter'){
        Filteredresponses =fetchedData;
    }
    else{
        Filteredresponses= fetchedData.filter((response)=>{
    const {region}=response;
   return region===e.target.value;

});
}
content.innerText='';
main.querySelector('button') && main.removeChild(button);
showData(Filteredresponses);
}

const search=(e)=>{
    const data=Filteredresponses?Filteredresponses:fetchedData;
    const finalresponse= data.filter((response)=>{
    const {name}=response;
    const {common}=name;
    const names=common;
return names==e.target.value;
})
content.innerText='';
console.log(finalresponse==false);
if(!finalresponse){content.textContent= 'No Contries found !';
return;}
finalresponse && showData(finalresponse);
}
 function debouncing(fn,d){
    let timer;
    return function(){
        let context=this;
        args=arguments;
        clearTimeout(timer);
        timer=setTimeout(()=>{
fn.apply(context,arguments);
        },d)
    }
}
var button=document.createElement('button');
const Details=(e)=>{
    const ol=document.querySelectorAll('ol');
    ol.forEach(ol=>{
    if(e.path[1]===ol){
content.innerText='';
main.removeChild(content);
button.innerText='Back';
const [img,...rest]=ol.childNodes;
img.classList.add('img');
const div=document.createElement('div');
div.classList.add('div');
[...rest].forEach(element=>{
    div.appendChild(element);
})
main.appendChild(button);
main.appendChild(content);
content.appendChild(ol);
ol.appendChild(div);
content.classList.remove('content');
ol.classList.add('detail');
button.classList.add('button');
button.addEventListener('click',show)
return;
    }})
  
}
const show=()=>{
    content.innerText='';
    content.classList.remove('detail');
    main.removeChild(button);
    showData(fetchedData);
    return
}


 const searchbyregion=debouncing(search,1000);

select.addEventListener('click',filterregion);

searchelement.addEventListener('input',searchbyregion);
content.addEventListener('click',Details);
