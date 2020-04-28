// TODO AC
    // X show current date in header
    // X time blocks for standard workday
    // X    time blocks are colore coded
    //         past
    //         present
    //         future
    // X    time block has an input field
    //         save event to that time in local stoarge

$(function(){
    // X show current date in header
    $("#currentDay").text(moment().format('LL'));
    let currentHour = moment().hour();
    let colorCode = 'red';
    // time blocks for standard workday
    for(let i = 0; i < 24; i++){
        if(i === currentHour){
            colorCode = 'yellow';
        }
        if(i > currentHour){
            colorCode = 'green'
        }
        $("#timeBlocks").append(
        `<form class='form-inline m-2 p-2' style='background-color:${colorCode};'>
            <label for='inlineFormInputName2' class='m-2'>Hour: ${i < 10 ? '0' + i : i}</label>
            <input type='text' class='form-control mr-sm-2' data-hour='${i}' placeholder='Eat, sleep, code' minlength='2' maxlength='50'></input>
            <button type='button' class='btn btn-primary create mr-sm-2' data-hour='${i}'>Create</button>
            <button type='button' class='btn btn-success delete mr-sm-2' data-hour='${i}'>Delete</button>
            <p class='m-sm-2' data-hour='${i}' style='background-color: white;'>NICE TO HAVE: LIST OF CURRENT HELD VALUE</p>
        </form>`
        );

    }

    $(".create").on("click", function() {
        let saved = (localStorage.getItem("savedActivities")) ? JSON.parse(localStorage.getItem("savedActivities")) : [];
        let buttonVal = $(this).attr("data-hour");
        // LOOP THROUGH THE INPUT FIELDS
        $('input[data-hour]').each(function(){
            if($(this).attr("data-hour") == buttonVal){
                // IF THERE ISN'T A PREVIOUS LOCAL SAVE CREATE ONE WITH THE RIGHT DATA STRUCTURE
                if(!saved.length){
                    saved.push({"time": $(this).attr("data-hour"), "activity" : [$(this).val()]});
                }else{
                    saved.forEach(hour => {
                        // IF THERE IS A PREVIOUS LOCAL SAVE AT THIS SPOT, ADD THE NEW STRING TO IT
                        if(hour.time == buttonVal){
                            hour.activity.push($(this).val());
                        }else{
                            // IF THERE ISN'T A PREVIOUS LOCAL SAVE AT THIS SPOT CREATE ONE WITH THE RIGHT DATA STRUCTURE
                            saved.push({"time": $(this).attr("data-hour"), "activity" : [$(this).val()]});
                        }                 
                    })
                }
                localStorage.setItem("savedActivities", JSON.stringify(saved));
                
                // $("p[data-hour]").each(function(){
                //     if($(this).attr("data-hour") == buttonVal){
                //         $(this).text('').text(saved);

                //     }
                // })
            }
        console.log('end saved: ', saved);
    })
})

// TODO Nice to have
    // select any day
    // delete button on an timeblock
    // PUSH CURRENT VALS TO A P

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
})