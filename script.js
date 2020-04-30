$(function(){
    function generateView(){
        //show current date in header
        $("#currentDay").text(moment().format('LL'));
        let currentHour = moment().hour();
        let colorCode = 'red';
        // create time blocks
        for(let i = 0; i < 24; i++){
            if(i === currentHour){
                colorCode = 'yellow';
            }
            if(i > currentHour){
                colorCode = 'green';
            }
            $("#timeBlocks").append(
            `<form class='form-inline m-2 p-2 col-md-12' style='background-color:${colorCode};'>
                <label for='inlineFormInputName2' class='m-2 col-md-1'>Hour: ${i < 10 ? '0' + i : i}</label>
                <input type='text' class='form-control mr-sm-2 col-md-6' data-hour='${i}' placeholder='Eat, sleep, code' minlength='2' maxlength='50'></input>
                <button type='button' class='btn btn-primary create mr-sm-2 col-md-1' data-hour='${i}'>Create</button>
                <button type='button' class='btn btn-success delete mr-sm-2 col-md-1' data-hour='${i}'>Delete</button>
                <p class='m-sm-2 col-md-2' data-hour='${i}' style='background-color: white; overflow-wrap: break-word;'></p>
            </form>`
            );
        }

        // IF PREVSIOUS SAVES SHOW EM ON PAGE LOAD
        if(localStorage.getItem("savedActivities")){
            let saved = JSON.parse(localStorage.getItem("savedActivities"));
            saved.forEach(hour => {
                $(`p[data-hour=${hour.time}]`).text('').text(hour.activity);
            })
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
            $(`p[data-hour=${buttonVal}]`).text('').text(inputVal.val());
        }else{
            // IF THERE IS A PREVIOUS LOCAL SAVE AT THIS SPOT, ADD THE NEW STRING TO IT
            saved.forEach(hour => {
                if(hour.time == buttonVal && hour.activity.length){
                    hour.activity.push(inputVal.val());
                }
            })
            $(`p[data-hour=${buttonVal}]`).text('').text(savedElement[0].activity);
        }

        localStorage.setItem("savedActivities", JSON.stringify(saved));
        // todo clear input field
    }

    function removeActivity(){

        // delete whole hour first
        // if possible delete last item
        // if possible delete specific item, passing it an individual delete button
        let saved = (localStorage.getItem("savedActivities")) ? JSON.parse(localStorage.getItem("savedActivities")) : false;
        let buttonVal = $(this).attr("data-hour");
        let removedElement = saved.filter((hour) => hour.time !== buttonVal);
        localStorage.setItem("savedActivities", JSON.stringify(removedElement));

        // console.log(`saved: ${saved} || element: ${savedElement}`)
        // console.log(savedElement)
        // take data-hour from button
        //     find hour in localStorage with matching time
        //     splice it out of the Array
        //     push back to localStorage
        //     update view
        //     find p with matching data-hour
        
    }
    generateView()
    $(".create").on("click", addActivity)
    $('.delete').on('click', removeActivity)

// TODO Nice to have
    // select any day
    // delete button on an timeblock, on the indidual array items, need to pass them the button when created
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