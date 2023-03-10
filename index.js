const NUMBER_OF_ARRAY_BARS = 310;

// // This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// // This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

class SortingVisualizer{
  constructor(props) {
    // super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 15; i++) {
      array.push(randomIntFromInterval(5, 1000));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 100);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          arrayBars[barOneIdx].value = `${newHeight}`;
          
          // const barOneStyle = arrayBars[barOneIdx].style;
          // barOneStyle.value = `${newHeight}`;
        }, i * 100);
      }
    }
  }

  // quickSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  // heapSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  // bubbleSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  render() {
    const {array} = this.state;

    return (
      // <div className="array-container">
      //   {array.map((value, idx) => (
      //     <div
      //       className="array-bar"
      //       key={idx}
      //       style={{
      //         backgroundColor: PRIMARY_COLOR,
      //         height: `${value}px`,
      //       }}></div>
      //   ))}
      //   <button onClick={() => this.resetArray()}>Generate New Array</button>
      //   <button onClick={() => this.mergeSort()}>Merge Sort</button>
      //   <button onClick={() => this.quickSort()}>Quick Sort</button>
      //   <button onClick={() => this.heapSort()}>Heap Sort</button>
      //   <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      //   <button onClick={() => this.testSortingAlgorithms()}>
      //     Test Sorting Algorithms (BROKEN)
      //   </button>
      // </div>

    
          array.map((value, idx) => (
              {value}
          ))
      
          // <button onClick={() => this.resetArray()}>Generate New Array</button>
          // <button onClick={() => this.quickSort()}>Quick Sort</button>
          // <button onClick={() => this.heapSort()}>Heap Sort</button>
          // <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }