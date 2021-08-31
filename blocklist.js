// function setItem() {
//     console.log("OK");
//   }

// function onGot(item) {
//     console.log(item);
// }

// function onError(error) {
//     console.log(error)
// }

// function setData() {
//     browser.storage.local.set({
//         'hello': 'world'
//     }).then((e) => setItem(), onError(e));
// }


// function readData() {
//     console.log('starting');
//     let gettingItem = browser.storage.local.get('counter');
//     console.log('starting');
//     gettingItem.then(
//        onGot, onError
//     );
// }

// const namer = 'square';
// module.exports = {readData, setData, setItem, onError, onGot};
// exports = { readData, setData, setItem, onError, onGot };