async function picnicDecision() {
  try {
    const message = await new Promise((res, rej) => {
      setTimeout(() => {
        const isSunny = Math.random() > 0.5;
        if (isSunny) {
          res('Let us go picnic');
        }
        else {
          rej('Error: It is cloudy');
        }
      }, 3000);
    })

    console.log(message);
  }
  catch (error) {
    console.log(error);
  }
}

picnicDecision();


// console.log("start");

// setTimeout(() => {
//   console.log("Hello");
// }, 1000);

// function now() {
//   console.log("Is Now");
// }

// function is() {
//   console.log("Welcome");
//   now();
// }

// function pr() {
//   let prm = new Promise((resolve, reject) => {
//     is();
//     console.log(1);
//     reject(0);
//   });

//   console.log(prm);

//   return prm;
// }

// pr().then((res) => {
//   console.log(2);
// });

// console.log("end");