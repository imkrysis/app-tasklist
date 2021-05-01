document.addEventListener('deviceready', onDeviceReady, false)

taskItems = []

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)

    const taskList = $('#taskList')
    const inputTask = $('#inputTask')
    const btnTask = $('#btnTask').click(function(){addTask()})
    const btnRemoveList = $('#btnRemoveList').click(function(){removeList()})

    getList()

}

function addTask() {

    if (inputTask.value != "") {

        if (checkItem(inputTask.value)) {

            processItem(inputTask.value)

            saveList()

        } else {

            alert("That task is already introduced")

        }

        inputTask.value = ""
        

    } else {

        alert("You must type something...")

    }    

}

function getList() {

    if (localStorage.getItem("taskList") != null) {

        JSON.parse(localStorage.getItem("taskList")).item.forEach(item => {

            processItem(item)
            
        });

    } else {

        alert('There isnt any task-list locally found')

    }

}

function saveList() {

    localStorage.setItem("taskList", JSON.stringify({"item":taskItems}))

}

function removeList() {

    localStorage.removeItem("taskList")

    taskItems = []

    $('#taskList').empty()

}

function processItem(item) {

    taskItems.push(item)

    $('#taskList').append('<li>' + item + '</li>')

    

}

function checkItem(item) {

    for (var i in taskItems) {

        if (taskItems[i] == item) {

            return false

        }

    }

    return true

}
