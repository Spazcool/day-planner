$(function(){
    function generateView(){
        //CURRENT DATE HEADER
        $("#currentDay").text(moment().format('LL'));
        let currentHour = moment().hour();
        let colorCode = 'red';
        // DYNAMICALLY CREATE TIMEBLOCKS
        for(let i = 0; i < 24; i++){
            if(i === currentHour){
                colorCode = 'yellow';
            }
            if(i > currentHour){
                colorCode = 'green';
            }
            $("#timeBlocks").append(
                `<div class='col-md-12' style='background-color:${colorCode};'>
                    <form class='form-inline m-2 p-2'>
                        <label for='inlineFormInputName2' class='m-2 col-md-1'>Hour: ${i < 10 ? '0' + i : i}</label>
                        <input type='text' class='form-control mr-sm-2 col-md-6' data-hour='${i}' placeholder='Eat, sleep, code' minlength='2' maxlength='50'></input>
                        <button type='button' class='btn btn-primary create mr-sm-2 col-md-1' data-hour='${i}'>Create</button>
                    </form>
                    <div class='row' data-hour='${i}'></div>
                </div>`
            );
        }
        // IF PREVSIOUS SAVES SHOW EM ON PAGE LOAD
        if(localStorage.getItem("savedActivities")){
            refreshItems()
        }
    }

    function addActivity() {
        let saved = (localStorage.getItem("savedActivities")) ? JSON.parse(localStorage.getItem("savedActivities")) : [];
        let buttonVal = $(this).attr("data-hour");
        let inputVal = $(`input[data-hour=${buttonVal}]`);
        let savedElement = saved.filter(hour => hour.time == buttonVal);
        // FIRST SAVE GLOBAL || FIRST SAVE PER HOUR
        if(!saved.length || !saved.includes(savedElement[0])){
            saved.push({"time": inputVal.attr("data-hour"), "activity" : [inputVal.val()]});
            displayItem(buttonVal, inputVal.val())
        }else{
            // IF THERE IS A PREVIOUS LOCAL SAVE AT THIS SPOT, ADD THE NEW ITEM TO IT
            saved.forEach(hour => {
                if(hour.time == buttonVal && hour.activity.length){
                    hour.activity.push(inputVal.val());
                    displayItem(buttonVal, inputVal.val())
                }
            })    
        }

        localStorage.setItem("savedActivities", JSON.stringify(saved));
        inputVal.val('')
    }

    // DYNAMICALLY CREATE TODO ITEMS & CORRESPONDING DELETE BUTTONS
    function displayItem(btn, val){
        $(`div[data-hour=${btn}]`).append(
            `<div class='col-md-1' style='border: 2px dotted black;'>
                <p>${val}</p>
                <button type='button' class='btn btn-success delete' data-hour='${btn}' data-value='${val}'>Delete</button>
            </div>`
        );
        $(`button[data-value=${val}]`).on("click", removeActivity);
    }

    function refreshItems(){
        let saved = JSON.parse(localStorage.getItem("savedActivities"));
        $(".row").html('')
        saved.forEach(hour => {
            hour.activity.forEach(activity => {
                displayItem(hour.time, activity)
            })  
        })
    }

    function removeActivity(){
        let saved = JSON.parse(localStorage.getItem("savedActivities"));
        let buttonHour = $(this).attr("data-hour");
        let buttonValue = $(this).attr("data-value");

        saved.forEach((hour, i) => {
            if(hour.time == buttonHour){ 
                // todo might be a bug if elements share a name
                let index = hour.activity.findIndex(el => el === buttonValue);
                console.log(index)
                hour.activity.splice(index, 1);
                // IF LAST ACTIVITY IN ARR, REMOVE ARR SO IT PLAYS NICE IN addActivity FUNC
                if(hour.activity.length === 0){
                    saved.splice(i, 1)
                }
            }
        });
       
        localStorage.setItem("savedActivities", JSON.stringify(saved));
        refreshItems()
    }

    generateView()
    $(".create").on("click", addActivity)

// TODO Nice to have
    // this day in history background image? or link ( external api?)
    // select any day
        // maria linked a calender

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