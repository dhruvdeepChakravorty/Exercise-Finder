
const cards = document.querySelectorAll('.card');
const param = new URLSearchParams(window.location.search);
const muscleName = param.get('muscle');
let exerciseNum = 0; 
const lBtn=document.querySelector('.left');
const rBtn=document.querySelector('.right');
let result=[];


cards.forEach(card => {
  card.addEventListener('click', () => {
    const muscle = card.querySelector(".name").textContent.toLowerCase();
    
    window.open('exerciseDisplay.html?muscle=' + muscle, '_blank');
  });
});

let exerciseAPI = async (muscleName) => {
	let part=encodeURIComponent(muscleName)
  const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/'+ encodeURIComponent(muscleName); + '?limit=10&offset=0';
 
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'e39ac0eb71msh3b4ed2ef4e416e3p1d96a1jsnb4d6197a5245',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
  };
 
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error occurred while fetching data.");
    }
    result = await response.json();
   
	
	 displayExercise(exerciseNum);


  } catch (error) {
    console.error(error);
  }
};
let displayExercise=(index)=>{
  if (result.length > 0 && index < result.length) {

    document.querySelector(".nameExercise").innerHTML = result[index].name;
    document.querySelector(".gif").src = result[index].gifUrl;

    const exerciseDes = document.querySelector('.description');
    exerciseDes.innerHTML = "";
    for (let i = 0; i < result[index].instructions.length; i++) {
      let p = document.createElement('p');
      p.innerHTML = i + 1 + '. ' + result[index].instructions[i];
      exerciseDes.appendChild(p);
    }

    lBtn.classList.toggle('disabled',index==0);
    rBtn.classList.toggle('disabled',index==result.length-1);

    
}
}
rBtn.addEventListener('click',()=>{
  exerciseNum++;
  displayExercise(exerciseNum);
 
})

lBtn.addEventListener('click',()=>{
  if (exerciseNum>0) {
    exerciseNum--;
  displayExercise(exerciseNum);
  }
})
if (muscleName) {
  exerciseAPI(muscleName);
}

