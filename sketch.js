//create global array to modify
let randomArray = [];

//used in heap sort
let itmd = [];

//determines which sort method to run
let sortMethod = 0;

//sets the current number of methods
let maxMethodNum = 6;

//used to check if a sort is currently running
let bubbleNum = 0, mergeNum = 0;
let insertNum = 0, quickNum = 0;
let selectionNum = 0, heapNum = 0;

//sets the text variable in upper left
let currentAlgo = "";

function setup() {
  createCanvas(720, 400);
  
  //randomize the array
  for(let i = 0;i<width/8;i++){
    randomArray.push(random(height));
    itmd.push(0);
  }
  //frameRate(10);
  
  //start checking if a sort method is in use
  sortMethodTimer();
}

//randomizes array after setup has been called
function randomizeArray(){
  randomArray = [];
  imtd = [];
  for(let i = 0;i<width/8;i++){
    randomArray.push(random(height));
    imtd.push(0);
  }
}

function draw() {
  background(220);
  
  //update the text accordingly
  text(currentAlgo,0,10);
  
  //starts the correct sort method asychronously
  //because of the Async nature
  //the default case is used to not run another 
  //function until no more sorting is detected
  switch(sortMethod){
    case 0:
      currentAlgo = "Current Algorithm: \n Bubble Sort";
      bubbleSort();
      sortMethod = -1;
      break;
      
    case 1:
      currentAlgo = "Current Algorithm: \n Insertion Sort";
      insertionSort();
      sortMethod = -1;
      break;
    case 2:
      currentAlgo = "Current Algorithm: \n Quick Sort";
      quickSort(0, randomArray.length - 1);
      sortMethod = -1;
      break;
    case 3:
      currentAlgo = "Current Algorithm: \n Merge Sort";
      mergeSort(0, randomArray.length - 1);
      sortMethod = -1;
      break;
    case 4:
      currentAlgo = "Current Algorithm: \n Selection Sort";
      selectionSort();
      sortMethod = -1;
      break;
    case 5:
      currentAlgo = "Current Algorithm: \n Heap Sort";
      heapSort();
      sortMethod = -1;
      break;
    case 6:
      currentAlgo = "Current Algorithm: \n Radix Sort";
      radixSort();
      sortMethod = -1;
      break;
    default:
      //Do Nothing
      break;
      
  }
  drawArray();
}

//draws the array onto the canvas
function drawArray(){
  for(let i = 0;i < randomArray.length;i++){
    stroke(100, 143, 143);
     fill(50);
     rect(i*8 , height, 8, -randomArray[i],20);
    
   }
}

//function for heap sort
async function heapSort(){
  let mid = Math.floor((randomArray.length / 2) - 1);
  let maxLength = randomArray.length - 1;
  while(mid >= 0){
    
    makeHeap(randomArray.length, mid);
    
    mid--;
    heapNum++;
    await sleep(20);
  }
  while(maxLength >= 0){
    [randomArray[0], randomArray[maxLength]] = [randomArray[maxLength], randomArray[0]];
    makeHeap(maxLength, 0);
    maxLength--;
    heapNum++;
    await sleep(20);
  }
}

//used in heap sort
//this translates the array into a heap-like structure
async function makeHeap(length, i){
  let largest = i;
  let left = i * 2 + 1;
  let right = left + 1;
  
  if(left < length && randomArray[left] > randomArray[largest]){
    largest = left;
  }
  
  if(right < length && randomArray[right] > randomArray[largest]){
    largest = right;
  }
  
  if(largest != i){
    [randomArray[i], randomArray[largest]] = [randomArray[largest], randomArray[i]];
    makeHeap(length, largest);
  }
}

//selection sort function
async function selectionSort(){
  for(let i = 0; i < randomArray.length; i++){
    //find min value in current range
    let minIndex = i;
    for(let j = i; j < randomArray.length; j++){
      if(randomArray[minIndex] > randomArray[j]){
        minIndex = j;
      }
    }
    //set the first index of the unsorted array
    //to the min value 
    let temp = randomArray[i];
    randomArray[i] = randomArray[minIndex];
    randomArray[minIndex] = temp;
    await sleep(30);
    selectionNum++;
  }
}

//bubble sort function
async function bubbleSort(){
  for(let i = 0; i < randomArray.length; i++){
		//shuffles through the array until the correct place is found
		for (let j = 0; j < randomArray.length-1 - i; j++){
          //drawArray();
			//checks if the value is unsorted
			if(randomArray[j] > randomArray[j+1]){
				//swaps the two values in the array
				let temporary = randomArray[j];
				randomArray[j] = randomArray[j+1];
				randomArray[j+1] = temporary;
			}
		}
    await sleep(30);
    bubbleNum++;
	}
}

//inertion sort function
async function insertionSort(){
  let i, key, j;
  //This will place a sorted array in ascending order
  for(let i = 1; i < randomArray.length; i++){
    key = randomArray[i];//value that's being compared to array elements
		j = i - 1; 

		//Compare "Key" with the element to it's left until an element smaller than it is found.
		while(j >= 0 && randomArray[j] > key)
		{
			randomArray[j+1] = randomArray[j];
			j = j-1;
          
		}
		randomArray[j + 1] = key; //places key after the element(s) smaller than it
    await sleep(30);
    insertNum++;
  }
}

//function used for quick sort
async function quickSort(start, end) {
  if (start > end) {  // Nothing to sort!
    return;
  }
  
  let index = await partition(start, end);
  await Promise.all(
    [quickSort(start, index - 1), 
     quickSort(index + 1, end)
    ]);
}

//determines the current partition of the array
//in use in quick sort
async function partition(start, end) {
  for (let i = start; i < end; i++) {
    // identify the elements being considered currently
  }
  // Quicksort algorithm
  let pivotIndex = start;
  let pivotElement = randomArray[end];
  for (let i = start; i < end; i++) {
    if (randomArray[i] < pivotElement) {
      await swap(i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(end, pivotIndex);
  return pivotIndex;
}

// swaps elements of 'values' at indices 'i' and 'j'
async function swap(i, j) {
  // adjust the pace of the simulation by changing the
  // value
  await sleep(15);
  quickNum++;
  let temp = randomArray[i];
  randomArray[i] = randomArray[j];
  randomArray[j] = temp;
}

//merges the array back into the main one
function mergeArray(start, end) {
    let mid = parseInt((start + end) >> 1);
    let start1 = start, start2 = mid + 1;
    let end1 = mid, end2 = end;
     
    // Initial index of merged subarray
    let index = start;
 
    while (start1 <= end1 && start2 <= end2) {
        if (randomArray[start1] <= randomArray[start2]) {
            itmd[index] = randomArray[start1]
            index = index + 1
            start1 = start1 + 1;
        }
        else if(randomArray[start1] > randomArray[start2]) {
            itmd[index] = randomArray[start2]
            index = index + 1
            start2 = start2 + 1;
        }
    }
 
    // Copy the remaining elements of
    // arr[], if there are any
    while (start1 <= end1) {
        itmd[index] = randomArray[start1]
        index = index + 1
        start1 = start1 + 1;
    }
 
    while (start2 <= end2) {
        itmd[index] = randomArray[start2]
        index = index + 1
        start2 = start2 + 1;
    }
 
    index = start
    while (index <= end) {
        randomArray[index] = itmd[index];
        index++;
    }
}

//function used for a merge sort
const mergeSort = async (start, end) => {
    if (start < end) {
        let mid = parseInt((start + end) >> 1)
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await mergeArray(start, end);
 
        // Waiting time is 800ms
        await sleep(30);
      mergeNum++;
    }
}


async function sortMethodTimer(){
  //check if stage has changed
  //the first num must be equal
  //for the specified time gap
  //then we start to check the second num
  let currentLoop = 0;
  let preSleepNum = 0;
  let postSleepNum = 0;
  while(true){
  if(currentLoop === 0){
    preSleepNum = bubbleNum;
    await sleep(100);
    postSleepNum = bubbleNum;
    
  }else if (currentLoop === 1){
    preSleepNum = insertNum;
    await sleep(100);
    postSleepNum = insertNum;
    
  }else if(currentLoop === 2){
    preSleepNum = quickNum;
    await sleep(100);
    postSleepNum = quickNum;
  }else if(currentLoop === 3){
    preSleepNum = mergeNum;
    await sleep(100);
    postSleepNum = mergeNum;
  }else if(currentLoop === 4){
    preSleepNum = selectionNum;
    await sleep(100);
    postSleepNum = selectionNum;
  }
  else if(currentLoop === 5){
    preSleepNum = heapNum;
    await sleep(100);
    postSleepNum = heapNum;
  }
    else if(currentLoop === 6){
    preSleepNum = radixNum;
    await sleep(100);
    postSleepNum = radixNum;
  }
  if(preSleepNum === postSleepNum){
      await sleep(1000);
      randomizeArray();
      currentLoop++;
    if(currentLoop === maxMethodNum){
    currentLoop = 0;
    sortMethod = currentLoop;
  }else{
      sortMethod = currentLoop;
  }
      await sleep(500);
    }
    
  if(currentLoop === maxMethodNum){
    currentLoop = 0;
    sortMethod = currentLoop;
  } 
  }
  
}

// custom helper function to deliberately slow down
// the sorting process and make visualization easy
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}