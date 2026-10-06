class Student {
  constructor(name, age, marks) {
    this.name = name;
    this.age = age;
    this.marks = marks;
  }
  setPlacementAge(minPlacementAge) {
    let that = this;

    return function (minMarks) {
      if (that.marks >= minMarks && that.age >= minPlacementAge) {
        return true;
      } else {
        return false;
      }
    };
    //return a function which takes in argument -> minMarks
    //returns true if students marks are gretaer than minMarks and age gretaer than minPlacementAge
    //Complete this function only. Do not alter any other thing.
  }
}

//Do not touching anything below this line

function createNewStudents(name, age, marks) {
  const Riya = new Student(name, age, marks);

  console.log(Riya.setPlacementAge(18)(40));
}

async function readInput() {
  let inputString = "";

  var output = [];

  process.stdin.on("data", (inputStdin) => {
    inputString += inputStdin;

    const inputArr = inputString.split(/(?:\r\n|\r|\n)/g);

    const argumentsArr = inputArr[0].split(",");

    createNewStudents(
      argumentsArr[0],
      Number(argumentsArr[1]),
      Number(argumentsArr[2]),
    );

    process.exit();
  });
}

readInput();
