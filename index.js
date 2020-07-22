// let main = function() {
//     setImmediate(() => console.log("immediate1"));
//     setTimeout(() => console.log("timeout"), 0);
  
//     process.nextTick(() => {
//         console.log("nextTick")
//     setImmediate(() => console.log("immediate2"));

//     } );
//     console.log("current event loop");
//   }
  
//   main()

function main() {
    setTimeout(() => {
        console.log("tiemout");
      }, 0);
      setImmediate(() => {
        console.log("setImemediate");
      });
      process.nextTick(() => {
        console.log("nextTick");
      });
}
main()