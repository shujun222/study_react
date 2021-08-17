const cards = [
    {
        id: 1,
        text: '1 Write a cool JS library',
    },
    {
        id: 2,
        text: '2 Make it generic enough',
    },
    {
        id: 3,
        text: '3 Write README',
    },
    {
        id: 4,
        text: '4 Create some examples',
    },
    {
        id: 5,
        text: '5 Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    {
        id: 6,
        text: '6 ???',
    },
    {
        id: 7,
        text: '7 PROFIT',
    },
]


const cards2 = cards
console.log("cards2[1]", cards2[1]);

const dragCard = cards[1];
console.log("cards[1]", cards[1]);
console.log(1, dragCard);	

cards[1] = cards[0]

console.log("cards[1]", cards[1]);
console.log(1, dragCard);

// cards[hoverIndex] = dragCard
// console.log("cards", cards);
console.log("cards2[1]", cards2[1]);
