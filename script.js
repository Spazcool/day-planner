// TODO AC
    // X show current date in header
    // time blocks for standard workday
    //     time blocks are colore coded
    //         past
    //         present
    //         future
    //     time block has an input field
    //         save event to that time in local stoarge

$(function(){
    // X show current date in header
    $("#currentDay").text(moment().format('LL'));

    // time blocks for standard workday
    for(let i = 0; i < 24; i++){
        $("#timeBlocks").append(`<div class='row' style='border: 2px solid purple;'>
        <div class='col-md-10' style='border: 2px solid yellow;'>
        <span>Hour: ${i}</span><input>Enter thing here</input>
        </div>
        <div class='col-md-1' style='border: 2px solid green;'>
        <button>Create</button>
        </div>
        <div class='col-md-1' style='border: 2px solid black;'><button>Delete</button>
        </div>
        </div>`);
    }

})


{/* 
<div id="timeBlocks" style="border: 2px solid blue;">

<div class='row' style='border: 2px solid purple;'>
  <div class='col-md-10' style='border: 2px solid yellow;'>
    <input>Enter thing here</input>
  </div>
  <div class='col-md-1' style='border: 2px solid green;'>
    <button>Create</button>
  </div>
  <div class='col-md-1' style='border: 2px solid black;'>
    <button>Delete</button>
  </div>
</div>

*/}



// TODO Nice to have
    // select any day
    // delete button on an timeblock

$("#dayPicked").text(moment().day());
$("#dayEarlier").on("click", () => {
    let currentChosen = $("#dayPicked").text();
    console.log('sub ', parseInt(currentChosen))
    console.log('sub ', 6 - parseInt(currentChosen) + 1)
    $("#dayPicked").text(moment().subtract(((6 - parseInt(currentChosen)) + 1), 'day').day())
})
$("#dayLater").on("click", () => {
    let currentChosen = $("#dayPicked").text();
    console.log('math ', 6 % (parseInt(currentChosen) + 1)), // 6%7
    console.log('math ', 6% 1),
    console.log('add ', parseInt(currentChosen))
    console.log('add ', (parseInt(currentChosen) + 1) % 6)
    $("#dayPicked").text(moment().add((parseInt(currentChosen) + 2), 'day').weekday())
})